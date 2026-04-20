"use client";

import { motion, useInView } from "framer-motion";
import {
  BellRing,
  CheckCheck,
  DatabaseZap,
  Radar,
  ScanSearch,
} from "lucide-react";
import { useRef } from "react";

const steps = [
  { label: "Ping", desc: "HTTP check sent to endpoint", icon: Radar },
  { label: "Detect", desc: "Response analyzed for errors", icon: ScanSearch },
  { label: "Log", desc: "Result stored with metadata", icon: DatabaseZap },
  { label: "Alert", desc: "Notify via configured channels", icon: BellRing },
  { label: "Resolve", desc: "Incident marked as resolved", icon: CheckCheck },
];

function FlowingDot({
  delay,
  vertical,
}: {
  delay: number;
  vertical?: boolean;
}) {
  if (vertical) {
    return (
      <motion.div
        className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary/70"
        initial={{ top: "0%", opacity: 0 }}
        animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 1.5,
          delay,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "linear",
        }}
      />
    );
  }

  return (
    <motion.div
      className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-primary/70"
      initial={{ left: "0%", opacity: 0 }}
      animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
      transition={{
        duration: 1.5,
        delay,
        repeat: Infinity,
        repeatDelay: 2,
        ease: "linear",
      }}
    />
  );
}

function PulseRing({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute inset-0 rounded-full border border-primary/20"
      initial={{ scale: 1, opacity: 0.6 }}
      animate={{ scale: 2.2, opacity: 0 }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 3,
        ease: "easeOut",
      }}
    />
  );
}

export default function Pipeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="px-6 py-24" ref={ref}>
      <div className="mx-auto max-w-5xl">
        <motion.p
          className="mb-3 text-center text-xs font-light uppercase tracking-[0.28em] text-primary/80"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          How it works
        </motion.p>
        <motion.h2
          className="mb-5 text-center text-3xl font-extralight tracking-tight text-foreground md:text-5xl"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
          From ping to resolution
        </motion.h2>
        <motion.p
          className="mx-auto mb-16 max-w-2xl text-center text-sm font-light leading-7 text-muted-foreground md:text-base"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
        >
          The same monitor flow now sits inside the landing page using the same
          theme tokens, spacing, and surface treatment as the rest of the app.
        </motion.p>

        <div className="hidden items-start justify-between relative md:flex">
          {steps.map((step, i) => {
            const Icon = step.icon;

            return (
              <div
                key={step.label}
                className="group relative z-10 flex flex-1 cursor-default flex-col items-center"
              >
                <motion.div
                  className="relative mb-4 flex h-14 w-14 items-center justify-center overflow-visible rounded-full border border-border bg-background text-primary shadow-sm transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.12)]"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    delay: 0.2 + i * 0.15,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{ scale: 1.08 }}
                >
                  {inView && <PulseRing delay={1 + i * 0.6} />}
                  <motion.div
                    animate={inView ? { scale: [1, 1.08, 1] } : {}}
                    transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>
                </motion.div>
                <motion.p
                  className="mb-1 text-xs font-medium text-foreground"
                  initial={{ opacity: 0, y: 5 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.15 }}
                >
                  {step.label}
                </motion.p>
                <motion.p
                  className="max-w-[140px] text-center text-[11px] font-light leading-5 text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.35 + i * 0.15 }}
                >
                  {step.desc}
                </motion.p>
              </div>
            );
          })}

          {steps.slice(0, -1).map((_, i) => (
            <div
              key={i}
              className="absolute top-7 h-px overflow-visible"
              style={{
                left: `${(i + 0.5) * 20}%`,
                width: "20%",
              }}
            >
              <motion.div
                className="relative h-full w-full bg-border"
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{
                  delay: 0.3 + i * 0.15,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                style={{ transformOrigin: "left" }}
              />
              <motion.div
                className="absolute top-0 h-px w-full"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: [0, 0.6, 0] } : {}}
                transition={{
                  delay: 1.5 + i * 0.3,
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
                style={{
                  background:
                    "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.45), transparent)",
                }}
              />
              {inView && (
                <>
                  <FlowingDot delay={1 + i * 0.35} />
                  <FlowingDot delay={2.5 + i * 0.35} />
                  <FlowingDot delay={4 + i * 0.35} />
                </>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-0 md:hidden">
          {steps.map((step, i) => {
            const Icon = step.icon;

            return (
              <div key={step.label} className="flex flex-col items-center">
                <motion.div
                  className="relative flex h-12 w-12 items-center justify-center overflow-visible rounded-full border border-border bg-background text-primary"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    delay: 0.2 + i * 0.12,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  {inView && <PulseRing delay={1 + i * 0.6} />}
                  <Icon className="h-4 w-4" />
                </motion.div>
                <motion.p
                  className="mt-3 text-xs font-medium text-foreground"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.12 }}
                >
                  {step.label}
                </motion.p>
                <motion.p
                  className="mb-2 text-center text-[11px] font-light leading-5 text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.35 + i * 0.12 }}
                >
                  {step.desc}
                </motion.p>
                {i < steps.length - 1 && (
                  <div className="relative h-10 w-px">
                    <motion.div
                      className="h-full w-full bg-border"
                      initial={{ scaleY: 0 }}
                      animate={inView ? { scaleY: 1 } : {}}
                      transition={{ delay: 0.4 + i * 0.12 }}
                      style={{ transformOrigin: "top" }}
                    />
                    {inView && (
                      <>
                        <FlowingDot delay={1 + i * 0.4} vertical />
                        <FlowingDot delay={3 + i * 0.4} vertical />
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
