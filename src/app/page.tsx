"use client";

import { useState, useEffect } from "react";
import {
  Clock,
  BookOpen,
  HandHeart,
  Sun,
  Moon,
  ChevronRight,
  Check,
  Flame,
  Users,
  Scroll,
  Flower2,
  ExternalLink,
} from "lucide-react";
import { HOURS, TOTAL_DAILY_PATERS } from "@/lib/prayers";
import { getTodayUSCCBUrl, getLiturgicalInfo } from "@/lib/readings";
import { PrayerCounter } from "@/components/prayer-counter";
import { PrayerTextViewer } from "@/components/prayer-text-viewer";
import { CommunityFinder } from "@/components/community-finder";
import { DailyRule } from "@/components/daily-rule";
import { FranciscanCrown } from "@/components/franciscan-crown";
import { DivineOfficeLinks } from "@/components/divine-office-links";
import { AuthButton } from "@/components/auth-button";
import { cn } from "@/lib/utils";

type View =
  | "home"
  | "hours"
  | "prayers"
  | "crown"
  | "office"
  | "rule"
  | "community";

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
  const liturgy = getLiturgicalInfo();

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
    (h) =>
      !completedHours.includes(h.id) &&
      hourTimeMap[h.id] >= currentHourOfDay
  ) || HOURS.find((h) => !completedHours.includes(h.id));

  // Active hour prayer counter
  if (activeHourId) {
    const hour = HOURS.find((h) => h.id === activeHourId)!;
    return (
      <main className="min-h-screen bg-background">
        <PrayerCounter
          hour={hour}
          onComplete={() => {
            refreshCompletions();
            setActiveHourId(null);
          }}
          onBack={() => setActiveHourId(null)}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setView("home")} className="text-left">
              <h1 className="text-xl font-bold text-foreground tracking-tight">
                Franciscan Prayer
              </h1>
              <p className="text-xs text-muted-foreground">
                The Hours &middot; The Rule &middot; The Gospel
              </p>
            </button>
            <div className="flex items-center gap-2">
              <AuthButton />
              {streak > 0 && (
                <span className="flex items-center gap-1 text-xs font-medium text-franciscan bg-franciscan-light px-2 py-1 rounded-full">
                  <Flame className="w-3 h-3" /> {streak}d
                </span>
              )}
              <span
                className={cn(
                  "text-xs px-2 py-1 rounded-full font-medium",
                  liturgy.color === "green" &&
                    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                  liturgy.color === "purple" &&
                    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
                  liturgy.color === "white" &&
                    "bg-amber-50 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                )}
              >
                {liturgy.season}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Daily progress — always visible */}
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              Today&apos;s Progress
            </span>
            <span className="text-xs text-muted-foreground tabular-nums">
              {completedPaters} / {TOTAL_DAILY_PATERS} Paters
            </span>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-franciscan rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(
                  (completedPaters / TOTAL_DAILY_PATERS) * 100,
                  100
                )}%`,
              }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-muted-foreground">
              {completedHours.length} of {HOURS.length} Hours
            </span>
            {completedPaters >= TOTAL_DAILY_PATERS && (
              <span className="text-xs font-medium text-franciscan">
                Complete! Deo Gratias!
              </span>
            )}
          </div>
        </div>

        {/* === HOME VIEW === */}
        {view === "home" && (
          <div className="space-y-3">
            {/* Next hour quick action */}
            {nextHour && (
              <button
                onClick={() => setActiveHourId(nextHour.id)}
                className="w-full bg-franciscan text-franciscan-foreground rounded-xl p-5 text-left hover:opacity-90 transition-opacity active:scale-[0.98]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs opacity-80 uppercase tracking-wide">
                      Pray Now
                    </p>
                    <p className="text-lg font-bold mt-1">
                      {nextHour.name}
                      <span className="font-normal text-sm opacity-80 ml-2">
                        {nextHour.paterCount} Paters
                      </span>
                    </p>
                    <p className="text-xs opacity-70 mt-1">
                      {nextHour.typicalTime}
                    </p>
                  </div>
                  <ChevronRight className="w-6 h-6 opacity-60" />
                </div>
              </button>
            )}

            {/* Main navigation */}
            <div className="grid grid-cols-1 gap-3">
              <NavTile
                icon={<Clock className="w-5 h-5 text-franciscan" />}
                title="Pray the Hours"
                subtitle="Original Pater Count &middot; 76 per day"
                onClick={() => setView("hours")}
              />
              <NavTile
                icon={<Flower2 className="w-5 h-5 text-franciscan" />}
                title="Franciscan Crown Rosary"
                subtitle="7 Joys of Mary &middot; 72 Hail Marys"
                onClick={() => setView("crown")}
              />
              <NavTile
                icon={<BookOpen className="w-5 h-5 text-franciscan" />}
                title="Full Liturgy of the Hours"
                subtitle="Complete texts on DivineOffice.org"
                onClick={() => setView("office")}
              />
              <NavTile
                icon={<HandHeart className="w-5 h-5 text-franciscan" />}
                title="Prayers"
                subtitle="Pater Noster, Ave Maria, St. Francis &middot; 5 languages"
                onClick={() => setView("prayers")}
              />
              <NavTile
                icon={<Scroll className="w-5 h-5 text-franciscan" />}
                title="The Rule of St. Francis"
                subtitle="Daily reading from the Regula Bullata (1223)"
                onClick={() => setView("rule")}
              />
              <a
                href={getTodayUSCCBUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card rounded-xl border border-border p-4 text-left hover:border-franciscan/40 transition-colors flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-franciscan-light flex items-center justify-center">
                  <ExternalLink className="w-5 h-5 text-franciscan" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">
                    Daily Mass Readings
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Today&apos;s readings on USCCB
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </a>
              <NavTile
                icon={<Users className="w-5 h-5 text-franciscan" />}
                title="Franciscan Family"
                subtitle="Orders, communities &middot; Find your vocation"
                onClick={() => setView("community")}
              />
            </div>
          </div>
        )}

        {/* === HOURS VIEW === */}
        {view === "hours" && (
          <div className="space-y-3">
            <BackButton onClick={() => setView("home")} />
            <h2 className="text-lg font-semibold text-foreground">
              The Hours — Original Pater Rule
            </h2>
            <p className="text-sm text-muted-foreground">
              The original Franciscan practice: {TOTAL_DAILY_PATERS} Our
              Fathers per day, distributed across the eight canonical hours.
              From Chapter III of the Rule.
            </p>
            <div className="space-y-2">
              {HOURS.map((hour) => {
                const done = completedHours.includes(hour.id);
                const isDay = [
                  "lauds",
                  "prime",
                  "terce",
                  "sext",
                  "none",
                ].includes(hour.id);
                return (
                  <button
                    key={hour.id}
                    onClick={() => setActiveHourId(hour.id)}
                    className={cn(
                      "w-full bg-card rounded-lg border p-4 text-left transition-all flex items-center gap-3",
                      done
                        ? "border-franciscan/30 opacity-70"
                        : "border-border hover:border-franciscan/40"
                    )}
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-muted">
                      {done ? (
                        <Check className="w-4 h-4 text-franciscan" />
                      ) : isDay ? (
                        <Sun className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Moon className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p
                        className={cn(
                          "font-medium",
                          done && "line-through"
                        )}
                      >
                        {hour.name}
                        <span className="text-xs text-muted-foreground ml-2 font-normal italic">
                          {hour.latinName}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {hour.paterCount} Paters &middot; {hour.typicalTime}
                      </p>
                    </div>
                    {!done && (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* === CROWN ROSARY VIEW === */}
        {view === "crown" && (
          <div className="space-y-3">
            <BackButton onClick={() => setView("home")} />
            <h2 className="text-lg font-semibold text-foreground">
              Franciscan Crown Rosary
            </h2>
            <FranciscanCrown />
          </div>
        )}

        {/* === OFFICE VIEW === */}
        {view === "office" && (
          <div className="space-y-3">
            <BackButton onClick={() => setView("home")} />
            <h2 className="text-lg font-semibold text-foreground">
              Liturgy of the Hours
            </h2>
            <DivineOfficeLinks />
          </div>
        )}

        {/* === PRAYERS VIEW === */}
        {view === "prayers" && (
          <div className="space-y-3">
            <BackButton onClick={() => setView("home")} />
            <h2 className="text-lg font-semibold text-foreground">
              Prayers
            </h2>
            <PrayerTextViewer />
          </div>
        )}

        {/* === RULE VIEW === */}
        {view === "rule" && (
          <div className="space-y-3">
            <BackButton onClick={() => setView("home")} />
            <h2 className="text-lg font-semibold text-foreground">
              The Rule of St. Francis
            </h2>
            <DailyRule />
          </div>
        )}

        {/* === COMMUNITY VIEW === */}
        {view === "community" && (
          <div className="space-y-3">
            <BackButton onClick={() => setView("home")} />
            <h2 className="text-lg font-semibold text-foreground">
              The Franciscan Family
            </h2>
            <p className="text-sm text-muted-foreground">
              The Franciscan movement spans 800+ years and includes friars,
              sisters, contemplatives, and lay people across the world.
            </p>
            <CommunityFinder />
          </div>
        )}

        {/* Footer */}
        <footer className="text-center pt-8 pb-4">
          <p className="text-xs text-muted-foreground italic">
            Pax et Bonum
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Ad Maiorem Dei Gloriam
          </p>
        </footer>
      </div>
    </main>
  );
}

function NavTile({
  icon,
  title,
  subtitle,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-card rounded-xl border border-border p-4 text-left hover:border-franciscan/40 transition-colors flex items-center gap-4"
    >
      <div className="w-10 h-10 rounded-lg bg-franciscan-light flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
    </button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      &larr; Home
    </button>
  );
}
