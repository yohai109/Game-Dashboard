import { useMemo } from "react";
import { usePreciseSecondTicker } from "../../hooks/usePreciseSecondTicker.ts";
import { formatDate, formatTime } from "../../utils/format.ts";
import styles from "./WatchCard.module.css";

export const WatchCard = () => {
  const now = usePreciseSecondTicker();
  const { h, m, s } = useMemo(() => formatTime(now), [now]);
  const dateText = useMemo(() => formatDate(now), [now]);
  return (
    <div className={styles.container}>
      <div className={styles.watch} aria-live="polite" aria-label="Current time">
        {`${h}:${m}:${s}`}
      </div>
      <div className={styles.date}>{dateText}</div>
    </div>
  );
};
