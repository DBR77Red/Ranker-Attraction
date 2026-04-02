import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile, mkdir, writeFile, cp } from "fs/promises";

// server deps to bundle to reduce openat(2) syscalls
// which helps cold start times
const allowlist = [
  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

async function buildAll() {
  await rm("dist", { recursive: true, force: true });
  await rm(".vercel/output", { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();

  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });

  console.log("building vercel function...");
  const funcDir = ".vercel/output/functions/api/index.func";
  await mkdir(funcDir, { recursive: true });

  // Bundle api/index.ts with all deps inlined — avoids Vercel's nft tracer
  // missing files from drizzle-orm's complex subpath exports
  await esbuild({
    entryPoints: ["api/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: `${funcDir}/index.js`,
    external: ["pg-native"], // optional native module, pg falls back gracefully
    logLevel: "info",
  });

  // Force CJS resolution (package.json root has "type": "module")
  await writeFile(
    `${funcDir}/package.json`,
    JSON.stringify({ type: "commonjs" })
  );

  // Include attached_assets so seedDatabase() can read the markdown file
  await cp("attached_assets", `${funcDir}/attached_assets`, { recursive: true });

  await writeFile(
    `${funcDir}/.vc-config.json`,
    JSON.stringify({
      runtime: "nodejs22.x",
      handler: "index.js",
      launcherType: "Nodejs",
    })
  );

  console.log("assembling vercel output...");
  await cp("dist/public", ".vercel/output/static", { recursive: true });

  await writeFile(
    ".vercel/output/config.json",
    JSON.stringify({
      version: 3,
      routes: [
        { src: "/api/(.*)", dest: "/api/index" },
        { handle: "filesystem" },
        { src: "/(.*)", dest: "/index.html" },
      ],
    })
  );
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
