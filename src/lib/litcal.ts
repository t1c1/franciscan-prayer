// John Romano D'Orazio Liturgical Calendar API
// https://litcal.johnromanodorazio.com

const LITCAL_BASE = "https://litcal.johnromanodorazio.com/api/v5/calendar/nation/US";

export interface LitCalEvent {
  event_key: string;
  name: string;
  color: string[];
  grade: number;
  grade_lcl: string;
  date: string; // ISO 8601 string e.g. "2026-02-24T00:00:00+00:00"
  liturgical_season?: string;
  readings?: {
    first_reading?: string;
    responsorial_psalm?: string;
    second_reading?: string;
    gospel?: string;
  };
  holy_day_of_obligation?: boolean;
}

export interface LitCalDay {
  name: string;
  color: string;
  season: string;
  grade: string;
  readings: {
    first_reading?: string;
    psalm?: string;
    second_reading?: string;
    gospel?: string;
  } | null;
  isHolyDay: boolean;
}

const CACHE_KEY = "fp_litcal_cache";
const CACHE_TTL = 12 * 60 * 60 * 1000; // 12 hours

function mapColor(colors: string[]): string {
  if (!colors || colors.length === 0) return "green";
  const c = colors[0].toLowerCase();
  if (c.includes("purple") || c.includes("violet")) return "purple";
  if (c.includes("white") || c.includes("gold")) return "white";
  if (c.includes("red")) return "red";
  if (c.includes("rose") || c.includes("pink")) return "rose";
  if (c.includes("black")) return "black";
  return "green";
}

function formatSeason(raw: string): string {
  // "ADVENT" → "Advent", "ORDINARY_TIME" → "Ordinary Time"
  return raw.toLowerCase().replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

function parseEventDate(date: string | number): string {
  if (typeof date === "number") {
    return new Date(date * 1000).toISOString().split("T")[0];
  }
  // ISO string — extract date portion
  return date.split("T")[0];
}

export async function fetchTodayLiturgical(): Promise<LitCalDay | null> {
  // Check cache first
  if (typeof window !== "undefined") {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp, dateStr } = JSON.parse(cached);
        const today = new Date().toISOString().split("T")[0];
        if (dateStr === today && Date.now() - timestamp < CACHE_TTL) {
          return data;
        }
      }
    } catch {
      // ignore cache errors
    }
  }

  try {
    const year = new Date().getFullYear();
    const res = await fetch(`${LITCAL_BASE}/${year}?locale=en_US`, {
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;

    const json = await res.json();

    // v5 API returns litcal as an array of events
    const raw = json.litcal || json.LitCal || [];
    const events: LitCalEvent[] = Array.isArray(raw) ? raw : Object.values(raw);

    // Find today's highest-grade event
    const today = new Date().toISOString().split("T")[0];
    let bestEvent: LitCalEvent | null = null;
    let bestGrade = -1;

    for (const event of events) {
      if (parseEventDate(event.date) === today && event.grade > bestGrade) {
        bestEvent = event;
        bestGrade = event.grade;
      }
    }

    if (!bestEvent) return null;

    const result: LitCalDay = {
      name: bestEvent.name,
      color: mapColor(bestEvent.color),
      season: formatSeason(bestEvent.liturgical_season || ""),
      grade: bestEvent.grade_lcl || "",
      readings: bestEvent.readings
        ? {
            first_reading: bestEvent.readings.first_reading,
            psalm: bestEvent.readings.responsorial_psalm,
            second_reading: bestEvent.readings.second_reading,
            gospel: bestEvent.readings.gospel,
          }
        : null,
      isHolyDay: bestEvent.holy_day_of_obligation || false,
    };

    // Cache
    if (typeof window !== "undefined") {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ data: result, timestamp: Date.now(), dateStr: today })
      );
    }

    return result;
  } catch {
    return null;
  }
}
