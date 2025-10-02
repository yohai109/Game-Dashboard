import { useMemo } from "react";
import { usePreciseSecondTicker } from "../../hooks/usePreciseSecondTicker";
import { formatDate, formatTime } from "../../utils/format";
import { CardContainer } from "../CardContainer/CardContainer";
import styles from "./WatchCard.module.css";

export const WatchCard = () => {
  const now = usePreciseSecondTicker();
  const { h, m, s } = useMemo(() => formatTime(now), [now]);
  const dateText = useMemo(() => formatDate(now), [now]);
  return (
    <CardContainer>
      <div className={styles.watchContent}>
        <time
          dateTime={now.toISOString()}
          className={styles.time}
          aria-live="polite"
          aria-atomic="true"
        >
          <span className={styles.hours}>{h}</span>
          <span className={styles.colon}>:</span>
          <span className={styles.minutes}>{m}</span>
          <span className={styles.colon}>:</span>
          <span className={styles.seconds}>{s}</span>
        </time>
        <div className={styles.date} aria-hidden="true">
          {dateText}
        </div>
      </div>
    </CardContainer>
  );
};
