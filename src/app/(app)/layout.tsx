"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Settings, Flame } from "lucide-react";
import { usePrayerProgress, TOTAL_DAILY_PATERS } from "@/lib/use-prayer-progress";
import { HOURS } from "@/lib/prayers";
import { getLiturgicalInfo } from "@/lib/readings";
import { AuthButton } from "@/components/auth-button";
import { Onboarding, useOnboarding } from "@/components/onboarding";
import { IntroOnboarding, useIntroOnboarding } from "@/components/intro-onboarding";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Share2 } from "lucide-react";
import { shareCard } from "@/lib/share-card";
import { trackShareCard, trackViewChanged } from "@/lib/analytics";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { showOnboarding, dismiss: dismissOnboarding, checked } = useOnboarding();
  const { state: introState, dismiss: dismissIntro } = useIntroOnboarding();
  const { completedHours, streak, completedPaters } = usePrayerProgress();
  const liturgy = getLiturgicalInfo();
  const { locale, t } = useI18n();

  useEffect(() => {
    const view = pathname === "/" ? "home" : pathname.replace(/^\//, "").replace(/\//g, "_");
    trackViewChanged(view);
  }, [pathname]);

  if (!checked || introState === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-3">☦️</div>
          <h1 className="text-xl font-bold text-foreground">Franciscan Prayer</h1>
        </div>
      </div>
    );
  }

  if (introState === "show") {
    return <IntroOnboarding onComplete={dismissIntro} />;
  }

  if (showOnboarding) {
    return <Onboarding onComplete={dismissOnboarding} />;
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-left">
              <h1 className="text-xl font-bold text-foreground tracking-tight">
                {t("app.title")}
              </h1>
              <p className="text-xs text-muted-foreground">{t("app.subtitle")}</p>
            </Link>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-muted-foreground font-medium italic">J.M.J.</span>
              <AuthButton />
              <Link
                href="/settings"
                className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label={t("settings.title")}
              >
                <Settings className="w-4 h-4" />
              </Link>
              {streak > 0 && (
                <span className="flex items-center gap-1 text-xs font-medium text-franciscan bg-franciscan-light px-2 py-1 rounded-full">
                  <Flame className="w-3 h-3" /> {streak}{locale === "zh" ? "天" : "d"}
                </span>
              )}
              <span className={cn(
                "text-xs px-2 py-1 rounded-full font-medium",
                liturgy.color === "green" && "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                liturgy.color === "purple" && "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
                liturgy.color === "white" && "bg-amber-50 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
              )}>
                {liturgy.season}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Daily progress */}
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">{t("progress.title")}</span>
            <span className="text-xs text-muted-foreground tabular-nums">
              {completedPaters} / {TOTAL_DAILY_PATERS} {t("progress.paters")}
            </span>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-franciscan rounded-full transition-all duration-500" style={{ width: `${Math.min((completedPaters / TOTAL_DAILY_PATERS) * 100, 100)}%` }} />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-muted-foreground">
              {completedHours.length} {t("progress.hours_of")} {HOURS.length} {t("progress.hours_label")}
            </span>
            {completedPaters >= TOTAL_DAILY_PATERS && (
              <span className="flex items-center gap-1 text-xs font-medium text-franciscan">
                {t("progress.complete")}
                <button
                  onClick={() => { trackShareCard(); shareCard({
                    title: t("share.title"),
                    subtitle: new Date().toLocaleDateString(locale === "zh" ? "zh-CN" : locale, { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
                    stat: `${streak} ${t("share.streak")}`,
                    footer: t("share.footer"),
                  }); }}
                  className="ml-1 p-1 rounded-full hover:bg-franciscan-light transition-colors"
                >
                  <Share2 className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>

        {children}

        <footer className="text-center pt-8 pb-4">
          <p className="text-xs text-muted-foreground italic">{t("footer.pax")}</p>
          <p className="text-xs text-muted-foreground mt-1">{t("footer.amdg")}</p>
        </footer>
      </div>
    </main>
  );
}
