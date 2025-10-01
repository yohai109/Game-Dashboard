import { formatValue, getCpuLoadColor, getTempColor } from "../utils";
import { CpuInfo } from "../../../../types/types";

export const useCpuSection = (cpu: CpuInfo) => {
  const formattedLoad = cpu.load !== null ? formatValue(cpu.load, "%") : "N/A";
  const formattedTemp = cpu.temperature !== null ? formatValue(cpu.temperature, "°C", 1) : "N/A";
  const loadColor = cpu.load !== null ? getCpuLoadColor(cpu.load) : "#666";
  const tempColor = cpu.temperature !== null ? getTempColor(cpu.temperature) : "#666";

  return {
    formattedLoad,
    formattedTemp,
    loadColor,
    tempColor,
  };
};
