"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Loader2, Play, Square } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type ListenLocale = "latin" | "en" | "es" | "it" | "fr" | "zh";

type PlaybackStatus = "idle" | "loading" | "playing" | "error";

type SharedPlayback = {
  audio: HTMLAudioElement | null;
  ownerId: string | null;
};

const sharedPlayback: SharedPlayback = {
  audio: null,
  ownerId: null,
};

const ownerListeners = new Set<(ownerId: string | null) => void>();


function notifyOwnerChange(ownerId: string | null) {
  ownerListeners.forEach((listener) => listener(ownerId));
}

let activeSpeech: SpeechSynthesisUtterance | null = null;

function stopSharedPlayback() {
  if (activeSpeech) {
    window.speechSynthesis.cancel();
    activeSpeech = null;
  }
  if (!sharedPlayback.audio) {
    sharedPlayback.ownerId = null;
    notifyOwnerChange(null);
    return;
  }
  sharedPlayback.audio.pause();
  sharedPlayback.audio.currentTime = 0;
  sharedPlayback.audio = null;
  sharedPlayback.ownerId = null;
  notifyOwnerChange(null);
}

const SPEECH_LANGS: Record<string, string> = {
  en: "en-US", es: "es-ES", it: "it-IT", fr: "fr-FR", zh: "zh-CN", latin: "la",
};

interface ListenButtonProps {
  text: string;
  locale?: ListenLocale;
  audioSrc?: string;
  className?: string;
}

export function ListenButton({ text, locale = "en", audioSrc, className }: ListenButtonProps) {
  const { t } = useI18n();
  const ownerId = useRef(`listen_${Math.random().toString(36).slice(2)}`);
  const [status, setStatus] = useState<PlaybackStatus>("idle");

  const normalizedText = useMemo(
    () => text.replace(/\s+/g, " ").trim(),
    [text]
  );

  useEffect(() => {
    const currentOwnerId = ownerId.current;
    const listener = (activeOwnerId: string | null) => {
      if (activeOwnerId !== currentOwnerId) {
        setStatus((current) => (current === "playing" || current === "loading" ? "idle" : current));
      }
    };
    ownerListeners.add(listener);

    return () => {
      ownerListeners.delete(listener);
      if (sharedPlayback.ownerId === currentOwnerId) {
        stopSharedPlayback();
      }
    };
  }, []);

  const playUrl = async (url: string) => {
    stopSharedPlayback();

    const audio = new Audio(url);
    audio.preload = "auto";
    audio.onended = () => {
      if (sharedPlayback.ownerId === ownerId.current) {
        sharedPlayback.audio = null;
        sharedPlayback.ownerId = null;
        setStatus("idle");
        notifyOwnerChange(null);
      }
    };
    audio.onerror = () => {
      if (sharedPlayback.ownerId === ownerId.current) {
        sharedPlayback.audio = null;
        sharedPlayback.ownerId = null;
        setStatus("error");
        notifyOwnerChange(null);
      }
    };

    sharedPlayback.audio = audio;
    sharedPlayback.ownerId = ownerId.current;
    notifyOwnerChange(ownerId.current);

    await audio.play();
    setStatus("playing");
  };

  const handlePlay = async () => {
    if (!normalizedText && !audioSrc) return;

    if (status === "playing" && sharedPlayback.ownerId === ownerId.current) {
      stopSharedPlayback();
      setStatus("idle");
      return;
    }

    if (status === "loading") return;

    try {
      setStatus("loading");

      if (audioSrc) {
        try {
          await playUrl(audioSrc);
          return;
        } catch (error) {
          console.warn(`Static audio unavailable for ${audioSrc}, falling back to TTS`, error);
        }
      }

      // Fall back to browser speech synthesis
      if ("speechSynthesis" in window) {
        stopSharedPlayback();
        const utterance = new SpeechSynthesisUtterance(normalizedText);
        utterance.lang = SPEECH_LANGS[locale] || "en-US";
        utterance.rate = 0.9;
        activeSpeech = utterance;
        sharedPlayback.ownerId = ownerId.current;
        notifyOwnerChange(ownerId.current);
        utterance.onend = () => {
          activeSpeech = null;
          sharedPlayback.ownerId = null;
          setStatus("idle");
          notifyOwnerChange(null);
        };
        utterance.onerror = () => {
          activeSpeech = null;
          sharedPlayback.ownerId = null;
          setStatus("error");
          notifyOwnerChange(null);
        };
        window.speechSynthesis.speak(utterance);
        setStatus("playing");
        return;
      }

      throw new Error("No audio available");
    } catch (error) {
      console.error("Listen playback failed", error);
      setStatus("error");
    }
  };

  const label =
    status === "loading"
      ? t("audio.loading")
      : status === "playing"
        ? t("audio.stop")
        : t("audio.listen");

  return (
    <button
      type="button"
      onClick={handlePlay}
      disabled={!normalizedText || status === "loading"}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
        status === "playing"
          ? "bg-franciscan text-franciscan-foreground"
          : "bg-muted text-muted-foreground hover:text-foreground hover:bg-accent",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      aria-label={label}
      title={label}
    >
      {status === "loading" ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : status === "playing" ? (
        <Square className="h-3.5 w-3.5" />
      ) : (
        <Play className="h-3.5 w-3.5" />
      )}
      <span>{label}</span>
    </button>
  );
}
