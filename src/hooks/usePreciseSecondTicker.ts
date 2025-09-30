import { useEffect, useRef, useState } from "react";

export const usePreciseSecondTicker = (): Date => {
  const [now, setNow] = useState<Date>(() => new Date());
  const timer = useRef<number | null>(null);

  useEffect(() => {
    function tick() {
      const n = new Date();
      setNow(n);
      const delay = 1000 - (Date.now() % 1000);
      timer.current = window.setTimeout(tick, delay);
    }
    tick();
    return () => {
      if (timer.current !== null) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return now;
};
