"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Header Component
function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white animate-heart-pulse"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10.5 1.5a2.121 2.121 0 0 0-2.828 2.828l2.121-2.121z" />
              <path d="M10 3c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" />
            </svg>
          </div>
          <span className="text-sm font-light text-slate-900">PulseWatch</span>
        </motion.div>

        <nav className="hidden md:flex items-center gap-8">
          {["Features", "Integrations", "Pricing", "Docs"].map((item) => (
            <motion.a
              key={item}
              href="#"
              className="text-xs text-slate-600 hover:text-slate-900 transition-colors font-light"
              whileHover={{ y: -2 }}
            >
              {item}
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/auth/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xs px-4 py-2 text-slate-600 hover:text-slate-900 font-light border border-transparent hover:border-slate-200 rounded-lg transition-all"
            >
              Sign In
            </motion.button>
          </Link>
          <Link href="/auth/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xs px-4 py-2 bg-emerald-500 text-white rounded-lg font-light hover:bg-emerald-600 transition-colors"
            >
              Get Started Free
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

// Hero Section with Animated Heartbeat
function HeroSection() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => (prev + Math.floor(Math.random() * 5) + 1) % 100000);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 left-10 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-32 right-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-4xl mx-auto text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 mb-8"
        >
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse-glow"></div>
          <span className="text-xs text-emerald-700 font-light">
            Real-time monitoring is live
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-light text-slate-900 mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Know Your Systems Are{" "}
          <span className="text-emerald-500">Always Live</span>
        </motion.h1>

        <motion.p
          className="text-base md:text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Beautiful uptime monitoring and incident management for teams that
          refuse to compromise. Detect issues in seconds, not hours.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Link href="/auth/login">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(16, 185, 129, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-emerald-500 text-white rounded-lg text-sm font-light hover:bg-emerald-600 transition-colors glass"
            >
              Get Started Free
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border border-slate-200 text-slate-900 rounded-lg text-sm font-light hover:bg-slate-50 transition-colors"
          >
            View Demo
          </motion.button>
        </motion.div>

        {/* Animated Metrics */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-8 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-light text-emerald-500 animate-glow-pulse">
              27K+
            </span>
            <span className="text-slate-600 text-xs">Active Monitors</span>
          </div>
          <div className="w-px bg-slate-200"></div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-light text-emerald-500 animate-glow-pulse">
              99.99%
            </span>
            <span className="text-slate-600 text-xs">Average Uptime</span>
          </div>
          <div className="w-px bg-slate-200"></div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-light text-emerald-500 animate-glow-pulse">
              2.3s
            </span>
            <span className="text-slate-600 text-xs">Alert Time</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <svg
          className="w-5 h-5 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  );
}

// Bento Grid Feature Items
interface BentoItemProps {
  className?: string;
  delay?: number;
  children: React.ReactNode;
}

function BentoItem({ className = "", delay = 0, children }: BentoItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
      className={`glass rounded-xl p-8 transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Features Section with Animated Bento Grid
function FeaturesSection() {
  const bentoItems = [
    {
      title: "Instant Alerts",
      description:
        "Get notified instantly via SMS, email, Slack, or voice call when issues occur",
      colSpan: "lg:col-span-2",
      rowSpan: "lg:row-span-1",
      content: "alerts",
    },
    {
      title: "Multi-Location Monitoring",
      description:
        "Monitor from multiple geographic locations to eliminate false positives",
      colSpan: "lg:col-span-1",
      rowSpan: "lg:row-span-1",
      content: "location",
    },
    {
      title: "Status Pages",
      description:
        "Beautiful status pages to keep your customers informed in real-time",
      colSpan: "lg:col-span-1",
      rowSpan: "lg:row-span-1",
      content: "status",
    },
    {
      title: "Deep Insights",
      description:
        "Detailed analytics with screenshots, logs, and response times for debugging",
      colSpan: "lg:col-span-1",
      rowSpan: "lg:row-span-1",
      content: "analytics",
    },
    {
      title: "On-Call Scheduling",
      description:
        "Smart scheduling system for on-call rotations and incident escalation",
      colSpan: "lg:col-span-1",
      rowSpan: "lg:row-span-1",
      content: "schedule",
    },
    {
      title: "API Integrations",
      description:
        "Seamless integrations with your favorite tools and platforms",
      colSpan: "lg:col-span-1",
      rowSpan: "lg:row-span-1",
      content: "integrations",
    },
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs text-emerald-600 font-light mb-4 block">
            POWERFUL FEATURES
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-4 tracking-tight">
            Everything You Need To Monitor
          </h2>
          <p className="text-slate-600 font-light max-w-2xl mx-auto">
            Comprehensive monitoring tools designed for modern DevOps teams
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
          {bentoItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`${item.colSpan} ${item.rowSpan} bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/60 hover:border-emerald-300/50 hover:bg-white/70 transition-all duration-300 cursor-pointer group`}
            >
              {/* Visual Content Area */}
              <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl mb-6 flex items-center justify-center overflow-hidden group-hover:from-emerald-50 group-hover:to-slate-50 transition-colors duration-300">
                {item.content === "alerts" && (
                  <div className="w-full h-full flex items-center justify-center gap-4">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center"
                    >
                      <span className="text-2xl">💬</span>
                    </motion.div>
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                      className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center"
                    >
                      <span className="text-2xl">📧</span>
                    </motion.div>
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                      className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center"
                    >
                      <span className="text-2xl">🔴</span>
                    </motion.div>
                  </div>
                )}
                {item.content === "location" && (
                  <div className="flex flex-wrap gap-4 justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="px-4 py-2 bg-emerald-200 text-emerald-700 rounded-full text-xs font-light"
                    >
                      US-East
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="px-4 py-2 bg-emerald-200 text-emerald-700 rounded-full text-xs font-light"
                    >
                      EU-West
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="px-4 py-2 bg-emerald-200 text-emerald-700 rounded-full text-xs font-light"
                    >
                      Asia-Pac
                    </motion.div>
                  </div>
                )}
                {item.content === "status" && (
                  <div className="space-y-3 w-2/3">
                    <motion.div
                      animate={{ width: ["60%", "80%", "60%"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="h-2 bg-emerald-500 rounded-full"
                    ></motion.div>
                    <motion.div
                      animate={{ width: ["70%", "90%", "70%"] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                      className="h-2 bg-emerald-400 rounded-full"
                    ></motion.div>
                    <motion.div
                      animate={{ width: ["50%", "75%", "50%"] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                      className="h-2 bg-emerald-300 rounded-full"
                    ></motion.div>
                  </div>
                )}
                {item.content === "analytics" && (
                  <div className="flex items-end gap-2 h-full">
                    {[40, 60, 75, 50, 85, 70].map((height, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [height, height + 20, height] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                        className={`flex-1 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-sm`}
                        style={{ minHeight: `${height}%` }}
                      ></motion.div>
                    ))}
                  </div>
                )}
                {item.content === "schedule" && (
                  <div className="space-y-3 w-3/4">
                    {["emerald", "blue", "purple"].map((color, i) => (
                      <motion.div
                        key={i}
                        animate={{ x: [0, 10, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                        className="flex gap-2 items-center"
                      >
                        <div
                          className={`w-3 h-3 rounded-full bg-${color}-500`}
                        ></div>
                        <div
                          className={`flex-1 h-2 bg-${color}-200 rounded`}
                        ></div>
                      </motion.div>
                    ))}
                  </div>
                )}
                {item.content === "integrations" && (
                  <div className="grid grid-cols-2 gap-4">
                    {["GH", "GL", "GD", "JP"].map((text, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        className={`w-12 h-12 bg-${["blue", "red", "purple", "orange"][i]}-600 rounded-lg flex items-center justify-center text-white text-xs font-bold`}
                      >
                        {text}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              <h3 className="text-lg font-light text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 font-light leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Live Demo Section
function DemoSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs text-emerald-600 font-light mb-4 block">
            LIVE DASHBOARD
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-4">
            See It In Action
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 md:p-12 overflow-hidden"
        >
          <div className="space-y-6">
            {/* Dashboard Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-lg font-light text-slate-900">
                  Monitoring Dashboard
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-light">
                  Real-time system status
                </p>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 bg-emerald-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.2,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["API Server", "Database", "CDN Service"].map((service, idx) => (
                <motion.div
                  key={service}
                  className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-emerald-200 transition-colors"
                  whileHover={{ y: -4 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-light text-slate-700">
                      {service}
                    </span>
                    <span className="flex items-center gap-2">
                      <motion.div
                        className="w-2 h-2 bg-emerald-500 rounded-full"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <span className="text-xs text-emerald-600 font-light">
                        Healthy
                      </span>
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 font-light">
                    Uptime: <span className="text-emerald-600">99.99%</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mini Chart */}
            <div className="p-4 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-lg border border-slate-200 h-32 flex items-end gap-1 justify-around">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-emerald-400 to-emerald-500 rounded-t opacity-70 hover:opacity-100 transition-opacity"
                  initial={{ height: 0 }}
                  whileInView={{ height: `${Math.random() * 100 + 20}%` }}
                  transition={{ duration: 0.8, delay: i * 0.05 }}
                  viewport={{ once: true }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Benefits Section
function BenefitsSection() {
  const benefits = [
    {
      stat: "98%",
      label: "Faster Issue Resolution",
      icon: "⚡",
    },
    {
      stat: "27K",
      label: "Active Monitors",
      icon: "📊",
    },
    {
      stat: "99.99%",
      label: "Platform Uptime",
      icon: "✓",
    },
    {
      stat: "2.3s",
      label: "Average Alert Time",
      icon: "🔔",
    },
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="mb-4 text-4xl">{benefit.icon}</div>
              <motion.div
                className="text-4xl md:text-5xl font-light text-emerald-600 mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: idx * 0.1 + 0.3 }}
                viewport={{ once: true }}
              >
                {benefit.stat}
              </motion.div>
              <p className="text-sm text-slate-600 font-light">
                {benefit.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setEmail("");
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-4">
            Ready to Monitor Better?
          </h2>
          <p className="text-slate-600 font-light">
            Join thousands of teams that trust PulseWatch for their uptime
            monitoring
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass rounded-xl p-8 flex flex-col sm:flex-row gap-4"
        >
          <input
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 bg-transparent border-b border-slate-300 focus:border-emerald-500 focus:outline-none text-sm font-light placeholder-slate-400 transition-colors"
            disabled={submitted}
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-emerald-500 text-white rounded-lg text-sm font-light hover:bg-emerald-600 transition-colors whitespace-nowrap disabled:opacity-50"
            disabled={submitted}
          >
            {submitted ? "Check Your Email" : "Get Started"}
          </motion.button>
        </motion.form>

        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-center mt-6 text-sm text-emerald-600 font-light"
            >
              ✓ Check your email to get started!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-emerald-500 rounded-md flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.5 1.5a2.121 2.121 0 0 0-2.828 2.828l2.121-2.121z" />
                </svg>
              </div>
              <span className="text-sm font-light text-slate-900">
                PulseWatch
              </span>
            </div>
            <p className="text-xs text-slate-600 font-light">
              Beautiful uptime monitoring for modern teams
            </p>
          </div>

          {[
            {
              title: "Product",
              links: ["Features", "Pricing", "Security", "Status"],
            },
            {
              title: "Company",
              links: ["Blog", "About", "Careers", "Contact"],
            },
            {
              title: "Resources",
              links: ["Docs", "API", "Community", "Support"],
            },
          ].map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-light text-slate-900 mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs text-slate-600 hover:text-slate-900 font-light transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600 font-light">
            © 2024 PulseWatch. All rights reserved.
          </p>
          <div className="flex gap-4">
            {["Twitter", "GitHub", "LinkedIn"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs text-slate-600 hover:text-slate-900 font-light transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Page Component
export default function Page() {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <DemoSection />
      <BenefitsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
