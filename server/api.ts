import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { registerRoutes } from "./routes";

const app = express();

app.use(
  express.json({
    verify: (req, _res, buf) => {
      (req as any).rawBody = buf;
    },
  }),
);
app.use(express.urlencoded({ extended: false }));

const httpServer = createServer(app);

// Must await registerRoutes (which includes seeding) before exporting,
// so the serverless function is fully initialized on first request.
const ready = registerRoutes(httpServer, app).then(() => {
  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    if (res.headersSent) return next(err);
    res.status(status).json({ message });
  });
});

// Wrapper that waits for initialization before handling requests
const handler = async (req: Request, res: Response) => {
  await ready;
  app(req, res);
};

export default handler;
