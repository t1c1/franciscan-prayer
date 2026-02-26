"use client";

import Link from "next/link";
import { Check, Sun, Moon, ChevronRight, Cross } from "lucide-react";
import { HOURS, HOURS_I18N } from "@/lib/prayers";
import { usePrayerProgress } from "@/lib/use-prayer-progress";
import { BackButton } from "@/components/back-button";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function HoursPage() {
  const { completedHours } = usePrayerProgress();
  const { locale, t } = useI18n();
  const hourI18n = HOURS_I18N[locale] || HOURS_I18N.en;
  const getHourName = (id: string) => hourI18n[id]?.name || HOURS.find(h => h.id === id)?.name || id;
  const getHourTime = (id: string) => hourI18n[id]?.typicalTime || "";

  return (
    <div className="space-y-3">
      <BackButton label={t("home.back")} />
      <h2 className="text-lg font-semibold text-foreground">{t("hours.title")}</h2>
      <p className="text-sm text-muted-foreground">{t("hours.desc")}</p>
      <div className="space-y-2">
        {HOURS.map((hour) => {
          const done = completedHours.includes(hour.id);
          const isDay = ["lauds", "prime", "terce", "sext", "none"].includes(hour.id);
          return (
            <Link
              key={hour.id}
              href={`/hours/${hour.id}`}
              className={cn("w-full bg-card rounded-lg border p-4 text-left transition-all flex items-center gap-3", done ? "border-franciscan/30 opacity-70" : "border-border hover:border-franciscan/40")}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-muted">
                {done ? <Check className="w-4 h-4 text-franciscan" /> : hour.id === "dead" ? <Cross className="w-4 h-4 text-muted-foreground" /> : isDay ? <Sun className="w-4 h-4 text-muted-foreground" /> : <Moon className="w-4 h-4 text-muted-foreground" />}
              </div>
              <div className="flex-1">
                <p className={cn("font-medium", done && "line-through")}>
                  {getHourName(hour.id)}
                  <span className="text-xs text-muted-foreground ml-2 font-normal italic">{hour.latinName}</span>
                </p>
                <p className="text-xs text-muted-foreground">{hour.paterCount} {t("progress.paters")} &middot; {getHourTime(hour.id)}</p>
              </div>
              {!done && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
