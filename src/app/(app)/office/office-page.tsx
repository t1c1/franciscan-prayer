"use client";

import { BackButton } from "@/components/back-button";
import { DivineOfficeLinks } from "@/components/divine-office-links";
import { useI18n } from "@/lib/i18n";

export default function OfficePage() {
  const { t } = useI18n();
  return (
    <div className="space-y-3">
      <BackButton label={t("home.back")} />
      <h2 className="text-base font-semibold text-foreground">{t("office.title")}</h2>
      <DivineOfficeLinks />
    </div>
  );
}
