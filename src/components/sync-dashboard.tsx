"use client";

import { useState, useEffect } from "react";
import { Cloud, CloudOff, RefreshCw, Calendar, Flame, Clock } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { HOURS, TOTAL_DAILY_PATERS } from "@/lib/prayers";

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
              {user ? "Cloud Sync Active" : "Local Only"}
            </span>
          </div>
          {user && (
            <button
              onClick={handleSync}
              disabled={syncing}
              className="flex items-center gap-1 text-xs text-franciscan hover:opacity-80 transition-opacity disabled:opacity-40"
            >
              <RefreshCw className={`w-3 h-3 ${syncing ? "animate-spin" : ""}`} />
              {syncing ? "Syncing..." : "Sync Now"}
            </button>
          )}
        </div>
        {user && (
          <p className="text-xs text-muted-foreground mt-1">
            Signed in as {user.email}
          </p>
        )}
        {!user && (
          <p className="text-xs text-muted-foreground mt-1">
            Sign in to sync your prayer data across devices
          </p>
        )}
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          icon={<Flame className="w-4 h-4 text-franciscan" />}
          label="Current Streak"
          value={`${streak} day${streak !== 1 ? "s" : ""}`}
        />
        <StatCard
          icon={<Calendar className="w-4 h-4 text-franciscan" />}
          label="Active Days (30d)"
          value={`${activeDays} of 30`}
        />
        <StatCard
          icon={<Clock className="w-4 h-4 text-franciscan" />}
          label="Hours Prayed (30d)"
          value={String(totalHours)}
        />
        <StatCard
          icon={<span className="text-franciscan text-xs font-bold">76</span>}
          label="Total Paters (30d)"
          value={totalPaters.toLocaleString()}
        />
      </div>

      {/* Perfect days */}
      {perfectDays > 0 && (
        <div className="bg-franciscan-light rounded-xl p-4 text-center">
          <p className="text-sm font-medium text-franciscan">
            {perfectDays} perfect day{perfectDays !== 1 ? "s" : ""} in the last 30 days
          </p>
          <p className="text-xs text-franciscan/70 mt-1">
            All 76 Paters completed — Deo Gratias!
          </p>
        </div>
      )}

      {/* 30-day heatmap */}
      <div className="bg-card rounded-xl border border-border p-4 space-y-2">
        <h4 className="text-sm font-medium text-foreground">Last 30 Days</h4>
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
          <span className="text-xs text-muted-foreground">Less</span>
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
          <span className="text-xs text-muted-foreground">More</span>
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
