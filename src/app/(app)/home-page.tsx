"use client";

import Link from "next/link";
import {
  Clock, BookOpen, HandHeart, ChevronRight,
  Users, Scroll, Flower2, ExternalLink, Cross, Calendar, Settings,
  Heart, Info, BarChart3,
} from "lucide-react";
import { HOURS_I18N } from "@/lib/prayers";
import { getTodayUSCCBUrl } from "@/lib/readings";
import { getDailyQuote, QUOTES_I18N } from "@/lib/franciscan-quotes";
import { usePrayerProgress, getNextHour } from "@/lib/use-prayer-progress";
import { LiturgicalBanner } from "@/components/liturgical-banner";
import { SaintsOfTheDay } from "@/components/saints-of-the-day";
import { NavTile } from "@/components/nav-tile";
import { getTodayFeast, CALENDAR_I18N } from "@/lib/franciscan-calendar";
import { useI18n } from "@/lib/i18n";
import { trackHourStarted, trackExaminationStarted } from "@/lib/analytics";

export default function HomePage() {
  const { completedHours } = usePrayerProgress();
  const { locale, t } = useI18n();
  const todayFeast = getTodayFeast();

  const enQuote = getDailyQuote();
  const localizedQuotes = locale !== "en" && QUOTES_I18N[locale];
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const dailyQuote = localizedQuotes ? localizedQuotes[dayOfYear % localizedQuotes.length] : enQuote;

  const hourI18n = HOURS_I18N[locale] || HOURS_I18N.en;
  const nextHour = getNextHour(completedHours);
  const getHourName = (id: string) => hourI18n[id]?.name || id;
  const getHourTime = (id: string) => hourI18n[id]?.typicalTime || "";

  return (
    <div className="space-y-3">
      <LiturgicalBanner />
      <SaintsOfTheDay />
      {todayFeast && (() => {
        const fKey = `${String(todayFeast.month).padStart(2, "0")}-${String(todayFeast.day).padStart(2, "0")}`;
        const fi = (locale !== "en" && CALENDAR_I18N?.[locale]?.[fKey]) || { name: todayFeast.name, description: todayFeast.description };
        return (
          <Link href="/calendar" className="block w-full bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-left hover:opacity-90 transition-opacity">
            <p className="text-xs text-amber-700 dark:text-amber-400 uppercase tracking-wide font-medium">{t("home.feast_today")}</p>
            <p className="text-sm font-semibold text-foreground mt-1">{fi.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{fi.description}</p>
          </Link>
        );
      })()}
      <div className="bg-card rounded-xl border border-border p-4">
        <p className="text-sm text-foreground/80 italic leading-relaxed">&ldquo;{dailyQuote.text}&rdquo;</p>
        <p className="text-xs text-muted-foreground mt-2">— {dailyQuote.author}{dailyQuote.source && <span className="italic">, {dailyQuote.source}</span>}</p>
      </div>
      {nextHour && (
        <Link
          href={nextHour.id === "compline" && !completedHours.includes("compline") ? "/hours/compline" : `/hours/${nextHour.id}`}
          onClick={() => { if (nextHour.id === "compline" && !completedHours.includes("compline")) { trackExaminationStarted(); } else { trackHourStarted(nextHour.id); } }}
          className="block w-full bg-franciscan text-franciscan-foreground rounded-xl p-5 text-left hover:opacity-90 transition-opacity active:scale-[0.98]"
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
        </Link>
      )}
      <div className="grid grid-cols-1 gap-3">
        <NavTile icon={<Clock className="w-5 h-5 text-franciscan" />} title={t("nav.hours")} subtitle={t("nav.hours_sub")} href="/hours" />
        <NavTile icon={<Flower2 className="w-5 h-5 text-franciscan" />} title={t("nav.crown")} subtitle={t("nav.crown_sub")} href="/crown" />
        <NavTile icon={<BookOpen className="w-5 h-5 text-franciscan" />} title={t("nav.office")} subtitle={t("nav.office_sub")} href="/office" />
        <NavTile icon={<Cross className="w-5 h-5 text-franciscan" />} title={t("nav.stations")} subtitle={t("nav.stations_sub")} href="/stations" />
        <NavTile icon={<HandHeart className="w-5 h-5 text-franciscan" />} title={t("nav.prayers")} subtitle={t("nav.prayers_sub")} href="/prayers" />
        <NavTile icon={<Scroll className="w-5 h-5 text-franciscan" />} title={t("nav.rule")} subtitle={t("nav.rule_sub")} href="/rule" />
        <NavTile icon={<Calendar className="w-5 h-5 text-franciscan" />} title={t("nav.calendar")} subtitle={`42 ${t("nav.calendar_sub")}`} href="/calendar" />
        <a href={getTodayUSCCBUrl()} target="_blank" rel="noopener noreferrer" className="bg-card rounded-xl border border-border p-4 text-left hover:border-franciscan/40 transition-colors flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-franciscan-light flex items-center justify-center"><ExternalLink className="w-5 h-5 text-franciscan" /></div>
          <div className="flex-1">
            <p className="font-semibold text-foreground">{t("nav.readings")}</p>
            <p className="text-xs text-muted-foreground">{t("nav.readings_sub")}</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </a>
        <NavTile icon={<Users className="w-5 h-5 text-franciscan" />} title={t("nav.community")} subtitle={t("nav.community_sub")} href="/community" />
        <NavTile icon={<Heart className="w-5 h-5 text-franciscan" />} title={t("nav.intentions")} subtitle={t("nav.intentions_sub")} href="/intentions" />
        <NavTile icon={<BarChart3 className="w-5 h-5 text-franciscan" />} title={t("nav.dashboard")} subtitle={t("nav.dashboard_sub")} href="/dashboard" />
        <NavTile icon={<Settings className="w-5 h-5 text-franciscan" />} title={t("nav.settings")} subtitle={t("nav.settings_sub")} href="/settings" />
        <NavTile icon={<Info className="w-5 h-5 text-franciscan" />} title={t("nav.about")} subtitle={t("nav.about_sub")} href="/about" />
      </div>
    </div>
  );
}
