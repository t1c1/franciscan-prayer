"use client";

import { BackButton } from "@/components/back-button";
import { FranciscanCalendarView } from "@/components/franciscan-calendar-view";
import { useI18n } from "@/lib/i18n";

export default function CalendarPage() {
  const { t } = useI18n();
  return (
    <div className="space-y-3">
      <BackButton label={t("home.back")} />
      <h2 className="text-base font-semibold text-foreground">{t("calendar.title")}</h2>
      <p className="text-xs text-muted-foreground">{t("calendar.desc")}</p>
      <FranciscanCalendarView />
    </div>
  );
}
