import si from "systeminformation";
import { SystemInfo, CpuInfo, GpuInfo } from "../../types/types";

export const getSystemInfo = async (): Promise<SystemInfo> => {
  const [load, cpuTemp, graphics] = await Promise.all([
    si
      .currentLoad()
      .catch(() => ({ currentLoad: undefined }) as Partial<si.Systeminformation.CurrentLoadData>),
    si
      .cpuTemperature()
      .catch(() => ({ main: undefined }) as Partial<si.Systeminformation.CpuTemperatureData>),
    si
      .graphics()
      .catch(() => ({ controllers: [], displays: [] }) as si.Systeminformation.GraphicsData),
  ]);

  const cpu: CpuInfo = {
    load: typeof load?.currentLoad === "number" ? load.currentLoad : null,
    temperature: typeof cpuTemp?.main === "number" ? cpuTemp.main : null,
  };

  const gpus: GpuInfo[] = (graphics?.controllers ?? []).map((g) => ({
    name: g?.model ?? null,
    vendor: g?.vendor ?? null,
    vram: typeof g?.vram === "number" ? g.vram : null,
    utilizationGpu: typeof g?.utilizationGpu === "number" ? g.utilizationGpu : null,
    temperatureGpu: typeof g?.temperatureGpu === "number" ? g.temperatureGpu : null,
  }));

  return {
    cpu,
    gpus,
    time: new Date().toISOString(),
  };
};
