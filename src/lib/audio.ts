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

/** Soft meditation bell — used for pacing timer ticks */
export function playBell(): void {
  try {
    const ctx = getContext();
    const now = ctx.currentTime;

    // Fundamental tone
    const osc1 = ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.value = 528; // C5 — solfeggio frequency

    // Overtone
    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.value = 1056; // octave above

    // Envelope
    const gain1 = ctx.createGain();
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

    const gain2 = ctx.createGain();
    gain2.gain.setValueAtTime(0.1, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

    osc1.connect(gain1).connect(ctx.destination);
    osc2.connect(gain2).connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 2.5);
    osc2.start(now);
    osc2.stop(now + 1.5);
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
