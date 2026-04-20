"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Bell,
  ChevronRight,
  Clock3,
  Globe,
  MoonStar,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import Pipeline from "@/components/pipeline";
import { ModeToggle } from "@/components/themetoggler";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Instant incident detection",
    description:
      "Track checks, response anomalies, and degraded services before customers notice.",
    icon: Bell,
  },
  {
    title: "Global coverage",
    description:
      "Run monitors from multiple regions and compare results with a clean operational view.",
    icon: Globe,
  },
  {
    title: "Status transparency",
    description:
      "Publish reliable status communication with a visual system that matches your product quality.",
    icon: ShieldCheck,
  },
  {
    title: "Actionable response data",
    description:
      "See latency, uptime, and alert timing together so the next fix is obvious.",
    icon: Activity,
  },
];

const metrics = [
  { value: "27K+", label: "active monitors" },
  { value: "99.99%", label: "average uptime" },
  { value: "2.3s", label: "median alert time" },
];

const highlightCards = [
  {
    eyebrow: "Live health",
    title: "A calmer view of operational noise.",
    description:
      "The landing page now carries the same quiet dashboard language in both themes: restrained surfaces, muted borders, and one clear accent.",
  },
  {
    eyebrow: "Theme aware",
    title: "Dark mode feels designed, not inverted.",
    description:
      "Background depth, cards, hero gradients, and secondary actions adapt cleanly without losing readability or contrast.",
  },
];

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      <p className="mb-3 text-xs font-light uppercase tracking-[0.28em] text-primary/80">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-extralight tracking-tight text-foreground md:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-sm font-light leading-7 text-muted-foreground md:text-base">
        {description}
      </p>
    </div>
  );
}

function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
            <Activity className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium tracking-tight text-foreground">
              PulseWatch
            </p>
            <p className="text-[11px] font-light text-muted-foreground">
              Better uptime visibility
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="hidden rounded-full px-4 text-xs font-light text-muted-foreground sm:inline-flex"
          >
            <Link href="/auth/login">Sign in</Link>
          </Button>
          <ModeToggle />
          <Button
            asChild
            size="sm"
            className="rounded-full px-4 text-xs font-normal shadow-sm shadow-primary/20"
          >
            <Link href="/auth/signup">Start free</Link>
          </Button>
        </div>
      </div>
    </motion.header>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-16 md:pb-28 md:pt-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[8%] top-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-[12%] h-72 w-72 rounded-full bg-sky-500/10 blur-3xl dark:bg-sky-400/10" />
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent_45%)] dark:bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_40%)]" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-light text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Monitoring that stays readable in both modes
          </div>
          <h1 className="max-w-4xl text-5xl font-extralight tracking-tight text-foreground md:text-7xl">
            Keep your landing experience as reliable as your uptime data.
          </h1>
          <p className="mt-6 max-w-2xl text-base font-light leading-8 text-muted-foreground md:text-lg">
            PulseWatch gives teams a focused monitoring workflow, instant alerting,
            and a calm incident surface. The landing page now follows that same
            visual logic in light and dark mode.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="rounded-full px-6 text-sm shadow-lg shadow-primary/20"
            >
              <Link href="/auth/signup">
                Start monitoring
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="rounded-full px-6 text-sm"
            >
              <Link href="/dashboard">Open dashboard</Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.08 }}
                className="rounded-3xl border border-border/70 bg-card/70 px-5 py-4 backdrop-blur-sm"
              >
                <p className="text-2xl font-extralight text-foreground md:text-3xl">
                  {metric.value}
                </p>
                <p className="mt-1 text-xs font-light uppercase tracking-[0.22em] text-muted-foreground">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="rounded-[2rem] border border-border/70 bg-card/80 p-5 shadow-2xl shadow-black/5 backdrop-blur-xl dark:shadow-black/30">
            <div className="mb-5 flex items-center justify-between border-b border-border/70 pb-4">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Monitoring dashboard
                </p>
                <p className="mt-1 text-xs font-light text-muted-foreground">
                  Theme-synced preview
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-light text-primary">
                <span className="h-2 w-2 rounded-full bg-primary" />
                All systems normal
              </div>
            </div>

            <div className="space-y-3">
              {[
                ["API Gateway", "99.99%", "184ms"],
                ["Auth Service", "99.97%", "236ms"],
                ["Checkout Flow", "99.95%", "311ms"],
              ].map(([name, uptime, latency]) => (
                <div
                  key={name}
                  className="rounded-2xl border border-border/60 bg-background/80 px-4 py-3"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_12px_rgba(16,185,129,0.55)]" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{name}</p>
                        <p className="text-[11px] font-light text-muted-foreground">
                          Operational
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-foreground">{uptime}</p>
                      <p className="text-[11px] font-light text-muted-foreground">
                        {latency}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-sky-500/10 p-4">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Response curve
                  </p>
                  <p className="text-[11px] font-light text-muted-foreground">
                    Last 12 checks
                  </p>
                </div>
                <Clock3 className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex h-28 items-end gap-2">
                {[38, 52, 44, 63, 57, 68, 61, 73, 62, 79, 72, 84].map(
                  (height, index) => (
                    <motion.div
                      key={index}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 0.55, delay: 0.05 * index }}
                      className="flex-1 rounded-t-full bg-gradient-to-t from-primary to-emerald-300 dark:to-emerald-200"
                    />
                  )
                )}
              </div>
            </div>
          </div>

          <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-border/70 bg-background/85 px-4 py-3 backdrop-blur-xl md:block">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <MoonStar className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-foreground">
                  Theme toggle enabled
                </p>
                <p className="text-[11px] font-light text-muted-foreground">
                  Landing page now matches dashboard behavior
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HighlightsSection() {
  return (
    <section className="px-6 py-8 md:py-14">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
        {highlightCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            viewport={{ once: true, margin: "-100px" }}
            className="rounded-[2rem] border border-border/70 bg-card/75 p-8 backdrop-blur-sm"
          >
            <p className="text-xs font-light uppercase tracking-[0.24em] text-primary/80">
              {card.eyebrow}
            </p>
            <h3 className="mt-4 text-2xl font-extralight tracking-tight text-foreground">
              {card.title}
            </h3>
            <p className="mt-3 max-w-xl text-sm font-light leading-7 text-muted-foreground">
              {card.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Capabilities"
          title="A cleaner product story across both themes."
          description="Each section now uses the same design tokens as the dashboard, so the landing page feels like part of the product instead of a separate template."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group rounded-[1.75rem] border border-border/70 bg-card/70 p-6 backdrop-blur-sm transition-colors hover:border-primary/30 hover:bg-card"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-medium tracking-tight text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm font-light leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="px-6 pb-24 pt-10">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-border/70 bg-gradient-to-br from-card via-card to-primary/5 p-8 shadow-xl shadow-black/5 dark:shadow-black/25 md:p-12">
        <SectionIntro
          eyebrow="Get started"
          title="Put the same clarity into your monitoring workflow."
          description="You asked for the theme toggle on the landing page and for the entire page to respect light and dark mode. The landing experience now does that while preserving the existing PulseWatch tone."
        />

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="rounded-full px-6 text-sm shadow-lg shadow-primary/20"
          >
            <Link href="/auth/signup">Create account</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="rounded-full px-6 text-sm"
          >
            <Link href="/dashboard">Preview dashboard</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/70 px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-medium text-foreground">PulseWatch</p>
          <p className="mt-1 text-xs font-light">
            Monitoring surfaces designed to stay readable in light and dark mode.
          </p>
        </div>
        <div className="flex items-center gap-5 text-xs font-light">
          {["Features", "Docs", "Pricing"].map((item) => (
            <span key={item} className="text-muted-foreground">
              {item}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-gradient-to-b from-primary/[0.06] via-transparent to-transparent dark:from-primary/[0.1]" />
      <Header />
      <HeroSection />
      <HighlightsSection />
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-[2rem] border border-border/70 bg-card/55 backdrop-blur-sm">
          <Pipeline />
        </div>
      </div>
      <FeaturesSection />
      <CTASection />
      <Footer />
    </main>
  );
}
