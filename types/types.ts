export type GpuInfo = {
  name: string | null;
  vendor: string | null;
  vram: number | null; // in MB
  utilizationGpu: number | null; // percent 0-100
  temperatureGpu: number | null; // celsius
};

export type CpuInfo = {
  load: number | null; // percent 0-100
  temperature: number | null; // celsius
};

export type SystemInfo = {
  cpu: CpuInfo;
  gpus: GpuInfo[];
  time: string; // ISO timestamp for when the snapshot was taken
};
