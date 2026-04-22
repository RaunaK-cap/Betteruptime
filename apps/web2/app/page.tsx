"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, ArrowRight, CheckCircle2, Globe, Clock, TrendingUp, Shield, Zap, ChevronRight, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/themetoggler";



export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-foreground flex items-center justify-center">
              <Activity className="h-3.5 w-3.5 text-background" />
            </div>
            <span className="text-sm font-semibold tracking-tight">pulsewatch</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {[
              { label: "Features", href: "#features" },
              { label: "How it works", href: "#how-it-works" },
              { label: "Dashboard", href: "/dashboard" },
            ].map(({ label, href }) => (
              <Link key={label} href={href}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button variant="ghost" size="sm" className="h-8 text-xs" asChild>
              <Link href="/auth/login">Sign in</Link>
            </Button>
            <Button size="sm" className="h-8 text-xs gap-1" asChild>
              <Link href="/auth/signup">Get started <ChevronRight className="h-3.5 w-3.5" /></Link>
            </Button>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Grid */}
        <div className="absolute inset-0 -z-10"
          style={{ backgroundImage: "linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />

        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-[11px] font-medium text-foreground mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
              Real-time uptime monitoring
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-5">
              Know the moment<br />
              <span className="text-muted-foreground">something breaks.</span>
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground font-light max-w-2xl mx-auto mb-10 leading-relaxed">
              pulsewatch monitors your websites from multiple regions, tracks response times,
              and stores every result in real-time using a Redis stream pipeline and PostgreSQL.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg" className="h-11 px-8 text-sm gap-2 w-full sm:w-auto" asChild>
                <Link href="/auth/signup">Start monitoring free <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button variant="outline" size="lg" className="h-11 px-8 text-sm w-full sm:w-auto" asChild>
                <Link href="/dashboard">View dashboard</Link>
              </Button>
            </div>
          </motion.div>

          {/* Mock monitor card */}
          <motion.div
            className="mt-16 mx-auto max-w-2xl rounded-xl border border-border bg-card shadow-sm overflow-hidden text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-muted/40">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-foreground" />
                <span className="text-xs font-semibold">Live Monitor Feed</span>
              </div>
              <span className="text-[10px] text-muted-foreground">Just now</span>
            </div>
            {[
              { url: "google.com", ms: 142, status: "up" as const },
              { url: "github.com", ms: 210, status: "up" as const },
              { url: "broken-site.io", ms: 0, status: "down" as const },
            ].map(({ url, ms, status }) => (
              <div key={url} className="flex items-center justify-between px-5 py-3 border-b border-border last:border-0">
                <div className="flex items-center gap-2.5">
                  <span className={`h-2 w-2 rounded-full shrink-0 ${status === "up" ? "bg-foreground" : "bg-destructive"}`} />
                  <div>
                    <p className="text-xs font-medium">{url}</p>
                    <p className="text-[10px] text-muted-foreground">https://{url}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {ms > 0 && <span className="text-[11px] text-muted-foreground">{ms}ms</span>}
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                    status === "up"
                      ? "bg-foreground/5 text-foreground border-foreground/20"
                      : "bg-destructive/10 text-destructive border-destructive/20"
                  }`}>
                    {status === "up" ? "Operational" : "Down"}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "99.9%", label: "Target Uptime" },
              { value: "< 200ms", label: "Avg Latency" },
              { value: "Redis", label: "Queue Engine" },
              { value: "PostgreSQL", label: "Storage" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES BENTO GRID ── */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Everything you need to stay online</h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Built with a real Redis stream queue and PostgreSQL. Solid infrastructure, no magic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[22rem]">
            {/* 1. Global Monitoring (Span 2) */}
            <motion.div
              className="md:col-span-2 rounded-2xl border border-border bg-card p-8 flex flex-col relative overflow-hidden group hover:border-foreground/30 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative z-10">
                <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center mb-4">
                  <Globe className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Global Monitoring</h3>
                <p className="text-xs text-muted-foreground max-w-sm">Track websites from multiple regions simultaneously. Know your real-world availability.</p>
              </div>
              {/* Micro-interaction: Animated map nodes */}
              <div className="absolute inset-0 right-0 top-0 opacity-20 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute top-1/2 right-20 w-48 h-48 -translate-y-1/2">
                  <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-10 left-10 w-3 h-3 bg-foreground rounded-full" />
                  <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, delay: 1, repeat: Infinity }} className="absolute top-20 right-10 w-2 h-2 bg-foreground rounded-full" />
                  <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, delay: 2, repeat: Infinity }} className="absolute bottom-10 left-20 w-4 h-4 bg-foreground rounded-full" />
                  <svg className="absolute inset-0 w-full h-full stroke-foreground/20" fill="none">
                    <path strokeDasharray="4 4" d="M 50 50 Q 100 20 150 90 T 120 160" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* 2. Response Time (Span 1) */}
            <motion.div
              className="rounded-2xl border border-border bg-card p-8 flex flex-col relative overflow-hidden group hover:border-foreground/30 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="relative z-10 flex-1">
                <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center mb-4">
                  <Clock className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Response Time</h3>
                <p className="text-xs text-muted-foreground">Measure exact response times per region.</p>
              </div>
              <div className="mt-auto relative h-16 w-full rounded-lg bg-muted/50 overflow-hidden flex items-center justify-center border border-border">
                <motion.div
                  className="absolute left-0 top-0 bottom-0 bg-foreground/10"
                  animate={{ width: ["0%", "100%", "0%"] }}
                  transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                />
                <span className="text-xs font-mono font-medium z-10 flex items-center gap-2">
                  <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>142</motion.span> ms
                </span>
              </div>
            </motion.div>

            {/* 3. Fast Detection (Span 1) */}
            <motion.div
              className="rounded-2xl border border-border bg-card p-8 flex flex-col relative overflow-hidden group hover:border-foreground/30 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative z-10 flex-1">
                <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center mb-4">
                  <Zap className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Fast Detection</h3>
                <p className="text-xs text-muted-foreground">Instant workers consume checks via Redis stream.</p>
              </div>
              <div className="mt-auto h-12 flex items-center justify-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 rounded-full bg-foreground"
                    animate={{ height: ["20%", "100%", "20%"] }}
                    transition={{ duration: 1, delay: i * 0.1, repeat: Infinity, ease: "easeInOut" }}
                  />
                ))}
              </div>
            </motion.div>

            {/* 4. Simple Dashboard (Span 2) */}
            <motion.div
              className="md:col-span-2 rounded-2xl border border-border bg-card p-8 flex flex-col relative overflow-hidden group hover:border-foreground/30 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="relative z-10 md:w-1/2">
                <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center mb-4">
                  <LayoutDashboard className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Simple Dashboard</h3>
                <p className="text-xs text-muted-foreground">One clean dashboard showing every monitor's status, response time, and last check.</p>
              </div>
              <div className="absolute right-0 bottom-0 top-8 w-1/2 hidden md:block opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none translate-x-8 translate-y-8 rounded-tl-xl border-t border-l border-border bg-background shadow-2xl p-4 overflow-hidden">
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-1/3 bg-muted rounded mb-2" />
                  {[1, 2, 3].map((i) => (
                    <motion.div key={i} className="h-8 w-full bg-muted/50 rounded flex items-center px-2 gap-2"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.2 + 0.5 }}
                    >
                      <div className="h-2 w-2 rounded-full bg-foreground" />
                      <div className="h-2 w-1/2 bg-muted rounded" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 5. Historical Trends (Span 2) */}
            <motion.div
              className="md:col-span-2 rounded-2xl border border-border bg-card p-8 flex flex-col relative overflow-hidden group hover:border-foreground/30 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="relative z-10">
                <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center mb-4">
                  <TrendingUp className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Historical Trends</h3>
                <p className="text-xs text-muted-foreground max-w-sm">View uptime history and performance over time for every monitored website.</p>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-32 opacity-30 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <motion.path
                    d="M0,100 L0,50 Q25,80 50,40 T100,20 L100,100 Z"
                    fill="var(--foreground)"
                    fillOpacity="0.05"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M0,50 Q25,80 50,40 T100,20"
                    fill="none"
                    stroke="var(--foreground)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                </svg>
              </div>
            </motion.div>

            {/* 6. Reliable Pipeline (Span 1) */}
            <motion.div
              className="rounded-2xl border border-border bg-card p-8 flex flex-col relative overflow-hidden group hover:border-foreground/30 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="relative z-10 flex-1">
                <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center mb-4">
                  <Shield className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Reliable Pipeline</h3>
                <p className="text-xs text-muted-foreground">Producer–consumer Redis stream with PostgreSQL.</p>
              </div>
              <div className="mt-auto h-16 relative flex items-center justify-between border-t border-border pt-4">
                <div className="w-6 h-6 rounded bg-muted border border-border flex items-center justify-center text-[8px] font-bold">R</div>
                <motion.div
                  className="absolute left-8 h-1 w-2 bg-foreground rounded-full"
                  animate={{ x: [0, 150] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute left-8 h-1 w-2 bg-foreground rounded-full"
                  animate={{ x: [0, 150] }}
                  transition={{ duration: 1.5, delay: 0.75, repeat: Infinity, ease: "linear" }}
                />
                <div className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-[8px] font-bold">PG</div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-20 border-y border-border bg-muted/20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">How it works</h2>
            <p className="text-sm text-muted-foreground">Three moving parts. One reliable pipeline.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Producer pushes jobs", desc: "A cron-style producer fetches all websites from the DB and pushes them to a Redis stream every minute." },
              { step: "02", title: "Worker consumes checks", desc: "Workers read from the Redis consumer group, ping each URL, measure response time, and ACK the message." },
              { step: "03", title: "Results stored & shown", desc: "Tick results (status + response time + region) are written to PostgreSQL and shown on your dashboard." },
            ].map(({ step, title, desc }) => (
              <div key={step}>
                <p className="text-5xl font-black text-muted/80 mb-3">{step}</p>
                <h3 className="text-sm font-semibold mb-2">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20">
        <div className="mx-auto max-w-xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Ready to monitor your websites?</h2>
            <p className="text-sm text-muted-foreground mb-8">
              Create a free account and start seeing real-time uptime checks in under 2 minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg" className="h-11 px-10 text-sm gap-2 w-full sm:w-auto" asChild>
                <Link href="/auth/signup">Create free account <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button variant="outline" size="lg" className="h-11 px-10 text-sm w-full sm:w-auto" asChild>
                <Link href="/auth/login">Sign in</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border py-6">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-md bg-foreground flex items-center justify-center">
              <Activity className="h-2.5 w-2.5 text-background" />
            </div>
            <span className="text-xs font-semibold">pulsewatch</span>
          </div>
          <p className="text-[11px] text-muted-foreground">Built with Next.js · Redis Streams · PostgreSQL · Express</p>
          <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
            <Link href="/auth/login" className="hover:text-foreground transition-colors">Login</Link>
            <Link href="/auth/signup" className="hover:text-foreground transition-colors">Sign up</Link>
            <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
