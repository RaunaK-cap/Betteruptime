"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useRef } from "react";

import { ThemeToggle } from "./components/theme-toggle";
import { useRevealMotion } from "./components/use-reveal-motion";

const navLinks = [
  ["Platform", "#platform"],
  ["Workflow", "#workflow"],
  ["Customers", "#customers"],
  ["Pricing", "#cta"],
] as const;

const logos = ["Qonto", "Bolt", "Moss", "Linear", "Monzo", "Vercel"] as const;

const metrics = [
  ["5+", "hours saved every week"],
  ["92%", "faster handoff clarity"],
  ["2 min", "to publish a customer update"],
] as const;

const featureCards = [
  {
    label: "Letters",
    title: "Turn incident details into polished updates instantly",
    copy:
      "Summaries, status notes, and stakeholder emails start from the same live operational context.",
  },
  {
    label: "Transcribe",
    title: "Capture meetings, handoffs, and response notes without extra admin",
    copy:
      "The reference's consultation flow becomes responder calls here: structured notes, clear owners, and less manual writing.",
  },
  {
    label: "Sync",
    title: "Keep internal response and external communication in one calm loop",
    copy:
      "Every update stays consistent across on-call, incident rooms, and the customer-facing status page.",
  },
] as const;

const platformCards = [
  {
    label: "Observe",
    title: "Detect issues before customers ask what happened",
    copy:
      "HTTP, SSL, cron, and heartbeat checks surface the signal that matters and quiet the rest.",
  },
  {
    label: "Coordinate",
    title: "Escalations stay readable even when the room gets busy",
    copy:
      "Schedules, policies, ownership, and runbook context remain attached to the incident instead of scattered across tools.",
  },
  {
    label: "Communicate",
    title: "Publish customer updates from the same source of truth",
    copy:
      "Status pages, maintenance windows, and update drafts all move with the incident timeline.",
  },
] as const;

const workflow = [
  {
    step: "01",
    title: "Catch the first signal",
    copy: "Monitoring identifies what changed and gives the incident a clean starting point.",
  },
  {
    step: "02",
    title: "Run the response",
    copy:
      "Escalations, notes, and runbooks keep responders aligned without extra coordination overhead.",
  },
  {
    step: "03",
    title: "Share the update",
    copy:
      "Internal progress turns into external communication quickly, with far less manual rewriting.",
  },
] as const;

const stories = [
  {
    name: "Qonto",
    quote:
      "We cut the admin around incidents dramatically because response and communication finally live together.",
  },
  {
    name: "Moss",
    quote:
      "The new surface feels lighter and calmer, but it still exposes the operational detail our team needs.",
  },
  {
    name: "Bolt",
    quote:
      "This is the first monitoring workflow we have used that does not feel fragmented during a real incident.",
  },
] as const;

const notes = [
  {
    q: "Same theme, different product",
    a: "The layout borrows the airy hero, pale cards, and editorial spacing from the reference, then translates it into uptime and incident language.",
  },
  {
    q: "Scroll and micro motion",
    a: "Sections reveal on entry, floating notes drift lightly, cards lift on hover, and the product surface shifts gently with scroll.",
  },
  {
    q: "Auth pages included",
    a: "Login and signup now use the same sky backdrop, glass panels, CTA treatment, and reveal cadence so they feel native to the landing page.",
  },
] as const;

const birds = Array.from({ length: 5 }, (_, index) => ({
  id: index,
  style: {
    "--bird-left": `${66 + index * 4}%`,
    "--bird-top": `${10 + (index % 3) * 2}%`,
    "--bird-delay": `${index * -1.1}s`,
  } as CSSProperties,
}));

export default function Home() {
  const pageRef = useRef<HTMLElement>(null);
  const sceneCardRef = useRef<HTMLDivElement>(null);

  useRevealMotion({ rootRef: pageRef });

  return (
    <main ref={pageRef} className="landing-page">
      <section className="hero-shell">
        <div className="hero-haze hero-haze-left" />
        <div className="hero-haze hero-haze-right" />

        <div className="mx-auto max-w-7xl px-5 pb-20 pt-6 sm:px-8 lg:px-10">
          <header
            data-reveal
            className="reveal-block nav-wrap mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="brand-lockup">BU</div>
              <span className="hero-ink text-[11px] font-semibold uppercase tracking-[0.28em]">
                Better Uptime
              </span>
            </div>

            <nav className="hero-muted flex flex-wrap items-center justify-center gap-2 text-[11px] font-medium">
              {navLinks.map(([label, href]) => (
                <a key={label} href={href} className="nav-pill">
                  {label}
                </a>
              ))}
              <Link href="/login" className="nav-pill">
                Login
              </Link>
              <Link href="/signup" className="nav-pill">
                Sign up
              </Link>
              <ThemeToggle />
              <a href="#cta" className="nav-cta">
                Start free
              </a>
            </nav>
          </header>

          <div className="mx-auto max-w-6xl pt-10 sm:pt-14">
            <div className="hero-scene">
              <div className="scene-sky" />
              <div className="scene-sun" />
              <div className="scene-cloud scene-cloud-a" />
              <div className="scene-cloud scene-cloud-b" />

              <div className="scene-birds" aria-hidden="true">
                {birds.map((bird) => (
                  <span key={bird.id} className="scene-bird" style={bird.style} />
                ))}
              </div>

              <div className="scene-ridge ridge-back" />
              <div className="scene-ridge ridge-mid" />
              <div className="scene-ridge ridge-front" />
              <div className="scene-meadow scene-meadow-left" />
              <div className="scene-meadow scene-meadow-right" />
              <div className="scene-lake" />
              <div className="scene-lake-glow" />
              <div className="scene-foreground" />

              <div className="hero-grid">
                <div className="hero-copy">
                  <div data-reveal className="hero-eyebrow reveal-block">
                    <span className="live-dot" />
                    Patients, not paperwork. Incidents, not busywork.
                  </div>

                  <div data-reveal className="reveal-block" style={{ transitionDelay: "90ms" }}>
                    <h1 className="hero-title">
                      Calm incident response with the softness of a modern editorial landing page.
                    </h1>
                    <p className="hero-body">
                      Better Uptime now lands with the same airy sky, rounded product cards, and
                      quiet confidence as your reference, then carries that same system into login
                      and signup.
                    </p>
                  </div>

                  <div
                    data-reveal
                    className="reveal-block mt-8 flex flex-col items-start gap-3 sm:flex-row"
                    style={{ transitionDelay: "160ms" }}
                  >
                    <Link href="/signup" className="button button-dark">
                      Sign up for free
                    </Link>
                    <Link href="/login" className="button button-soft">
                      Book a demo
                    </Link>
                  </div>
                </div>

                <div
                  ref={sceneCardRef}
                  data-reveal
                  className="reveal-block hero-stage-card"
                  style={{ transitionDelay: "160ms" }}
                >
                  <div className="hero-stage-surface">
                    <div className="hero-stage-topbar">
                      <div className="flex items-center gap-2">
                        <span className="window-dot bg-[#8fc0ff]" />
                        <span className="window-dot bg-[#cbdfff]" />
                        <span className="window-dot bg-[#eef5ff]" />
                      </div>
                      <span className="window-url">status.betteruptime.com/incident-room</span>
                    </div>

                    <div className="hero-stage-body">
                      <article className="dashboard-card dashboard-card-primary hover-rise">
                        <span className="card-kicker">Overview</span>
                        <h2>Save hours a week with one shared response workspace</h2>
                        <p>
                          Monitoring, escalations, and customer messaging stay aligned from the
                          first alert to the final resolution note.
                        </p>
                        <div className="dashboard-meter">
                          <span />
                        </div>
                      </article>

                      <div className="hero-stage-stack">
                        <article className="dashboard-card dashboard-card-soft hover-rise">
                          <span className="card-kicker">Incident draft</span>
                          <strong>Latency increase detected in 3 regions</strong>
                          <p>Suggested customer update ready in 24 seconds.</p>
                        </article>

                        <article className="dashboard-card dashboard-card-note hover-rise">
                          <span className="card-kicker">Response room</span>
                          <ul className="dash-list">
                            <li>Owner assigned</li>
                            <li>Rollback approved</li>
                            <li>Status sync live</li>
                          </ul>
                        </article>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="floating-badge floating-badge-left">
                <span className="badge-label">Before</span>
                <strong>Fragmented incident notes</strong>
                <small>updates spread across tools</small>
              </div>
              <div className="floating-badge floating-badge-right">
                <span className="badge-label">After</span>
                <strong>Customer-ready updates</strong>
                <small>generated from the same timeline</small>
              </div>
            </div>
          </div>

          <div
            data-reveal
            className="reveal-block mx-auto mt-8 max-w-5xl text-center"
            style={{ transitionDelay: "220ms" }}
          >
            <p className="hero-muted text-[11px] uppercase tracking-[0.28em]">
              Trusted by modern teams running business-critical systems
            </p>
            <div className="logo-row mt-5">
              {logos.map((logo) => (
                <span key={logo} className="logo-chip">
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-surface">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="grid gap-10 border-t border-black/6 pt-10 md:grid-cols-3">
            {metrics.map(([value, label], index) => (
              <article
                key={label}
                data-reveal
                className="reveal-block metric-column"
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <h2>{value}</h2>
                <p>{label}</p>
              </article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p
              data-reveal
              className="section-ink reveal-block mx-auto max-w-3xl text-balance text-3xl font-semibold tracking-[-0.06em] sm:text-4xl"
            >
              The product story now feels lighter, clearer, and more premium.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {featureCards.map((card, index) => (
              <article
                key={card.title}
                data-reveal
                className="reveal-block feature-card hover-rise"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="feature-icon">
                  <span>{card.label}</span>
                </div>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="platform" className="platform-section">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div data-reveal className="reveal-block">
              <p className="section-kicker">Platform overview</p>
              <h2 className="section-ink mt-4 max-w-lg text-balance text-3xl font-semibold tracking-[-0.065em] sm:text-5xl">
                One platform for signal, response, and clear communication.
              </h2>
              <p className="section-muted mt-5 max-w-xl text-[15px] leading-8">
                The visual system changed, but the product story stayed grounded in Better Uptime:
                monitors, on-call workflows, incident coordination, and public status updates.
              </p>

              <div className="mt-8 grid gap-4">
                {platformCards.map((card, index) => (
                  <article
                    key={card.title}
                    data-reveal
                    className="reveal-block platform-copy-card hover-rise"
                    style={{ transitionDelay: `${index * 80 + 80}ms` }}
                  >
                    <p className="card-kicker">{card.label}</p>
                    <h3>{card.title}</h3>
                    <p>{card.copy}</p>
                  </article>
                ))}
              </div>
            </div>

            <div data-reveal className="reveal-block" style={{ transitionDelay: "140ms" }}>
              <div ref={sceneCardRef} className="product-stage">
                <div className="product-stage-glow" />
                <div className="product-window">
                  <div className="window-topbar">
                    <div className="flex items-center gap-2">
                      <span className="window-dot bg-[#73b8ff]" />
                      <span className="window-dot bg-[#a9d2ff]" />
                      <span className="window-dot bg-[#dbeeff]" />
                    </div>
                    <span className="window-url">app.betteruptime.com/overview</span>
                  </div>

                  <div className="window-body">
                    <div className="status-overview-card">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="card-kicker text-[#5f6fe0]">Mission control</p>
                          <h3 className="section-ink mt-3 text-xl font-semibold tracking-[-0.05em]">
                            The same soft visual system, now translated into a real uptime dashboard.
                          </h3>
                        </div>
                        <div className="healthy-pill">
                          <span className="live-dot live-dot-small" />
                          24 healthy
                        </div>
                      </div>

                      <div className="mt-5 grid gap-3 sm:grid-cols-3">
                        {["Checks", "Escalations", "Status sync"].map((item) => (
                          <div key={item} className="mini-panel hover-rise">
                            <span>{item}</span>
                            <strong>Live</strong>
                          </div>
                        ))}
                      </div>

                      <div className="activity-chart mt-5">
                        <div className="activity-grid" />
                        <div className="activity-wave activity-wave-primary" />
                        <div className="activity-wave activity-wave-secondary" />
                        <div className="chart-note">
                          <span className="live-dot live-dot-small" />
                          auto-escalation suggested
                        </div>
                      </div>
                    </div>

                    <div className="stack gap-4">
                      <div className="response-card">
                        <p className="card-kicker text-white/58">Incident room</p>
                        <div className="mt-4 space-y-3">
                          {[
                            "Heartbeat failed in eu-west",
                            "DB pool reset approved",
                            "Rollback owner confirmed",
                          ].map((item) => (
                            <div key={item} className="response-row">
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="customer-card">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="card-kicker">Status page</p>
                            <h3 className="section-ink mt-2 text-lg font-semibold tracking-[-0.04em]">
                              Elevated API latency
                            </h3>
                          </div>
                          <div className="pulse-wrap">
                            <span className="pulse-core" />
                          </div>
                        </div>

                        <div className="mt-5 grid gap-3">
                          {[
                            ["Internal", "Rollback running"],
                            ["Public post", "Draft ready"],
                            ["ETA", "12 min"],
                          ].map(([label, value]) => (
                            <div key={label} className="customer-row">
                              <span>{label}</span>
                              <strong>{value}</strong>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="stage-float stage-float-a">
                  <span className="badge-label">Alert</span>
                  <strong>Latency threshold crossed</strong>
                  <small>policy escalated in 24s</small>
                </div>

                <div className="stage-float stage-float-b">
                  <span className="badge-label">Comms</span>
                  <strong>Status page synchronized</strong>
                  <small>customer draft is up to date</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="workflow" className="section-surface">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="text-center">
            <p data-reveal className="reveal-block section-kicker">
              Workflow
            </p>
            <h2
              data-reveal
              className="section-ink reveal-block mx-auto mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-[-0.06em] sm:text-4xl"
              style={{ transitionDelay: "80ms" }}
            >
              Built around what responders actually need when systems break.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {workflow.map((item, index) => (
              <article
                key={item.title}
                data-reveal
                className="reveal-block workflow-card hover-rise"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <span className="workflow-step">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="customers" className="leaders-section">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="text-center">
            <p data-reveal className="reveal-block section-kicker text-white/60">
              Trusted by leaders
            </p>
            <h2
              data-reveal
              className="reveal-block mt-4 text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl"
              style={{ transitionDelay: "80ms" }}
            >
              Teams rely on Better Uptime when the work is critical.
            </h2>
            <p
              data-reveal
              className="reveal-block mx-auto mt-4 max-w-2xl text-[15px] leading-8 text-white/72"
              style={{ transitionDelay: "150ms" }}
            >
              The testimonial section keeps the softer rhythm from the reference, then shifts into a
              darker proof moment to avoid a flat one-note page.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-[0.74fr_0.26fr]">
            <article data-reveal className="reveal-block quote-stage" style={{ transitionDelay: "80ms" }}>
              <div className="quote-visual">
                <div className="quote-landscape" />
                <div className="quote-copy">
                  <span className="card-kicker text-white/62">Featured story</span>
                  <h3>
                    &quot;Better Uptime helped us compress alerting, coordination, and communication
                    into one reliable system.&quot;
                  </h3>
                  <p>Platform Engineering, Better Uptime customer</p>
                </div>
              </div>
            </article>

            <div className="grid gap-5">
              {stories.map((story, index) => (
                <article
                  key={story.name}
                  data-reveal
                  className="reveal-block story-quote hover-rise"
                  style={{ transitionDelay: `${index * 70 + 120}ms` }}
                >
                  <h3>{story.name}</h3>
                  <p>{story.quote}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="stories" className="section-surface">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div data-reveal className="reveal-block">
              <p className="section-kicker">Notes on the rebuild</p>
              <h2 className="section-ink mt-4 max-w-lg text-balance text-3xl font-semibold tracking-[-0.06em] sm:text-4xl">
                Motion and composition now carry more of the story.
              </h2>
              <p className="section-muted mt-5 max-w-xl text-[15px] leading-8">
                The old page had product content already. This version pushes the visual language
                closer to your reference: cleaner sky gradients, card-based storytelling, gentler
                whitespace, and more deliberate movement.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {notes.map((item, index) => (
                <article
                  key={item.q}
                  data-reveal
                  className="reveal-block note-card hover-rise"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <h3>{item.q}</h3>
                  <p>{item.a}</p>
                </article>
              ))}
              <article
                data-reveal
                className="reveal-block note-card note-card-accent hover-rise"
                style={{ transitionDelay: "240ms" }}
              >
                <h3>Micro-interactions</h3>
                <p>
                  Buttons lift, proof cards shimmer subtly, feature blocks pulse on hover, and the
                  dashboard panels drift just enough to feel alive without becoming noisy.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="cta" className="cta-section">
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-6 sm:px-8 lg:px-10">
          <div data-reveal className="reveal-block cta-panel">
            <div>
              <p className="section-kicker text-white/60">Launch faster</p>
              <h2 className="mt-4 max-w-2xl text-balance text-4xl font-semibold tracking-[-0.07em] text-white sm:text-5xl">
                A landing page, signup, and login flow that now feel like one premium product.
              </h2>
              <p className="mt-5 max-w-2xl text-[15px] leading-8 text-white/74">
                The reference direction is now carried across the entire first-run experience,
                including auth, while staying specific to monitoring, incident response, and status
                communication.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/signup" className="button button-cream">
                Create account
              </Link>
              <Link href="/login" className="button button-outline">
                Open login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
