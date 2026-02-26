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
    <div className="space-y-2">
      <BackButton label={t("home.back")} />
      <h2 className="text-base font-semibold text-foreground">{t("hours.title")}</h2>
      <p className="text-xs text-muted-foreground italic">{t("hours.desc")}</p>
      <div className="space-y-1.5">
        {HOURS.map((hour) => {
          const done = completedHours.includes(hour.id);
          const isDay = ["lauds", "prime", "terce", "sext", "none"].includes(hour.id);
          return (
            <Link
              key={hour.id}
              href={`/hours/${hour.id}`}
              className={cn("w-full bg-card rounded-lg border p-3 text-left transition-all flex items-center gap-2.5", done ? "border-franciscan/30 opacity-70" : "border-border hover:border-franciscan/40")}
            >
              <div className="w-7 h-7 rounded-full flex items-center justify-center bg-muted shrink-0">
                {done ? <Check className="w-3.5 h-3.5 text-franciscan" /> : hour.id === "dead" ? <Cross className="w-3.5 h-3.5 text-muted-foreground" /> : isDay ? <Sun className="w-3.5 h-3.5 text-muted-foreground" /> : <Moon className="w-3.5 h-3.5 text-muted-foreground" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn("text-sm font-medium", done && "line-through")}>
                  {getHourName(hour.id)}
                  <span className="text-[10px] text-muted-foreground ml-1.5 font-normal italic">{hour.latinName}</span>
                </p>
                <p className="text-[10px] text-muted-foreground">{hour.paterCount} {t("progress.paters")} &middot; {getHourTime(hour.id)}</p>
              </div>
              {!done && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
