"use client";

import { useEffect } from "react";

const trustSignals = [
  "Linear",
  "Vercel",
  "Supabase",
  "HashiCorp",
  "Ramp",
  "PostHog",
];

const featureCards = [
  {
    title: "Beautiful uptime monitoring",
    description:
      "Track websites, APIs, and jobs from multiple regions with a polished dashboard your team actually enjoys using.",
  },
  {
    title: "Status pages that feel premium",
    description:
      "Publish incident updates instantly with clear communication, better trust, and a branded customer experience.",
  },
  {
    title: "On-call without the noise",
    description:
      "Route alerts with schedules, escalation rules, and enriched context so the right person gets the right signal.",
  },
  {
    title: "Fast incident diagnostics",
    description:
      "Correlate latency, SSL, heartbeat, and regional checks to understand whether an issue is local, global, or provider-related.",
  },
];

const metrics = [
  { label: "Active monitors", value: "50k+" },
  { label: "Average detection", value: "30 sec" },
  { label: "Operational confidence", value: "99.99%" },
  { label: "Global regions", value: "18" },
];

const workflowCards = [
  {
    eyebrow: "Detect",
    title: "Know the second something breaks",
    description:
      "Run fast checks, monitor key flows, and get warned before customers start opening support tickets.",
  },
  {
    eyebrow: "Respond",
    title: "Triage incidents with cleaner context",
    description:
      "Move from alert to action with a timeline, regional hints, and routing logic designed for modern SaaS teams.",
  },
  {
    eyebrow: "Communicate",
    title: "Update customers without scrambling",
    description:
      "Auto-post status changes, share incident progress, and keep communication calm during high-pressure moments.",
  },
];

const faqs = [
  {
    question: "What can I monitor with Better Uptime?",
    answer:
      "You can monitor websites, APIs, cron jobs, servers, SSL certificates, heartbeats, and other reliability-critical flows.",
  },
  {
    question: "Does it include status pages and incident communication?",
    answer:
      "Yes. Better Uptime can pair monitoring with branded status pages and clean incident updates for your customers.",
  },
  {
    question: "Is this landing page styled for SaaS products?",
    answer:
      "Yes. The typography, spacing, animation, and UI cards are tuned to feel closer to a modern premium SaaS homepage.",
  },
];

const logoItems = [...trustSignals, ...trustSignals];

export default function Home() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative overflow-hidden bg-slate-950 text-slate-950">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.35),transparent_32%),linear-gradient(180deg,#1479d7_0%,#0f5fc1_44%,#07111f_100%)] text-white">
        <div className="hero-grid absolute inset-0 opacity-40" />
        <div className="hero-noise absolute inset-0 opacity-50" />
        <div className="absolute left-[-8rem] top-24 h-72 w-72 rounded-full bg-cyan-300/15 blur-3xl" />
        <div className="absolute right-[-8rem] top-10 h-80 w-80 rounded-full bg-indigo-300/20 blur-3xl" />

        <div className="relative mx-auto min-h-screen max-w-7xl px-6 py-6 sm:px-10 lg:px-12">
          <header
            data-reveal
            className="reveal-block flex items-center justify-between rounded-full border border-white/15 bg-white/8 px-5 py-3 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3">
              <div className="logo-mark">
                <span className="logo-core">B</span>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white">
                  Better Uptime
                </p>
                <p className="text-xs text-white/65">
                  Reliability for modern SaaS products
                </p>
              </div>
            </div>

            <nav className="hidden items-center gap-8 text-sm text-white/80 md:flex">
              <a className="transition hover:text-white" href="#features">
                Features
              </a>
              <a className="transition hover:text-white" href="#platform">
                Platform
              </a>
              <a className="transition hover:text-white" href="#faq">
                FAQ
              </a>
            </nav>

            <a
              href="#cta"
              className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-sky-700 transition hover:scale-[1.02] hover:bg-sky-50"
            >
              Start free
            </a>
          </header>

          <div className="grid items-center gap-16 py-16 lg:grid-cols-[1.04fr_0.96fr] lg:py-20">
            <div className="max-w-3xl space-y-8">
              <div
                data-reveal
                className="reveal-block inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-white/90 shadow-[0_10px_40px_rgba(12,28,58,0.22)] backdrop-blur-xl"
              >
                <span className="status-dot" />
                Real-time monitoring, on-call, and status communication
              </div>

              <div data-reveal className="reveal-block space-y-6">
                <h1 className="hero-title max-w-4xl text-balance text-5xl font-semibold tracking-[-0.09em] sm:text-6xl lg:text-7xl">
                  The most elegant way to monitor uptime for your SaaS product.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-white/76 sm:text-xl">
                  Better Uptime gives modern teams a calm reliability layer with
                  incident detection, beautiful status pages, smarter alerts, and
                  the kind of polished UX your product deserves.
                </p>
              </div>

              <div
                data-reveal
                className="reveal-block flex flex-col gap-4 sm:flex-row"
              >
                <a
                  href="#cta"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-sky-700 transition hover:-translate-y-0.5 hover:bg-sky-50"
                >
                  Book a demo
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/8 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/12"
                >
                  Explore features
                </a>
              </div>

              <div
                data-reveal
                className="reveal-block grid gap-4 sm:grid-cols-3"
              >
                {[
                  ["99.99%", "Reliable customer experience"],
                  ["30 sec", "Fast incident detection"],
                  ["24/7", "Always-on monitoring"],
                ].map(([value, label], index) => (
                  <div
                    key={value}
                    className="glass-card hover-lift"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <p className="text-3xl font-semibold tracking-[-0.06em] text-white">
                      {value}
                    </p>
                    <p className="mt-2 text-sm text-white/70">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div data-reveal className="reveal-block relative">
              <div className="floating-badge left-0 top-12 hidden md:flex">
                18 regions live
              </div>
              <div className="floating-badge right-4 top-0 hidden md:flex">
                Status page ready
              </div>

              <div className="dashboard-shell mx-auto max-w-xl">
                <div className="dashboard-grid absolute inset-0 rounded-[2rem] opacity-70" />
                <div className="dashboard-card relative rounded-[1.65rem] p-5">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">
                        Live command center
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-slate-950">
                        Infrastructure pulse
                      </h2>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-600">
                      All systems operational
                    </span>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                    <div className="panel-dark animated-grid space-y-4 rounded-[1.4rem] p-5 text-white">
                      <div className="flex items-center justify-between text-sm text-white/60">
                        <span>Incident timeline</span>
                        <span>Updated 2 min ago</span>
                      </div>

                      <div className="rounded-2xl border border-white/8 bg-white/8 p-4 backdrop-blur-sm">
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-medium">API latency spike</p>
                          <span className="rounded-full bg-amber-300/20 px-2 py-1 text-xs text-amber-200">
                            Investigating
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-white/68">
                          Europe region crossed threshold on the events API
                          monitor.
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        {[
                          ["US East", "182ms"],
                          ["Europe", "624ms"],
                          ["APAC", "214ms"],
                        ].map(([region, latency], index) => (
                          <div
                            key={region}
                            className="rounded-2xl border border-white/7 bg-white/8 p-3"
                            style={{ animationDelay: `${index * 160}ms` }}
                          >
                            <p className="text-xs text-white/55">{region}</p>
                            <p
                              className={`mt-2 text-xl font-semibold ${
                                region === "Europe" ? "text-amber-200" : ""
                              }`}
                            >
                              {latency}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="hover-lift rounded-[1.4rem] bg-white p-4 shadow-[0_16px_30px_rgba(15,23,42,0.08)] ring-1 ring-slate-200">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                          Active monitors
                        </p>
                        <p className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-950">
                          128
                        </p>
                        <p className="mt-2 text-sm text-slate-500">
                          Web, API, heartbeat, SSL, and keyword checks.
                        </p>
                      </div>

                      <div className="hover-lift rounded-[1.4rem] bg-gradient-to-br from-sky-500 via-cyan-400 to-indigo-500 p-4 text-white shadow-[0_18px_38px_rgba(37,99,235,0.28)]">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
                          Alert routing
                        </p>
                        <p className="mt-3 text-2xl font-semibold tracking-[-0.05em]">
                          Pager, Slack, SMS, and call escalations
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <span className="rounded-full bg-white/20 px-3 py-1 text-xs">
                            Smart schedules
                          </span>
                          <span className="rounded-full bg-white/20 px-3 py-1 text-xs">
                            Deduping
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {[
                      ["SSL status", "Valid for 37 days"],
                      ["Status page", "Auto-post enabled"],
                      ["Heartbeat jobs", "42 healthy"],
                    ].map(([label, value], index) => (
                      <div
                        key={label}
                        className="hover-lift rounded-2xl bg-white p-4 ring-1 ring-slate-200"
                        style={{ transitionDelay: `${index * 80}ms` }}
                      >
                        <p className="text-xs text-slate-400">{label}</p>
                        <p className="mt-2 font-semibold text-slate-950">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-10 max-w-7xl px-6 sm:px-10 lg:px-12">
        <div
          data-reveal
          className="reveal-block overflow-hidden rounded-[2rem] border border-white/60 bg-white/90 px-6 py-5 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:px-8"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-sm font-medium text-slate-500">
              Trusted by fast-moving product and platform teams
            </p>
            <div className="logo-marquee">
              <div className="logo-track">
                {logoItems.map((item, index) => (
                  <span key={`${item}-${index}`} className="logo-chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="relative mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-12"
      >
        <div className="absolute inset-x-0 top-16 -z-10 h-96 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_45%)]" />
        <div data-reveal className="reveal-block max-w-2xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-600">
            Essential workflows
          </p>
          <h2 className="section-title text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl">
            Everything your SaaS team needs to monitor, respond, and communicate.
          </h2>
          <p className="text-lg leading-8 text-slate-300">
            Better spacing, cleaner typography, motion, and layered cards make
            the page feel closer to a premium software launch.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-6 md:grid-cols-2">
            {featureCards.map((card, index) => (
              <article
                key={card.title}
                data-reveal
                className="reveal-block feature-card hover-lift rounded-[2rem] border border-white/8 bg-white/6 p-7 text-white shadow-[0_18px_40px_rgba(3,7,18,0.28)] backdrop-blur-xl"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="icon-orb mb-5" />
                <h3 className="text-2xl font-semibold tracking-[-0.05em]">
                  {card.title}
                </h3>
                <p className="mt-4 leading-7 text-white/70">
                  {card.description}
                </p>
              </article>
            ))}
          </div>

          <aside
            data-reveal
            className="reveal-block rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(15,23,42,0.96)_0%,rgba(2,6,23,0.98)_100%)] p-8 text-white shadow-[0_28px_70px_rgba(3,7,18,0.42)]"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
              Operator view
            </p>
            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em]">
              Calm visuals, richer signal, less operational chaos.
            </h3>
            <p className="mt-4 max-w-md leading-7 text-white/66">
              Bring monitors, incidents, updates, and escalations into a single
              command surface that looks and feels premium.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Global checks with region-level visibility",
                "Status pages with customer-ready updates",
                "Escalation policies for lean engineering teams",
                "SSL, cron, heartbeat, and API coverage",
              ].map((item, index) => (
                <div
                  key={item}
                  className="hover-lift flex items-start gap-3 rounded-2xl border border-white/10 bg-white/6 p-4"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-300" />
                  <p className="text-sm leading-6 text-white/80">{item}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section id="platform" className="relative bg-white">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 sm:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-12">
          <div data-reveal className="reveal-block space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-600">
              Platform value
            </p>
            <h2 className="section-title text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">
              Built for teams that want enterprise-grade reliability with modern
              product aesthetics.
            </h2>
            <p className="text-lg leading-8 text-slate-600">
              This version leans harder into SaaS polish: better hierarchy,
              stronger typography, animated logos, reveal-on-scroll, and more
              alive UI surfaces.
            </p>
            <a
              href="#cta"
              className="inline-flex w-fit items-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Launch your monitoring stack
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {metrics.map((metric, index) => (
              <div
                key={metric.label}
                data-reveal
                className="reveal-block metric-card hover-lift rounded-[1.8rem] border border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#eef7ff_100%)] p-6"
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <p className="text-sm text-slate-500">{metric.label}</p>
                <p className="mt-3 text-4xl font-semibold tracking-[-0.07em] text-slate-950">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-3">
          {workflowCards.map((item, index) => (
            <article
              key={item.title}
              data-reveal
              className={`reveal-block hover-lift rounded-[2rem] p-8 ${
                index === 1
                  ? "bg-[linear-gradient(180deg,#0f172a_0%,#111827_100%)] text-white shadow-[0_26px_60px_rgba(15,23,42,0.35)]"
                  : "border border-white/8 bg-white/6 text-white shadow-[0_18px_40px_rgba(3,7,18,0.24)] backdrop-blur-xl"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <p
                className={`text-sm font-semibold uppercase tracking-[0.26em] ${
                  index === 1 ? "text-sky-300" : "text-sky-400"
                }`}
              >
                {item.eyebrow}
              </p>
              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em]">
                {item.title}
              </h3>
              <p
                className={`mt-4 leading-7 ${
                  index === 1 ? "text-white/72" : "text-white/70"
                }`}
              >
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="cta" className="mx-auto max-w-7xl px-6 pb-24 sm:px-10 lg:px-12">
        <div
          data-reveal
          className="reveal-block overflow-hidden rounded-[2.5rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.22),transparent_30%),linear-gradient(135deg,#020617_0%,#0f172a_35%,#1d4ed8_100%)] px-8 py-10 text-white shadow-[0_30px_80px_rgba(2,6,23,0.45)] sm:px-10 lg:px-12 lg:py-14"
        >
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">
                Ready to launch
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">
                Turn your uptime story into a real product advantage.
              </h2>
              <p className="mt-4 text-lg leading-8 text-white/74">
                A refined SaaS landing should feel premium before the user even
                clicks. This one now has stronger motion, hierarchy, and visual
                depth throughout the page.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-sky-700 transition hover:-translate-y-0.5 hover:bg-sky-50"
              >
                Start free trial
              </a>
              <a
                href="#faq"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-center text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/14"
              >
                See FAQs
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-7xl px-6 pb-24 sm:px-10 lg:px-12">
        <div data-reveal className="reveal-block max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-400">
            Frequently asked questions
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl">
            Answers for teams evaluating the platform.
          </h2>
        </div>

        <div className="mt-10 space-y-4">
          {faqs.map((item, index) => (
            <article
              key={item.question}
              data-reveal
              className="reveal-block hover-lift rounded-[1.75rem] border border-white/8 bg-white/6 px-6 py-5 text-white shadow-[0_12px_30px_rgba(2,6,23,0.2)] backdrop-blur-xl"
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{item.question}</h3>
                  <p className="mt-3 max-w-3xl leading-7 text-white/68">
                    {item.answer}
                  </p>
                </div>
                <span className="mt-1 text-2xl leading-none text-white/30">
                  +
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/8 bg-[#020617] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div>
            <div className="flex items-center gap-3">
              <div className="logo-mark scale-[0.78]">
                <span className="logo-core">B</span>
              </div>
              <p className="text-xl font-semibold tracking-[-0.05em]">
                Better Uptime
              </p>
            </div>
            <p className="mt-3 text-sm text-white/55">
              SaaS reliability, monitoring, and incident communication.
            </p>
          </div>

          <div className="flex flex-wrap gap-5 text-sm text-white/65">
            <a href="#features">Features</a>
            <a href="#platform">Platform</a>
            <a href="#faq">FAQ</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
