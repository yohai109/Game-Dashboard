import express from "express";
import { getSystemInfo } from "./api/systemInfo";

const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Basic routes
app.get("/", (req, res) => {
  res.send({ message: "Server is up" });
});

app.get("/api/health", (req, res) => {
  res.send({ status: "ok", time: new Date().toISOString() });
});

app.get("/api/system-info", async (req, res) => {
  try {
    const systemInfo = await getSystemInfo();

    res.json({ systemInfo });
  } catch (err) {
    // eslint-disable-next-line no-undef
    console.error("Failed to get system info", err);
    res.status(500).json({ error: "Failed to get system info" });
  }
});

// 404 handler for API
app.use("/api", (req, res) => {
  res.status(404).send({ error: "Not Found" });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-undef
  console.log(`Express server listening on http://localhost:${PORT}`);
});
