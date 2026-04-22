"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Activity, AlertCircle, Eye, EyeOff, ArrowRight, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/themetoggler";

const API = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:4000";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({ firstName: "", lastName: "", username: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPw, setShowPw] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/v1/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: form.firstName,
          lastname: form.lastName,
          username: form.username,
          password: form.password,
        }),
      });
      const data = await res.json() as { message?: string };
      if (!res.ok) throw new Error(data.message ?? "Signup failed.");
      setSuccess(true);
      setTimeout(() => router.push("/auth/login"), 1500);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Signup failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-background text-foreground">

      {/* ── Left brand panel ── */}
      <div className="hidden lg:flex lg:w-[42%] bg-foreground flex-col justify-between p-10 relative overflow-hidden shrink-0">
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "linear-gradient(currentColor 1px,transparent 1px),linear-gradient(90deg,currentColor 1px,transparent 1px)", backgroundSize: "36px 36px" }} />

        <div className="relative flex items-center gap-2.5 z-10">
          <div className="h-8 w-8 rounded-lg bg-background flex items-center justify-center">
            <Activity className="h-4 w-4 text-foreground" />
          </div>
          <span className="text-background font-semibold text-sm tracking-tight">pulsewatch</span>
        </div>

        <div className="relative z-10 space-y-5">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-background leading-snug">
              Start monitoring<br />in minutes.
            </h2>
            <p className="text-sm text-background/60 leading-relaxed max-w-xs">
              Create a free account and add your first website. Get real-time uptime and response data instantly.
            </p>
          </div>
          <div className="space-y-2.5 pt-1">
            {[
              "Multi-region uptime checks",
              "Response time tracking",
              "Instant status updates",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-background/70 shrink-0" />
                <p className="text-sm text-background/70">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-[11px] text-background/30">© 2025 pulsewatch</p>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <Link href="/" className="lg:hidden flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-foreground flex items-center justify-center">
              <Activity className="h-3 w-3 text-background" />
            </div>
            <span className="text-sm font-semibold">pulsewatch</span>
          </Link>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Have an account?</span>
            <Button variant="outline" size="sm" className="h-8 text-xs" asChild>
              <Link href="/auth/login">Sign in</Link>
            </Button>
            <ModeToggle />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <motion.div
            className="w-full max-w-sm"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight mb-1">Create an account</h1>
              <p className="text-sm text-muted-foreground">Start monitoring your websites for free.</p>
            </div>

            {success && (
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-2.5 text-xs text-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> Account created! Redirecting to login…
              </div>
            )}

            {error && (
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-xs text-destructive">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">First name</Label>
                  <Input id="firstname" placeholder="John" value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="h-9 text-sm" required />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Last name</Label>
                  <Input id="lastname" placeholder="Doe" value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="h-9 text-sm" required />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Username</Label>
                <Input id="signup-username" placeholder="johndoe" value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })} className="h-9 text-sm" required />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Password</Label>
                <div className="relative">
                  <Input id="signup-password" type={showPw ? "text" : "password"} placeholder="••••••••"
                    value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="h-9 text-sm pr-10" required />
                  <button type="button" onClick={() => setShowPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPw ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>

              <Button id="signup-btn" type="submit" className="w-full h-9 gap-1.5 text-sm" disabled={submitting || success}>
                {submitting ? "Creating account…" : <><span>Create account</span><ArrowRight className="h-3.5 w-3.5" /></>}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-6">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-foreground font-semibold hover:underline underline-offset-4">Sign in</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
