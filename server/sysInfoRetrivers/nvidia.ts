import { execFile } from "child_process";
import { promisify } from "util";
import { GpuInfo } from "../../types/types";
const execFileAsync = promisify(execFile);

export const getNvidiaGpuInfo = async (): Promise<Partial<GpuInfo> | null> => {
  try {
    // Query temperature (C) and utilization (%)
    const { stdout } = await execFileAsync("nvidia-smi", [
      "--query-gpu=temperature.gpu,utilization.gpu",
      "--format=csv,noheader,nounits",
    ]);

    const [temp, util] = stdout
      .trim()
      .split(",")
      .map((s) => Number(s.trim()));

    return {
      temperatureGpu: Number.isFinite(temp) ? temp : null,
      utilizationGpu: Number.isFinite(util) ? util : null,
    };
  } catch (err) {
    console.warn("Failed to query nvidia-smi:", err instanceof Error ? err.message : String(err));
    return null;
  }
};
