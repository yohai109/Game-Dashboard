import { useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { useSystemInfo } from "./useSystemInfo";
import { formatValue, getCpuLoadColor, getTempColor, getGpuName } from "./utils";

export const HardwareInfo = () => {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const { data, error, refresh } = useSystemInfo(autoRefresh);

  if (error) {
    return <div className="card">Error: {error}</div>;
  }

  if (!data) {
    return <div className="card">Loading...</div>;
  }

  const { cpu, gpus } = data;

  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <h2 style={{ margin: 0 }}>Hardware Info</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            type="button"
            onClick={() => setAutoRefresh((v) => !v)}
            aria-pressed={autoRefresh}
            aria-label="Toggle auto refresh"
            style={{ padding: "6px 10px" }}
          >
            Auto: {autoRefresh ? "On" : "Off"}
          </button>
          {!autoRefresh && (
            <button
              type="button"
              onClick={refresh}
              aria-label="Refresh now"
              style={{ padding: "6px 10px" }}
            >
              Refresh
            </button>
          )}
        </div>
      </div>

      <div style={{ marginTop: 16, display: "grid", gap: 16 }}>
        <div>
          <h3 style={{ margin: "0 0 8px 0" }}>CPU</h3>
          <div style={{ display: "grid", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Load:</span>
              <span>{formatValue(cpu.load, "%")}</span>
            </div>
            <ProgressBar value={cpu.load} color={getCpuLoadColor(cpu.load)} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Temperature:</span>
              <span>{formatValue(cpu.temperature, "°C", 1)}</span>
            </div>
            <ProgressBar value={cpu.temperature} color={getTempColor(cpu.temperature)} />
          </div>
        </div>

        {gpus.map((gpu, i) => (
          <div key={i}>
            <h3 style={{ margin: "0 0 8px 0" }}>{getGpuName(gpu)}</h3>
            <div style={{ display: "grid", gap: 8 }}>
              {gpu.utilizationGpu != null && (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                <div style={{ display: "flex", justifyContent: "space-between" }}>
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

export default HardwareInfo;
