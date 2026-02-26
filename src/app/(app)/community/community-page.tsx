"use client";

import { BackButton } from "@/components/back-button";
import { CommunityFinder } from "@/components/community-finder";
import { useI18n } from "@/lib/i18n";

export default function CommunityPage() {
  const { t } = useI18n();
  return (
    <div className="space-y-3">
      <BackButton label={t("home.back")} />
      <h2 className="text-base font-semibold text-foreground">{t("community.title")}</h2>
      <p className="text-xs text-muted-foreground">{t("community.desc")}</p>
      <CommunityFinder />
    </div>
  );
}
