"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect } from "react";

const flipWords = ["uptime", "incidents", "alerts", "status pages"];

const servicePoints = [
  {
    title: "Global monitoring",
    description:
      "Monitor websites, APIs, SSL certificates, and cron jobs from one clean dashboard.",
    badge: "01",
  },
  {
    title: "Incident response",
    description:
      "Route alerts fast with better ownership, escalation paths, and calmer on-call workflows.",
    badge: "02",
  },
  {
    title: "Status updates",
    description:
      "Share polished customer-facing updates through a branded and reliable status experience.",
    badge: "03",
  },
];

const showcaseCards = [
  {
    title: "Command center",
    description:
      "A calmer workspace for incidents, response time, and customer communication.",
    tone: "dark",
  },
  {
    title: "Status pages",
    description:
      "Polished public updates that feel aligned with a premium SaaS brand.",
    tone: "light",
  },
];

const featureCards = [
  {
    title: "Regional checks",
    description:
      "See whether an issue is local, regional, or fully global in seconds.",
  },
  {
    title: "Smart routing",
    description:
      "Escalate alerts with ownership, schedules, and context built in.",
  },
  {
    title: "Customer trust",
    description:
      "Turn incidents into clear updates without scrambling across tools.",
  },
];

const metrics = [
  { value: "99.99%", label: "availability confidence" },
  { value: "30 sec", label: "average detection" },
  { value: "18", label: "global regions" },
];

const faqs = [
  {
    question: "What can Better Uptime monitor?",
    answer:
      "Websites, APIs, SSL certificates, cron jobs, ports, and server heartbeats.",
  },
  {
    question: "Does it include status pages?",
    answer:
      "Yes. You can pair monitoring with customer-facing status pages and incident communication.",
  },
  {
    question: "Is this page aligned to the current theme?",
    answer:
      "Yes. The palette stays with the same blue, warm beige, and dark accent theme while improving alignment and motion.",
  },
];

const partnerLogos = [
  { name: "Next.js", src: "/next.svg", width: 82, height: 18, dark: true },
  { name: "Vercel", src: "/vercel.svg", width: 88, height: 18, dark: true },
  {
    name: "Turborepo",
    src: "/turborepo-dark.svg",
    width: 104,
    height: 18,
    dark: true,
  },
  { name: "Globe", src: "/globe.svg", width: 18, height: 18, dark: false },
  { name: "Window", src: "/window.svg", width: 18, height: 18, dark: false },
  {
    name: "Documents",
    src: "/file-text.svg",
    width: 18,
    height: 18,
    dark: false,
  },
];

const heroSignals = [
  { label: "API latency", value: "146 ms", className: "hero-signal-left-top" },
  { label: "Status page", value: "Live sync", className: "hero-signal-right-top" },
  { label: "Escalation", value: "2 responders", className: "hero-signal-left-bottom" },
  { label: "SSL checks", value: "Healthy", className: "hero-signal-right-bottom" },
];

const heroParticles = Array.from({ length: 24 }, (_, index) => {
  const style = {
    "--particle-left": `${(index * 11 + 7) % 100}%`,
    "--particle-top": `${(index * 17 + 9) % 82}%`,
    "--particle-size": `${2 + (index % 3)}px`,
    "--particle-duration": `${11 + (index % 6) * 2}s`,
    "--particle-delay": `${index * -0.7}s`,
    "--particle-drift-x": `${((index % 5) - 2) * 16}px`,
    "--particle-drift-y": `${((index % 4) - 1.5) * 18}px`,
    "--particle-opacity": `${0.35 + (index % 4) * 0.12}`,
  } as CSSProperties;

  return { id: index, style };
});

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
      { threshold: 0.14, rootMargin: "0px 0px -10% 0px" },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-[#f6f1ea] text-slate-950">
      <section className="hero-section relative overflow-hidden bg-[linear-gradient(180deg,#2fa8f8_0%,#2398ee_78%,#f6f1ea_100%)] text-white">
        <div className="hero-aurora hero-aurora-one absolute inset-0" />
        <div className="hero-aurora hero-aurora-two absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_30%)]" />
        <div className="hero-grid absolute inset-0 opacity-35" />

        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {heroParticles.map((particle) => (
            <span
              key={particle.id}
              className="hero-particle"
              style={particle.style}
            />
          ))}
        </div>

        <div className="mx-auto max-w-6xl px-6 pb-18 pt-6 sm:px-8 lg:px-10">
          <header
            data-reveal
            className="reveal-block reveal-down mx-auto flex max-w-5xl flex-col gap-4 rounded-[28px] border border-white/18 bg-white/10 px-4 py-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-white text-[11px] font-semibold tracking-[0.18em] text-sky-600 shadow-[0_12px_24px_rgba(255,255,255,0.24)]">
                BU
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em]">
                  Better Uptime
                </p>
                <p className="text-[10px] text-white/70">
                  SaaS reliability platform
                </p>
              </div>
            </div>

            <nav className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-white/78">
              <a className="nav-chip" href="#features">
                Features
              </a>
              <a className="nav-chip" href="#platform">
                Platform
              </a>
              <a className="nav-chip" href="#faq">
                FAQ
              </a>
              <a
                href="#cta"
                className="micro-bounce rounded-full border border-white/20 bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-700 transition hover:bg-sky-50"
              >
                Start free
              </a>
            </nav>
          </header>

          <div className="mx-auto grid max-w-5xl items-center gap-10 pt-14 sm:pt-18 lg:grid-cols-[1.02fr_0.98fr] lg:pt-20">
            <div className="text-center lg:text-left">
              <div
                data-reveal
                className="reveal-block reveal-up inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-3 py-1.5 text-[11px] font-medium"
              >
                <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
                Monitoring, incidents, and status pages
              </div>

              <div data-reveal className="reveal-block reveal-up">
                <h1 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.07em] sm:text-5xl lg:text-[62px] lg:leading-[1.02]">
                  Your gateway to better{" "}
                  <span className="flip-wrap inline-flex h-[1.1em] align-bottom">
                    <span className="flip-track">
                      {flipWords.map((word, index) => (
                        <span key={`${word}-${index}`} className="flip-item">
                          {word}
                        </span>
                      ))}
                      <span className="flip-item">{flipWords[0]}</span>
                    </span>
                  </span>{" "}
                  for modern products.
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-[13px] leading-7 text-white/82 lg:mx-0 lg:max-w-lg lg:text-[14px]">
                  Detect incidents early, coordinate response faster, and publish
                  polished status updates from one calm control center.
                </p>
              </div>

              <div
                data-reveal
                className="reveal-block reveal-up mt-7 flex flex-col items-center gap-3 sm:flex-row lg:items-start"
              >
                <a
                  href="#cta"
                  className="micro-bounce rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-900"
                >
                  Book a demo
                </a>
                <a
                  href="#features"
                  className="micro-bounce rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15"
                >
                  Explore features
                </a>
              </div>

              <div
                data-reveal
                className="reveal-block reveal-up mt-10 grid gap-3 sm:grid-cols-3"
              >
                {metrics.map((item, index) => (
                  <div
                    key={item.label}
                    className="hero-metric interactive-card rounded-[22px] border border-white/14 bg-white/10 px-4 py-4 backdrop-blur-md"
                    style={{ transitionDelay: `${index * 70}ms` }}
                  >
                    <p className="text-xl font-semibold tracking-[-0.05em]">
                      {item.value}
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/66">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              data-reveal
              className="reveal-block reveal-scale relative mx-auto w-full max-w-[460px] pt-6"
            >
              {heroSignals.map((signal) => (
                <div
                  key={signal.label}
                  className={`hero-signal interactive-card ${signal.className}`}
                >
                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                    {signal.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-950">
                    {signal.value}
                  </p>
                </div>
              ))}

              <div className="hero-spotlight absolute inset-x-12 bottom-4 h-16 rounded-full bg-white/20 blur-3xl" />

              <div className="relative mx-auto max-w-[350px] sm:max-w-[390px]">
                <div className="hero-halo absolute inset-x-10 top-6 h-20 rounded-full bg-white/16 blur-3xl" />
                <div className="mx-auto h-10 w-28 rounded-full bg-white/18 blur-2xl" />
                <div className="reference-tower-shell relative z-10 mx-auto mt-2 h-[420px] rounded-t-[180px] border border-white/30 p-4 sm:h-[470px]">
                  <div className="absolute inset-x-8 top-6 h-5 rounded-full bg-white/70" />
                  <div className="reference-tower h-full rounded-t-[160px] rounded-b-[34px] border border-white/30 p-5">
                    <div className="reference-tower-grid h-full rounded-t-[140px] rounded-b-[26px] border border-white/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            data-reveal
            className="reveal-block reveal-up mx-auto mt-14 max-w-5xl rounded-[30px] border border-white/16 bg-white/10 px-5 py-5 backdrop-blur-md"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/72">
                  Works with your stack
                </p>
                <p className="mt-2 text-sm text-white/82">
                  Logo-backed integrations and tools in one motion-aware surface.
                </p>
              </div>
              <div className="logo-strip-mask relative overflow-hidden md:max-w-[420px]">
                <div className="logo-strip-track">
                  {[...partnerLogos, ...partnerLogos].map((logo, index) => (
                    <div key={`${logo.name}-${index}`} className="logo-pill">
                      <Image
                        src={logo.src}
                        alt={logo.name}
                        width={logo.width}
                        height={logo.height}
                        className={logo.dark ? "brightness-0 invert" : ""}
                      />
                      <span className="text-[11px] font-medium text-white/74">
                        {logo.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <a href="#features" className="scroll-cue">
              <span className="scroll-cue-dot" />
              Scroll to explore
            </a>
          </div>
        </div>
      </section>

      <section className="relative -mt-6 rounded-t-[38px] bg-[#f6f1ea]">
        <div className="mx-auto max-w-5xl px-6 py-14 sm:px-8 lg:px-10">
          <div
            data-reveal
            className="reveal-block reveal-up mx-auto max-w-xl text-center"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              Experience innovative reliability
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-3xl">
              Infrastructure monitoring with a clean product feel.
            </h2>
            <p className="mt-4 text-[13px] leading-7 text-slate-600">
              Built for SaaS teams that need stronger uptime visibility and more
              trustworthy incident communication.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {servicePoints.map((item, index) => (
              <article
                key={item.title}
                data-reveal
                className="reveal-block reveal-up ref-card interactive-card px-5 py-5"
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="service-badge">{item.badge}</div>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>
                <h3 className="mt-5 text-sm font-semibold tracking-[-0.03em] text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-[13px] leading-6 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          <div
            id="features"
            data-reveal
            className="reveal-block reveal-up mt-14 rounded-[30px] border border-[#eadfce] bg-white px-6 py-6 shadow-[0_18px_50px_rgba(51,65,85,0.05)] sm:px-8"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Better way to monitor
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-slate-950">
                  A cleaner SaaS landing aligned to your reference.
                </h3>
              </div>
              <a
                href="#platform"
                className="micro-bounce w-fit rounded-full bg-slate-950 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white"
              >
                View platform
              </a>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[26px] bg-[linear-gradient(180deg,#eff7ff_0%,#dbeeff_100%)] p-5">
                <div className="status-surface rounded-[22px] bg-[#2fa8f8] p-5 text-white shadow-[0_18px_40px_rgba(47,168,248,0.26)]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75">
                    Live incidents
                  </p>
                  <h4 className="mt-3 text-lg font-semibold tracking-[-0.04em]">
                    One command center for alerts, checks, and status.
                  </h4>
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {[
                      ["API", "Degraded"],
                      ["SSL", "Healthy"],
                      ["Cron", "Healthy"],
                    ].map(([name, state]) => (
                      <div
                        key={name}
                        className="interactive-card rounded-2xl bg-white/12 px-3 py-3 backdrop-blur-sm"
                      >
                        <p className="text-[10px] uppercase tracking-[0.15em] text-white/60">
                          {name}
                        </p>
                        <p className="mt-2 text-xs font-semibold">{state}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {showcaseCards.map((card, index) => (
                  <div
                    key={card.title}
                    data-reveal
                    className={`reveal-block reveal-up interactive-card rounded-[26px] p-5 ${
                      card.tone === "dark"
                        ? "bg-[linear-gradient(180deg,#c08c57_0%,#8c5f33_100%)] text-white"
                        : "bg-[linear-gradient(180deg,#d8e8f8_0%,#adcceb_100%)] text-slate-950"
                    }`}
                    style={{ transitionDelay: `${index * 80}ms` }}
                  >
                    <div
                      className={`showcase-surface mb-8 h-28 rounded-[22px] ${
                        card.tone === "dark"
                          ? "bg-[linear-gradient(135deg,rgba(255,255,255,0.18),rgba(255,255,255,0.06))]"
                          : "bg-[linear-gradient(135deg,#ffffff_0%,rgba(255,255,255,0.45)_100%)]"
                      }`}
                    />
                    <h4 className="text-sm font-semibold tracking-[-0.03em]">
                      {card.title}
                    </h4>
                    <p
                      className={`mt-2 text-[12px] leading-6 ${
                        card.tone === "dark" ? "text-white/75" : "text-slate-600"
                      }`}
                    >
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="platform" className="bg-white">
        <div className="mx-auto grid max-w-5xl gap-8 px-6 py-16 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
          <div data-reveal className="reveal-block reveal-left max-w-md">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              Performance and trust
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-3xl">
              Proper spacing, warmer sections, and cleaner rhythm.
            </h2>
            <p className="mt-4 text-[13px] leading-7 text-slate-600">
              This composition is more disciplined now: clearer grids, softer
              cards, stronger blue areas, and much better vertical alignment.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {metrics.map((item, index) => (
              <div
                key={item.label}
                data-reveal
                className="reveal-block reveal-up interactive-card rounded-[26px] border border-slate-200 bg-[#faf7f2] px-5 py-5"
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <p className="text-2xl font-semibold tracking-[-0.05em] text-slate-950">
                  {item.value}
                </p>
                <p className="mt-2 text-[12px] leading-6 text-slate-500">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6f1ea]">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 lg:px-10">
          <div
            data-reveal
            className="reveal-block reveal-up mx-auto max-w-xl text-center"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              Feature logs
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-3xl">
              What&apos;s included for modern reliability teams.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {featureCards.map((item, index) => (
              <article
                key={item.title}
                data-reveal
                className="reveal-block reveal-up interactive-card rounded-[26px] border border-[#eadfce] bg-white px-5 py-5"
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <div className="feature-surface mb-5 h-36 rounded-[22px] bg-[linear-gradient(135deg,#ddecfb_0%,#b5d8f7_100%)]" />
                <h3 className="text-sm font-semibold tracking-[-0.03em] text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-[13px] leading-6 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="cta" className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 lg:px-10">
          <div
            data-reveal
            className="reveal-block reveal-scale grid overflow-hidden rounded-[30px] bg-[linear-gradient(135deg,#2fa8f8_0%,#168fe7_52%,#8e6135_52%,#6f4d2e_100%)] lg:grid-cols-[1fr_0.95fr]"
          >
            <div className="px-7 py-8 text-white sm:px-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75">
                Schedule a consultation
              </p>
              <h2 className="mt-3 max-w-md text-2xl font-semibold tracking-[-0.05em] sm:text-3xl">
                Launch a cleaner uptime experience for your product team.
              </h2>
              <p className="mt-4 max-w-md text-[13px] leading-7 text-white/78">
                Better Uptime helps teams move from alerting to customer trust
                with fewer tools and a more premium operating surface.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/"
                  className="micro-bounce rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-sky-700 transition hover:bg-sky-50"
                >
                  Start free trial
                </a>
                <a
                  href="#faq"
                  className="micro-bounce rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  See FAQs
                </a>
              </div>
            </div>

            <div className="consult-visual min-h-[260px]" />
          </div>
        </div>
      </section>

      <section id="faq" className="bg-[#f6f1ea]">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 lg:px-10">
          <div data-reveal className="reveal-block reveal-up">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              Frequently asked
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-3xl">
              Questions and answers.
            </h2>
          </div>

          <div className="mt-8 space-y-4">
            {faqs.map((item, index) => (
              <article
                key={item.question}
                data-reveal
                className="reveal-block reveal-up interactive-card rounded-[24px] border border-[#eadfce] bg-white px-5 py-5"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-950">
                      {item.question}
                    </h3>
                    <p className="mt-3 text-[13px] leading-6 text-slate-600">
                      {item.answer}
                    </p>
                  </div>
                  <span className="faq-plus text-xl leading-none text-slate-300">
                    +
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#15151b] text-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-10">
          <div>
            <p className="text-4xl font-medium tracking-[-0.06em] sm:text-5xl">
              Better Uptime
            </p>
            <p className="mt-3 text-[12px] text-white/55">
              Monitoring, incidents, and status pages for SaaS teams.
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
