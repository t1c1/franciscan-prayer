"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Cross, RotateCcw, Check } from "lucide-react";
import { STATIONS, STATIONS_PRAYERS, STATIONS_I18N } from "@/lib/stations";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type StationsView = "intro" | "praying" | "complete";

const UI: Record<string, Record<string, string>> = {
  en: {
    intro: "The Stations of the Cross is a Franciscan devotion. The Franciscans, as custodians of the Holy Land, popularized this meditation on Christ\u2019s Passion. Walk with Jesus from His condemnation to His burial through 14 stations of prayer.",
    begin: "Begin the Way of the Cross",
    complete: "Way of the Cross Complete",
    station: "Station",
    of: "of",
    scripture: "Scripture",
    meditation: "Meditation",
    previous: "Previous",
    next: "Next",
    finish: "Finish",
    startOver: "Start Over",
    prayInstruction: "Pray 1 Our Father, 1 Hail Mary, 1 Glory Be",
  },
  es: {
    intro: "El Viacrucis es una devoción franciscana. Los franciscanos, como custodios de Tierra Santa, popularizaron esta meditación sobre la Pasión de Cristo. Camina con Jesús desde su condena hasta su sepultura a través de 14 estaciones de oración.",
    begin: "Comenzar el Viacrucis",
    complete: "Viacrucis Completado",
    station: "Estación",
    of: "de",
    scripture: "Escritura",
    meditation: "Meditación",
    previous: "Anterior",
    next: "Siguiente",
    finish: "Terminar",
    startOver: "Comenzar de nuevo",
    prayInstruction: "Reza 1 Padrenuestro, 1 Avemaría, 1 Gloria",
  },
  it: {
    intro: "La Via Crucis è una devozione francescana. I francescani, come custodi della Terra Santa, hanno diffuso questa meditazione sulla Passione di Cristo. Cammina con Gesù dalla sua condanna alla sua sepoltura attraverso 14 stazioni di preghiera.",
    begin: "Inizia la Via Crucis",
    complete: "Via Crucis Completata",
    station: "Stazione",
    of: "di",
    scripture: "Scrittura",
    meditation: "Meditazione",
    previous: "Precedente",
    next: "Avanti",
    finish: "Fine",
    startOver: "Ricomincia",
    prayInstruction: "Prega 1 Padre Nostro, 1 Ave Maria, 1 Gloria",
  },
  fr: {
    intro: "Le Chemin de Croix est une dévotion franciscaine. Les franciscains, en tant que gardiens de la Terre Sainte, ont popularisé cette méditation sur la Passion du Christ. Marchez avec Jésus de sa condamnation à sa mise au tombeau à travers 14 stations de prière.",
    begin: "Commencer le Chemin de Croix",
    complete: "Chemin de Croix Terminé",
    station: "Station",
    of: "de",
    scripture: "Écriture",
    meditation: "Méditation",
    previous: "Précédent",
    next: "Suivant",
    finish: "Terminer",
    startOver: "Recommencer",
    prayInstruction: "Priez 1 Notre Père, 1 Je vous salue Marie, 1 Gloire au Père",
  },
  zh: {
    intro: "苦路是方济各敬礼。方济各会士作为圣地的守护者，推广了这一默想基督苦难的祈祷方式。与耶稣同行，从被判刑到安葬，经过14处苦路祈祷。",
    begin: "开始苦路",
    complete: "苦路完成",
    station: "第",
    of: "/",
    scripture: "圣经",
    meditation: "默想",
    previous: "上一处",
    next: "下一处",
    finish: "完成",
    startOver: "重新开始",
    prayInstruction: "诵念天主经一遍、圣母经一遍、圣三光荣颂一遍",
  },
};

// Chinese uses "第X处" format instead of "Station X"
function stationLabel(locale: string, num: number) {
  if (locale === "zh") return `第${num}处`;
  const u = UI[locale] || UI.en;
  return `${u.station} ${num}`;
}

function stationOfLabel(locale: string, num: number, total: number) {
  if (locale === "zh") return `第${num}处 / ${total}处`;
  const u = UI[locale] || UI.en;
  return `${u.station} ${num} ${u.of} ${total}`;
}

export function StationsOfTheCross() {
  const { locale } = useI18n();
  const [view, setView] = useState<StationsView>("intro");
  const [current, setCurrent] = useState(0);
  const u = UI[locale] || UI.en;
  const i18nStations = locale !== "en" && STATIONS_I18N[locale] ? STATIONS_I18N[locale] : null;

  if (view === "intro") {
    return (
      <div className="space-y-4">
        <p className="text-sm text-foreground/80 leading-relaxed">
          {u.intro}
        </p>

        <div className="bg-franciscan-light rounded-lg p-4 text-center">
          <p className="text-sm text-foreground/80 italic whitespace-pre-line">
            {STATIONS_PRAYERS.opening}
          </p>
          <p className="text-xs text-muted-foreground mt-2 italic whitespace-pre-line">
            {STATIONS_PRAYERS.openingLatin}
          </p>
        </div>

        <div className="space-y-2">
          {STATIONS.map((s, i) => (
            <div key={s.number} className="bg-card rounded-lg border border-border p-3">
              <p className="text-xs text-franciscan font-medium">
                {stationLabel(locale, s.number)}
              </p>
              <p className="text-sm font-medium text-foreground">
                {i18nStations ? i18nStations[i].title : s.title}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={() => { setView("praying"); setCurrent(0); }}
          className="w-full bg-franciscan text-franciscan-foreground rounded-xl p-4 font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <Cross className="w-4 h-4" /> {u.begin}
        </button>
      </div>
    );
  }

  if (view === "complete") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6 px-4">
        <div className="w-20 h-20 rounded-full bg-franciscan text-franciscan-foreground flex items-center justify-center">
          <Check className="w-10 h-10" />
        </div>
        <div className="text-center max-w-sm">
          <h3 className="text-xl font-bold text-foreground">{u.complete}</h3>
          <p className="text-sm text-foreground/80 mt-3 leading-relaxed">
            {STATIONS_PRAYERS.closing}
          </p>
        </div>
        <button
          onClick={() => { setView("intro"); setCurrent(0); }}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <RotateCcw className="w-3 h-3" /> {u.startOver}
        </button>
      </div>
    );
  }

  const station = STATIONS[current];
  const i18nStation = i18nStations ? i18nStations[current] : null;

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex gap-1">
        {STATIONS.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              i <= current ? "bg-franciscan" : "bg-muted"
            )}
          />
        ))}
      </div>

      {/* Station content */}
      <div className="bg-card rounded-xl border border-border p-5 space-y-4">
        <div className="text-center">
          <p className="text-xs text-franciscan font-medium uppercase tracking-wide">
            {stationOfLabel(locale, station.number, 14)}
          </p>
          <h3 className="text-lg font-bold text-foreground mt-1">
            {i18nStation ? i18nStation.title : station.title}
          </h3>
          <p className="text-xs text-muted-foreground italic mt-1">{station.titleLatin}</p>
        </div>

        <div className="bg-franciscan-light rounded-lg p-3 text-center">
          <p className="text-xs text-foreground/70 italic">{STATIONS_PRAYERS.opening}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">{u.scripture}</p>
          <p className="text-sm text-foreground/80 italic leading-relaxed">
            {i18nStation ? i18nStation.scripture : station.scripture}
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">{u.meditation}</p>
          <p className="text-sm text-foreground/80 leading-relaxed">
            {i18nStation ? i18nStation.meditation : station.meditation}
          </p>
        </div>

        <div className="bg-muted rounded-lg p-3 text-center">
          <p className="text-sm text-foreground/80 italic">{STATIONS_PRAYERS.stationResponse}</p>
          <p className="text-xs text-muted-foreground italic mt-1">{STATIONS_PRAYERS.stationResponseLatin}</p>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          {u.prayInstruction}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0}
          className={cn(
            "flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg transition-colors",
            current === 0
              ? "text-muted-foreground opacity-40"
              : "text-foreground hover:bg-accent"
          )}
        >
          <ChevronLeft className="w-4 h-4" /> {u.previous}
        </button>

        <span className="text-xs text-muted-foreground tabular-nums">
          {current + 1} / 14
        </span>

        {current < 13 ? (
          <button
            onClick={() => setCurrent(current + 1)}
            className="flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg bg-franciscan text-franciscan-foreground hover:opacity-90 transition-opacity"
          >
            {u.next} <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => setView("complete")}
            className="flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg bg-franciscan text-franciscan-foreground hover:opacity-90 transition-opacity"
          >
            {u.finish} <Check className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
