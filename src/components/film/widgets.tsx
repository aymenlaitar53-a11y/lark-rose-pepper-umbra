import type { ReactNode } from "react";
import { Check, MessageSquare, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { clamp01, easeInOutCubic, easeOutCubic, mix, remap, typewriter } from "@/lib/film/engine";

const MSG =
  "Hi Maya — a 2:30 PM opening just appeared at Clementine Dental. Reply YES to take the slot.";

export function DeviceFrame({
  channel,
  children,
  p,
  className,
}: {
  channel: "sms" | "whatsapp";
  children: ReactNode;
  p: number;
  className?: string;
}) {
  const show = easeOutCubic(clamp01(p));
  return (
    <div
      className={cn("film-device", className)}
      style={{
        opacity: show,
        transform: `translate3d(0, ${(1 - show) * 24}px, 0) scale(${0.97 + 0.03 * show})`,
      }}
    >
      <div className="film-device-bezel">
        <div className="film-device-notch" />
        <header className={cn("film-device-head", channel)}>
          <span className="film-device-channel">
            {channel === "whatsapp" ? (
              <MessageSquare className="size-3.5" strokeWidth={2} />
            ) : (
              <Smartphone className="size-3.5" strokeWidth={2} />
            )}
            {channel === "whatsapp" ? "WhatsApp" : "SMS"}
          </span>
          <strong>Clementine Dental</strong>
          <em>online</em>
        </header>
        <div className="film-device-body">{children}</div>
      </div>
    </div>
  );
}

export function ChatTranscript({ p }: { p: number }) {
  const typed = typewriter(MSG, p, 0.16, 0.46);
  const delivered = remap(p, 0.46, 0.54);
  const typing = remap(p, 0.58, 0.7);
  const reply = remap(p, 0.7, 0.8);
  const booked = remap(p, 0.84, 0.94);

  return (
    <div className="film-chat">
      <div className="film-bubble out">
        <p>
          {typed.text}
          {typed.caret ? <span className="film-caret" /> : null}
        </p>
        {delivered > 0.2 ? (
          <span className="film-meta" style={{ opacity: delivered }}>
            Delivered · 2:31 PM
          </span>
        ) : null}
      </div>

      {typing > 0 && reply < 0.15 ? (
        <div className="film-bubble in typing" style={{ opacity: Math.min(1, typing * 3) }}>
          <span />
          <span />
          <span />
        </div>
      ) : null}

      {reply > 0 ? (
        <div
          className="film-bubble in"
          style={{
            opacity: easeOutCubic(reply),
            transform: `translateY(${(1 - easeOutCubic(reply)) * 10}px)`,
          }}
        >
          <p>YES</p>
        </div>
      ) : null}

      {booked > 0 ? (
        <div className="film-system" style={{ opacity: easeOutCubic(booked) }}>
          <Check className="size-3.5" strokeWidth={2.2} />
          You're booked. See you Tuesday at 2:30.
        </div>
      ) : null}
    </div>
  );
}

export function SmsCard({ p }: { p: number }) {
  const show = easeOutCubic(remap(p, 0.22, 0.4));
  return (
    <div
      className="film-sms"
      style={{
        opacity: show,
        transform: `translate3d(${(1 - show) * -18}px, 0, 0)`,
      }}
    >
      <div className="film-sms-kicker">
        <Smartphone className="size-3.5" strokeWidth={2} />
        SMS · delivered
      </div>
      <p className="film-sms-from">Clementine Dental</p>
      <p className="film-sms-body">2:30 PM is open tomorrow. Reply YES to confirm, IGNORE to pass.</p>
    </div>
  );
}

type CalPhase = "booked-then-cancel" | "open" | "filled";

export function AppointmentCard({ p, phase }: { p: number; phase: CalPhase }) {
  const show = easeOutCubic(clamp01(p * 1.6));
  const cancel = phase === "booked-then-cancel" ? remap(p, 0.28, 0.52) : 0;
  const emptied = phase === "booked-then-cancel" ? remap(p, 0.52, 0.72) : phase === "open" ? 1 : 0;
  const filled = phase === "filled" ? 1 : 0;

  let rowName = "Elena V.";
  let rowKind = "hygiene";
  if (filled > 0.5) {
    rowName = "Maya Chen";
    rowKind = "held";
  } else if (emptied > 0.5) {
    rowName = "Open slot";
    rowKind = "available";
  } else if (cancel > 0.55) {
    rowKind = "cancelled";
  }

  return (
    <div
      className="film-cal"
      style={{
        opacity: show,
        transform: `translate3d(0, ${(1 - show) * 22}px, 0)`,
      }}
    >
      <header className="film-cal-head">
        <div>
          <p>Tuesday</p>
          <strong>8 September</strong>
        </div>
        <span>Clementine</span>
      </header>
      <ul className="film-cal-list">
        <li>
          <time>9:00</time>
          <span>Samir R.</span>
          <em>consult</em>
        </li>
        <li className="muted">
          <time>10:30</time>
          <span>Open</span>
          <em>buffer</em>
        </li>
        <li className={cn("hero", emptied > 0.5 && filled < 0.5 && "open", filled > 0.5 && "filled")}>
          <time>14:30</time>
          <span
            style={{
              textDecoration: cancel > 0.45 && filled < 0.5 && emptied < 0.5 ? "line-through" : "none",
              opacity: cancel > 0.45 && emptied < 0.5 ? 0.55 : 1,
            }}
          >
            {rowName}
          </span>
          <em className={cn(((emptied > 0.5 && filled < 0.5) || filled > 0.5) && "accent")}>
            {filled > 0.5 ? (
              <>
                <Check className="size-3" strokeWidth={2.4} />
                {rowKind}
              </>
            ) : (
              rowKind
            )}
          </em>
        </li>
        <li>
          <time>16:00</time>
          <span>Jules K.</span>
          <em>polish</em>
        </li>
      </ul>
    </div>
  );
}

export function WorkflowGraph({ p }: { p: number }) {
  const draw = easeInOutCubic(remap(p, 0.08, 0.55));
  const pulseX = mix(88, 632, easeInOutCubic(remap(p, 0.2, 0.9)));
  const nodes = [
    { x: 88, label: "Calendar", on: remap(p, 0.08, 0.2) },
    { x: 268, label: "Lumen", on: remap(p, 0.28, 0.42) },
    { x: 448, label: "Waitlist", on: remap(p, 0.46, 0.6) },
    { x: 632, label: "Message", on: remap(p, 0.66, 0.8) },
  ];

  return (
    <div className="film-flow">
      <svg viewBox="0 0 720 110" className="film-flow-svg" aria-hidden>
        <path
          d="M88 55 H632"
          fill="none"
          stroke="var(--color-foam)"
          strokeWidth="1.8"
          strokeDasharray="544"
          strokeDashoffset={544 * (1 - draw)}
          opacity="0.85"
        />
        <circle cx={pulseX} cy="55" r="6" fill="var(--color-ivory)" opacity={remap(p, 0.18, 0.3)} />
        {nodes.map((n) => {
          const on = easeOutCubic(n.on);
          return (
            <g key={n.label} transform={`translate(${n.x}, 55)`}>
              <circle r={mix(11, 17, on)} fill="var(--color-forest)" stroke="var(--color-ivory)" strokeWidth="1.8" />
              <circle r="4.5" fill="var(--color-ivory)" opacity={0.45 + on * 0.55} />
            </g>
          );
        })}
      </svg>
      <div className="film-flow-labels">
        {nodes.map((n) => (
          <span key={n.label} style={{ opacity: 0.5 + easeOutCubic(n.on) * 0.5 }}>
            {n.label}
          </span>
        ))}
      </div>
      <Waitlist p={p} />
    </div>
  );
}

function Waitlist({ p }: { p: number }) {
  const show = easeOutCubic(remap(p, 0.42, 0.62));
  const pick = remap(p, 0.68, 0.86);
  return (
    <div className="film-wait" style={{ opacity: show, transform: `translateY(${(1 - show) * 14}px)` }}>
      <p>Waitlist · hygiene</p>
      <ul>
        <li className={pick > 0.4 ? "picked" : undefined}>
          <span>Maya Chen</span>
          <em>WhatsApp · 3 days</em>
        </li>
        <li>
          <span>Luis Ortega</span>
          <em>SMS · 1 week</em>
        </li>
        <li>
          <span>Priya N.</span>
          <em>SMS · 2 weeks</em>
        </li>
      </ul>
    </div>
  );
}
