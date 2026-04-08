import { build as esbuild, type Plugin } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile, writeFile, mkdir } from "fs/promises";

// Stub pg-native so esbuild inlines a no-op instead of leaving an external require.
// pg's lazy getter catches MODULE_NOT_FOUND, but the external require can fail
// differently in Vercel's ESM Lambda runtime (ERR_MODULE_NOT_FOUND).
const pgNativeStub: Plugin = {
  name: "pg-native-stub",
  setup(build) {
    build.onResolve({ filter: /^pg-native$/ }, () => ({
      path: "pg-native",
      namespace: "pg-native-stub",
    }));
    build.onLoad({ filter: /.*/, namespace: "pg-native-stub" }, () => ({
      contents: "export default null;",
      loader: "js",
    }));
  },
};

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
  // Bundle server/api.ts → api/index.js as CJS with ALL deps inlined.
  // A local api/package.json with "type":"commonjs" overrides the root ESM setting,
  // so @vercel/node loads the function as CJS — no ESM launcher issues.
  await mkdir("api", { recursive: true });
  await writeFile("api/package.json", JSON.stringify({ type: "commonjs" }));
  await esbuild({
    entryPoints: ["server/api.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "api/index.js",
    plugins: [pgNativeStub],
    logLevel: "info",
  });
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
