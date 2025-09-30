import { useEffect, useRef, useState } from "react";

export default function usePreciseSecondTicker() {
  const [now, setNow] = useState(() => new Date());
  const timer = useRef(null);
  useEffect(() => {
    function tick() {
      const n = new Date();
      setNow(n);
      const delay = 1000 - (Date.now() % 1000);
      timer.current = setTimeout(tick, delay);
    }
    tick();
    return () => timer.current && clearTimeout(timer.current);
  }, []);
  return now;
}
