"use client";

import { ExternalLink, ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth-context";

const SAINTFORAMINUTE_URL = "https://saintforaminute.com/today";

export function SaintsOfTheDay() {
  const { t } = useI18n();
  const { user } = useAuth();

  // Public version - just a link
  if (!user) {
    return (
      <a
        href={SAINTFORAMINUTE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-card rounded-xl border border-border p-3 text-left hover:border-franciscan/40 transition-colors flex items-center gap-3 group"
      >
        <div className="w-9 h-9 rounded-lg bg-franciscan-light flex items-center justify-center shrink-0">
          <ExternalLink className="w-4 h-4 text-franciscan" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">{t("saints.title")}</p>
          <p className="text-[11px] text-muted-foreground">{t("saints.subtitle_public")}</p>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 group-hover:text-franciscan transition-colors" />
      </a>
    );
  }

  // Logged-in version
  return (
    <div className="bg-card rounded-xl border border-border p-3 space-y-2">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-franciscan-light flex items-center justify-center shrink-0">
          <ExternalLink className="w-4 h-4 text-franciscan" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">{t("saints.title")}</p>
          <p className="text-[11px] text-muted-foreground">{t("saints.subtitle_logged_in")}</p>
        </div>
      </div>
      <a
        href={SAINTFORAMINUTE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 bg-franciscan text-franciscan-foreground rounded-lg px-3 py-2 text-xs font-medium hover:opacity-90 transition-opacity"
      >
        <ExternalLink className="w-3.5 h-3.5" />
        {t("saints.view_today")}
      </a>
    </div>
  );
}
