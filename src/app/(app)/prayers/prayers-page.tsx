"use client";

import { BackButton } from "@/components/back-button";
import { PrayerTextViewer } from "@/components/prayer-text-viewer";
import { useI18n } from "@/lib/i18n";

export default function PrayersPage() {
  const { t } = useI18n();
  return (
    <div className="space-y-3">
      <BackButton label={t("home.back")} />
      <h2 className="text-lg font-semibold text-foreground">{t("prayers.title")}</h2>
      <PrayerTextViewer />
    </div>
  );
}
