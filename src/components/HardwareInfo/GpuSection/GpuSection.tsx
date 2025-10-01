import { ProgressBar } from "../../ui/ProgressBar";
import { useGpuSection } from "./useGpuSection";
import styles from "./GpuSection.module.css";
import { GpuInfo } from "../../../../types/types";

interface GpuSectionProps {
  gpu: GpuInfo;
}

export const GpuSection = ({ gpu }: GpuSectionProps) => {
  const { gpuName, formattedMetrics } = useGpuSection(gpu);

  return (
    <div className={styles.gpuSection}>
      <h3 className={styles.sectionTitle}>{gpuName}</h3>
      <div className={styles.metrics}>
        {formattedMetrics.map((metric, i) => (
          <div key={i}>
            <div className={styles.metricRow}>
              <span>{metric.label}:</span>
              <span>{metric.value}</span>
            </div>
            {metric.showProgress && <ProgressBar value={metric.valueNumber} />}
          </div>
        ))}
      </div>
    </div>
  );
};
