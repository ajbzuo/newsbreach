import express, { type Request, Response, NextFunction } from "express";
import serverless from "serverless-http";
import { registerRoutes } from "./routes";
import compression from "compression";
import helmet from "helmet";

const app = express();

// Compression + security headers
app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        connectSrc: ["'self'", "https:"],
      },
    },
  })
);
app.set("trust proxy", 1);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request-logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  let capturedBody: any;
  const origJson = res.json;
  res.json = (body: any) => {
    capturedBody = body;
    return origJson.call(res, body);
  };

  res.on("finish", () => {
    if (req.path.startsWith("/api")) {
      const duration = Date.now() - start;
      let line = `${req.method} ${req.path} ${res.statusCode} in ${duration}ms`;
      if (capturedBody) line += ` :: ${JSON.stringify(capturedBody)}`;
      console.log(line.substring(0, 80));
    }
  });

  next();
});

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Mount your API routes
registerRoutes(app);

// Central error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  res.status(status).json({ message: err.message || "Internal Server Error" });
  console.error(`Error ${status}:`, err);
});

// Wrap and export for Vercel
export default serverless(app);