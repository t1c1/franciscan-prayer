// Streak achievements and prayer milestones

export interface Achievement {
  id: string;
  icon: string;
  threshold: number;
  type: "streak" | "total_hours" | "total_paters" | "perfect_days";
  labels: Record<string, { name: string; description: string }>;
}

export const ACHIEVEMENTS: Achievement[] = [
  // Streak milestones
  {
    id: "streak_3",
    icon: "🕯️",
    threshold: 3,
    type: "streak",
    labels: {
      en: { name: "First Flame", description: "3-day prayer streak" },
      es: { name: "Primera Llama", description: "3 días de oración consecutivos" },
      it: { name: "Prima Fiamma", description: "3 giorni consecutivi di preghiera" },
      fr: { name: "Première Flamme", description: "3 jours de prière consécutifs" },
      zh: { name: "初燃", description: "连续祈祷3天" },
    },
  },
  {
    id: "streak_7",
    icon: "🔥",
    threshold: 7,
    type: "streak",
    labels: {
      en: { name: "Week of Prayer", description: "7-day prayer streak" },
      es: { name: "Semana de Oración", description: "7 días de oración consecutivos" },
      it: { name: "Settimana di Preghiera", description: "7 giorni consecutivi" },
      fr: { name: "Semaine de Prière", description: "7 jours consécutifs" },
      zh: { name: "祈祷之周", description: "连续祈祷7天" },
    },
  },
  {
    id: "streak_30",
    icon: "⭐",
    threshold: 30,
    type: "streak",
    labels: {
      en: { name: "Faithful Servant", description: "30-day prayer streak" },
      es: { name: "Siervo Fiel", description: "30 días de oración consecutivos" },
      it: { name: "Servo Fedele", description: "30 giorni consecutivi" },
      fr: { name: "Serviteur Fidèle", description: "30 jours consécutifs" },
      zh: { name: "忠仆", description: "连续祈祷30天" },
    },
  },
  {
    id: "streak_100",
    icon: "✝️",
    threshold: 100,
    type: "streak",
    labels: {
      en: { name: "Follower of Francis", description: "100-day prayer streak" },
      es: { name: "Seguidor de Francisco", description: "100 días consecutivos" },
      it: { name: "Seguace di Francesco", description: "100 giorni consecutivi" },
      fr: { name: "Disciple de François", description: "100 jours consécutifs" },
      zh: { name: "方济追随者", description: "连续祈祷100天" },
    },
  },
  {
    id: "streak_365",
    icon: "👑",
    threshold: 365,
    type: "streak",
    labels: {
      en: { name: "Crown of Perseverance", description: "365-day prayer streak — a full year!" },
      es: { name: "Corona de Perseverancia", description: "365 días — ¡un año completo!" },
      it: { name: "Corona di Perseveranza", description: "365 giorni — un anno intero!" },
      fr: { name: "Couronne de Persévérance", description: "365 jours — une année complète !" },
      zh: { name: "坚忍之冠", description: "连续祈祷365天——整整一年！" },
    },
  },
  // Perfect day milestones
  {
    id: "perfect_1",
    icon: "🏅",
    threshold: 1,
    type: "perfect_days",
    labels: {
      en: { name: "First Perfect Day", description: "Completed all 76 Paters in one day" },
      es: { name: "Primer Día Perfecto", description: "76 Padrenuestros completados en un día" },
      it: { name: "Primo Giorno Perfetto", description: "76 Pater completati in un giorno" },
      fr: { name: "Premier Jour Parfait", description: "76 Pater complétés en un jour" },
      zh: { name: "首个完美日", description: "一天内完成全部76遍天主经" },
    },
  },
  {
    id: "perfect_7",
    icon: "🌟",
    threshold: 7,
    type: "perfect_days",
    labels: {
      en: { name: "Perfect Week", description: "7 perfect days (all 76 Paters)" },
      es: { name: "Semana Perfecta", description: "7 días perfectos" },
      it: { name: "Settimana Perfetta", description: "7 giorni perfetti" },
      fr: { name: "Semaine Parfaite", description: "7 jours parfaits" },
      zh: { name: "完美之周", description: "7个完美日" },
    },
  },
];

export function getEarnedAchievements(streak: number, perfectDays: number): Achievement[] {
  return ACHIEVEMENTS.filter((a) => {
    if (a.type === "streak") return streak >= a.threshold;
    if (a.type === "perfect_days") return perfectDays >= a.threshold;
    return false;
  });
}

export function getNextAchievement(streak: number, perfectDays: number): Achievement | null {
  const streakNext = ACHIEVEMENTS.find(
    (a) => a.type === "streak" && streak < a.threshold
  );
  const perfectNext = ACHIEVEMENTS.find(
    (a) => a.type === "perfect_days" && perfectDays < a.threshold
  );
  if (!streakNext) return perfectNext || null;
  if (!perfectNext) return streakNext;
  // Return whichever is closer
  const streakDist = streakNext.threshold - streak;
  const perfectDist = perfectNext.threshold - perfectDays;
  return streakDist <= perfectDist ? streakNext : perfectNext;
}
