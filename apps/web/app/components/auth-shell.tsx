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
  "Unified monitoring, incident response, and status pages",
  "Escalations and runbooks that stay readable under pressure",
  "Customer communication synced directly from the incident timeline",
];

export function AuthShell({ mode, title, description }: AuthShellProps) {
  const isSignup = mode === "signup";
  const pageRef = useRef<HTMLElement>(null);

  useRevealMotion({ rootRef: pageRef });

  return (
    <main ref={pageRef} className="auth-page">
      <section className="auth-layout">
        <div className="auth-panel auth-panel-form">
          <div className="auth-panel-inner">
            <div data-reveal className="reveal-block auth-topbar">
              <Link href="/" className="auth-brand">
                <span className="brand-lockup">BU</span>
                <span>Better Uptime</span>
              </Link>
              <ThemeToggle />
            </div>

            <div className="auth-form-wrap">
              <p className="section-kicker">{isSignup ? "Create account" : "Welcome back"}</p>
              <h1 data-reveal className="reveal-block auth-title">
                {title}
              </h1>
              <p data-reveal className="reveal-block auth-copy" style={{ transitionDelay: "80ms" }}>
                {description}
              </p>

              <form data-reveal className="reveal-block auth-form" style={{ transitionDelay: "140ms" }}>
                {isSignup ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="auth-field">
                      <span>First name</span>
                      <input type="text" name="firstName" placeholder="Aarav" />
                    </label>
                    <label className="auth-field">
                      <span>Last name</span>
                      <input type="text" name="lastName" placeholder="Patel" />
                    </label>
                  </div>
                ) : null}

                <label className="auth-field">
                  <span>Email</span>
                  <input type="email" name="email" placeholder="aarav@company.com" />
                </label>

                <label className="auth-field">
                  <span>Password</span>
                  <input type="password" name="password" placeholder="Enter your password" />
                </label>

                <button type="submit" className="button button-dark auth-submit">
                  {isSignup ? "Create account" : "Log in"}
                </button>
              </form>

              <p data-reveal className="reveal-block auth-switch" style={{ transitionDelay: "180ms" }}>
                {isSignup ? "Already have an account?" : "Need an account?"}{" "}
                <Link href={isSignup ? "/login" : "/signup"}>
                  {isSignup ? "Log in" : "Sign up"}
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="auth-panel auth-panel-story">
          <div className="auth-scene">
            <div className="auth-scene-sky" />
            <div className="auth-scene-cloud auth-scene-cloud-a" />
            <div className="auth-scene-cloud auth-scene-cloud-b" />
            <div className="auth-scene-ridge auth-scene-ridge-back" />
            <div className="auth-scene-ridge auth-scene-ridge-front" />
            <div className="auth-scene-lake" />
            <div className="auth-scene-glow" />
            <div className="auth-scene-paper auth-scene-paper-a" />
            <div className="auth-scene-paper auth-scene-paper-b" />
          </div>

          <div className="auth-story-content">
            <p className="section-kicker text-white/60">Operational clarity</p>
            <h2 data-reveal className="reveal-block">
              {isSignup
                ? "Start with the uptime platform that feels calm before the first alert."
                : "Step back into the mission control layer for your team."}
            </h2>
            <p data-reveal className="reveal-block" style={{ transitionDelay: "80ms" }}>
              {isSignup
                ? "Spin up monitoring, paging, and status communication in one flow from day one."
                : "Review live incidents, handoffs, and customer messaging from the same connected interface."}
            </p>

            <div data-reveal className="reveal-block auth-proof-stack" style={{ transitionDelay: "140ms" }}>
              {authHighlights.map((item) => (
                <div key={item} className="auth-proof-card hover-rise">
                  {item}
                </div>
              ))}
            </div>

            <div data-reveal className="reveal-block auth-mini-card" style={{ transitionDelay: "180ms" }}>
              <span className="badge-label">Live snapshot</span>
              <strong>24 healthy checks</strong>
              <small>Rollback and customer status drafts remain in sync.</small>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
