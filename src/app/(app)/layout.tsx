"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Settings, Flame, X } from "lucide-react";
import { usePrayerProgress, TOTAL_DAILY_PATERS } from "@/lib/use-prayer-progress";
import { REQUIRED_HOURS } from "@/lib/prayers";
import { getLiturgicalInfo } from "@/lib/readings";
import { AuthButton } from "@/components/auth-button";
import { useAuth } from "@/lib/auth-context";
import { Onboarding, useOnboarding } from "@/components/onboarding";
import { IntroOnboarding, useIntroOnboarding } from "@/components/intro-onboarding";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Share2 } from "lucide-react";
import { shareCard } from "@/lib/share-card";
import { trackShareCard, trackViewChanged } from "@/lib/analytics";
import { PlatformBar } from "@/components/platform-bar";
import { getReflectionUI } from "@/lib/daily-reflection";

const REQUIRED_HOUR_IDS = new Set(REQUIRED_HOURS.map((hour) => hour.id));

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { showOnboarding, dismiss: dismissOnboarding, checked } = useOnboarding();
  const { state: introState, dismiss: dismissIntro } = useIntroOnboarding();
  const { completedHours, streak, completedPaters, refresh } = usePrayerProgress();
  const completedRequiredHours = completedHours.filter((id) => REQUIRED_HOUR_IDS.has(id));
  const liturgy = getLiturgicalInfo();
  const { locale, t } = useI18n();
  const { user } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);

  // Parse OAuth error from URL hash (Supabase redirects with #error=...&error_description=...)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (!hash || !hash.includes("error")) return;

    const params = new URLSearchParams(hash.slice(1));
    const error = params.get("error");
    const description = params.get("error_description");

    if (error) {
      setAuthError(description?.replace(/\+/g, " ") || error);
      // Clear hash from URL without triggering navigation
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const view = pathname === "/" ? "home" : pathname.replace(/^\//, "").replace(/\//g, "_");
    trackViewChanged(view);
    refresh();
  }, [pathname, refresh]);

  if (!checked || introState === "loading") {
    return (
      <div className="min-h-dvh bg-background flex items-center justify-center">
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
    <main className="min-h-dvh bg-background overflow-x-clip">
      <PlatformBar />
      <header className="border-b border-border bg-card">
        <div className="max-w-lg mx-auto px-4 sm:px-5 py-2.5 sm:py-3">
          <div className="flex items-start justify-between gap-2">
            <Link href="/" className="text-left min-w-0 flex-1 pr-1">
              <h1 className="text-base sm:text-lg font-bold text-foreground tracking-tight truncate">
                {t("app.title")}
              </h1>
              <p className="text-[11px] text-muted-foreground italic truncate leading-tight">{t("app.subtitle")}</p>
            </Link>
            <div className="flex items-center gap-1 shrink-0">
              <AuthButton />
              <Link
                href="/settings"
                className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label={t("settings.title")}
              >
                <Settings className="w-4 h-4" />
              </Link>
              {streak > 0 && (
                <span className="flex items-center gap-0.5 text-[11px] font-medium text-franciscan bg-franciscan-light px-1.5 py-0.5 rounded-full">
                  <Flame className="w-3 h-3" /> {streak}{locale === "zh" ? "天" : "d"}
                </span>
              )}
              <span className={cn(
                "text-[11px] px-1.5 py-0.5 rounded-full font-medium inline-flex items-center gap-1 max-w-[104px]",
                liturgy.color === "green" && "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                liturgy.color === "purple" && "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
                liturgy.color === "white" && "bg-amber-50 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
              )}>
                <span className="h-1.5 w-1.5 rounded-full bg-current/80 shrink-0" />
                <span className="truncate max-[380px]:hidden">{liturgy.season}</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="safe-bottom max-w-lg mx-auto px-4 sm:px-5 py-4 pb-8 space-y-4 sm:space-y-5">
        {authError && (
          <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl p-3 flex items-start gap-2">
            <p className="text-sm text-red-800 dark:text-red-200 flex-1">
              Sign in failed: {authError}
            </p>
            <button
              type="button"
              onClick={() => setAuthError(null)}
              className="p-0.5 text-red-500 hover:text-red-700 dark:hover:text-red-300 shrink-0"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        {/* Daily progress - only show when there's progress */}
        {(completedPaters > 0 || completedRequiredHours.length > 0) && (
          <div className="bg-card rounded-xl border border-border p-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-foreground">{t("progress.title")}</span>
              <span className="text-[11px] text-muted-foreground tabular-nums">
                {completedPaters} / {TOTAL_DAILY_PATERS} {t("progress.paters")}
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-franciscan rounded-full transition-all duration-500" style={{ width: `${Math.min((completedPaters / TOTAL_DAILY_PATERS) * 100, 100)}%` }} />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[11px] text-muted-foreground">
                {completedRequiredHours.length} {t("progress.hours_of")} {REQUIRED_HOURS.length} {t("progress.hours_label")}
              </span>
              {completedPaters >= TOTAL_DAILY_PATERS && (
                <span className="flex items-center gap-1 text-[11px] font-medium text-franciscan">
                  {t("progress.complete")}
                  <button
                    type="button"
                    aria-label={t("share.title")}
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
            {!user && completedPaters > 0 && (
              <p className="text-[11px] text-muted-foreground/60 mt-1.5 text-center">
                This progress is saved on this device only.{" "}
                <span className="text-franciscan/60">Sign in to sync.</span>
              </p>
            )}
          </div>
        )}

        {children}

        <footer className="pt-8 pb-4 border-t border-border mt-6">
          <nav className="grid grid-cols-2 gap-x-6 gap-y-1 mb-4" aria-label="Footer navigation">
            <div>
              <h3 className="text-xs font-semibold text-foreground mb-1">{t("nav.hours")}</h3>
              <ul className="space-y-0.5">
                <li><Link href="/hours" className="text-xs text-muted-foreground hover:text-franciscan transition-colors">{t("nav.hours")}</Link></li>
                <li><Link href="/office" className="text-xs text-muted-foreground hover:text-franciscan transition-colors">{t("nav.office")}</Link></li>
                <li><Link href="/crown" className="text-xs text-muted-foreground hover:text-franciscan transition-colors">{t("nav.crown")}</Link></li>
                <li><Link href="/stations" className="text-xs text-muted-foreground hover:text-franciscan transition-colors">{t("nav.stations")}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-foreground mb-1">Franciscan Life</h3>
              <ul className="space-y-0.5">
                <li><Link href="/prayers" className="text-xs text-muted-foreground hover:text-franciscan transition-colors">{t("nav.prayers")}</Link></li>
                <li><Link href="/rule" className="text-xs text-muted-foreground hover:text-franciscan transition-colors">{t("nav.rule")}</Link></li>
                <li><Link href="/calendar" className="text-xs text-muted-foreground hover:text-franciscan transition-colors">{t("nav.calendar")}</Link></li>
                <li><Link href="/reflections" className="text-xs text-muted-foreground hover:text-franciscan transition-colors">{getReflectionUI(locale)["nav.label"]}</Link></li>
                <li><Link href="/community" className="text-xs text-muted-foreground hover:text-franciscan transition-colors">{t("nav.community")}</Link></li>
              </ul>
            </div>
          </nav>

          <p className="text-xs text-muted-foreground leading-relaxed mb-3">
            Franciscan Prayer is a free companion for the daily prayer life of Secular Franciscans,
            Third Order members, and all who follow the spirituality of St. Francis of Assisi.
            Featuring the Pater Noster Hours, the Franciscan Crown Rosary, Stations of the Cross,
            and the Rule of 1223.
          </p>

          <a
            href="https://ubimissa.com/mass"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 mb-3 rounded-xl border border-border bg-card hover:border-franciscan/30 hover:bg-franciscan-light/30 transition-all no-underline"
          >
            <span className="text-lg leading-none shrink-0">✝</span>
            <span className="flex flex-col gap-0.5 text-left">
              <strong className="text-xs font-semibold text-foreground">Ubi Missa</strong>
              <span className="text-[10px] text-muted-foreground">Find Mass, Confession &amp; Adoration near you</span>
            </span>
          </a>

          <div className="flex flex-wrap gap-x-3 gap-y-0.5 mb-3">
            <a href="https://bible.usccb.org/daily-bible-reading" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-franciscan transition-colors">USCCB Daily Readings ↗</a>
            <a href="https://www.franciscanmedia.org/" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-franciscan transition-colors">Franciscan Media ↗</a>
            <Link href="/about" className="text-xs text-muted-foreground hover:text-franciscan transition-colors">{t("nav.about")}</Link>
            <Link href="/settings" className="text-xs text-muted-foreground hover:text-franciscan transition-colors">{t("nav.settings")}</Link>
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground italic">{t("footer.pax")}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{t("footer.amdg")}</p>
            <p className="text-xs text-muted-foreground mt-1">&copy; {new Date().getFullYear()} Franciscan Prayer · An <a href="https://ubimissa.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-franciscan transition-colors">Ubi Missa</a> companion</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
