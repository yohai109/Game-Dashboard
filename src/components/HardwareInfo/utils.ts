import type { GpuInfo } from "./types";

export const REFRESH_INTERVAL_MS = 1000;

export const formatValue = (n: number | null | undefined, unit = "", digits = 0) =>
  n == null ? "-" : `${n.toFixed(digits)}${unit}`;

export const getCpuLoadColor = (n: number | null | undefined) => {
  if (n == null) return "linear-gradient(90deg, #999, #777)";
  if (n < 50) return "linear-gradient(90deg, #4caf50, #66bb6a)";
  if (n < 80) return "linear-gradient(90deg, #ffb300, #ffc107)";
  return "linear-gradient(90deg, #e53935, #ef5350)";
};

export const getTempColor = (n: number | null | undefined) => {
  if (n == null) return "linear-gradient(90deg, #999, #777)";
  if (n < 60) return "linear-gradient(90deg, #42a5f5, #64b5f6)";
  if (n < 80) return "linear-gradient(90deg, #ffb300, #ffc107)";
  return "linear-gradient(90deg, #e53935, #ef5350)";
};

export const getGpuName = (gpu: GpuInfo) => {
  if (gpu.name && gpu.vendor) {
    return `${gpu.vendor} ${gpu.name}`.trim();
  }
  return gpu.name || gpu.vendor || "GPU";
};
