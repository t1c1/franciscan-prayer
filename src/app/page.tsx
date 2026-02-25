"use client";

import { useState, useEffect } from "react";
import {
  Clock, BookOpen, HandHeart, Sun, Moon, ChevronRight, Check, Flame,
  Users, Scroll, Flower2, ExternalLink, Cross, Calendar, SunMoon,
  Heart, Info, BarChart3, Share2,
} from "lucide-react";
import { useTheme } from "next-themes";
import { HOURS, TOTAL_DAILY_PATERS, HOURS_I18N } from "@/lib/prayers";
import { getTodayUSCCBUrl, getLiturgicalInfo } from "@/lib/readings";
import { getDailyQuote } from "@/lib/franciscan-quotes";
import { QUOTES_I18N } from "@/lib/franciscan-quotes";
import { shareCard } from "@/lib/share-card";
import { playMonasteryBell } from "@/lib/audio";
import { useI18n } from "@/lib/i18n";
import { PrayerCounter } from "@/components/prayer-counter";
import { PrayerTextViewer } from "@/components/prayer-text-viewer";
import { CommunityFinder } from "@/components/community-finder";
import { DailyRule } from "@/components/daily-rule";
import { FranciscanCrown } from "@/components/franciscan-crown";
import { DivineOfficeLinks } from "@/components/divine-office-links";
import { StationsOfTheCross } from "@/components/stations-of-the-cross";
import { FranciscanCalendarView } from "@/components/franciscan-calendar-view";
import { LiturgicalBanner } from "@/components/liturgical-banner";
import { NotificationToggle } from "@/components/notification-toggle";
import { IntentionsJournal } from "@/components/intentions-journal";
import { AboutPage } from "@/components/about-page";
import { AuthButton } from "@/components/auth-button";
import { SyncDashboard } from "@/components/sync-dashboard";
import { ExaminationOfConscience } from "@/components/examination-of-conscience";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Onboarding, useOnboarding } from "@/components/onboarding";
import { useAuth } from "@/lib/auth-context";
import { getTodayFeast, CALENDAR_I18N } from "@/lib/franciscan-calendar";
import { cn } from "@/lib/utils";
import {
  trackHourStarted, trackAllHoursCompleted, trackViewChanged,
  trackThemeToggled, trackShareCard, trackExaminationStarted,
} from "@/lib/analytics";

type View =
  | "home" | "hours" | "prayers" | "crown" | "office" | "rule"
  | "community" | "stations" | "calendar" | "intentions" | "dashboard" | "about";

function getCompletedHours(): string[] {
  if (typeof window === "undefined") return [];
  const key = `fp_completions_${new Date().toISOString().split("T")[0]}`;
  return JSON.parse(localStorage.getItem(key) || "[]");
}

function getStreak(): number {
  if (typeof window === "undefined") return 0;
  let streak = 0;
  const d = new Date();
  for (let i = 0; i < 365; i++) {
    const key = `fp_completions_${d.toISOString().split("T")[0]}`;
    const completions = JSON.parse(localStorage.getItem(key) || "[]");
    if (completions.length === 0 && i > 0) break;
    if (completions.length > 0) streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

export default function Home() {
  const [view, setView] = useState<View>("home");
  const [activeHourId, setActiveHourId] = useState<string | null>(null);
  const [completedHours, setCompletedHours] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const [showExamination, setShowExamination] = useState(false);
  const { showOnboarding, dismiss: dismissOnboarding, checked } = useOnboarding();
  const { syncToCloud, user } = useAuth();
  const liturgy = getLiturgicalInfo();
  const todayFeast = getTodayFeast();
  const { theme, setTheme } = useTheme();
  const { locale, t } = useI18n();

  // Get locale-aware daily quote
  const enQuote = getDailyQuote();
  const localizedQuotes = locale !== "en" && QUOTES_I18N[locale];
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const dailyQuote = localizedQuotes ? localizedQuotes[dayOfYear % localizedQuotes.length] : enQuote;

  // Get translated hour info
  const hourI18n = HOURS_I18N[locale] || HOURS_I18N.en;

  useEffect(() => {
    setCompletedHours(getCompletedHours());
    setStreak(getStreak());
  }, []);

  const refreshCompletions = () => {
    setCompletedHours(getCompletedHours());
    setStreak(getStreak());
  };

  const completedPaters = completedHours.reduce((sum, id) => {
    const hour = HOURS.find((h) => h.id === id);
    return sum + (hour?.paterCount || 0);
  }, 0);

  const currentHourOfDay = new Date().getHours();
  const hourTimeMap: Record<string, number> = {
    matins: 3, lauds: 6, prime: 7, terce: 9,
    sext: 12, none: 15, vespers: 18, compline: 21,
  };
  const nextHour = HOURS.find(
    (h) => !completedHours.includes(h.id) && hourTimeMap[h.id] >= currentHourOfDay
  ) || HOURS.find((h) => !completedHours.includes(h.id));

  const getHourName = (id: string) => hourI18n[id]?.name || HOURS.find(h => h.id === id)?.name || id;
  const getHourTime = (id: string) => hourI18n[id]?.typicalTime || "";
  const navigateTo = (v: View) => { trackViewChanged(v); setView(v); };

  // Wait for hydration check
  if (!checked) return null;

  // First-time onboarding / sign-in
  if (showOnboarding) {
    return <Onboarding onComplete={dismissOnboarding} />;
  }

  if (showExamination) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-lg mx-auto px-4 py-8">
          <ExaminationOfConscience onClose={() => { setShowExamination(false); setActiveHourId("compline"); }} />
        </div>
      </main>
    );
  }

  if (activeHourId) {
    const hour = HOURS.find((h) => h.id === activeHourId)!;
    return (
      <main className="min-h-screen bg-background">
        <PrayerCounter
          hour={hour}
          onComplete={() => {
            refreshCompletions();
            setActiveHourId(null);
            const completed = getCompletedHours();
            if (completed.length >= HOURS.length) {
              playMonasteryBell();
              trackAllHoursCompleted(getStreak());
            }
            if (user) syncToCloud();
          }}
          onBack={() => setActiveHourId(null)}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setView("home")} className="text-left">
              <h1 className="text-xl font-bold text-foreground tracking-tight">
                {t("app.title")}
              </h1>
              <p className="text-xs text-muted-foreground">{t("app.subtitle")}</p>
            </button>
            <div className="flex items-center gap-1.5">
              <LanguageSwitcher />
              <AuthButton />
              <NotificationToggle />
              <button
                onClick={() => { const next = theme === "dark" ? "light" : "dark"; setTheme(next); trackThemeToggled(next); }}
                className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="Toggle dark mode"
              >
                <SunMoon className="w-4 h-4" />
              </button>
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

        {/* HOME */}
        {view === "home" && (
          <div className="space-y-3">
            <LiturgicalBanner />
            {todayFeast && (() => {
              const fKey = `${String(todayFeast.month).padStart(2, "0")}-${String(todayFeast.day).padStart(2, "0")}`;
              const fi = (locale !== "en" && CALENDAR_I18N?.[locale]?.[fKey]) || { name: todayFeast.name, description: todayFeast.description };
              return (
                <button onClick={() => navigateTo("calendar")} className="w-full bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-left hover:opacity-90 transition-opacity">
                  <p className="text-xs text-amber-700 dark:text-amber-400 uppercase tracking-wide font-medium">{t("home.feast_today")}</p>
                  <p className="text-sm font-semibold text-foreground mt-1">{fi.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{fi.description}</p>
                </button>
              );
            })()}
            <div className="bg-card rounded-xl border border-border p-4">
              <p className="text-sm text-foreground/80 italic leading-relaxed">&ldquo;{dailyQuote.text}&rdquo;</p>
              <p className="text-xs text-muted-foreground mt-2">— {dailyQuote.author}{dailyQuote.source && <span className="italic">, {dailyQuote.source}</span>}</p>
            </div>
            {nextHour && (
              <button
                onClick={() => { if (nextHour.id === "compline" && !completedHours.includes("compline")) { trackExaminationStarted(); setShowExamination(true); } else { trackHourStarted(nextHour.id); setActiveHourId(nextHour.id); } }}
                className="w-full bg-franciscan text-franciscan-foreground rounded-xl p-5 text-left hover:opacity-90 transition-opacity active:scale-[0.98]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs opacity-80 uppercase tracking-wide">{t("home.pray_now")}</p>
                    <p className="text-lg font-bold mt-1">
                      {getHourName(nextHour.id)}
                      <span className="font-normal text-sm opacity-80 ml-2">{nextHour.paterCount} {t("home.paters")}</span>
                    </p>
                    <p className="text-xs opacity-70 mt-1">{getHourTime(nextHour.id)}</p>
                  </div>
                  <ChevronRight className="w-6 h-6 opacity-60" />
                </div>
              </button>
            )}
            <div className="grid grid-cols-1 gap-3">
              <NavTile icon={<Clock className="w-5 h-5 text-franciscan" />} title={t("nav.hours")} subtitle={t("nav.hours_sub")} onClick={() => navigateTo("hours")} />
              <NavTile icon={<Flower2 className="w-5 h-5 text-franciscan" />} title={t("nav.crown")} subtitle={t("nav.crown_sub")} onClick={() => navigateTo("crown")} />
              <NavTile icon={<BookOpen className="w-5 h-5 text-franciscan" />} title={t("nav.office")} subtitle={t("nav.office_sub")} onClick={() => navigateTo("office")} />
              <NavTile icon={<Cross className="w-5 h-5 text-franciscan" />} title={t("nav.stations")} subtitle={t("nav.stations_sub")} onClick={() => navigateTo("stations")} />
              <NavTile icon={<HandHeart className="w-5 h-5 text-franciscan" />} title={t("nav.prayers")} subtitle={t("nav.prayers_sub")} onClick={() => navigateTo("prayers")} />
              <NavTile icon={<Scroll className="w-5 h-5 text-franciscan" />} title={t("nav.rule")} subtitle={t("nav.rule_sub")} onClick={() => navigateTo("rule")} />
              <NavTile icon={<Calendar className="w-5 h-5 text-franciscan" />} title={t("nav.calendar")} subtitle={`42 ${t("nav.calendar_sub")}`} onClick={() => navigateTo("calendar")} />
              <a href={getTodayUSCCBUrl()} target="_blank" rel="noopener noreferrer" className="bg-card rounded-xl border border-border p-4 text-left hover:border-franciscan/40 transition-colors flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-franciscan-light flex items-center justify-center"><ExternalLink className="w-5 h-5 text-franciscan" /></div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{t("nav.readings")}</p>
                  <p className="text-xs text-muted-foreground">{t("nav.readings_sub")}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </a>
              <NavTile icon={<Users className="w-5 h-5 text-franciscan" />} title={t("nav.community")} subtitle={t("nav.community_sub")} onClick={() => navigateTo("community")} />
              <NavTile icon={<Heart className="w-5 h-5 text-franciscan" />} title={t("nav.intentions")} subtitle={t("nav.intentions_sub")} onClick={() => navigateTo("intentions")} />
              <NavTile icon={<BarChart3 className="w-5 h-5 text-franciscan" />} title={t("nav.dashboard")} subtitle={t("nav.dashboard_sub")} onClick={() => navigateTo("dashboard")} />
              <NavTile icon={<Info className="w-5 h-5 text-franciscan" />} title={t("nav.about")} subtitle={t("nav.about_sub")} onClick={() => navigateTo("about")} />
            </div>
          </div>
        )}

        {/* HOURS */}
        {view === "hours" && (
          <div className="space-y-3">
            <BackButton label={t("home.back")} onClick={() => setView("home")} />
            <h2 className="text-lg font-semibold text-foreground">{t("hours.title")}</h2>
            <p className="text-sm text-muted-foreground">{t("hours.desc")}</p>
            <div className="space-y-2">
              {HOURS.map((hour) => {
                const done = completedHours.includes(hour.id);
                const isDay = ["lauds", "prime", "terce", "sext", "none"].includes(hour.id);
                return (
                  <button key={hour.id} onClick={() => { if (hour.id === "compline" && !completedHours.includes("compline")) { trackExaminationStarted(); setShowExamination(true); } else { trackHourStarted(hour.id); setActiveHourId(hour.id); } }}
                    className={cn("w-full bg-card rounded-lg border p-4 text-left transition-all flex items-center gap-3", done ? "border-franciscan/30 opacity-70" : "border-border hover:border-franciscan/40")}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-muted">
                      {done ? <Check className="w-4 h-4 text-franciscan" /> : isDay ? <Sun className="w-4 h-4 text-muted-foreground" /> : <Moon className="w-4 h-4 text-muted-foreground" />}
                    </div>
                    <div className="flex-1">
                      <p className={cn("font-medium", done && "line-through")}>
                        {getHourName(hour.id)}
                        <span className="text-xs text-muted-foreground ml-2 font-normal italic">{hour.latinName}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">{hour.paterCount} {t("progress.paters")} &middot; {getHourTime(hour.id)}</p>
                    </div>
                    {!done && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {view === "crown" && (<div className="space-y-3"><BackButton label={t("home.back")} onClick={() => setView("home")} /><h2 className="text-lg font-semibold text-foreground">{t("crown.title")}</h2><FranciscanCrown /></div>)}
        {view === "office" && (<div className="space-y-3"><BackButton label={t("home.back")} onClick={() => setView("home")} /><h2 className="text-lg font-semibold text-foreground">{t("office.title")}</h2><DivineOfficeLinks /></div>)}
        {view === "prayers" && (<div className="space-y-3"><BackButton label={t("home.back")} onClick={() => setView("home")} /><h2 className="text-lg font-semibold text-foreground">{t("prayers.title")}</h2><PrayerTextViewer /></div>)}
        {view === "rule" && (<div className="space-y-3"><BackButton label={t("home.back")} onClick={() => setView("home")} /><h2 className="text-lg font-semibold text-foreground">{t("rule.title")}</h2><DailyRule /></div>)}
        {view === "stations" && (<div className="space-y-3"><BackButton label={t("home.back")} onClick={() => setView("home")} /><h2 className="text-lg font-semibold text-foreground">{t("stations.title")}</h2><StationsOfTheCross /></div>)}
        {view === "calendar" && (<div className="space-y-3"><BackButton label={t("home.back")} onClick={() => setView("home")} /><h2 className="text-lg font-semibold text-foreground">{t("calendar.title")}</h2><p className="text-sm text-muted-foreground">{t("calendar.desc")}</p><FranciscanCalendarView /></div>)}
        {view === "community" && (<div className="space-y-3"><BackButton label={t("home.back")} onClick={() => setView("home")} /><h2 className="text-lg font-semibold text-foreground">{t("community.title")}</h2><p className="text-sm text-muted-foreground">{t("community.desc")}</p><CommunityFinder /></div>)}
        {view === "intentions" && (<div className="space-y-3"><BackButton label={t("home.back")} onClick={() => setView("home")} /><h2 className="text-lg font-semibold text-foreground">{t("intentions.title")}</h2><IntentionsJournal /></div>)}
        {view === "dashboard" && (<div className="space-y-3"><BackButton label={t("home.back")} onClick={() => setView("home")} /><h2 className="text-lg font-semibold text-foreground">{t("dashboard.title")}</h2><SyncDashboard /></div>)}
        {view === "about" && (<div className="space-y-3"><BackButton label={t("home.back")} onClick={() => setView("home")} /><h2 className="text-lg font-semibold text-foreground">{t("about.title")}</h2><AboutPage /></div>)}

        <footer className="text-center pt-8 pb-4">
          <p className="text-xs text-muted-foreground italic">{t("footer.pax")}</p>
          <p className="text-xs text-muted-foreground mt-1">{t("footer.amdg")}</p>
        </footer>
      </div>
    </main>
  );
}

function NavTile({ icon, title, subtitle, onClick }: { icon: React.ReactNode; title: string; subtitle: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="bg-card rounded-xl border border-border p-4 text-left hover:border-franciscan/40 transition-colors flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-franciscan-light flex items-center justify-center">{icon}</div>
      <div className="flex-1">
        <p className="font-semibold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
    </button>
  );
}

function BackButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
      &larr; {label}
    </button>
  );
}
