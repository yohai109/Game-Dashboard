import { useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { useSystemInfo } from "./useSystemInfo";
import { formatValue, getCpuLoadColor, getTempColor, getGpuName } from "./utils";
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

  const { cpu, gpus } = data;

  return (
    <div className="card">
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
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>CPU</h3>
          <div className={styles.metrics}>
            <div className={styles.metricRow}>
              <span>Load:</span>
              <span>{formatValue(cpu.load, "%")}</span>
            </div>
            <ProgressBar value={cpu.load} color={getCpuLoadColor(cpu.load)} />
            <div className={styles.metricRow}>
              <span>Temperature:</span>
              <span>{formatValue(cpu.temperature, "°C", 1)}</span>
            </div>
            <ProgressBar value={cpu.temperature} color={getTempColor(cpu.temperature)} />
          </div>
        </div>

        {gpus.map((gpu, i) => (
          <div key={i} className={styles.gpuSection}>
            <h3 className={styles.sectionTitle}>{getGpuName(gpu)}</h3>
            <div className={styles.metrics}>
              {gpu.utilizationGpu != null && (
                <>
                  <div className={styles.metricRow}>
                    <span>GPU Load:</span>
                    <span>{formatValue(gpu.utilizationGpu, "%")}</span>
                  </div>
                  <ProgressBar
                    value={gpu.utilizationGpu}
                    color={getCpuLoadColor(gpu.utilizationGpu)}
                  />
                </>
              )}
              {gpu.temperatureGpu != null && (
                <>
                  <div className={styles.metricRow}>
                    <span>Temperature:</span>
                    <span>{formatValue(gpu.temperatureGpu, "°C", 1)}</span>
                  </div>
                  <ProgressBar
                    value={gpu.temperatureGpu}
                    color={getTempColor(gpu.temperatureGpu)}
                  />
                </>
              )}
              {gpu.vram != null && (
                <div className={styles.metricRow}>
                  <span>VRAM:</span>
                  <span>{formatValue(gpu.vram, " MB")}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
