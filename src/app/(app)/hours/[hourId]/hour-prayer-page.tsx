"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HOURS, REQUIRED_HOURS } from "@/lib/prayers";
import { PrayerCounter } from "@/components/prayer-counter";
import { ExaminationOfConscience } from "@/components/examination-of-conscience";
import { usePrayerProgress, getCompletedHours } from "@/lib/use-prayer-progress";
import { playMonasteryBell } from "@/lib/audio";
import { useAuth } from "@/lib/auth-context";
import { trackAllHoursCompleted } from "@/lib/analytics";

const REQUIRED_HOUR_IDS = new Set(REQUIRED_HOURS.map((h) => h.id));

interface HourPrayerPageProps {
  hourId: string;
}

export default function HourPrayerPage({ hourId }: HourPrayerPageProps) {
  const router = useRouter();
  const hour = HOURS.find((h) => h.id === hourId);
  const { refresh, getStreak } = usePrayerProgress();
  const { syncToCloud, user } = useAuth();
  const [showExamination, setShowExamination] = useState(() => (
    hourId === "compline" && !getCompletedHours().includes("compline")
  ));

  useEffect(() => {
    if (hourId !== "compline") {
      setShowExamination(false);
      return;
    }
    setShowExamination(!getCompletedHours().includes("compline"));
  }, [hourId]);

  if (!hour) {
    router.replace("/hours");
    return null;
  }

  if (showExamination) {
    return (
      <ExaminationOfConscience
        onClose={() => setShowExamination(false)}
      />
    );
  }

  return (
    <PrayerCounter
      hour={hour}
      onComplete={() => {
        refresh();
        const completed = getCompletedHours();
        const completedRequiredCount = completed.filter((id) => REQUIRED_HOUR_IDS.has(id)).length;
        if (hourId !== "dead" && completedRequiredCount >= REQUIRED_HOURS.length) {
          playMonasteryBell();
          trackAllHoursCompleted(getStreak());
        }
        if (user) syncToCloud();
        router.push("/hours");
      }}
      onBack={() => router.push("/hours")}
    />
  );
}
