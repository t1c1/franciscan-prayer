export function getTodayUSCCBUrl(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const year = String(now.getFullYear()).slice(-2);
  return `https://bible.usccb.org/bible/readings/${month}${day}${year}.cfm`;
}

export function getLiturgicalInfo(): { season: string; color: string } {
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDate();

  // Simplified liturgical season detection
  // Advent: ~Dec 1 - Dec 24
  if (month === 11 && day < 25) return { season: "Advent", color: "purple" };
  // Christmas: Dec 25 - Jan 6ish
  if ((month === 11 && day >= 25) || (month === 0 && day <= 6))
    return { season: "Christmas", color: "white" };
  // Lent: ~Feb/Mar (simplified — 46 days before Easter)
  if (month >= 1 && month <= 3) {
    // Very rough Lent approximation
    const easter = getEasterDate(now.getFullYear());
    const lentStart = new Date(easter);
    lentStart.setDate(lentStart.getDate() - 46);
    if (now >= lentStart && now < easter)
      return { season: "Lent", color: "purple" };
    // Easter to Pentecost (50 days)
    const pentecost = new Date(easter);
    pentecost.setDate(pentecost.getDate() + 49);
    if (now >= easter && now <= pentecost)
      return { season: "Easter", color: "white" };
  }
  if (month >= 3 && month <= 5) {
    const easter = getEasterDate(now.getFullYear());
    const pentecost = new Date(easter);
    pentecost.setDate(pentecost.getDate() + 49);
    if (now >= easter && now <= pentecost)
      return { season: "Easter", color: "white" };
  }

  return { season: "Ordinary Time", color: "green" };
}

function getEasterDate(year: number): Date {
  // Anonymous Gregorian algorithm
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month, day);
}
