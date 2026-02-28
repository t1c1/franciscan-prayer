"use client";

import { useState, useEffect, useCallback } from "react";
import { REQUIRED_HOURS, TOTAL_DAILY_PATERS } from "@/lib/prayers";
import { getLocalDateString } from "@/lib/utils";

const PRAYER_PROGRESS_EVENT = "fp-progress-changed";

type PrayerProgressSnapshot = {
  completedHours: string[];
  streak: number;
};

function getCompletedHours(): string[] {
  if (typeof window === "undefined") return [];
  const key = `fp_completions_${getLocalDateString()}`;
  return JSON.parse(localStorage.getItem(key) || "[]");
}

function getStreak(): number {
  if (typeof window === "undefined") return 0;
  let streak = 0;
  const d = new Date();
  for (let i = 0; i < 365; i++) {
    const key = `fp_completions_${getLocalDateString(d)}`;
    const completions = JSON.parse(localStorage.getItem(key) || "[]");
    if (completions.length === 0 && i > 0) break;
    if (completions.length > 0) streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

function getTodayPaters(): number {
  if (typeof window === "undefined") return 0;
  const today = getLocalDateString();
  let total = 0;
  for (const hour of REQUIRED_HOURS) {
    const countKey = `fp_count_${hour.id}_${today}`;
    const count = parseInt(localStorage.getItem(countKey) || "0", 10);
    total += count;
  }
  return total;
}

function getSnapshot(): PrayerProgressSnapshot {
  return {
    completedHours: getCompletedHours(),
    streak: getStreak(),
  };
}

export function emitPrayerProgressChanged(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(PRAYER_PROGRESS_EVENT));
}

export function usePrayerProgress() {
  const [completedHours, setCompletedHours] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const [completedPaters, setCompletedPaters] = useState(0);

  const refresh = useCallback(() => {
    const snapshot = getSnapshot();
    setCompletedHours(snapshot.completedHours);
    setStreak(snapshot.streak);
    setCompletedPaters(getTodayPaters());
  }, []);

  useEffect(() => {
    refresh();
    
    // Listen for storage changes (cross-tab sync)
    const onStorage = (event: StorageEvent) => {
      if (!event.key || event.key.startsWith("fp_completions_") || event.key.startsWith("fp_count_")) {
        refresh();
      }
    };
    
    // Listen for custom progress events (same-tab updates)
    const onProgress = () => {
      refresh();
    };
    
    // Refresh when page becomes visible
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        refresh();
      }
    };

    // Also poll localStorage directly for same-tab changes
    // (since StorageEvent only fires for cross-tab changes)
    // This is a safety net - events should handle most updates
    const pollInterval = setInterval(() => {
      refresh();
    }, 1000);

    window.addEventListener("storage", onStorage);
    window.addEventListener(PRAYER_PROGRESS_EVENT, onProgress);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(PRAYER_PROGRESS_EVENT, onProgress);
      document.removeEventListener("visibilitychange", onVisibility);
      clearInterval(pollInterval);
    };
  }, [refresh]);

  return { completedHours, streak, completedPaters, refresh, getCompletedHours, getStreak };
}

export function getNextHour(completedHours: string[]) {
  const currentHourOfDay = new Date().getHours();
  const hourTimeMap: Record<string, number> = {
    matins: 3, lauds: 6, prime: 7, terce: 9,
    sext: 12, none: 15, vespers: 18, compline: 21,
  };
  return (
    REQUIRED_HOURS.find(
      (h) => !completedHours.includes(h.id) && hourTimeMap[h.id] >= currentHourOfDay
    ) || REQUIRED_HOURS.find((h) => !completedHours.includes(h.id))
  );
}

export { getCompletedHours, getStreak, TOTAL_DAILY_PATERS };
