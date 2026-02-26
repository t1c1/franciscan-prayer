"use client";

import { BackButton } from "@/components/back-button";
import { AboutPage } from "@/components/about-page";
import { useI18n } from "@/lib/i18n";

export default function AboutPageContent() {
  const { t } = useI18n();
  return (
    <div className="space-y-3">
      <BackButton label={t("home.back")} />
      <h2 className="text-base font-semibold text-foreground">{t("about.title")}</h2>
      <AboutPage />
    </div>
  );
}
