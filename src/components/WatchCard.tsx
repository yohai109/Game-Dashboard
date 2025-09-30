import { useMemo } from "react";
import { usePreciseSecondTicker } from "../hooks/usePreciseSecondTicker.ts";
import { formatDate, formatTime } from "../utils/format.ts";

export const WatchCard = () => {
  const now = usePreciseSecondTicker();
  const { h, m, s } = useMemo(() => formatTime(now), [now]);
  const dateText = useMemo(() => formatDate(now), [now]);
  return (
    <div className="card">
      <div id="watch" aria-live="polite" aria-label="Current time">{`${h}:${m}:${s}`}</div>
      <div id="date" className="date">
        {dateText}
      </div>
    </div>
  );
}
