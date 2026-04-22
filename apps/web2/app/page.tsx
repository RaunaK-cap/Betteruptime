"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, ArrowRight, CheckCircle2, Globe, Clock, TrendingUp, Shield, Zap, ChevronRight, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/themetoggler";

const ASCII_WAVE = (() => {
  const rows = 60;
  const cols = 300;
  let map = "";
  for (let y = 0; y < rows; y++) {
    let row = "";
    for (let x = 0; x < cols; x++) {
      const nx = (x / cols) * 8;
      const ny = (y / rows) * 6;
      // Abstract wave topography math
      const val = Math.sin(nx * 3) * Math.cos(ny * 2) + Math.sin(nx + ny) * 0.8;
      
      if (val > 1.2) row += "●";
      else if (val > 0.8) row += "○";
      else if (val > 0.4) row += "•";
      else if (val > 0) row += "·";
      else if (val > -0.4) row += ".";
      else row += " ";
    }
    map += row + "\n";
  }
  return map;
})();

const LiveMonitorCard = () => {
  const [sites, setSites] = useState([
    { id: 1, url: "google.com", baseMs: 142, currentMs: 142, status: "up" },
    { id: 2, url: "github.com", baseMs: 210, currentMs: 210, status: "up" },
    { id: 3, url: "broken-site.io", baseMs: 0, currentMs: 0, status: "down" },
  ]);

  // Simulate live ping updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSites(prev => prev.map(site => {
        if (site.status === "down") return site;
        // Randomly fluctuate ping by ±15ms
        const variance = Math.floor(Math.random() * 30) - 15;
        return { ...site, currentMs: site.baseMs + variance };
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="mt-16 mx-auto max-w-2xl rounded-xl border border-border bg-card shadow-sm overflow-hidden text-left"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-muted/20">
        <div className="flex items-center gap-2">
          <motion.span 
            className="h-2 w-2 rounded-full bg-foreground" 
            animate={{ opacity: [1, 0.3, 1] }} 
            transition={{ duration: 2, repeat: Infinity }} 
          />
          <span className="text-xs font-semibold">Live Monitor Feed</span>
        </div>
        <span className="text-[10px] text-muted-foreground">Updating live...</span>
      </div>
      <div>
        {sites.map((site, idx) => (
          <motion.div 
            key={site.id} 
            className="flex items-center justify-between px-5 py-3 border-b border-border last:border-0 bg-background"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + idx * 0.1, duration: 0.4 }}
          >
            <div className="flex items-center gap-2.5">
              <motion.span 
                className={`h-2 w-2 rounded-full shrink-0 ${site.status === "up" ? "bg-foreground" : "bg-destructive"}`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
              />
              <div>
                <p className="text-xs font-medium">{site.url}</p>
                <p className="text-[10px] text-muted-foreground">https://{site.url}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {site.status === "up" && (
                <motion.span 
                  key={site.currentMs}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[11px] text-muted-foreground tabular-nums"
                >
                  {site.currentMs}ms
                </motion.span>
              )}
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                site.status === "up"
                  ? "bg-foreground/5 text-foreground border-foreground/20"
                  : "bg-destructive/10 text-destructive border-destructive/20"
              }`}>
                {site.status === "up" ? "Operational" : "Down"}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};


export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-foreground flex items-center justify-center shrink-0">
              <Activity className="h-3.5 w-3.5 text-background" />
            </div>
            <span className="hidden sm:inline-block text-sm font-semibold tracking-tight">pulsewatch</span>
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

          <div className="flex items-center gap-1 sm:gap-2">
            <ModeToggle />
            <Button variant="ghost" size="sm" className="h-8 text-[11px] sm:text-xs px-2 sm:px-3" asChild>
              <Link href="/auth/login">Sign in</Link>
            </Button>
            <Button size="sm" className="h-8 text-[11px] sm:text-xs px-2.5 sm:px-3 gap-1" asChild>
              <Link href="/auth/signup">Get started <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" /></Link>
            </Button>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-border isolate">
        {/* Typography / ASCII Background */}
        <div 
          className="absolute inset-0 z-[-1] flex items-center justify-center overflow-hidden opacity-30 dark:opacity-40 pointer-events-none select-none"
          style={{ 
            maskImage: 'radial-gradient(ellipse at center, transparent 35%, black 75%)', 
            WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 35%, black 75%)' 
          }}
        >
          <pre className="text-[12px] leading-[14px] tracking-[0.2em] font-mono text-muted-foreground whitespace-pre font-bold text-center">
            {ASCII_WAVE}
          </pre>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 py-28 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-[11px] font-medium text-foreground mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
              Real-time uptime monitoring
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-5">
              Know the moment<br />
              <span className="text-muted-foreground">something breaks.</span>
            </h1>

            <p className="text-xs sm:text-xs text-muted-foreground font-light max-w-2xl mx-auto mb-10 leading-relanxed">
              pulsewatch monitors your websites from multiple regions, tracks response times,
              and stores every result in real-time.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" className="h-10 sm:h-11 px-6 sm:px-8 text-sm gap-2 w-auto" asChild>
                <Link href="/auth/signup">Start monitoring free <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button variant="outline" size="lg" className="h-10 sm:h-11 px-6 sm:px-8 text-sm w-auto" asChild>
                <Link href="/dashboard">View dashboard</Link>
              </Button>
            </div>
          </motion.div>

          {/* Mock monitor card */}
          <LiveMonitorCard />
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
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Everything you need to stay online</h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Built with a real Redis stream queue and PostgreSQL. Solid infrastructure, no magic.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 auto-rows-[16rem] sm:auto-rows-[22rem]">
            {/* 1. Global Monitoring (Span 2) */}
            <motion.div
              className="md:col-span-2 rounded-2xl border border-border bg-card p-6 sm:p-8 flex flex-col relative overflow-hidden group hover:border-foreground/30 transition-colors"
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
              className="rounded-2xl border border-border bg-card p-6 sm:p-8 flex flex-col relative overflow-hidden group hover:border-foreground/30 transition-colors"
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
              className="rounded-2xl border border-border bg-card p-6 sm:p-8 flex flex-col relative overflow-hidden group hover:border-foreground/30 transition-colors"
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
              className="md:col-span-2 rounded-2xl border border-border bg-card p-6 sm:p-8 flex flex-col relative overflow-hidden group hover:border-foreground/30 transition-colors"
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
              className="md:col-span-2 rounded-2xl border border-border bg-card p-6 sm:p-8 flex flex-col relative overflow-hidden group hover:border-foreground/30 transition-colors"
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
              className="rounded-2xl border border-border bg-card p-6 sm:p-8 flex flex-col relative overflow-hidden group hover:border-foreground/30 transition-colors"
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

      {/* ── HOW IT WORKS (ANIMATED PIPELINE) ── */}
      <section id="how-it-works" className="py-24 border-y border-border bg-muted/20 overflow-hidden">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">How it works</h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Three moving parts. One reliable pipeline. Watch the data flow in real-time.
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* The Main Pipeline Diagram */}
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 z-10">
              
              {/* Node 1: Producer */}
              <motion.div 
                className="relative flex flex-col items-center group w-full md:w-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="h-14 w-14 rounded-2xl border border-border bg-card flex items-center justify-center mb-3 relative z-10 group-hover:border-foreground/50 transition-colors">
                  <Clock className="h-6 w-6 text-foreground" />
                  {/* Pulse ring */}
                  <motion.div className="absolute inset-0 rounded-2xl border border-foreground"
                    animate={{ scale: [1, 1.4, 1.4], opacity: [0.8, 0, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-semibold">1. Producer</h3>
                  <p className="text-[11px] text-muted-foreground max-w-[120px] mt-1">Fetches targets & pushes jobs every minute</p>
                </div>
              </motion.div>

              {/* Connecting Line 1 */}
              <div className="hidden md:block flex-1 relative h-0.5 bg-border mx-2">
                <motion.div className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 w-6 rounded-full bg-foreground shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                  animate={{ left: ["0%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <div className="md:hidden w-0.5 h-12 bg-border relative">
                 <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-6 rounded-full bg-foreground"
                  animate={{ top: ["0%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* Node 2: Redis */}
              <motion.div 
                className="relative flex flex-col items-center group w-full md:w-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="h-14 w-14 rounded-2xl border border-border bg-card flex items-center justify-center mb-3 relative z-10 overflow-hidden group-hover:border-foreground/50 transition-colors">
                  <Zap className="h-6 w-6 text-foreground relative z-10" />
                  {/* Internal scrolling stream */}
                  <div className="absolute inset-0 opacity-10 flex flex-col gap-1 pt-2">
                     <motion.div className="h-1 w-full bg-foreground" animate={{ x: [-20, 20] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
                     <motion.div className="h-1 w-full bg-foreground" animate={{ x: [20, -20] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
                     <motion.div className="h-1 w-full bg-foreground" animate={{ x: [-20, 20] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-semibold">2. Redis Stream</h3>
                  <p className="text-[11px] text-muted-foreground max-w-[120px] mt-1">Acts as the fast, reliable job queue</p>
                </div>
              </motion.div>

              {/* Connecting Line 2 */}
              <div className="hidden md:block flex-1 relative h-0.5 bg-border mx-2">
                <motion.div className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 w-6 rounded-full bg-foreground shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                  animate={{ left: ["0%", "100%"] }}
                  transition={{ duration: 1.5, delay: 0.75, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <div className="md:hidden w-0.5 h-12 bg-border relative">
                 <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-6 rounded-full bg-foreground"
                  animate={{ top: ["0%", "100%"] }}
                  transition={{ duration: 1.5, delay: 0.75, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* Node 3: Worker & DB */}
              <motion.div 
                className="relative flex flex-col items-center group w-full md:w-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="relative">
                  <div className="h-14 w-14 rounded-2xl border border-border bg-card flex items-center justify-center mb-3 relative z-10 group-hover:border-foreground/50 transition-colors">
                    <Activity className="h-6 w-6 text-foreground" />
                    {/* Activity ping */}
                    <motion.div className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-foreground"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                    />
                  </div>
                  {/* Database badge attached to worker */}
                  <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full border border-border bg-muted flex items-center justify-center shadow-lg z-20">
                    <Shield className="h-3 w-3 text-foreground" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-semibold">3. Workers & DB</h3>
                  <p className="text-[11px] text-muted-foreground max-w-[120px] mt-1">Pings URLs, records ms, writes to PostgreSQL</p>
                </div>
              </motion.div>

            </div>

            {/* Background connection path for visual styling */}
            <div className="absolute top-10 left-[10%] right-[10%] h-32 rounded-[2rem] border-t border-x border-border/30 -z-10 hidden md:block" />
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 border-t border-border">
        <div className="mx-auto max-w-xl px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
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
