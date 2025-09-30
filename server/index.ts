import express, { Request, Response } from "express";
import { getSystemInfo } from "./api/systemInfo";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
// Lightweight request logger
app.use((req: Request, _res: Response, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Basic routes
app.get("/", (_req: Request, res: Response) => {
  res.send({ message: "Server is up" });
});

app.get("/api/health", (_req: Request, res: Response) => {
  res.send({ status: "ok", time: new Date().toISOString() });
});

app.get("/api/system-info", async (_req: Request, res: Response) => {
  try {
    const systemInfo = await getSystemInfo();
    res.json({ systemInfo });
  } catch (err) {
    console.error("Failed to get system info", err);
    res.status(500).json({ error: "Failed to get system info" });
  }
});

// 404 handler for API
app.use("/api", (_req: Request, res: Response) => {
  res.status(404).send({ error: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`\x1b[32mExpress server listening on http://localhost:${PORT}\x1b[0m`);
});
