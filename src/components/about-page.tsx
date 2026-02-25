"use client";

import { ExternalLink, RotateCcw } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { ABOUT_I18N } from "@/lib/about-i18n";
import { ListenButton } from "@/components/listen-button";

type AboutCopy = (typeof ABOUT_I18N)["es"];

const EN_ABOUT: AboutCopy = {
  intro1:
    "Franciscan Prayer helps you pray as a Franciscan every day, whether you are a friar, a sister, a secular Franciscan, or anyone drawn to the spirituality of St. Francis of Assisi.",
  intro2:
    "This app offers two ways to pray the Liturgy of the Hours: the Original Pater Count (76 Our Fathers per day) for those who cannot recite the full Office, and links to the full Liturgy of the Hours on DivineOffice.org.",
  paterTitle: "The Original Pater Count",
  paterDesc:
    "Chapter III of the Rule of St. Francis (1223) prescribes that lay brothers who cannot read the Psalter should instead pray Our Fathers at each canonical hour. The exact distribution is:",
  howTitle: "How to Use This App",
  howFullDay: "Full Day (recommended)",
  howFullDayDesc:
    "Pray each Hour at its canonical time throughout the day. The app suggests the next Hour based on the time of day and highlights it on the home screen.",
  howBusy: "Busy Parent Mode",
  howBusyDesc:
    "Focus on Lauds (morning), Vespers (evening), and Compline (bedtime). These three are the most important Hours and take only a few minutes each.",
  howMissed: "If You Miss an Hour",
  howMissedDesc:
    "Simply continue with the next one. If you missed Terce, continue with Sext. There is no guilt in Franciscan prayer, only grace and joy in returning.",
  crownTitle: "The Franciscan Crown Rosary",
  crownDesc:
    "Also called the Seraphic Rosary, the Crown consists of 7 decades (not 5) honoring the Seven Joys of the Blessed Virgin Mary. It was revealed to a young Franciscan novice in 1422. The total is 72 Hail Marys, one for each year of Our Lady's earthly life according to tradition.",
  stationsTitle: "The Stations of the Cross",
  stationsDesc:
    "The Stations are a Franciscan gift to the Church. As custodians of the Holy Land since 1217, the Franciscans created this devotion so that those who could not make a pilgrimage to Jerusalem could spiritually walk the Via Dolorosa. The 14 stations were formally established by Pope Clement XII in 1731 and entrusted to the Franciscan Order.",
  sourcesTitle: "Sources & Credits",
  paxFooter: "Pax et Bonum",
  builtWith: "Built with love for the greater glory of God",
};

function getDailyTotalLabel(locale: string): string {
  if (locale === "es") return "Total Diario";
  if (locale === "it") return "Totale Giornaliero";
  if (locale === "fr") return "Total Quotidien";
  if (locale === "zh") return "每日总计";
  return "Daily Total";
}

export function AboutPage() {
  const { locale } = useI18n();
  const i = locale !== "en" ? ABOUT_I18N[locale as keyof typeof ABOUT_I18N] : EN_ABOUT;
  const dailyTotalLabel = getDailyTotalLabel(locale);

  const handleReplayOnboarding = () => {
    localStorage.removeItem("fp_onboarding_done");
    window.location.reload();
  };

  const aboutNarration = [
    i.intro1,
    i.intro2,
    `${i.paterTitle}. ${i.paterDesc}`,
    `${dailyTotalLabel}: 76 Paters.`,
    `${i.howTitle}. ${i.howFullDay}: ${i.howFullDayDesc}`,
    `${i.howBusy}: ${i.howBusyDesc}`,
    `${i.howMissed}: ${i.howMissedDesc}`,
    `${i.crownTitle}. ${i.crownDesc}`,
    `${i.stationsTitle}. ${i.stationsDesc}`,
    i.sourcesTitle,
    i.paxFooter,
    i.builtWith,
  ]
    .filter(Boolean)
    .join("\n\n");

  return (
    <div className="space-y-6">
      <ListenButton
        text={aboutNarration}
        locale={locale}
        audioSrc={`/audio/about/${locale}/full.mp3`}
      />

      {/* Intro */}
      <div className="space-y-3">
        <p className="text-sm text-foreground/80 leading-relaxed">{i.intro1}</p>
        <p className="text-sm text-foreground/80 leading-relaxed">{i.intro2}</p>
      </div>

      {/* The Original Rule */}
      <div className="bg-card rounded-xl border border-border p-4 space-y-2">
        <h3 className="font-semibold text-foreground">{i.paterTitle}</h3>
        <p className="text-sm text-foreground/80 leading-relaxed">{i.paterDesc}</p>
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
          <span className="text-muted-foreground font-semibold border-t border-border pt-1">
            {dailyTotalLabel}
          </span>
          <span className="font-bold text-franciscan tabular-nums border-t border-border pt-1">76 Paters</span>
        </div>
      </div>

      {/* Prayer Modes */}
      <div className="bg-card rounded-xl border border-border p-4 space-y-2">
        <h3 className="font-semibold text-foreground">{i.howTitle}</h3>
        <div className="space-y-3 text-sm text-foreground/80 leading-relaxed">
          <div>
            <p className="font-medium text-foreground">{i.howFullDay}</p>
            <p>{i.howFullDayDesc}</p>
          </div>
          <div>
            <p className="font-medium text-foreground">{i.howBusy}</p>
            <p>{i.howBusyDesc}</p>
          </div>
          <div>
            <p className="font-medium text-foreground">{i.howMissed}</p>
            <p>{i.howMissedDesc}</p>
          </div>
        </div>
      </div>

      {/* Franciscan Crown */}
      <div className="bg-card rounded-xl border border-border p-4 space-y-2">
        <h3 className="font-semibold text-foreground">{i.crownTitle}</h3>
        <p className="text-sm text-foreground/80 leading-relaxed">{i.crownDesc}</p>
      </div>

      {/* Stations */}
      <div className="bg-card rounded-xl border border-border p-4 space-y-2">
        <h3 className="font-semibold text-foreground">{i.stationsTitle}</h3>
        <p className="text-sm text-foreground/80 leading-relaxed">{i.stationsDesc}</p>
      </div>

      {/* Content Sources */}
      <div className="bg-card rounded-xl border border-border p-4 space-y-2">
        <h3 className="font-semibold text-foreground">{i.sourcesTitle}</h3>
        <div className="space-y-1 text-sm">
          <SourceLink label="Daily Mass Readings" href="https://bible.usccb.org" />
          <SourceLink label="Liturgy of the Hours" href="https://divineoffice.org" />
          <SourceLink label="Liturgical Calendar API" href="https://litcal.johnromanodorazio.com" />
          <SourceLink label="Rule of St. Francis (1223)" href="https://www.franciscanarchive.org/patriarcha/writings/opuscula/reg2.html" />
        </div>
      </div>

      {/* Replay Onboarding */}
      <div className="bg-card rounded-xl border border-border p-4">
        <button
          onClick={handleReplayOnboarding}
          className="w-full flex items-center justify-center gap-2 text-franciscan hover:opacity-80 transition-opacity text-sm font-medium"
        >
          <RotateCcw className="w-4 h-4" />
          {locale === "zh" ? "重新播放介绍" : locale === "es" ? "Reproducir Introducción" : locale === "it" ? "Riproduci Introduzione" : locale === "fr" ? "Revoir l'Introduction" : "Replay Introduction"}
        </button>
      </div>

      {/* Pax et Bonum */}
      <div className="text-center py-4">
        <p className="text-lg font-semibold text-franciscan italic">{i.paxFooter}</p>
        <p className="text-xs text-muted-foreground mt-2">{i.builtWith}</p>
        <p className="text-xs text-muted-foreground">Ad Maiorem Dei Gloriam</p>
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
      onClick={(e) => { e.preventDefault(); window.open(href, "_blank", "noopener,noreferrer"); }}
      className="flex items-center gap-1 text-franciscan hover:underline"
    >
      <ExternalLink className="w-3 h-3" /> {label}
    </a>
  );
}
