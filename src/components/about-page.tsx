"use client";

import { ExternalLink } from "lucide-react";

export function AboutPage() {
  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="space-y-3">
        <p className="text-sm text-foreground/80 leading-relaxed">
          <strong>Franciscan Prayer</strong> helps you pray as a Franciscan every day,
          whether you are a friar, a sister, a secular Franciscan, or anyone drawn to the
          spirituality of St. Francis of Assisi.
        </p>
        <p className="text-sm text-foreground/80 leading-relaxed">
          This app offers two ways to pray the Liturgy of the Hours: the <strong>Original
          Pater Count</strong> (76 Our Fathers per day) for those who cannot recite the
          full Office, and links to the <strong>full Liturgy of the Hours</strong> on
          DivineOffice.org.
        </p>
      </div>

      {/* The Original Rule */}
      <div className="bg-card rounded-xl border border-border p-4 space-y-2">
        <h3 className="font-semibold text-foreground">The Original Pater Count</h3>
        <p className="text-sm text-foreground/80 leading-relaxed">
          Chapter III of the Rule of St. Francis (1223) prescribes that lay brothers
          who cannot read the Psalter should instead pray Our Fathers at each canonical
          hour. The exact distribution is:
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <span className="text-muted-foreground">Matins</span>
          <span className="font-medium text-foreground tabular-nums">24 Paters</span>
          <span className="text-muted-foreground">Lauds</span>
          <span className="font-medium text-foreground tabular-nums">5 Paters</span>
          <span className="text-muted-foreground">Prime</span>
          <span className="font-medium text-foreground tabular-nums">7 Paters</span>
          <span className="text-muted-foreground">Terce</span>
          <span className="font-medium text-foreground tabular-nums">7 Paters</span>
          <span className="text-muted-foreground">Sext</span>
          <span className="font-medium text-foreground tabular-nums">7 Paters</span>
          <span className="text-muted-foreground">None</span>
          <span className="font-medium text-foreground tabular-nums">7 Paters</span>
          <span className="text-muted-foreground">Vespers</span>
          <span className="font-medium text-foreground tabular-nums">12 Paters</span>
          <span className="text-muted-foreground">Compline</span>
          <span className="font-medium text-foreground tabular-nums">7 Paters</span>
          <span className="text-muted-foreground font-semibold border-t border-border pt-1">Daily Total</span>
          <span className="font-bold text-franciscan tabular-nums border-t border-border pt-1">76 Paters</span>
        </div>
      </div>

      {/* Prayer Modes */}
      <div className="bg-card rounded-xl border border-border p-4 space-y-2">
        <h3 className="font-semibold text-foreground">How to Use This App</h3>
        <div className="space-y-3 text-sm text-foreground/80 leading-relaxed">
          <div>
            <p className="font-medium text-foreground">Full Day (recommended)</p>
            <p>Pray each Hour at its canonical time throughout the day. The app suggests
            the next Hour based on the time of day and highlights it on the home screen.</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Busy Parent Mode</p>
            <p>Focus on Lauds (morning), Vespers (evening), and Compline (bedtime).
            These three are the most important Hours and take only a few minutes each.</p>
          </div>
          <div>
            <p className="font-medium text-foreground">If You Miss an Hour</p>
            <p>Simply continue with the next one. &ldquo;If you missed Terce, continue with
            Sext.&rdquo; There is no guilt in Franciscan prayer — only grace and joy in returning.</p>
          </div>
        </div>
      </div>

      {/* Franciscan Crown */}
      <div className="bg-card rounded-xl border border-border p-4 space-y-2">
        <h3 className="font-semibold text-foreground">The Franciscan Crown Rosary</h3>
        <p className="text-sm text-foreground/80 leading-relaxed">
          Also called the Seraphic Rosary, the Crown consists of 7 decades (not 5)
          honoring the Seven Joys of the Blessed Virgin Mary. It was revealed to a
          young Franciscan novice in 1422. The total is 72 Hail Marys — one for each
          year of Our Lady&apos;s earthly life according to tradition.
        </p>
      </div>

      {/* Stations */}
      <div className="bg-card rounded-xl border border-border p-4 space-y-2">
        <h3 className="font-semibold text-foreground">The Stations of the Cross</h3>
        <p className="text-sm text-foreground/80 leading-relaxed">
          The Stations are a Franciscan gift to the Church. As custodians of the Holy
          Land since 1217, the Franciscans created this devotion so that those who could
          not make a pilgrimage to Jerusalem could spiritually walk the Via Dolorosa.
          The 14 stations were formally established by Pope Clement XII in 1731 and
          entrusted to the Franciscan Order.
        </p>
      </div>

      {/* Content Sources */}
      <div className="bg-card rounded-xl border border-border p-4 space-y-2">
        <h3 className="font-semibold text-foreground">Sources &amp; Credits</h3>
        <div className="space-y-1 text-sm">
          <SourceLink label="Daily Mass Readings" href="https://bible.usccb.org" />
          <SourceLink label="Liturgy of the Hours" href="https://divineoffice.org" />
          <SourceLink label="Liturgical Calendar API" href="https://litcal.johnromanodorazio.com" />
          <SourceLink label="Rule of St. Francis (1223)" href="https://www.franciscanarchive.org/patriarcha/writings/opuscula/reg2.html" />
        </div>
      </div>

      {/* Pax et Bonum */}
      <div className="text-center py-4">
        <p className="text-lg font-semibold text-franciscan italic">
          Pax et Bonum
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Built with love for the greater glory of God
        </p>
        <p className="text-xs text-muted-foreground">
          Ad Maiorem Dei Gloriam
        </p>
      </div>
    </div>
  );
}

function SourceLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1 text-franciscan hover:underline"
    >
      <ExternalLink className="w-3 h-3" /> {label}
    </a>
  );
}
