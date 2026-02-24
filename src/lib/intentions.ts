export interface Intention {
  id: string;
  text: string;
  createdAt: string;
  hourId?: string; // Optional: attach to a specific Hour
}

const STORAGE_KEY = "fp_intentions";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

export function getIntentions(): Intention[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

export function addIntention(text: string, hourId?: string): Intention {
  const intentions = getIntentions();
  const intention: Intention = {
    id: generateId(),
    text,
    createdAt: new Date().toISOString(),
    hourId,
  };
  intentions.unshift(intention);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(intentions));
  return intention;
}

export function removeIntention(id: string): void {
  const intentions = getIntentions().filter((i) => i.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(intentions));
}

export function getIntentionsForHour(hourId: string): Intention[] {
  return getIntentions().filter((i) => !i.hourId || i.hourId === hourId);
}
