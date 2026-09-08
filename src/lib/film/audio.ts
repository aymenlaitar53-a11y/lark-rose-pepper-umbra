type CueKind = "open" | "cancel" | "detect" | "send" | "reply" | "book" | "close";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;

function audio() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.7;
    master.connect(ctx.destination);
  }
  return ctx;
}

function tone(freq: number, when: number, dur: number, gain: number, type: OscillatorType = "sine") {
  const c = audio();
  if (!c || !master) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.setValueAtTime(0, when);
  g.gain.linearRampToValueAtTime(gain, when + 0.018);
  g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
  o.connect(g).connect(master);
  o.start(when);
  o.stop(when + dur + 0.02);
}

export async function unlockAudio() {
  const c = audio();
  if (c && c.state === "suspended") await c.resume();
}

export function playCue(kind: CueKind) {
  const c = audio();
  if (!c || !master) return;
  const t = c.currentTime;
  switch (kind) {
    case "open":
      tone(392, t, 0.9, 0.045);
      tone(588, t + 0.08, 0.8, 0.03);
      break;
    case "cancel":
      tone(349.23, t, 0.45, 0.04);
      tone(311.13, t + 0.12, 0.55, 0.035);
      break;
    case "detect":
      tone(523.25, t, 0.35, 0.04);
      tone(659.25, t + 0.14, 0.4, 0.035);
      break;
    case "send":
      tone(698.46, t, 0.22, 0.05, "triangle");
      tone(880, t + 0.09, 0.28, 0.03);
      break;
    case "reply":
      tone(659.25, t, 0.2, 0.045, "triangle");
      break;
    case "book":
      tone(523.25, t, 0.7, 0.04);
      tone(659.25, t + 0.04, 0.7, 0.035);
      tone(783.99, t + 0.08, 0.85, 0.04);
      break;
    case "close":
      tone(392, t, 1.1, 0.04);
      tone(493.88, t + 0.06, 1.0, 0.03);
      tone(587.33, t + 0.12, 1.2, 0.035);
      break;
  }
}
