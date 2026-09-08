import { createFileRoute } from "@tanstack/react-router";
import { PingDemo } from "@/components/film/demo";
import { FilmPlayer } from "@/components/film/player";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main>
      <FilmPlayer />
      <div className="page-rest">
        <section className="story">
          <header>
            <p className="eyebrow">The workflow</p>
            <h2>When a chair goes empty, the next patient already knows.</h2>
            <p>
              Lumen watches the book. The moment a hygiene slot opens, it writes the waitlist on SMS
              and WhatsApp — and holds the chair the second they confirm.
            </p>
          </header>
          <div className="story-grid">
            <figure className="story-card tall">
              <img src="/art/operatory-empty.jpg" alt="Empty sage treatment chair in afternoon light" />
              <figcaption>
                <h3>The gap</h3>
                <p>A cancellation at 2:30. An empty chair. Revenue sitting idle.</p>
              </figcaption>
            </figure>
            <figure className="story-card">
              <img src="/art/phone-hands.jpg" alt="Hands holding a phone on a linen table" />
              <figcaption>
                <h3>The ping</h3>
                <p>Maya gets the opening on the channel she answers.</p>
              </figcaption>
            </figure>
            <figure className="story-card">
              <img src="/art/operatory-filled.jpg" alt="Patient resting in a sunlit dental chair" />
              <figcaption>
                <h3>The fill</h3>
                <p>Yes. Booked. The afternoon is whole again.</p>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="steps">
          <p className="eyebrow">Three beats</p>
          <h2>Confirm. Fill. Repeat.</h2>
          <ol className="step-list">
            <li>
              <b>01</b>
              <h3>A slot opens</h3>
              <p>A last-minute cancel hits the book. Lumen sees the empty 2:30 before the front desk looks up.</p>
            </li>
            <li>
              <b>02</b>
              <h3>The patient is written</h3>
              <p>SMS and WhatsApp go out together — a single, calm question: would you like this chair?</p>
            </li>
            <li>
              <b>03</b>
              <h3>They confirm</h3>
              <p>One YES holds the appointment. The waitlist moves. The chair does not stay empty.</p>
            </li>
          </ol>
        </section>

        <PingDemo />

        <footer className="site-foot">
          <p>
            <strong>Lumen</strong> · Dental slot confirmation
          </p>
          <p>SMS · WhatsApp · the empty chair, filled.</p>
        </footer>
      </div>
    </main>
  );
}
