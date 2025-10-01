import { FC, useMemo } from "react";
import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  value: number;
  color?: string;
  label?: string;
  className?: string;
  animated?: boolean;
}

export const ProgressBar: FC<ProgressBarProps> = ({
  value,
  color,
  label,
  className = "",
  animated = true,
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));
  // Determine color range based on value
  const colorRange = useMemo(() => {
    if (clampedValue < 25) return "--value-0-25";
    if (clampedValue < 50) return "--value-25-50";
    if (clampedValue < 75) return "--value-50-75";
    return "--value-75-100";
  }, [clampedValue]);

  const fillStyle = {
    width: `${clampedValue}%`,
    // Only use custom color if provided, otherwise use dynamic color classes
    ...(color ? { backgroundColor: color } : {}),
    // Add data attribute for CSS targeting if not using custom color
    ...(!color && { [colorRange]: "" }),
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.header}>{label && <span className={styles.label}>{label}</span>}</div>
      <div className={styles.progressBar}>
        <div
          className={`${styles.progressFill} ${animated ? styles.animated : ""}`}
          style={fillStyle}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label ? `${label}: ${clampedValue}%` : undefined}
        />
      </div>
    </div>
  );
};
