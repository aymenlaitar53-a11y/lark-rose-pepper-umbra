import type { ReactNode } from "react";
import { local, sceneOpacity } from "@/lib/film/engine";
import { AppointmentCard, ChatTranscript, DeviceFrame, SmsCard, WorkflowGraph } from "./widgets";
import { Appear, BgVideo, Grain, LogoMark, Still, Vignette, Wash } from "./visuals";

export function SceneLayer({
  t,
  start,
  end,
  children,
}: {
  t: number;
  start: number;
  end: number;
  children: ReactNode;
}) {
  const o = sceneOpacity(t, start, end);
  if (o <= 0.001) return null;
  return (
    <div className="film-scene" style={{ opacity: o }}>
      {children}
      <Grain />
      <Vignette />
    </div>
  );
}

export function OpenScene({ t, playing }: { t: number; playing: boolean }) {
  const p = local(t, 0, 5.8);
  return (
    <SceneLayer t={t} start={0} end={5.8}>
      <Still src="/art/operatory-empty.jpg" p={p} alt="" />
      <BgVideo src="/art/chair-push.mp4" play={playing && p > 0 && p < 1} />
      <Wash amount={0.38} />
      <div className="film-center">
        <Appear p={p} from={0.08} span={0.2} className="film-mark">
          <LogoMark className="size-12 text-ivory" />
        </Appear>
        <Appear p={p} from={0.18} span={0.22}>
          <h1 className="film-title">Lumen</h1>
        </Appear>
        <Appear p={p} from={0.34} span={0.2}>
          <div className="film-rule" style={{ transform: `scaleX(${Math.min(1, Math.max(0, (p - 0.34) / 0.28))})` }} />
        </Appear>
        <Appear p={p} from={0.42} span={0.22}>
          <p className="film-sub">AI confirmation for dental clinics</p>
        </Appear>
      </div>
    </SceneLayer>
  );
}

export function GapScene({ t }: { t: number }) {
  const p = local(t, 5.8, 13.6);
  return (
    <SceneLayer t={t} start={5.8} end={13.6}>
      <Still src="/art/reception.jpg" p={p} alt="Quiet dental reception in morning light" />
      <Wash amount={0.46} />
      <div className="film-stage-pad">
        <AppointmentCard p={p} phase="booked-then-cancel" />
      </div>
    </SceneLayer>
  );
}

export function DetectScene({ t, playing }: { t: number; playing: boolean }) {
  const p = local(t, 13.6, 21.8);
  return (
    <SceneLayer t={t} start={13.6} end={21.8}>
      <BgVideo src="/art/nodes-pulse.mp4" play={playing && p > 0 && p < 1} opacity={0.9} />
      <Still src="/art/nodes.jpg" p={p} alt="" className="mix-multiply opacity-40" />
      <Wash amount={0.72} />
      <div className="film-stage-pad film-detect">
        <Appear p={p} from={0.02} span={0.16}>
          <p className="film-chip">Empty slot detected · 14:30 hygiene</p>
        </Appear>
        <WorkflowGraph p={p} />
      </div>
    </SceneLayer>
  );
}

export function PingScene({ t }: { t: number }) {
  const p = local(t, 21.8, 35.2);
  return (
    <SceneLayer t={t} start={21.8} end={35.2}>
      <Still src="/art/phone-hands.jpg" p={p} alt="Hands holding a phone" />
      <Wash amount={0.55} />
      <div className="film-ping">
        <SmsCard p={p} />
        <DeviceFrame channel="whatsapp" p={remapSafe(p, 0.02, 1)}>
          <ChatTranscript p={p} />
        </DeviceFrame>
      </div>
    </SceneLayer>
  );
}

function remapSafe(p: number, a: number, b: number) {
  return Math.max(0, Math.min(1, (p - a) / (b - a)));
}

export function YesScene({ t }: { t: number }) {
  const p = local(t, 35.2, 42.8);
  return (
    <SceneLayer t={t} start={35.2} end={42.8}>
      <Still src="/art/operatory-empty.jpg" p={p} alt="Empty dental chair in afternoon light" />
      <Wash amount={0.5} />
      <div className="film-yes">
        <AppointmentCard p={Math.min(1, p * 1.4)} phase="filled" />
        <DeviceFrame channel="whatsapp" p={remapSafe(p, 0, 0.4)} className="film-device-compact">
          <ChatTranscript p={0.95} />
        </DeviceFrame>
      </div>
    </SceneLayer>
  );
}

export function CloseScene({ t }: { t: number }) {
  const p = local(t, 42.8, 50);
  const count = Math.round(8 * Math.min(1, Math.max(0, (p - 0.18) / 0.35)));
  return (
    <SceneLayer t={t} start={42.8} end={50}>
      <Still src="/art/operatory-filled.jpg" p={p} alt="Patient resting in a sunlit dental chair" />
      <Wash amount={0.48} />
      <div className="film-center film-close">
        <Appear p={p} from={0.08} span={0.18} className="film-mark">
          <LogoMark className="size-10 text-ivory" />
        </Appear>
        <Appear p={p} from={0.16} span={0.2}>
          <h2 className="film-title film-title-sm">Filled.</h2>
        </Appear>
        <Appear p={p} from={0.32} span={0.2}>
          <ul className="film-stats">
            <li>
              <strong className="tabular-nums">{count}s</strong>
              <span>to confirm</span>
            </li>
            <li>
              <strong>1</strong>
              <span>message</span>
            </li>
            <li>
              <strong>0</strong>
              <span>empty chairs</span>
            </li>
          </ul>
        </Appear>
      </div>
    </SceneLayer>
  );
}
