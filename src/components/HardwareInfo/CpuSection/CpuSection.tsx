import { ProgressBar } from "../../ui/ProgressBar";
import { useCpuSection } from "./useCpuSection";
import styles from "./CpuSection.module.css";
import { CpuInfo } from "../../../../types/types";

interface CpuSectionProps {
  cpu: CpuInfo;
}

export const CpuSection = ({ cpu }: CpuSectionProps) => {
  const { formattedLoad, formattedTemp, loadColor, tempColor } = useCpuSection(cpu);

  if (cpu.load === null && cpu.temperature === null) {
    return null;
  }

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>CPU</h3>
      <div className={styles.metrics}>
        {cpu.load !== null && (
          <>
            <div className={styles.metricRow}>
              <span>Load:</span>
              <span>{formattedLoad}</span>
            </div>
            <ProgressBar value={cpu.load} color={loadColor} />
          </>
        )}
        {cpu.temperature !== null && (
          <>
            <div className={styles.metricRow}>
              <span>Temperature:</span>
              <span>{formattedTemp}</span>
            </div>
            <ProgressBar value={cpu.temperature} color={tempColor} />
          </>
        )}
      </div>
    </div>
  );
};
