"use client";

import Link from "next/link";
import { useRef } from "react";

import { ThemeToggle } from "./theme-toggle";
import { useRevealMotion } from "./use-reveal-motion";

type AuthShellProps = {
  mode: "login" | "signup";
  title: string;
  description: string;
};

const authHighlights = [
  "Checks stay visible across India, the US, and nearby regions.",
  "Every failure is stored as downtime history, not just a transient alert.",
  "The same clean surface works in both dark and light theme.",
];

export function AuthShell({ mode, title, description }: AuthShellProps) {
  const isSignup = mode === "signup";
  const pageRef = useRef<HTMLElement>(null);

  useRevealMotion({ rootRef: pageRef });

  return (
    <main ref={pageRef} className="auth-page">
      <section className="auth-layout">
        <div className="auth-form-panel">
          <div data-reveal className="reveal-block auth-topbar">
            <Link href="/" className="flex items-center gap-3">
              <span className="brand-lockup">BU</span>
              <div>
                <p className="nav-brand">BetterUptime</p>
                <p className="nav-copy">Monitoring with regional clarity</p>
              </div>
            </Link>
            <ThemeToggle />
          </div>

          <div className="auth-form-wrap">
            <p data-reveal className="reveal-block section-kicker">
              {isSignup ? "Create workspace" : "Welcome back"}
            </p>
            <h1 data-reveal className="reveal-block auth-title" style={{ transitionDelay: "60ms" }}>
              {title}
            </h1>
            <p data-reveal className="reveal-block auth-copy" style={{ transitionDelay: "110ms" }}>
              {description}
            </p>

            <form data-reveal className="reveal-block auth-form" style={{ transitionDelay: "160ms" }}>
              {isSignup ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="auth-field">
                    <span>First name</span>
                    <input type="text" name="firstName" placeholder="Aarav" autoComplete="given-name" />
                  </label>
                  <label className="auth-field">
                    <span>Last name</span>
                    <input type="text" name="lastName" placeholder="Patel" autoComplete="family-name" />
                  </label>
                </div>
              ) : null}

              <label className="auth-field">
                <span>Username</span>
                <input type="text" name="username" placeholder="aaravpatel" autoComplete="username" />
              </label>

              <label className="auth-field">
                <span>Password</span>
                <input
                  type="password"
                  name="password"
                  placeholder={isSignup ? "Create a secure password" : "Enter your password"}
                  autoComplete={isSignup ? "new-password" : "current-password"}
                />
              </label>

              <button type="submit" className="button button-dark auth-submit">
                {isSignup ? "Create account" : "Log in"}
              </button>
            </form>

            <p data-reveal className="reveal-block auth-switch" style={{ transitionDelay: "210ms" }}>
              {isSignup ? "Already have an account?" : "Need an account?"}{" "}
              <Link href={isSignup ? "/login" : "/signup"}>{isSignup ? "Log in" : "Sign up"}</Link>
            </p>
          </div>
        </div>

        <div className="auth-story-panel">
          <div className="auth-story-orb auth-story-orb-a" />
          <div className="auth-story-orb auth-story-orb-b" />

          <div className="auth-story-copy">
            <p data-reveal className="reveal-block section-kicker text-white/70">
              Product preview
            </p>
            <h2 data-reveal className="reveal-block auth-story-title" style={{ transitionDelay: "70ms" }}>
              {isSignup
                ? "Launch a monitoring workspace that already feels organized."
                : "Return to your uptime board without digging through noise."}
            </h2>
            <p data-reveal className="reveal-block auth-story-text" style={{ transitionDelay: "120ms" }}>
              {isSignup
                ? "Create an account, add your website, choose a minute interval, and start collecting uptime and downtime history across your key regions."
                : "Jump back into your regional stats, live incidents, and stored outage reports from a cleaner control surface."}
            </p>
          </div>

          <div data-reveal className="reveal-block auth-window" style={{ transitionDelay: "170ms" }}>
            <div className="product-window">
              <div className="window-topbar">
                <div className="flex items-center gap-2">
                  <span className="window-dot bg-[#8ab8ea]" />
                  <span className="window-dot bg-[#c7dff8]" />
                  <span className="window-dot bg-[#ecf5ff]" />
                </div>
                <span className="window-url">
                  {isSignup ? "app.betteruptime.in/setup" : "app.betteruptime.in/activity"}
                </span>
              </div>

              <div className="auth-window-body">
                <div className="mini-grid">
                  {[
                    ["Checks", "1m cadence"],
                    ["Regions", "India + US"],
                    ["History", "365 days"],
                    ["Theme", "Dark / Light"],
                  ].map(([label, value]) => (
                    <div key={label} className="mini-panel">
                      <span>{label}</span>
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>

                <div className="auth-proof-list">
                  {authHighlights.map((item) => (
                    <div key={item} className="auth-proof-card hover-rise">
                      {item}
                    </div>
                  ))}
                </div>

                <div className="auth-mini-card">
                  <span className="badge-label">Live sample</span>
                  <strong>Homepage outage closed in 7 minutes</strong>
                  <small>Mumbai, Delhi, and Virginia checks were preserved in the report.</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
