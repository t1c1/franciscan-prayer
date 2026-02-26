"use client";

import { BackButton } from "@/components/back-button";
import { FranciscanCrown } from "@/components/franciscan-crown";
import { useI18n } from "@/lib/i18n";

export default function CrownPage() {
  const { t } = useI18n();
  return (
    <div className="space-y-3">
      <BackButton label={t("home.back")} />
      <h2 className="text-base font-semibold text-foreground">{t("crown.title")}</h2>
      <FranciscanCrown />
    </div>
  );
}
