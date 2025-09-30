export type SystemInfo = {
  cpu: {
    load: number | null;
    temperature: number | null;
  };
  gpus: GpuInfo[];
  time: string;
};

export type GpuInfo = {
  name: string | null;
  vendor: string | null;
  vram?: number | null; // in MB
  utilizationGpu: number | null; // percent 0-100
  temperatureGpu: number | null; // celsius
};

export type ProgressBarProps = {
  value: number | null | undefined;
  color: string;
  label?: string;
};
