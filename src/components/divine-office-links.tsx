"use client";

import { ExternalLink } from "lucide-react";
import { HOURS } from "@/lib/prayers";

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

export function DivineOfficeLinks() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        The full Liturgy of the Hours with psalms, readings, and hymns.
        Each link opens the corresponding hour on DivineOffice.org.
      </p>

      <div className="space-y-2">
        {HOURS.map((hour) => (
          <a
            key={hour.id}
            href={HOUR_LINKS[hour.id]}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-card rounded-lg border border-border p-3 hover:border-franciscan/40 transition-colors"
          >
            <div>
              <p className="font-medium text-sm text-foreground">
                {hour.name}
                <span className="text-xs text-muted-foreground ml-2 font-normal italic">
                  {hour.latinName}
                </span>
              </p>
              <p className="text-xs text-muted-foreground">
                {hour.typicalTime}
              </p>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </a>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Full texts provided by DivineOffice.org
      </p>
    </div>
  );
}
