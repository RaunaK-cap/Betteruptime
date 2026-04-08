"use client";

import Link from "next/link";
import { useRef } from "react";

import { ThemeToggle } from "./components/theme-toggle";
import { useRevealMotion } from "./components/use-reveal-motion";

const navLinks = [
  ["Product", "#product"],
  ["Coverage", "#coverage"],
  ["Workflow", "#workflow"],
  ["Stories", "#stories"],
] as const;

const regionChips = ["Mumbai", "Delhi", "Bengaluru", "Singapore", "Dubai", "Virginia"] as const;

const metrics = [
  ["1 min", "Fast checks for priority endpoints and critical landing flows."],
  ["8 probes", "India, US, and nearby region visibility on the same board."],
  ["365 days", "Stored uptime and downtime history for trend and SLA reviews."],
  ["24/7", "One live timeline for outages, recovery, and performance drift."],
] as const;

const workflow = [
  {
    step: "01",
    title: "Choose a URL and check interval",
    copy: "Set a one, three, or five minute cadence for your website, API, or checkout path.",
  },
  {
    step: "02",
    title: "Track probe health by region",
    copy: "See where failures start first across India, the US, and nearby countries before users report them.",
  },
  {
    step: "03",
    title: "Keep every outage in one timeline",
    copy: "Response time, downtime, incident notes, and recovery stay recorded for reporting later.",
  },
] as const;

const stories = [
  {
    title: "For SaaS teams shipping in India first",
    copy: "Probe coverage is centered around India, then extended to the US and nearby regions so local customer impact is obvious.",
  },
  {
    title: "For founders who need the truth quickly",
    copy: "The layout stays clean, but the signal is serious: up, down, latency spikes, and recovery windows on one screen.",
  },
  {
    title: "For teams sharing uptime reports",
    copy: "Historical charts and outage summaries make it easier to explain what failed, where it failed, and how long it lasted.",
  },
] as const;

export default function Home() {
  const pageRef = useRef<HTMLElement>(null);

  useRevealMotion({ rootRef: pageRef });

  return (
    <main ref={pageRef} className="landing-page">
      <section className="hero-shell">
        <div className="hero-orb hero-orb-a" />
        <div className="hero-orb hero-orb-b" />

        <div className="mx-auto max-w-7xl px-5 pb-20 pt-6 sm:px-8 lg:px-10">
          <header data-reveal className="reveal-block nav-shell">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <Link href="/" className="flex items-center gap-3">
                <span className="brand-lockup">BU</span>
                <div>
                  <p className="nav-brand">BetterUptime</p>
                  <p className="nav-copy">Region-aware uptime checks and outage analytics</p>
                </div>
              </Link>

              <nav className="flex flex-wrap items-center gap-2">
                {navLinks.map(([label, href]) => (
                  <a key={label} href={href} className="nav-pill">
                    {label}
                  </a>
                ))}
                <Link href="/login" className="nav-pill">
                  Login
                </Link>
                <ThemeToggle />
                <Link href="/signup" className="nav-cta">
                  Start free
                </Link>
              </nav>
            </div>
          </header>

          <div className="hero-grid">
            <div className="hero-copy">
              <div data-reveal className="reveal-block hero-eyebrow">
                <span className="live-dot" />
                India-first website monitoring for modern teams
              </div>

              <div data-reveal className="reveal-block" style={{ transitionDelay: "80ms" }}>
                <h1 className="hero-title">
                  Check your site every few minutes and see exactly where it goes down.
                </h1>
                <p className="hero-body">
                  BetterUptime monitors website uptime, response time, and outage history across
                  India, the US, and nearby regions. Every check writes to a clean stats layer so
                  your team can spot failures, compare locations, and review long-term reliability.
                </p>
              </div>

              <div
                data-reveal
                className="reveal-block hero-actions"
                style={{ transitionDelay: "140ms" }}
              >
                <Link href="/signup" className="button button-dark">
                  Create account
                </Link>
                <a href="#product" className="button button-soft">
                  Explore dashboard
                </a>
              </div>

              <div
                data-reveal
                className="reveal-block region-strip"
                style={{ transitionDelay: "200ms" }}
              >
                {regionChips.map((region) => (
                  <span key={region} className="region-chip">
                    {region}
                  </span>
                ))}
              </div>
            </div>

            <div data-reveal className="reveal-block hero-stage-card" style={{ transitionDelay: "180ms" }}>
              <div className="product-window hero-stage-surface">
                <div className="window-topbar">
                  <div className="flex items-center gap-2">
                    <span className="window-dot bg-[#8ab8ea]" />
                    <span className="window-dot bg-[#c7dff8]" />
                    <span className="window-dot bg-[#ecf5ff]" />
                  </div>
                  <span className="window-url">app.betteruptime.in/overview</span>
                </div>

                <div className="window-body">
                  <article className="dashboard-card dashboard-card-primary hover-rise">
                    <span className="card-kicker">Live board</span>
                    <h2>One calm view for uptime, latency, and outage history</h2>
                    <p>
                      Every endpoint check is stored as usable data, not just a notification, so
                      your team can review what happened after the incident ends.
                    </p>

                    <div className="dashboard-meter">
                      <span />
                    </div>

                    <div className="mini-grid mt-5">
                      {[
                        ["Uptime", "99.96%"],
                        ["Checks today", "8,640"],
                        ["Open incidents", "01"],
                        ["Worst region", "Virginia"],
                      ].map(([label, value]) => (
                        <div key={label} className="mini-panel">
                          <span>{label}</span>
                          <strong>{value}</strong>
                        </div>
                      ))}
                    </div>
                  </article>

                  <div className="hero-stage-stack">
                    <article className="dashboard-card dashboard-card-soft hover-rise">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <span className="card-kicker">Probe map</span>
                          <p className="panel-title">India and US checks on the same route graph</p>
                        </div>
                        <span className="healthy-pill">6 healthy</span>
                      </div>

                      <div className="stage-map">
                        <span className="map-link map-link-a" />
                        <span className="map-link map-link-b" />
                        <span className="map-node map-node-india">IN</span>
                        <span className="map-node map-node-us">US</span>
                        <span className="map-node map-node-neighbor">SEA</span>
                        <span className="map-node map-node-gulf">ME</span>
                      </div>
                    </article>

                    <article className="dashboard-card dashboard-card-note hover-rise">
                      <span className="card-kicker">Recent timeline</span>
                      <ul className="dash-list">
                        <li>Mumbai probe failed at 08:42 and recovered at 08:49.</li>
                        <li>Virginia latency crossed 480 ms during the same window.</li>
                        <li>Historical report now shows a seven minute partial outage.</li>
                      </ul>
                    </article>
                  </div>
                </div>

                <div className="stage-float stage-float-a">
                  <span className="badge-label">India probe</span>
                  <strong>Mumbai healthy in 18 ms</strong>
                  <small>next check in 58s</small>
                </div>

                <div className="stage-float stage-float-b">
                  <span className="badge-label">Incident note</span>
                  <strong>Virginia recovered</strong>
                  <small>history saved to analytics</small>
                </div>
              </div>
            </div>

            <div className="floating-badge floating-badge-left">
              <span className="badge-label">Main use case</span>
              <strong>Website uptime monitoring</strong>
              <small>checks every few minutes with stored outage data</small>
            </div>

            <div className="floating-badge floating-badge-right">
              <span className="badge-label">Core regions</span>
              <strong>India, US, neighbors</strong>
              <small>regional failure patterns stay obvious</small>
            </div>
          </div>

          <div data-reveal className="reveal-block trusted-strip" style={{ transitionDelay: "240ms" }}>
            <span className="trusted-label">Focused probe regions</span>
            <div className="trusted-row">
              {["Chennai", "Hyderabad", "Singapore", "Dubai", "Oregon", "Virginia"].map((label) => (
                <span key={label} className="trusted-chip">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-surface">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="metric-grid">
            {metrics.map(([value, label], index) => (
              <article
                key={label}
                data-reveal
                className="reveal-block metric-card hover-rise"
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <h2>{value}</h2>
                <p>{label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="product" className="section-shell">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="section-head">
            <p data-reveal className="reveal-block section-kicker">
              Product surface
            </p>
            <h2
              data-reveal
              className="reveal-block section-title"
              style={{ transitionDelay: "70ms" }}
            >
              A bento dashboard for checks, regions, downtime history, and team-facing stats.
            </h2>
            <p
              data-reveal
              className="reveal-block section-copy"
              style={{ transitionDelay: "120ms" }}
            >
              The layout is different from the current landing page, but keeps the same premium SaaS
              feel: airy spacing, product-focused cards, subtle motion, and direct feature language.
            </p>
          </div>

          <div className="bento-grid mt-12">
            <article data-reveal className="reveal-block bento-card bento-card-wide hover-rise">
              <span className="card-kicker">Regional checks</span>
              <h3>Start with India, compare against the US, then confirm with nearby probes.</h3>
              <p>
                BetterUptime highlights where a failure starts first so regional outages do not get
                hidden inside one global uptime number.
              </p>
              <div className="country-grid">
                {["Mumbai", "Delhi", "Bengaluru", "Singapore", "Dubai", "Virginia"].map((region) => (
                  <span key={region} className="country-pill">
                    {region}
                  </span>
                ))}
              </div>
            </article>

            <article
              data-reveal
              className="reveal-block bento-card bento-card-tall hover-rise"
              style={{ transitionDelay: "80ms" }}
            >
              <span className="card-kicker">Check cadence</span>
              <h3>Pick 1m, 3m, or 5m intervals based on endpoint priority.</h3>
              <p>
                High-value pages can be checked aggressively while background routes stay lighter and
                cheaper.
              </p>
              <div className="bar-stack">
                {[
                  ["Homepage", "1m", "92%"],
                  ["Checkout", "1m", "88%"],
                  ["API health", "3m", "66%"],
                ].map(([name, pace, width]) => (
                  <div key={name} className="bar-row">
                    <div className="flex items-center justify-between gap-4">
                      <strong>{name}</strong>
                      <span>{pace}</span>
                    </div>
                    <div className="bar-track">
                      <span style={{ width }} />
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article
              data-reveal
              className="reveal-block bento-card hover-rise"
              style={{ transitionDelay: "120ms" }}
            >
              <span className="card-kicker">Stored history</span>
              <h3>Every outage becomes a permanent, readable incident trail.</h3>
              <div className="timeline-list">
                {[
                  "08:42 Partial outage detected in Mumbai",
                  "08:44 Delhi and Singapore confirm degradation",
                  "08:49 Mumbai recovered, report stored",
                ].map((item) => (
                  <div key={item} className="timeline-item">
                    <span className="timeline-dot" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </article>

            <article
              data-reveal
              className="reveal-block bento-card hover-rise"
              style={{ transitionDelay: "160ms" }}
            >
              <span className="card-kicker">Latency analytics</span>
              <h3>See drift before a route is fully down.</h3>
              <div className="activity-chart">
                <div className="activity-grid" />
                <div className="activity-wave activity-wave-primary" />
                <div className="activity-wave activity-wave-secondary" />
                <div className="chart-note">
                  <span className="live-dot live-dot-small" />
                  spike detected
                </div>
              </div>
            </article>

            <article
              data-reveal
              className="reveal-block bento-card bento-card-full hover-rise"
              style={{ transitionDelay: "200ms" }}
            >
              <span className="card-kicker">Team clarity</span>
              <h3>Share one stats view with founders, engineers, and support.</h3>
              <p>
                Uptime rate, downtime minutes, worst-performing region, and recovery windows stay in
                a layout that is easy to read in both light and dark theme.
              </p>
              <div className="mini-grid">
                {[
                  ["Downtime", "27 min"],
                  ["Avg latency", "162 ms"],
                  ["Best region", "Delhi"],
                  ["Report export", "Ready"],
                ].map(([label, value]) => (
                  <div key={label} className="mini-panel">
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="coverage" className="section-surface">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="coverage-layout">
            <div>
              <p data-reveal className="reveal-block section-kicker">
                Coverage map
              </p>
              <h2
                data-reveal
                className="reveal-block section-title"
                style={{ transitionDelay: "70ms" }}
              >
                Region-by-region stats that make India and US traffic patterns easier to trust.
              </h2>
              <p
                data-reveal
                className="reveal-block section-copy"
                style={{ transitionDelay: "120ms" }}
              >
                Instead of a generic world map, the product speaks directly to the regions that
                matter most for your project: India first, US next, then neighboring countries for
                confirmation and comparison.
              </p>
            </div>

            <div data-reveal className="reveal-block product-stage" style={{ transitionDelay: "150ms" }}>
              <div className="product-stage-glow" />
              <div className="product-window">
                <div className="window-topbar">
                  <div className="flex items-center gap-2">
                    <span className="window-dot bg-[#8ab8ea]" />
                    <span className="window-dot bg-[#c7dff8]" />
                    <span className="window-dot bg-[#ecf5ff]" />
                  </div>
                  <span className="window-url">app.betteruptime.in/regions</span>
                </div>

                <div className="window-body">
                  <article className="status-overview-card hover-rise">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="card-kicker">Region summary</span>
                        <p className="panel-title">Today&apos;s uptime and latency snapshot</p>
                      </div>
                      <span className="healthy-pill">global 99.94%</span>
                    </div>

                    <div className="coverage-stack">
                      {[
                        ["Mumbai", "99.98%", "18 ms"],
                        ["Delhi", "99.97%", "21 ms"],
                        ["Bengaluru", "99.96%", "24 ms"],
                        ["Virginia", "99.82%", "178 ms"],
                      ].map(([region, uptime, latency]) => (
                        <div key={region} className="coverage-row">
                          <strong>{region}</strong>
                          <span>{uptime}</span>
                          <span>{latency}</span>
                        </div>
                      ))}
                    </div>
                  </article>

                  <div className="stack">
                    <article className="response-card hover-rise">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <span className="card-kicker text-white/60">Response layer</span>
                          <p className="panel-title text-white">Outage memory, not just alerts</p>
                        </div>
                        <div className="pulse-wrap">
                          <span className="pulse-core" />
                        </div>
                      </div>
                      <div className="stack mt-4">
                        {["Auto-save downtime window", "Compare probes side-by-side", "Review monthly uptime trend"].map(
                          (item) => (
                            <div key={item} className="response-row mini-panel">
                              <strong>{item}</strong>
                            </div>
                          ),
                        )}
                      </div>
                    </article>

                    <article className="customer-card hover-rise">
                      <span className="card-kicker">Exports</span>
                      <p className="panel-title">Share clean stats with clients or internal teams.</p>
                      <div className="stack mt-4">
                        {[
                          ["Weekly report", "Ready"],
                          ["SLA history", "365 days"],
                          ["CSV export", "One click"],
                        ].map(([label, value]) => (
                          <div key={label} className="customer-row mini-panel">
                            <span>{label}</span>
                            <strong>{value}</strong>
                          </div>
                        ))}
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="workflow" className="section-shell">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="section-head">
            <p data-reveal className="reveal-block section-kicker">
              Workflow
            </p>
            <h2
              data-reveal
              className="reveal-block section-title"
              style={{ transitionDelay: "70ms" }}
            >
              From first check to final report, the flow stays simple.
            </h2>
          </div>

          <div className="workflow-grid mt-12">
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

      <section id="stories" className="proof-shell">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="proof-grid">
            <article data-reveal className="reveal-block story-quote quote-landscape">
              <div className="story-overlay">
                <span className="card-kicker text-white/60">Why it works</span>
                <h3>
                  BetterUptime feels like a polished SaaS launch page, but it still talks like a
                  real monitoring product.
                </h3>
                <p>Built around actual uptime checks, regional failure detection, and stored outage stats.</p>
              </div>
            </article>

            <div className="story-stack">
              {stories.map((story, index) => (
                <article
                  key={story.title}
                  data-reveal
                  className="reveal-block note-card hover-rise"
                  style={{ transitionDelay: `${index * 90 + 70}ms` }}
                >
                  <h3>{story.title}</h3>
                  <p>{story.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="mx-auto max-w-7xl px-5 pb-20 pt-8 sm:px-8 lg:px-10">
          <div data-reveal className="reveal-block cta-panel">
            <p className="section-kicker text-white/60">Launch faster</p>
            <h2 className="cta-title">
              Monitor your website from the regions that matter and keep every outage on record.
            </h2>
            <p className="cta-copy">
              The new landing page, signup page, and login page now follow one theme-aware SaaS
              system with stronger product storytelling, bento interactions, and scroll-driven
              motion.
            </p>

            <div className="hero-actions mt-8">
              <Link href="/signup" className="button button-cream">
                Start with signup
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
