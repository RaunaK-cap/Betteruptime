"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Activity, AlertCircle, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/themetoggler";

const API = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:4000";
const TOKEN_KEY = "pulsewatch_token";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showPw, setShowPw] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/v1/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json() as { token?: string; message?: string };
      if (!res.ok || !data.token) throw new Error(data.message ?? "Login failed.");
      window.localStorage.setItem(TOKEN_KEY, data.token);
      router.push("/dashboard");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-background text-foreground">

      {/* ── Left brand panel ── */}
      <div className="hidden lg:flex lg:w-[42%] bg-foreground flex-col justify-between p-10 relative overflow-hidden shrink-0">
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "linear-gradient(currentColor 1px,transparent 1px),linear-gradient(90deg,currentColor 1px,transparent 1px)", backgroundSize: "36px 36px" }} />

        {/* Brand */}
        <div className="relative flex items-center gap-2.5 z-10">
          <div className="h-8 w-8 rounded-lg bg-background flex items-center justify-center">
            <Activity className="h-4 w-4 text-foreground" />
          </div>
          <span className="text-background font-semibold text-sm tracking-tight">Pulsewatch</span>
        </div>

        {/* Headline */}
        <div className="relative z-10 space-y-4">
          <h2 className="text-3xl font-bold text-background leading-snug">
            Know the moment<br />something breaks.
          </h2>
          <p className="text-sm text-background/60 leading-relaxed max-w-xs">
            Real-time uptime monitoring. Track response times across regions and get instant status updates.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { label: "Uptime", value: "99.9%" },
              { label: "Latency", value: "< 200ms" },
              { label: "Storage", value: "PostgreSQL" },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-lg border border-background/20 bg-background/10 px-3 py-2">
                <p className="text-[10px] text-background/50">{label}</p>
                <p className="text-sm font-semibold text-background">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-[11px] text-background/30">© 2025 Pulsewatch</p>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <Link href="/" className="lg:hidden flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-foreground flex items-center justify-center">
              <Activity className="h-3 w-3 text-background" />
            </div>
            <span className="text-sm font-semibold">Pulsewatch</span>
          </Link>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-xs text-muted-foreground">No account?</span>
            <Button variant="outline" size="sm" className="h-8 text-xs" asChild>
              <Link href="/auth/signup">Sign up</Link>
            </Button>
            <ModeToggle />
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <motion.div
            className="w-full max-w-sm"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight mb-1">Welcome back</h1>
              <p className="text-sm text-muted-foreground">Sign in to your pulsewatch account.</p>
            </div>

            {error && (
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-xs text-destructive">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Username</Label>
                <Input
                  id="username"
                  placeholder="your-username"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="h-9 text-sm"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPw ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="h-9 text-sm pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPw ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full h-9 gap-1.5 text-sm" disabled={submitting} id="login-btn">
                {submitting ? "Signing in…" : <><span>Sign in</span><ArrowRight className="h-3.5 w-3.5" /></>}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-6">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-foreground font-semibold hover:underline underline-offset-4">
                Sign up free
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
