import { Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { playCue, unlockAudio } from "@/lib/film/audio";
import {
  activeScene,
  captionAt,
  crossed,
  CUES,
  DURATION,
  formatTime,
  SCENES,
  useFilmClock,
} from "@/lib/film/engine";
import { Button } from "@/components/ui/button";
import { LogoMark } from "./visuals";
import { CloseScene, DetectScene, GapScene, OpenScene, PingScene, YesScene } from "./scenes";

export function FilmPlayer() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const prevT = useRef(0);
  const { t, seek, tRef } = useFilmClock(DURATION, playing);
  const caption = captionAt(t);
  const scene = activeScene(t);
  const barRef = useRef<HTMLDivElement>(null);
  const mutedRef = useRef(muted);
  mutedRef.current = muted;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) setPlaying(true);
  }, []);

  useEffect(() => {
    if (muted || !playing) {
      prevT.current = t;
      return;
    }
    for (const cue of CUES) {
      if (crossed(prevT.current, t, cue.at)) playCue(cue.kind);
    }
    prevT.current = t;
  }, [t, muted, playing]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.code === "Space") {
        e.preventDefault();
        setPlaying((p) => !p);
      } else if (e.code === "ArrowRight") {
        seek(tRef.current + 2);
      } else if (e.code === "ArrowLeft") {
        seek(tRef.current - 2);
      } else if (e.code === "KeyM") {
        const next = !mutedRef.current;
        setMuted(next);
        if (!next) void unlockAudio();
      } else if (e.code === "Digit0") {
        seek(0);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [seek, tRef]);

  async function toggleMute(next: boolean) {
    setMuted(next);
    if (!next) await unlockAudio();
  }

  function seekFromBar(clientX: number) {
    const el = barRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const u = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
    seek(u * DURATION);
  }

  const capA = caption ? caption.enter * caption.exit : 0;

  return (
    <section
      className="film-shell"
      role="region"
      aria-label="Lumen motion film"
      onClick={() => setPlaying((p) => !p)}
    >
      <div className="film-frame">
        <OpenScene t={t} playing={playing} />
        <GapScene t={t} />
        <DetectScene t={t} playing={playing} />
        <PingScene t={t} />
        <YesScene t={t} />
        <CloseScene t={t} />

        <div className="film-top" onClick={(e) => e.stopPropagation()}>
          <div className="film-wordmark" style={{ opacity: t > 5.6 ? 1 : 0 }}>
            <LogoMark className="size-6 text-ivory" />
            <span>Lumen</span>
          </div>
          <p className="film-scene-label">{scene.label}</p>
        </div>

        <div className="film-bottom" onClick={(e) => e.stopPropagation()}>
          {caption ? (
            <div
              className="film-caption"
              style={{
                opacity: capA,
                transform: `translateY(${(1 - caption.enter) * 12}px)`,
              }}
            >
              <p>{caption.kicker}</p>
              <h2>{caption.line}</h2>
            </div>
          ) : (
            <div className="film-caption" />
          )}

          <div className="film-controls">
            <Button
              variant="ghost"
              size="icon"
              aria-label={playing ? "Pause" : "Play"}
              onClick={() => setPlaying((p) => !p)}
            >
              {playing ? (
                <Pause className="size-5" strokeWidth={1.8} />
              ) : (
                <Play className="size-5 translate-x-px" strokeWidth={1.8} />
              )}
            </Button>
            <span className="film-time tabular-nums">
              {formatTime(t)}
              <i>/</i>
              {formatTime(DURATION)}
            </span>
            <div
              ref={barRef}
              className="film-bar"
              role="slider"
              aria-label="Film position"
              aria-valuemin={0}
              aria-valuemax={DURATION}
              aria-valuenow={Math.round(t)}
              tabIndex={0}
              onPointerDown={(e) => {
                (e.target as HTMLElement).setPointerCapture(e.pointerId);
                seekFromBar(e.clientX);
              }}
              onPointerMove={(e) => {
                if (e.buttons) seekFromBar(e.clientX);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") seek(t + 1);
                if (e.key === "ArrowLeft") seek(t - 1);
              }}
            >
              <i style={{ width: `${(t / DURATION) * 100}%` }} />
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label={muted ? "Unmute" : "Mute"}
              onClick={() => void toggleMute(!muted)}
            >
              {muted ? (
                <VolumeX className="size-5" strokeWidth={1.8} />
              ) : (
                <Volume2 className="size-5" strokeWidth={1.8} />
              )}
            </Button>
            <Button variant="ghost" size="icon" aria-label="Restart" onClick={() => seek(0)}>
              <RotateCcw className="size-5" strokeWidth={1.8} />
            </Button>
          </div>

          <ol className="film-chapters">
            {SCENES.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  className={s.id === scene.id ? "on" : undefined}
                  onClick={() => {
                    seek(s.start + 0.05);
                    setPlaying(true);
                  }}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <p className="sr-only">{caption?.line ?? "Lumen dental confirmation film"}</p>
    </section>
  );
}
