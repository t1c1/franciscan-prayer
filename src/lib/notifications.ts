import { getLocalDateString } from "./utils";

const HOUR_SCHEDULES: Record<string, { hour: number; minute: number; label: string }> = {
  lauds: { hour: 6, minute: 30, label: "Lauds — Morning Prayer" },
  terce: { hour: 9, minute: 0, label: "Terce — Mid-Morning Prayer" },
  sext: { hour: 12, minute: 0, label: "Sext — Midday Prayer (Angelus)" },
  none: { hour: 15, minute: 0, label: "None — Mid-Afternoon Prayer" },
  vespers: { hour: 18, minute: 0, label: "Vespers — Evening Prayer" },
  compline: { hour: 21, minute: 0, label: "Compline — Night Prayer" },
};

const STORAGE_KEY = "fp_notifications_enabled";
const TIMERS_KEY = "fp_notification_timers";

export function isNotificationSupported(): boolean {
  return typeof window !== "undefined" && "Notification" in window;
}

export function isNotificationEnabled(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEY) === "true";
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (!isNotificationSupported()) return false;
  const permission = await Notification.requestPermission();
  const granted = permission === "granted";
  localStorage.setItem(STORAGE_KEY, String(granted));
  if (granted) scheduleAllReminders();
  return granted;
}

export function disableNotifications(): void {
  localStorage.setItem(STORAGE_KEY, "false");
  clearAllTimers();
}

function clearAllTimers(): void {
  const timers = JSON.parse(localStorage.getItem(TIMERS_KEY) || "[]") as number[];
  timers.forEach((id) => clearTimeout(id));
  localStorage.setItem(TIMERS_KEY, "[]");
}

export function scheduleAllReminders(): void {
  if (!isNotificationEnabled()) return;
  if (Notification.permission !== "granted") return;

  clearAllTimers();
  const now = new Date();
  const timerIds: number[] = [];

  for (const [hourId, schedule] of Object.entries(HOUR_SCHEDULES)) {
    const target = new Date();
    target.setHours(schedule.hour, schedule.minute, 0, 0);

    const delay = target.getTime() - now.getTime();
    if (delay < 0) continue; // Already past this hour today

    // Check if this hour is already completed
    const dateStr = getLocalDateString(now);
    const completions = JSON.parse(
      localStorage.getItem(`fp_completions_${dateStr}`) || "[]"
    );
    if (completions.includes(hourId)) continue;

    const id = window.setTimeout(() => {
      new Notification("Franciscan Prayer", {
        body: schedule.label,
        icon: "/favicon.svg",
        tag: `hour-${hourId}`,
      });
    }, delay);

    timerIds.push(id);
  }

  localStorage.setItem(TIMERS_KEY, JSON.stringify(timerIds));
}
