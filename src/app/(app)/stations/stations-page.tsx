"use client";

import { BackButton } from "@/components/back-button";
import { StationsOfTheCross } from "@/components/stations-of-the-cross";
import { useI18n } from "@/lib/i18n";

export default function StationsPage() {
  const { t } = useI18n();
  return (
    <div className="space-y-3">
      <BackButton label={t("home.back")} />
      <h2 className="text-lg font-semibold text-foreground">{t("stations.title")}</h2>
      <StationsOfTheCross />
    </div>
  );
}
