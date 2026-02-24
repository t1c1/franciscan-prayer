"use client";

import { useState, useEffect } from "react";
import { Cloud, CloudOff, RefreshCw, Calendar, Flame, Clock } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useI18n } from "@/lib/i18n";
import { HOURS, TOTAL_DAILY_PATERS } from "@/lib/prayers";
import { getEarnedAchievements, getNextAchievement } from "@/lib/achievements";

interface DayStats {
  date: string;
  hoursCompleted: number;
  patersTotal: number;
}

function getLocalStats(days: number): DayStats[] {
  const stats: DayStats[] = [];
  const d = new Date();
  for (let i = 0; i < days; i++) {
    const dateStr = d.toISOString().split("T")[0];
    const completions: string[] = JSON.parse(
      localStorage.getItem(`fp_completions_${dateStr}`) || "[]"
    );
    const paters = completions.reduce((sum, id) => {
      const hour = HOURS.find((h) => h.id === id);
      return sum + (hour?.paterCount || 0);
    }, 0);
    stats.push({
      date: dateStr,
      hoursCompleted: completions.length,
      patersTotal: paters,
    });
    d.setDate(d.getDate() - 1);
  }
  return stats;
}

function getStreak(stats: DayStats[]): number {
  let streak = 0;
  for (let i = 0; i < stats.length; i++) {
    if (stats[i].hoursCompleted === 0 && i > 0) break;
    if (stats[i].hoursCompleted > 0) streak++;
  }
  return streak;
}

export function SyncDashboard() {
  const { user, syncToCloud } = useAuth();
  const { locale, t } = useI18n();
  const [stats, setStats] = useState<DayStats[]>([]);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    setStats(getLocalStats(30));
  }, []);

  const streak = getStreak(stats);
  const totalPaters = stats.reduce((s, d) => s + d.patersTotal, 0);
  const totalHours = stats.reduce((s, d) => s + d.hoursCompleted, 0);
  const activeDays = stats.filter((d) => d.hoursCompleted > 0).length;
  const perfectDays = stats.filter((d) => d.patersTotal >= TOTAL_DAILY_PATERS).length;

  const handleSync = async () => {
    setSyncing(true);
    await syncToCloud();
    setStats(getLocalStats(30)); // Refresh after pull-from-cloud restores data
    setSyncing(false);
  };

  return (
    <div className="space-y-4">
      {/* Sync status */}
      <div className="bg-card rounded-xl border border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {user ? (
              <Cloud className="w-4 h-4 text-franciscan" />
            ) : (
              <CloudOff className="w-4 h-4 text-muted-foreground" />
            )}
            <span className="text-sm font-medium text-foreground">
              {user ? t("dashboard.cloud_active") : t("dashboard.local_only")}
            </span>
          </div>
          {user && (
            <button
              onClick={handleSync}
              disabled={syncing}
              className="flex items-center gap-1 text-xs text-franciscan hover:opacity-80 transition-opacity disabled:opacity-40"
            >
              <RefreshCw className={`w-3 h-3 ${syncing ? "animate-spin" : ""}`} />
              {syncing ? t("dashboard.syncing") : t("dashboard.sync_now")}
            </button>
          )}
        </div>
        {user && (
          <p className="text-xs text-muted-foreground mt-1">
            {t("dashboard.signed_in")} {user.email}
          </p>
        )}
        {!user && (
          <p className="text-xs text-muted-foreground mt-1">
            {t("dashboard.sign_in_prompt")}
          </p>
        )}
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          icon={<Flame className="w-4 h-4 text-franciscan" />}
          label={t("dashboard.streak")}
          value={`${streak.toLocaleString(locale)} ${t("dashboard.days")}`}
        />
        <StatCard
          icon={<Calendar className="w-4 h-4 text-franciscan" />}
          label={t("dashboard.active_days")}
          value={`${activeDays.toLocaleString(locale)} ${t("dashboard.of_30")}`}
        />
        <StatCard
          icon={<Clock className="w-4 h-4 text-franciscan" />}
          label={t("dashboard.hours_prayed")}
          value={totalHours.toLocaleString(locale)}
        />
        <StatCard
          icon={<span className="text-franciscan text-xs font-bold">76</span>}
          label={t("dashboard.total_paters")}
          value={totalPaters.toLocaleString(locale)}
        />
      </div>

      {/* Perfect days */}
      {perfectDays > 0 && (
        <div className="bg-franciscan-light rounded-xl p-4 text-center">
          <p className="text-sm font-medium text-franciscan">
            {perfectDays.toLocaleString(locale)} {t("dashboard.perfect_days")}
          </p>
          <p className="text-xs text-franciscan/70 mt-1">
            {t("dashboard.perfect_note")}
          </p>
        </div>
      )}

      {/* Achievements */}
      {(() => {
        const earned = getEarnedAchievements(streak, perfectDays);
        const next = getNextAchievement(streak, perfectDays);
        if (earned.length === 0 && !next) return null;
        return (
          <div className="bg-card rounded-xl border border-border p-4 space-y-3">
            <h4 className="text-sm font-medium text-foreground">
              {locale === "zh" ? "成就" : locale === "es" ? "Logros" : locale === "it" ? "Traguardi" : locale === "fr" ? "Réalisations" : "Achievements"}
            </h4>
            {earned.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {earned.map((a) => {
                  const l = a.labels[locale] || a.labels.en;
                  return (
                    <div key={a.id} className="flex items-center gap-1.5 bg-franciscan-light rounded-full px-3 py-1.5" title={l.description}>
                      <span className="text-base">{a.icon}</span>
                      <span className="text-xs font-medium text-franciscan">{l.name}</span>
                    </div>
                  );
                })}
              </div>
            )}
            {next && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="text-base opacity-40">{next.icon}</span>
                <span>
                  {(next.labels[locale] || next.labels.en).name} — {next.type === "streak" ? `${next.threshold - streak} ${t("dashboard.days")}` : `${next.threshold - perfectDays}`} {locale === "zh" ? "天后解锁" : locale === "es" ? "más" : locale === "it" ? "ancora" : locale === "fr" ? "de plus" : "to go"}
                </span>
              </div>
            )}
          </div>
        );
      })()}

      {/* 30-day heatmap */}
      <div className="bg-card rounded-xl border border-border p-4 space-y-2">
        <h4 className="text-sm font-medium text-foreground">{t("dashboard.last_30")}</h4>
        <div className="grid grid-cols-10 gap-1">
          {stats.slice().reverse().map((day) => {
            const intensity = day.patersTotal / TOTAL_DAILY_PATERS;
            return (
              <div
                key={day.date}
                title={`${day.date}: ${day.hoursCompleted} hours, ${day.patersTotal} paters`}
                className="w-full aspect-square rounded-sm transition-colors"
                style={{
                  backgroundColor:
                    intensity === 0
                      ? "var(--color-muted)"
                      : `oklch(0.55 0.12 55 / ${Math.min(intensity, 1)})`,
                }}
              />
            );
          })}
        </div>
        <div className="flex items-center justify-end gap-1 mt-1">
          <span className="text-xs text-muted-foreground">{t("dashboard.less")}</span>
          {[0, 0.25, 0.5, 0.75, 1].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-sm"
              style={{
                backgroundColor:
                  i === 0
                    ? "var(--color-muted)"
                    : `oklch(0.55 0.12 55 / ${i})`,
              }}
            />
          ))}
          <span className="text-xs text-muted-foreground">{t("dashboard.more")}</span>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-card rounded-xl border border-border p-3">
      <div className="flex items-center gap-1.5 mb-1">
        {icon}
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <p className="text-lg font-bold text-foreground tabular-nums">{value}</p>
    </div>
  );
}
