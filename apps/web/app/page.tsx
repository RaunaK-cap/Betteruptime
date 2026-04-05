"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useEffectEvent, useRef } from "react";

const links = [
  ["Platform", "#platform"],
  ["Workflow", "#workflow"],
  ["Pricing", "#pricing"],
  ["FAQ", "#faq"],
] as const;

const stats = [
  ["30 sec", "incident detection"],
  ["99.99%", "service confidence"],
  ["18", "global regions"],
] as const;

const logos = [
  { name: "Next.js", src: "/next.svg", width: 82, height: 18, dark: true },
  { name: "Vercel", src: "/vercel.svg", width: 88, height: 18, dark: true },
  { name: "Turborepo", src: "/turborepo-dark.svg", width: 104, height: 18, dark: true },
  { name: "Globe", src: "/globe.svg", width: 18, height: 18, dark: false },
];

const faqs = [
  [
    "What does Better Uptime monitor?",
    "Websites, APIs, SSL certificates, cron jobs, ports, and server heartbeats from multiple regions.",
  ],
  [
    "Does the redesign include animation?",
    "Yes. It includes scroll reveal, floating hero motion, marquee movement, and hover micro-interactions with reduced-motion fallbacks.",
  ],
  [
    "Can this support a SaaS product style?",
    "That is the point of the redesign: stronger hierarchy, cleaner cards, richer gradients, and more product-led storytelling.",
  ],
] as const;

const particles = Array.from({ length: 16 }, (_, index) => ({
  id: index,
  style: {
    "--particle-left": `${(index * 11 + 9) % 100}%`,
    "--particle-top": `${(index * 17 + 6) % 72}%`,
    "--particle-size": `${2 + (index % 3)}px`,
    "--particle-delay": `${index * -0.7}s`,
    "--particle-duration": `${9 + (index % 4) * 2}s`,
    "--particle-drift-x": `${((index % 5) - 2) * 12}px`,
    "--particle-drift-y": `${((index % 4) - 1.5) * 14}px`,
  } as CSSProperties,
}));

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  const tilt = useEffectEvent((event: PointerEvent) => {
    const node = heroRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    node.style.setProperty("--rotate-x", `${(0.5 - y) * 10}deg`);
    node.style.setProperty("--rotate-y", `${(x - 0.5) * 14}deg`);
    node.style.setProperty("--glow-x", `${x * 100}%`);
    node.style.setProperty("--glow-y", `${y * 100}%`);
  });

  const resetTilt = useEffectEvent(() => {
    const node = heroRef.current;
    if (!node) return;
    node.style.setProperty("--rotate-x", "0deg");
    node.style.setProperty("--rotate-y", "0deg");
    node.style.setProperty("--glow-x", "50%");
    node.style.setProperty("--glow-y", "42%");
  });

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
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
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = heroRef.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (event: PointerEvent) => tilt(event);
    const onLeave = () => resetTilt();
    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, [resetTilt, tilt]);

  return (
    <main className="overflow-hidden bg-[var(--surface-0)] text-[var(--ink-1)]">
      <section className="hero-shell relative overflow-hidden">
        <div className="hero-aurora hero-aurora-one absolute inset-0" />
        <div className="hero-aurora hero-aurora-two absolute inset-0" />
        <div className="hero-mesh absolute inset-0 opacity-45" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {particles.map((particle) => (
            <span key={particle.id} className="hero-particle" style={particle.style} />
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-18 pt-6 sm:px-8 lg:px-10">
          <header
            data-reveal
            className="reveal-block mx-auto flex max-w-6xl flex-col gap-4 rounded-[30px] border border-white/18 bg-white/10 px-4 py-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-white text-[11px] font-semibold tracking-[0.22em] text-[#4c66ff]">BU</div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white">Better Uptime</p>
                <p className="text-[11px] text-white/68">Reliability suite for modern SaaS teams</p>
              </div>
            </div>
            <nav className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-white/78">
              {links.map(([label, href]) => (
                <a key={label} className="nav-chip" href={href}>{label}</a>
              ))}
              <a href="#pricing" className="button button-light">Start free</a>
            </nav>
          </header>

          <div className="mx-auto grid max-w-6xl items-center gap-14 pt-14 lg:grid-cols-[0.92fr_1.08fr] lg:pt-20">
            <div className="text-center lg:text-left">
              <div data-reveal className="reveal-block inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/84 backdrop-blur-xl">
                <span className="signal-dot bg-white" />
                Monitoring, on-call, and status pages
              </div>
              <div data-reveal className="reveal-block" style={{ transitionDelay: "80ms" }}>
                <h1 className="mt-6 max-w-2xl text-balance text-5xl font-semibold tracking-[-0.08em] text-white sm:text-6xl lg:text-[74px] lg:leading-[0.97]">
                  Make your product look as reliable as it runs.
                </h1>
                <p className="mx-auto mt-5 max-w-xl text-[15px] leading-8 text-white/76 lg:mx-0">
                  Better Uptime keeps checks, incidents, responder workflows, and customer communication inside one polished operating surface.
                </p>
              </div>
              <div data-reveal className="reveal-block mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start" style={{ transitionDelay: "140ms" }}>
                <a href="#pricing" className="button button-dark">Book a demo</a>
                <a href="#platform" className="button button-ghost">Explore platform</a>
              </div>
              <div data-reveal className="reveal-block mt-10 grid gap-3 sm:grid-cols-3" style={{ transitionDelay: "220ms" }}>
                {stats.map(([value, label]) => (
                  <div key={label} className="glass-card hover-lift rounded-[24px] px-4 py-4">
                    <p className="text-2xl font-semibold tracking-[-0.06em] text-white">{value}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/60">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div data-reveal className="reveal-block" style={{ transitionDelay: "180ms" }}>
              <div className="relative mx-auto max-w-[580px]">
                <div className="hero-chip hero-chip-top-left">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">API latency</p>
                  <p className="mt-1 text-sm font-semibold text-slate-950">142 ms</p>
                  <p className="mt-1 text-[11px] text-slate-500">Live from us-east</p>
                </div>
                <div className="hero-chip hero-chip-top-right">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Status page</p>
                  <p className="mt-1 text-sm font-semibold text-slate-950">Synced</p>
                  <p className="mt-1 text-[11px] text-slate-500">Customer updates ready</p>
                </div>
                <div className="hero-chip hero-chip-bottom-left">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Escalation</p>
                  <p className="mt-1 text-sm font-semibold text-slate-950">2 responders</p>
                  <p className="mt-1 text-[11px] text-slate-500">Routing in progress</p>
                </div>
                <div className="hero-chip hero-chip-bottom-right">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Heartbeat</p>
                  <p className="mt-1 text-sm font-semibold text-slate-950">Healthy</p>
                  <p className="mt-1 text-[11px] text-slate-500">Last ping 4s ago</p>
                </div>
                <div className="hero-glow absolute inset-x-12 top-14 h-32 rounded-full" />
                <div ref={heroRef} className="hero-stage">
                  <div className="hero-stage-inner">
                    <div className="hero-stage-bar">
                      <div className="flex items-center gap-2">
                        <span className="stage-dot bg-[#ff8d63]" />
                        <span className="stage-dot bg-[#ffd166]" />
                        <span className="stage-dot bg-[#65e4a4]" />
                      </div>
                      <span className="rounded-full border border-slate-200 px-3 py-1 text-[10px] font-medium text-slate-500">
                        betteruptime.app/mission-control
                      </span>
                    </div>
                    <div className="hero-screen">
                      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                        <div className="screen-panel screen-panel-primary">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5d73ff]">Mission control</p>
                              <h2 className="mt-3 text-xl font-semibold tracking-[-0.05em] text-slate-950">Incidents, status, and response notes in one timeline.</h2>
                            </div>
                            <div className="pill-badge"><span className="signal-dot bg-[#47d18c]" />24 healthy</div>
                          </div>
                          <div className="mt-6 grid gap-3 sm:grid-cols-3">
                            {["API drift", "Status synced", "Escalation active"].map((item) => (
                              <div key={item} className="hover-lift rounded-[22px] border border-white/80 bg-white/78 px-4 py-4 shadow-[0_14px_32px_rgba(78,95,173,0.08)]">
                                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Signal</p>
                                <p className="mt-2 text-sm font-semibold text-slate-950">{item}</p>
                              </div>
                            ))}
                          </div>
                          <div className="chart-shell mt-4">
                            <div className="chart-grid" />
                            <div className="chart-line chart-line-primary" />
                            <div className="chart-line chart-line-secondary" />
                            <div className="chart-tooltip"><span className="signal-dot bg-[#5d73ff]" />Error burst detected</div>
                          </div>
                        </div>
                        <div className="grid gap-4">
                          <div className="screen-panel screen-panel-dark">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">Response room</p>
                            <div className="mt-4 space-y-3">
                              {["Database latency above threshold", "Rollback approved", "Status page update published"].map((item) => (
                                <div key={item} className="rounded-[18px] border border-white/10 bg-white/8 px-4 py-3 text-[12px] leading-5 text-white/72">{item}</div>
                              ))}
                            </div>
                          </div>
                          <div className="screen-panel screen-panel-soft">
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Status page</p>
                                <p className="mt-2 text-lg font-semibold tracking-[-0.04em] text-slate-950">Investigating elevated API latency</p>
                              </div>
                              <div className="status-ring"><span className="signal-dot bg-[#ff8d63]" /></div>
                            </div>
                            <div className="status-stack mt-5">
                              <div className="status-row"><span>Internal note</span><strong>Rollback in progress</strong></div>
                              <div className="status-row"><span>Customer post</span><strong>Draft ready</strong></div>
                              <div className="status-row"><span>ETA</span><strong>12 minutes</strong></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div data-reveal className="reveal-block mx-auto mt-14 max-w-6xl rounded-[30px] border border-white/16 bg-white/10 px-5 py-5 backdrop-blur-xl" style={{ transitionDelay: "260ms" }}>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/64">Works with your stack</p>
                <p className="mt-2 text-sm text-white/78">Built for teams shipping on modern web infrastructure.</p>
              </div>
              <div className="logo-marquee max-w-[460px]">
                <div className="logo-track">
                  {[...logos, ...logos].map((logo, index) => (
                    <div key={`${logo.name}-${index}`} className="logo-pill">
                      <Image src={logo.src} alt={logo.name} width={logo.width} height={logo.height} className={logo.dark ? "brightness-0 invert" : ""} />
                      <span>{logo.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <a href="#platform" className="scroll-cue"><span className="scroll-cue-dot" />Scroll to explore</a>
          </div>
        </div>
      </section>

      <section id="platform" className="relative -mt-8 rounded-t-[42px] bg-[var(--surface-0)]">
        <div className="mx-auto max-w-6xl px-6 py-18 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div data-reveal className="reveal-block">
              <p className="eyebrow">Platform overview</p>
              <h2 className="mt-4 max-w-lg text-balance text-3xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-4xl">
                Bright SaaS composition, better hierarchy, and cleaner motion.
              </h2>
            </div>
            <div data-reveal className="reveal-block" style={{ transitionDelay: "80ms" }}>
              <p className="max-w-2xl text-[15px] leading-8 text-slate-600">
                The new structure keeps the glowing hero from your reference, but grounds it in Better Uptime product messaging instead of generic filler.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <article data-reveal className="reveal-block surface-card overflow-hidden px-6 py-6 sm:px-7">
              <div className="surface-orbit surface-orbit-one" />
              <div className="surface-orbit surface-orbit-two" />
              <div className="relative z-10">
                <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                  <div className="max-w-xl">
                    <p className="eyebrow">Unified mission control</p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-slate-950">Product-grade UI for reliability teams.</h3>
                  </div>
                  <div className="pill-badge bg-[#eff3ff] text-[#4c66ff]">Live dashboard preview</div>
                </div>
                <div className="mt-6 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="rounded-[28px] border border-[#d8def2] bg-[linear-gradient(180deg,#eef3ff_0%,#fbfcff_100%)] p-5">
                    <div className="rounded-[24px] bg-[#111b46] p-5 text-white shadow-[0_28px_60px_rgba(17,27,70,0.22)]">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/54">Incident stream</p>
                      <p className="mt-2 text-lg font-semibold tracking-[-0.04em]">Four systems synced across one response layer.</p>
                      <div className="mt-5 space-y-3">
                        {["Global checks rerun automatically", "Pager escalation after 90 seconds", "Status page updates pushed from the incident room"].map((item) => (
                          <div key={item} className="hover-lift flex items-start gap-3 rounded-[20px] border border-white/10 bg-white/7 px-4 py-3">
                            <span className="signal-dot mt-1 bg-[#65e4a4]" />
                            <p className="text-[12px] leading-5 text-white/74">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-4">
                    {[
                      { title: "Monitoring", copy: "APIs, websites, SSL, cron jobs, and ports in one clean view.", dark: false },
                      { title: "On-call", copy: "Schedules, routing, runbooks, and escalation logic that hold up under pressure.", dark: true },
                      { title: "Status pages", copy: "Branded customer updates that feel like part of the product.", dark: false },
                    ].map((card) => (
                      <div key={card.title} className={`hover-lift rounded-[28px] border p-5 shadow-[0_18px_40px_rgba(95,105,146,0.08)] ${card.dark ? "border-[#243473] bg-[linear-gradient(135deg,#111c48_0%,#4c66ff_100%)] text-white" : "border-white/60 bg-[linear-gradient(135deg,#ffffff_0%,#edf3ff_100%)] text-slate-950"}`}>
                        <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${card.dark ? "text-white/60" : "text-slate-400"}`}>{card.title}</p>
                        <p className={`mt-3 text-sm leading-6 ${card.dark ? "text-white/78" : "text-slate-600"}`}>{card.copy}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            <div className="grid gap-4">
              {[
                ["Incident playbooks", "Attach response steps directly to alerts so the first minutes are not chaotic."],
                ["Global visibility", "See whether an issue is local, regional, or global before you wake the whole team."],
                ["Customer confidence", "Keep users updated with branded, real-time status communication."],
              ].map(([title, copy], index) => (
                <article key={title} data-reveal className="reveal-block surface-card hover-lift px-6 py-6" style={{ transitionDelay: `${index * 70}ms` }}>
                  <div className="inline-flex rounded-full bg-[#eef3ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4c66ff]">0{index + 1}</div>
                  <h3 className="mt-4 text-lg font-semibold tracking-[-0.04em] text-slate-950">{title}</h3>
                  <p className="mt-3 text-[14px] leading-7 text-slate-600">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="workflow" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-18 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
            <div data-reveal className="reveal-block workflow-panel">
              <div className="workflow-shimmer" />
              <div className="relative z-10">
                <p className="eyebrow text-white/60">Workflow</p>
                <h2 className="mt-3 max-w-md text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl">Response design for teams that move fast.</h2>
                <p className="mt-4 max-w-md text-[14px] leading-7 text-white/72">The layout keeps the visual energy of a SaaS product page while staying grounded in actual product messaging.</p>
                <div className="mt-8 space-y-3">
                  {["Alert rules mapped to ownership", "Status page updates linked to incident actions", "Runbooks embedded into the first response screen"].map((item) => (
                    <div key={item} className="rounded-[20px] border border-white/10 bg-white/8 px-4 py-3 text-[12px] leading-5 text-white/75">{item}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              {[
                ["01", "Detect instantly", "Run checks from multiple regions and catch regressions before customers open tickets."],
                ["02", "Coordinate calmly", "Bring response notes, ownership, and escalation logic into the same workspace."],
                ["03", "Communicate clearly", "Send internal alerts and external status updates from the same incident thread."],
              ].map(([step, title, copy], index) => (
                <article key={step} data-reveal className="reveal-block workflow-step hover-lift" style={{ transitionDelay: `${index * 80}ms` }}>
                  <div className="workflow-step-number">{step}</div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.04em] text-slate-950">{title}</h3>
                    <p className="mt-3 max-w-xl text-[14px] leading-7 text-slate-600">{copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-[var(--surface-0)]">
        <div className="mx-auto max-w-6xl px-6 py-18 sm:px-8 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <div data-reveal className="reveal-block">
              <p className="eyebrow">Launch offer</p>
              <h2 className="mt-4 max-w-md text-3xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-4xl">Everything needed for a modern reliability homepage.</h2>
              <p className="mt-4 max-w-lg text-[15px] leading-8 text-slate-600">This version adds the stronger visual hierarchy, motion language, and section pacing your reference was pointing toward.</p>
            </div>
            <div data-reveal className="reveal-block rounded-[34px] border border-[#d6ddfb] bg-[linear-gradient(135deg,#18214d_0%,#3f56ef_58%,#ff9866_130%)] p-6 text-white shadow-[0_28px_80px_rgba(63,86,239,0.18)] sm:p-7" style={{ transitionDelay: "90ms" }}>
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/58">Pro landing page</p>
                  <p className="mt-3 text-4xl font-semibold tracking-[-0.08em]">SaaS-ready redesign</p>
                </div>
                <div className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm text-white/78">Motion + structure refresh</div>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {["Monitoring, on-call, and status pages in one story", "Micro-interactions and scroll animation", "Cleaner cards and stronger gradients"].map((item) => (
                  <div key={item} className="rounded-[22px] border border-white/10 bg-white/8 px-4 py-4 text-[13px] leading-6 text-white/78">{item}</div>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#faq" className="button button-light">Review FAQ</a>
                <a href="#platform" className="button button-outline-white">See platform blocks</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-18 sm:px-8 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div data-reveal className="reveal-block">
              <p className="eyebrow">FAQ</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-4xl">Questions about the redesign.</h2>
            </div>
            <div className="space-y-4">
              {faqs.map(([question, answer], index) => (
                <article key={question} data-reveal className="reveal-block hover-lift rounded-[28px] border border-[#e5e9f6] bg-[linear-gradient(180deg,#ffffff_0%,#f9fbff_100%)] px-6 py-5 shadow-[0_16px_38px_rgba(86,96,139,0.05)]" style={{ transitionDelay: `${index * 70}ms` }}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold tracking-[-0.03em] text-slate-950">{question}</h3>
                      <p className="mt-3 text-[14px] leading-7 text-slate-600">{answer}</p>
                    </div>
                    <span className="text-2xl leading-none text-[#c8d2ef]">+</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#0e1433] text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-10 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-10">
          <div>
            <p className="text-4xl font-semibold tracking-[-0.08em] sm:text-5xl">Better Uptime</p>
            <p className="mt-3 text-[13px] text-white/58">Monitoring, incidents, and status pages for teams shipping serious products.</p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-white/62">
            {links.map(([label, href]) => (
              <a key={label} href={href}>{label}</a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
