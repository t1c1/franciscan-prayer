"use client";

import { ExternalLink } from "lucide-react";
import { HOURS, HOURS_I18N } from "@/lib/prayers";
import { useI18n } from "@/lib/i18n";
import { trackExternalLink } from "@/lib/analytics";

const DIVINE_OFFICE_BASE = "https://divineoffice.org";

const HOUR_LINKS: Record<string, string> = {
  matins: `${DIVINE_OFFICE_BASE}/office-of-readings`,
  lauds: `${DIVINE_OFFICE_BASE}/morning-prayer`,
  prime: `${DIVINE_OFFICE_BASE}/morning-prayer`,
  terce: `${DIVINE_OFFICE_BASE}/mid-morning-prayer`,
  sext: `${DIVINE_OFFICE_BASE}/midday-prayer`,
  none: `${DIVINE_OFFICE_BASE}/mid-afternoon-prayer`,
  vespers: `${DIVINE_OFFICE_BASE}/evening-prayer`,
  compline: `${DIVINE_OFFICE_BASE}/night-prayer`,
};

const UI: Record<string, { desc: string; credit: string }> = {
  en: { desc: "The full Liturgy of the Hours with psalms, readings, and hymns. Each link opens the corresponding hour on DivineOffice.org.", credit: "Full texts provided by DivineOffice.org" },
  es: { desc: "La Liturgia de las Horas completa con salmos, lecturas e himnos. Cada enlace abre la hora correspondiente en DivineOffice.org.", credit: "Textos completos proporcionados por DivineOffice.org" },
  it: { desc: "La Liturgia delle Ore completa con salmi, letture e inni. Ogni collegamento apre l'ora corrispondente su DivineOffice.org.", credit: "Testi completi forniti da DivineOffice.org" },
  fr: { desc: "La Liturgie des Heures complète avec psaumes, lectures et hymnes. Chaque lien ouvre l'heure correspondante sur DivineOffice.org.", credit: "Textes complets fournis par DivineOffice.org" },
  zh: { desc: "包含圣咏、读经和赞美诗的完整日课经。每个链接将在 DivineOffice.org 上打开相应的时辰祈祷。", credit: "完整经文由 DivineOffice.org 提供" },
};

export function DivineOfficeLinks() {
  const { locale } = useI18n();
  const u = UI[locale] || UI.en;
  const hourI18n = HOURS_I18N[locale] || HOURS_I18N.en;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{u.desc}</p>

      <div className="space-y-2">
        {HOURS.filter((hour) => HOUR_LINKS[hour.id]).map((hour) => {
          const h = hourI18n[hour.id];
          return (
            <a
              key={hour.id}
              href={HOUR_LINKS[hour.id]}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => { e.preventDefault(); trackExternalLink(`divineoffice-${hour.id}`); window.open(HOUR_LINKS[hour.id], "_blank", "noopener,noreferrer"); }}
              className="flex items-center justify-between bg-card rounded-lg border border-border p-3 hover:border-franciscan/40 transition-colors"
            >
              <div>
                <p className="font-medium text-sm text-foreground">
                  {h?.name || hour.name}
                  <span className="text-xs text-muted-foreground ml-2 font-normal italic">
                    {hour.latinName}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {h?.typicalTime || hour.typicalTime}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </a>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground text-center">{u.credit}</p>
    </div>
  );
}
