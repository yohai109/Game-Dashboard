import { useState } from "react";
import { CpuSection } from "./CpuSection";
import { GpuSection } from "./GpuSection";
import { useSystemInfo } from "./useSystemInfo";
import { CpuInfo, GpuInfo } from "../../../types/types";
import styles from "./HardwareInfo.module.css";

export const HardwareInfo = () => {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const { data, error, refresh } = useSystemInfo(autoRefresh);

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (!data) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const { cpu, gpus } = data as { cpu: CpuInfo; gpus: GpuInfo[] };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Hardware Info</h2>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.button}
            onClick={() => setAutoRefresh((v) => !v)}
            aria-pressed={autoRefresh}
            aria-label="Toggle auto refresh"
          >
            Auto: {autoRefresh ? "On" : "Off"}
          </button>
          {!autoRefresh && (
            <button
              type="button"
              className={styles.button}
              onClick={refresh}
              aria-label="Refresh now"
            >
              Refresh
            </button>
          )}
        </div>
      </div>

      <div className={styles.content}>
        <CpuSection cpu={cpu} />
        {gpus.map((gpu, i) => (
          <GpuSection key={`gpu-${i}`} gpu={gpu} />
        ))}
      </div>
    </div>
  );
};
