// Web Audio API bell/chime synthesis — no external files needed

let audioCtx: AudioContext | null = null;

function getContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// --- Bell customization defaults & storage keys ---

export interface BellSettings {
  frequency: number;   // Hz (default 528)
  duration: number;    // seconds (default 2.5)
  interval: number;    // pacing seconds (default 30)
}

export const BELL_DEFAULTS: BellSettings = {
  frequency: 528,
  duration: 2.5,
  interval: 30,
};

export const BELL_FREQUENCY_RANGE = { min: 200, max: 900, step: 1 };
export const BELL_DURATION_RANGE = { min: 0.5, max: 5, step: 0.5 };
export const BELL_INTERVAL_RANGE = { min: 5, max: 120, step: 5 };

export function loadBellSettings(): BellSettings {
  if (typeof window === "undefined") return BELL_DEFAULTS;
  return {
    frequency: parseFloat(localStorage.getItem("fp_bell_frequency") || "") || BELL_DEFAULTS.frequency,
    duration: parseFloat(localStorage.getItem("fp_bell_duration") || "") || BELL_DEFAULTS.duration,
    interval: parseFloat(localStorage.getItem("fp_bell_interval") || "") || BELL_DEFAULTS.interval,
  };
}

export function saveBellSettings(s: BellSettings): void {
  localStorage.setItem("fp_bell_frequency", String(s.frequency));
  localStorage.setItem("fp_bell_duration", String(s.duration));
  localStorage.setItem("fp_bell_interval", String(s.interval));
}

/** Soft meditation bell — used for pacing timer ticks */
export function playBell(settings?: Partial<BellSettings>): void {
  try {
    const ctx = getContext();
    const now = ctx.currentTime;
    const s = { ...loadBellSettings(), ...settings };

    // Fundamental tone
    const osc1 = ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.value = s.frequency;

    // Overtone
    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.value = s.frequency * 2; // octave above

    // Envelope
    const gain1 = ctx.createGain();
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + s.duration);

    const gain2 = ctx.createGain();
    const overtoneDuration = Math.max(s.duration * 0.6, 0.3);
    gain2.gain.setValueAtTime(0.1, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + overtoneDuration);

    osc1.connect(gain1).connect(ctx.destination);
    osc2.connect(gain2).connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + s.duration);
    osc2.start(now);
    osc2.stop(now + overtoneDuration);
  } catch {
    // Audio not available
  }
}

/** Quick tap sound — used for prayer counter taps */
export function playTap(): void {
  try {
    const ctx = getContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = 800;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  } catch {
    // Audio not available
  }
}

/** Completion chime — triple ascending tone for finishing an hour */
export function playCompletionChime(): void {
  try {
    const ctx = getContext();
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;

      const gain = ctx.createGain();
      const start = now + i * 0.2;
      gain.gain.setValueAtTime(0.25, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 1.0);

      osc.connect(gain).connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 1.0);
    });
  } catch {
    // Audio not available
  }
}

/** Deep monastery bell — for daily completion */
export function playMonasteryBell(): void {
  try {
    const ctx = getContext();
    const now = ctx.currentTime;

    // Deep fundamental
    const osc1 = ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.value = 220; // A3

    // Mid overtone
    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.value = 440; // A4

    // High shimmer
    const osc3 = ctx.createOscillator();
    osc3.type = "sine";
    osc3.frequency.value = 880; // A5

    const gain1 = ctx.createGain();
    gain1.gain.setValueAtTime(0.35, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 4.0);

    const gain2 = ctx.createGain();
    gain2.gain.setValueAtTime(0.15, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 3.0);

    const gain3 = ctx.createGain();
    gain3.gain.setValueAtTime(0.05, now);
    gain3.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

    osc1.connect(gain1).connect(ctx.destination);
    osc2.connect(gain2).connect(ctx.destination);
    osc3.connect(gain3).connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 4.0);
    osc2.start(now);
    osc2.stop(now + 3.0);
    osc3.start(now);
    osc3.stop(now + 2.0);
  } catch {
    // Audio not available
  }
}
