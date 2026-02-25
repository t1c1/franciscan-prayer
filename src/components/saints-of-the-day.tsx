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
        onClick={(e) => { e.preventDefault(); window.open(SAINTFORAMINUTE_URL, "_blank", "noopener,noreferrer"); }}
        className="bg-card rounded-xl border border-border p-4 text-left hover:border-franciscan/40 transition-colors flex items-center gap-4 group"
      >
        <div className="w-10 h-10 rounded-lg bg-franciscan-light flex items-center justify-center">
          <ExternalLink className="w-5 h-5 text-franciscan" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-foreground">{t("saints.title")}</p>
          <p className="text-xs text-muted-foreground">{t("saints.subtitle_public")}</p>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-franciscan transition-colors" />
      </a>
    );
  }

  // Logged-in version - enhanced with sign-in prompt if needed
  return (
    <div className="bg-card rounded-xl border border-border p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-franciscan-light flex items-center justify-center">
            <ExternalLink className="w-5 h-5 text-franciscan" />
          </div>
          <div>
            <p className="font-semibold text-foreground">{t("saints.title")}</p>
            <p className="text-xs text-muted-foreground">{t("saints.subtitle_logged_in")}</p>
          </div>
        </div>
      </div>
      <a
        href={SAINTFORAMINUTE_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => { e.preventDefault(); window.open(SAINTFORAMINUTE_URL, "_blank", "noopener,noreferrer"); }}
        className="w-full flex items-center justify-center gap-2 bg-franciscan text-franciscan-foreground rounded-lg px-4 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
      >
        <ExternalLink className="w-4 h-4" />
        {t("saints.view_today")}
      </a>
    </div>
  );
}
