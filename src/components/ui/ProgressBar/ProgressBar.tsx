import styles from "./ProgressBar.module.css";

type ProgressBarProps = {
  value: number | null | undefined;
  color: string;
  label?: string;
};

export const ProgressBar = ({ value, color, label }: ProgressBarProps) => {
  const progressWidth = typeof value === "number" ? Math.max(0, Math.min(100, value)) : 0;
  return (
    <div className={styles.container}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{
            width: `${progressWidth}%`,
            background: color,
          }}
        />
      </div>
    </div>
  );
};
