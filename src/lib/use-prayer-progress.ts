"use client";

import { useState, useEffect, useCallback } from "react";
import { HOURS, REQUIRED_HOURS, TOTAL_DAILY_PATERS } from "@/lib/prayers";
import { getLocalDateString } from "@/lib/utils";

const PRAYER_PROGRESS_EVENT = "fp-progress-changed";
const REQUIRED_HOUR_IDS = new Set(REQUIRED_HOURS.map((hour) => hour.id));

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

  const refresh = useCallback(() => {
    const snapshot = getSnapshot();
    setCompletedHours(snapshot.completedHours);
    setStreak(snapshot.streak);
  }, []);

  useEffect(() => {
    refresh();
    const onStorage = (event: StorageEvent) => {
      if (!event.key || event.key.startsWith("fp_completions_") || event.key.startsWith("fp_count_")) {
        refresh();
      }
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        refresh();
      }
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener(PRAYER_PROGRESS_EVENT, refresh);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(PRAYER_PROGRESS_EVENT, refresh);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [refresh]);

  const completedPaters = completedHours.reduce((sum, id) => {
    if (!REQUIRED_HOUR_IDS.has(id)) return sum;
    const hour = HOURS.find((h) => h.id === id);
    return sum + (hour?.paterCount || 0);
  }, 0);

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
