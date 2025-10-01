import { createCanvas } from "canvas";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import ico from "@fiahfy/ico-convert";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* global console, process */

async function generateIcon() {
  const size = 256;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  // Draw background
  ctx.fillStyle = "#2196F3";
  ctx.fillRect(0, 0, size, size);

  // Draw a simple watch/clock icon
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.4, 0, Math.PI * 2);
  ctx.fill();

  // Add clock hands
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = size * 0.03;

  // Hour hand
  ctx.save();
  ctx.translate(size / 2, size / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(size * 0.2, 0);
  ctx.stroke();

  // Minute hand
  ctx.rotate((Math.PI * 2) / 3);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(size * 0.3, 0);
  ctx.stroke();
  ctx.restore();

  // Save as ICO
  const outputPath = join(__dirname, "..", "public", "icon.ico");
  const pngBuffer = canvas.toBuffer("image/png");
  const icoBuffer = await ico.convert([pngBuffer]);

  // Ensure public directory exists
  if (!existsSync(dirname(outputPath))) {
    mkdirSync(dirname(outputPath), { recursive: true });
  }

  writeFileSync(outputPath, icoBuffer);
  console.log(`Icon generated at: ${outputPath}`);
}

generateIcon().catch((error) => {
  console.error("Error generating icon:", error);
  process.exit(1);
});
