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
import { ASCII_WAVE } from "@/components/ascii-wave";

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
    <div className="min-h-screen relative flex items-center justify-center bg-background overflow-hidden isolate">
      {/* ── Background ── */}
      <div 
        className="absolute inset-0 z-[-1] flex items-center justify-center opacity-30 dark:opacity-40 pointer-events-none select-none"
        style={{ 
          maskImage: 'radial-gradient(ellipse at center, transparent 20%, black 70%)', 
          WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 20%, black 70%)' 
        }}
      >
        <pre className="text-[12px] leading-[14px] tracking-[0.2em] font-mono text-muted-foreground whitespace-pre font-bold text-center">
          {ASCII_WAVE}
        </pre>
      </div>

      {/* ── Top Bar ── */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-6 z-20">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-8 w-8 rounded-lg bg-foreground flex items-center justify-center group-hover:scale-105 transition-transform">
            <Activity className="h-4 w-4 text-background" />
          </div>
          <span className="text-sm font-bold tracking-tight">pulsewatch</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground hidden sm:block">Have an account?</span>
          <Button variant="outline" size="sm" className="h-8 text-xs" asChild>
            <Link href="/auth/login">Sign in</Link>
          </Button>
          <ModeToggle />
        </div>
      </div>

      {/* ── Centered Auth Card ── */}
      <motion.div
        className="w-full max-w-[420px] rounded-2xl border border-border bg-background/60 backdrop-blur-xl shadow-2xl p-8 relative z-10 mx-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight mb-2">Create an account</h1>
          <p className="text-sm text-muted-foreground">Start monitoring your websites for free.</p>
        </div>

        {success && (
          <div className="mb-5 flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-2.5 text-xs text-foreground">
            <CheckCircle2 className="h-4 w-4 shrink-0" /> Account created! Redirecting to login…
          </div>
        )}

        {error && (
          <div className="mb-5 flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-xs text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">First name</Label>
              <Input id="firstname" placeholder="John" value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="h-10 text-sm bg-muted/50" required disabled={success} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Last name</Label>
              <Input id="lastname" placeholder="Doe" value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="h-10 text-sm bg-muted/50" required disabled={success} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Username</Label>
            <Input id="signup-username" placeholder="johndoe" value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })} className="h-10 text-sm bg-muted/50" required disabled={success} />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Password</Label>
            <div className="relative">
              <Input id="signup-password" type={showPw ? "text" : "password"} placeholder="••••••••"
                value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="h-10 text-sm pr-10 bg-muted/50" required disabled={success} />
              <button type="button" onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" disabled={success}>
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button id="signup-btn" type="submit" className="w-full h-10 gap-2 text-sm mt-2" disabled={submitting || success}>
            {submitting ? "Creating account…" : <><span>Create account</span><ArrowRight className="h-4 w-4" /></>}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-6">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-foreground font-semibold hover:underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
