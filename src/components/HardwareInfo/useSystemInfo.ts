import { useState, useEffect, useCallback } from "react";
import type { SystemInfo } from "./types";
import { REFRESH_INTERVAL_MS } from "./utils";

export const useSystemInfo = (autoRefresh: boolean) => {
  const [data, setData] = useState<SystemInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchInfo = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch("/api/system-info");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const json = await res.json();
      setData(json.systemInfo);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load system info");
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    fetchInfo();
  }, [fetchInfo]);

  // Manage polling based on autoRefresh
  useEffect(() => {
    if (!autoRefresh) return;

    fetchInfo();
    const timer = window.setInterval(fetchInfo, REFRESH_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [autoRefresh, fetchInfo]);

  return { data, error, refresh: fetchInfo };
};
