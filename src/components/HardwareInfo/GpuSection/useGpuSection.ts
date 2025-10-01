import { GpuInfo, GpuMetric } from "../../../../types/types";
import { formatValue, getCpuLoadColor, getTempColor, getGpuName } from "../utils";

export const useGpuSection = (gpu: GpuInfo) => {
  const gpuName = getGpuName(gpu);

  const formattedMetrics: GpuMetric[] = [
    gpu.utilizationGpu != null && {
      label: "GPU Load",
      value: formatValue(gpu.utilizationGpu, "%"),
      valueNumber: gpu.utilizationGpu,
      color: getCpuLoadColor(gpu.utilizationGpu),
      showProgress: true,
    },
    gpu.temperatureGpu != null && {
      label: "Temperature",
      value: formatValue(gpu.temperatureGpu, "°C", 1),
      valueNumber: gpu.temperatureGpu,
      color: getTempColor(gpu.temperatureGpu),
      showProgress: true,
    },
    gpu.vram != null && {
      label: "VRAM",
      value: formatValue(gpu.vram, " MB"),
      valueNumber: gpu.vram,
      showProgress: false,
    },
  ].filter(Boolean) as GpuMetric[];

  return {
    gpuName,
    formattedMetrics,
  };
};
