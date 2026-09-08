import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Still({
  src,
  p,
  alt,
  className,
}: {
  src: string;
  p: number;
  alt: string;
  className?: string;
}) {
  const scale = 1.05 + p * 0.07;
  const x = -1.6 + p * 3.2;
  return (
    <img
      src={src}
      alt={alt}
      className={cn("film-still", className)}
      style={{ transform: `scale(${scale}) translate3d(${x}%, 0, 0)` }}
    />
  );
}

export function BgVideo({
  src,
  play,
  opacity = 1,
}: {
  src: string;
  play: boolean;
  opacity?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (play) {
      const run = v.play();
      if (run) run.catch(() => {});
    } else {
      v.pause();
    }
  }, [play]);
  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="auto"
      className="film-still"
      style={{ opacity }}
    />
  );
}

export function Wash({ amount = 0.42, className }: { amount?: number; className?: string }) {
  return (
    <div
      className={cn("film-wash", className)}
      style={{ background: `color-mix(in oklab, var(--color-ink) ${amount * 100}%, transparent)` }}
    />
  );
}

export function Grain() {
  return <div className="film-grain" aria-hidden />;
}

export function Vignette() {
  return <div className="film-vignette" aria-hidden />;
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <rect x="9" y="7" width="14" height="18" rx="3" fill="var(--color-ivory)" />
      <rect x="12" y="14.5" width="8" height="7" rx="1.6" fill="currentColor" />
    </svg>
  );
}

export function Appear({
  p,
  from = 0,
  span = 0.18,
  children,
  className,
  dy = 18,
}: {
  p: number;
  from?: number;
  span?: number;
  children: ReactNode;
  className?: string;
  dy?: number;
}) {
  const t = 1 - Math.pow(1 - Math.max(0, Math.min(1, (p - from) / span)), 3);
  const style: CSSProperties = {
    opacity: t,
    transform: `translate3d(0, ${(1 - t) * dy}px, 0)`,
  };
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
