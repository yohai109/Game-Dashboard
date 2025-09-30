import { useEffect, useState } from "react";
import type { SystemInfo } from "../../types/types";

export const HardwereInfo = () => {
  const [data, setData] = useState<SystemInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);

  const fetchInfo = async () => {
    try {
      setError(null);
      const res = await fetch("/api/system-info");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const payload =
        json && json.systemInfo ? (json.systemInfo as SystemInfo) : (json as SystemInfo);
      setData(payload);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e?.message ?? "Failed to load system info");
    }
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchInfo();
  }, []);

  // Manage polling based on autoRefresh
  useEffect(() => {
    let timer: number | undefined;
    if (autoRefresh) {
      // Fetch immediately when turning on, then start interval
      fetchInfo();
      timer = window.setInterval(fetchInfo, 3000);
    }
    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, [autoRefresh]);

  const fmt = (n: number | null | undefined, unit = "", digits = 0) =>
    n == null ? "-" : `${n.toFixed(digits)}${unit}`;

  const Bar = ({
    value,
    color,
    label,
  }: {
    value: number | null | undefined;
    color: string;
    label?: string;
  }) => {
    const v = typeof value === "number" ? Math.max(0, Math.min(100, value)) : null;
    return (
      <div style={{ width: "100%", display: "grid", gap: 4 }}>
        {label && <div style={{ fontSize: 12, opacity: 0.8 }}>{label}</div>}
        <div
          style={{
            background: "rgba(255,255,255,0.08)",
            height: 8,
            borderRadius: 9999,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: v == null ? "0%" : `${v}%`,
              height: "100%",
              background: color,
              transition: "width 300ms ease",
            }}
          />
        </div>
      </div>
    );
  };

  const cpuLoadColor = (n: number | null | undefined) => {
    if (n == null) return "linear-gradient(90deg, #999, #777)";
    if (n < 50) return "linear-gradient(90deg, #4caf50, #66bb6a)";
    if (n < 80) return "linear-gradient(90deg, #ffb300, #ffc107)";
    return "linear-gradient(90deg, #e53935, #ef5350)";
  };

  const tempColor = (n: number | null | undefined) => {
    if (n == null) return "linear-gradient(90deg, #999, #777)";
    if (n < 60) return "linear-gradient(90deg, #42a5f5, #64b5f6)";
    if (n < 80) return "linear-gradient(90deg, #ffb300, #ffc107)";
    return "linear-gradient(90deg, #e53935, #ef5350)";
  };

  return (
    <div className="card">
      <div
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}
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
              onClick={fetchInfo}
              aria-label="Refresh now"
              style={{ padding: "6px 10px" }}
            >
              Refresh
            </button>
          )}
        </div>
      </div>

      {error && <div style={{ color: "tomato", marginTop: 8 }}>Error: {error}</div>}
      {!data && !error && <div style={{ marginTop: 8 }}>Loading...</div>}

      {data && (
        <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
          <div style={{ display: "grid", gap: 6 }}>
            <div style={{ fontSize: 12, opacity: 0.8 }}>Updated</div>
            <div>{new Date(data.time).toLocaleTimeString()}</div>
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>CPU</strong>
              <span>
                {fmt(data.cpu.load, "%", 0)} • {fmt(data.cpu.temperature, "°C", 0)}
              </span>
            </div>
            <Bar
              value={data.cpu.load ?? undefined}
              color={cpuLoadColor(data.cpu.load)}
              label="Load"
            />
            <Bar
              value={Math.min(100, data.cpu.temperature ?? 0)}
              color={tempColor(data.cpu.temperature)}
              label="Temp"
            />
          </div>

          <div style={{ display: "grid", gap: 8 }}>
            <strong>GPUs</strong>
            {data.gpus.length === 0 && <div style={{ opacity: 0.7 }}>- none detected -</div>}
            {data.gpus.map((g, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  padding: 8,
                  display: "grid",
                  gap: 6,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    {g.name ?? "Unknown GPU"}{" "}
                    <span style={{ opacity: 0.6 }}>({g.vendor ?? "Unknown vendor"})</span>
                  </div>
                  <div style={{ opacity: 0.8 }}>VRAM: {fmt(g.vram, " MB")}</div>
                </div>
                <Bar
                  value={g.utilizationGpu ?? undefined}
                  color={cpuLoadColor(g.utilizationGpu)}
                  label="Utilization"
                />
                <Bar
                  value={Math.min(100, g.temperatureGpu ?? 0)}
                  color={tempColor(g.temperatureGpu)}
                  label="Temp"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
