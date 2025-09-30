import { execFile } from "child_process";
import { promisify } from "util";
import si from "systeminformation";
import { SystemInfo, CpuInfo, GpuInfo } from "../../types/types";

const execFileAsync = promisify(execFile);

const getNvidiaGpuInfo = async (): Promise<GpuInfo | null> => {
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
      name: "NVIDIA GPU",
      vendor: "NVIDIA",
      temperatureGpu: Number.isFinite(temp) ? temp : null,
      utilizationGpu: Number.isFinite(util) ? util : null,
    };
  } catch (err) {
    console.warn("Failed to query nvidia-smi:", err instanceof Error ? err.message : String(err));
    return null;
  }
};

export const getSystemInfo = async (): Promise<SystemInfo> => {
  const [load, cpuTemp, graphics, nvidiaInfo] = await Promise.all([
    si.currentLoad().catch(() => ({ currentLoad: undefined })),
    si.cpuTemperature().catch(() => ({ main: undefined })),
    si.graphics().catch(() => ({ controllers: [], displays: [] })),
    getNvidiaGpuInfo().catch(() => null), // Run in parallel
  ]);

  const cpu: CpuInfo = {
    load: typeof load?.currentLoad === "number" ? load.currentLoad : null,
    temperature: typeof cpuTemp?.main === "number" ? cpuTemp.main : null,
  };

  // Start with systeminformation's GPU data
  const gpus: GpuInfo[] = (graphics?.controllers ?? []).map((g) => ({
    name: g?.model ?? null,
    vendor: g?.vendor ?? null,
    vram: typeof g?.vram === "number" ? g.vram : null,
    utilizationGpu: typeof g?.utilizationGpu === "number" ? g.utilizationGpu : null,
    temperatureGpu: typeof g?.temperatureGpu === "number" ? g.temperatureGpu : null,
  }));

  // If nvidia-smi returned data, merge it with the first NVIDIA GPU found
  if (nvidiaInfo) {
    const nvidiaGpuIndex = gpus.findIndex(
      (g) => g.vendor?.toLowerCase().includes("nvidia") || g.name?.toLowerCase().includes("nvidia")
    );

    if (nvidiaGpuIndex >= 0) {
      // Update existing NVIDIA GPU with nvidia-smi data
      gpus[nvidiaGpuIndex] = {
        ...gpus[nvidiaGpuIndex],
        ...nvidiaInfo,
      };
    } else {
      // Or add as a new GPU if not found by systeminformation
      gpus.push(nvidiaInfo);
    }
  }

  return {
    cpu,
    gpus,
    time: new Date().toISOString(),
  };
};
