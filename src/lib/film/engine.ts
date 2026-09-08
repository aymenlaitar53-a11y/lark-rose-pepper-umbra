import { useCallback, useEffect, useRef, useState } from "react";

export const DURATION = 50;

export const SCENES = [
  { id: "open", label: "Open", start: 0, end: 5.8 },
  { id: "gap", label: "The gap", start: 5.8, end: 13.6 },
  { id: "detect", label: "Detect", start: 13.6, end: 21.8 },
  { id: "ping", label: "Ping", start: 21.8, end: 35.2 },
  { id: "yes", label: "Confirm", start: 35.2, end: 42.8 },
  { id: "close", label: "Filled", start: 42.8, end: 50 },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

export const CAPTIONS: { start: number; end: number; kicker: string; line: string }[] = [
  { start: 0.6, end: 5.4, kicker: "Dental confirmation", line: "Empty slots, filled in seconds." },
  { start: 6.2, end: 13.1, kicker: "Tuesday · 2:30 PM", line: "A last-minute cancellation." },
  { start: 14.0, end: 21.3, kicker: "Lumen sees the gap", line: "The empty chair never waits." },
  { start: 22.4, end: 28.8, kicker: "SMS · WhatsApp", line: "The waitlist is written, instantly." },
  { start: 29.2, end: 34.8, kicker: "Maya Chen", line: "One reply holds the chair." },
  { start: 35.6, end: 42.2, kicker: "Confirmed", line: "Booked before the hour turns." },
  { start: 43.2, end: 49.4, kicker: "Lumen", line: "Confirm. Fill. Repeat." },
];

export const CUES = [
  { at: 1.05, kind: "open" },
  { at: 8.6, kind: "cancel" },
  { at: 16.2, kind: "detect" },
  { at: 24.4, kind: "send" },
  { at: 31.4, kind: "reply" },
  { at: 37.4, kind: "book" },
  { at: 44.2, kind: "close" },
] as const;

export function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export function remap(t: number, a: number, b: number) {
  if (b === a) return t >= b ? 1 : 0;
  return clamp01((t - a) / (b - a));
}

export function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

export function easeInCubic(t: number) {
  return t * t * t;
}

export function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

export function smoothstep(a: number, b: number, t: number) {
  const x = remap(t, a, b);
  return x * x * (3 - 2 * x);
}

export function local(t: number, start: number, end: number) {
  return remap(t, start, end);
}

export function sceneOpacity(t: number, start: number, end: number, fade = 0.65) {
  if (t < start - fade || t > end + fade) return 0;
  if (t < start) return smoothstep(start - fade, start, t);
  if (t > end) return 1 - smoothstep(end, end + fade, t);
  return 1;
}

export function fadeUp(p: number, inn = 0.06, hold = 0.84) {
  const enter = easeOutCubic(remap(p, inn, inn + 0.16));
  const exit = 1 - easeInCubic(remap(p, hold, 1));
  const a = enter * exit;
  return {
    opacity: a,
    transform: `translateY(${(1 - enter) * 18}px)`,
  };
}

export function typewriter(text: string, p: number, start: number, end: number) {
  const u = remap(p, start, end);
  const n = Math.round(u * text.length);
  return { text: text.slice(0, n), done: u >= 1, caret: u > 0 && u < 1 };
}

export function captionAt(t: number) {
  for (let i = CAPTIONS.length - 1; i >= 0; i--) {
    const c = CAPTIONS[i];
    if (t >= c.start && t <= c.end) {
      const p = remap(t, c.start, c.end);
      return { ...c, enter: smoothstep(0, 0.18, p), exit: 1 - smoothstep(0.86, 1, p) };
    }
  }
  return null;
}

export function activeScene(t: number) {
  for (const s of SCENES) {
    if (t >= s.start && t < s.end) return s;
  }
  return SCENES[SCENES.length - 1];
}

export function formatTime(t: number) {
  const s = Math.max(0, Math.min(DURATION, t));
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
}

export function useFilmClock(duration: number, playing: boolean) {
  const [t, setT] = useState(0);
  const tRef = useRef(0);
  const last = useRef(0);

  useEffect(() => {
    if (!playing) {
      last.current = 0;
      return;
    }
    last.current = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      const prev = last.current || now;
      const dt = Math.min(0.05, (now - prev) / 1000);
      last.current = now;
      tRef.current = (tRef.current + dt) % duration;
      setT(tRef.current);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing, duration]);

  const seek = useCallback((next: number) => {
    const wrapped = ((next % duration) + duration) % duration;
    tRef.current = wrapped;
    setT(wrapped);
  }, [duration]);

  return { t, seek, tRef };
}

export function crossed(prev: number, next: number, mark: number) {
  if (next < prev) return next >= mark || prev < mark;
  return prev < mark && next >= mark;
}
