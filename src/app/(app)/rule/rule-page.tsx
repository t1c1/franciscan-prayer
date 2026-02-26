"use client";

import { BackButton } from "@/components/back-button";
import { DailyRule } from "@/components/daily-rule";
import { useI18n } from "@/lib/i18n";

export default function RulePage() {
  const { t } = useI18n();
  return (
    <div className="space-y-3">
      <BackButton label={t("home.back")} />
      <h2 className="text-lg font-semibold text-foreground">{t("rule.title")}</h2>
      <DailyRule />
    </div>
  );
}
