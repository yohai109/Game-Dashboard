import { FC, useMemo } from "react";
import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  value: number;
  color?: string;
  label?: string;
  className?: string;
}

export const ProgressBar: FC<ProgressBarProps> = ({ value, color, label, className = "" }) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  // Determine color range based on value
  const colorRange = useMemo(() => {
    if (clampedValue < 25) return "value-0-25";
    if (clampedValue < 50) return "value-25-50";
    if (clampedValue < 75) return "value-50-75";
    return "value-75-100";
  }, [clampedValue]);

  const fillStyle = {
    width: `${clampedValue}%`,
    // Only use custom color if provided, otherwise use dynamic color classes
    ...(color ? { backgroundColor: color } : {}),
  };

  // Only set data-value-range if no custom color is provided
  const dataProps = !color ? { "data-value-range": colorRange } : {};

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.header}>{label && <span className={styles.label}>{label}</span>}</div>
      <div className={styles.progressBar}>
        <div
          className={`${styles.progressFill} ${styles.shine}`}
          style={fillStyle}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
          {...dataProps}
          aria-label={label ? `${label}: ${clampedValue}%` : undefined}
        />
      </div>
    </div>
  );
};
