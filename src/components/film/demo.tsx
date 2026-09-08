import { Check, MessageSquare, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChatTranscript, DeviceFrame } from "./widgets";

type Channel = "whatsapp" | "sms";

export function PingDemo() {
  const [channel, setChannel] = useState<Channel>("whatsapp");
  const [running, setRunning] = useState(false);
  const [p, setP] = useState(0);

  useEffect(() => {
    if (!running) return;
    const start = performance.now();
    const dur = 3800;
    let raf = 0;
    const loop = (now: number) => {
      const u = Math.min(1, (now - start) / dur);
      setP(u);
      if (u < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  function reset() {
    setRunning(false);
    setP(0);
  }

  const booked = p >= 0.94;

  return (
    <section className="demo" id="try">
      <div className="demo-copy">
        <p className="eyebrow">Try the ping</p>
        <h2>Send the opening. Watch it fill.</h2>
        <p>
          A 2:30 hygiene slot just opened at Clementine Dental. Lumen writes Maya on the channel she
          actually answers.
        </p>
        <div className="demo-switch" role="tablist" aria-label="Channel">
          <button
            type="button"
            role="tab"
            aria-selected={channel === "whatsapp"}
            className={cn(channel === "whatsapp" && "on")}
            onClick={() => {
              setChannel("whatsapp");
              reset();
            }}
          >
            <MessageSquare className="size-4" strokeWidth={1.8} />
            WhatsApp
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={channel === "sms"}
            className={cn(channel === "sms" && "on")}
            onClick={() => {
              setChannel("sms");
              reset();
            }}
          >
            <Smartphone className="size-4" strokeWidth={1.8} />
            SMS
          </button>
        </div>
        <div className="demo-meta">
          <span>Maya Chen</span>
          <span>Tue 2:30 PM</span>
          <span>Hygiene</span>
        </div>
        <div className="demo-actions">
          <Button onClick={() => setRunning(true)} disabled={running}>
            Send confirmation
          </Button>
          <Button variant="outline" onClick={reset} disabled={!running && p === 0}>
            Reset
          </Button>
        </div>
        {booked ? (
          <p className="demo-done">
            <Check className="size-4" strokeWidth={2.2} />
            Slot held. Chair filled.
          </p>
        ) : null}
      </div>
      <div className="demo-stage">
        <DeviceFrame channel={channel} p={1}>
          {p === 0 ? (
            <div className="film-chat">
              <p className="demo-idle">Waiting for an empty slot.</p>
            </div>
          ) : (
            <ChatTranscript p={p} />
          )}
        </DeviceFrame>
      </div>
    </section>
  );
}
