"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HOURS } from "@/lib/prayers";
import { PrayerCounter } from "@/components/prayer-counter";
import { ExaminationOfConscience } from "@/components/examination-of-conscience";
import { usePrayerProgress, getCompletedHours } from "@/lib/use-prayer-progress";
import { playMonasteryBell } from "@/lib/audio";
import { useAuth } from "@/lib/auth-context";
import { trackAllHoursCompleted } from "@/lib/analytics";

interface HourPrayerPageProps {
  hourId: string;
}

export default function HourPrayerPage({ hourId }: HourPrayerPageProps) {
  const router = useRouter();
  const hour = HOURS.find((h) => h.id === hourId);
  const { refresh, completedHours, getStreak } = usePrayerProgress();
  const { syncToCloud, user } = useAuth();
  const [showExamination, setShowExamination] = useState(
    hourId === "compline" && !completedHours.includes("compline")
  );

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
        if (hourId === "compline" && !getCompletedHours().includes("dead")) {
          router.push("/hours/dead");
        } else {
          const completed = getCompletedHours();
          if (completed.length >= HOURS.length) {
            playMonasteryBell();
            trackAllHoursCompleted(getStreak());
          }
          if (user) syncToCloud();
          router.push("/hours");
        }
      }}
      onBack={() => router.push("/hours")}
    />
  );
}
