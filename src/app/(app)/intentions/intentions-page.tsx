"use client";

import { BackButton } from "@/components/back-button";
import { IntentionsJournal } from "@/components/intentions-journal";
import { useI18n } from "@/lib/i18n";

export default function IntentionsPage() {
  const { t } = useI18n();
  return (
    <div className="space-y-3">
      <BackButton label={t("home.back")} />
      <h2 className="text-lg font-semibold text-foreground">{t("intentions.title")}</h2>
      <IntentionsJournal />
    </div>
  );
}
