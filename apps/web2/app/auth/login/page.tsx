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
import { ASCII_WAVE } from "@/components/ascii-wave";

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
          <span className="text-xs text-muted-foreground hidden sm:block">No account?</span>
          <Button variant="outline" size="sm" className="h-8 text-xs" asChild>
            <Link href="/auth/signup">Sign up</Link>
          </Button>
          <ModeToggle />
        </div>
      </div>

      {/* ── Centered Auth Card ── */}
      <motion.div
        className="w-full max-w-[380px] rounded-2xl border border-border bg-background/60 backdrop-blur-xl shadow-2xl p-8 relative z-10 mx-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight mb-2">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Sign in to your pulsewatch account.</p>
        </div>

        {error && (
          <div className="mb-5 flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-xs text-destructive">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Username</Label>
            <Input
              id="username"
              placeholder="your-username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="h-10 text-sm bg-muted/50"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="h-10 text-sm pr-10 bg-muted/50"
                required
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full h-10 gap-2 text-sm mt-2" disabled={submitting} id="login-btn">
            {submitting ? "Signing in…" : <><span>Sign in</span><ArrowRight className="h-4 w-4" /></>}
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
  );
}
