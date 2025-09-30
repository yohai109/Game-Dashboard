import type { ProgressBarProps } from "./types";

export const ProgressBar = ({ value, color, label }: ProgressBarProps) => {
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
