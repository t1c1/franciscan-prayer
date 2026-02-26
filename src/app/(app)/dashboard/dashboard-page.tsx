"use client";

import { BackButton } from "@/components/back-button";
import { SyncDashboard } from "@/components/sync-dashboard";
import { useI18n } from "@/lib/i18n";

export default function DashboardPage() {
  const { t } = useI18n();
  return (
    <div className="space-y-3">
      <BackButton label={t("home.back")} />
      <h2 className="text-lg font-semibold text-foreground">{t("dashboard.title")}</h2>
      <SyncDashboard />
    </div>
  );
}
