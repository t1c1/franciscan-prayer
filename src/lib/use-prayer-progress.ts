"use client";

import { useState, useEffect, useCallback } from "react";
import { HOURS, TOTAL_DAILY_PATERS } from "@/lib/prayers";
import { getLocalDateString } from "@/lib/utils";

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

export function usePrayerProgress() {
  const [completedHours, setCompletedHours] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setCompletedHours(getCompletedHours());
    setStreak(getStreak());
  }, []);

  const refresh = useCallback(() => {
    setCompletedHours(getCompletedHours());
    setStreak(getStreak());
  }, []);

  const completedPaters = completedHours.reduce((sum, id) => {
    const hour = HOURS.find((h) => h.id === id);
    return sum + (hour?.paterCount || 0);
  }, 0);

  return { completedHours, streak, completedPaters, refresh, getCompletedHours, getStreak };
}

export function getNextHour(completedHours: string[]) {
  const currentHourOfDay = new Date().getHours();
  const hourTimeMap: Record<string, number> = {
    matins: 3, lauds: 6, prime: 7, terce: 9,
    sext: 12, none: 15, vespers: 18, compline: 21, dead: 22,
  };
  return (
    HOURS.find(
      (h) => !completedHours.includes(h.id) && hourTimeMap[h.id] >= currentHourOfDay
    ) || HOURS.find((h) => !completedHours.includes(h.id))
  );
}

export { getCompletedHours, getStreak, TOTAL_DAILY_PATERS };
