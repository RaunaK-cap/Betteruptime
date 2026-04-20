"use client"
import { useState } from "react";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {ModeToggle} from "@/components/themetoggler";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:4000";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: form.firstName,
          lastname: form.lastName,
          username: form.username,
          password: form.password,
        }),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message ?? "Signup failed.");
      }

      router.push("/auth/login");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Signup failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 relative">
      <div className="absolute top-4 right-4"><ModeToggle /></div>
      <motion.div
        className="w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/" className="text-xs font-medium tracking-tight block mb-10">
          BetterUptime
        </Link>

        <h1 className="text-xl font-extralight tracking-tight mb-1">Create an account</h1>
        <p className="text-xs text-muted-foreground font-light mb-8">
          Start monitoring in under 2 minutes.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage ? (
            <div className="rounded-lg border border-[hsl(var(--destructive)/0.3)] bg-[hsl(var(--destructive)/0.06)] px-3 py-2 text-[11px] font-light text-[hsl(var(--destructive))]">
              {errorMessage}
            </div>
          ) : null}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-[11px] font-light text-muted-foreground">First name</Label>
              <Input
                placeholder="John"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className="h-9 text-xs font-light rounded-lg border-border bg-background placeholder:text-muted-foreground/50 focus-visible:ring-1 focus-visible:ring-foreground/20"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] font-light text-muted-foreground">Last name</Label>
              <Input
                placeholder="Doe"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="h-9 text-xs font-light rounded-lg border-border bg-background placeholder:text-muted-foreground/50 focus-visible:ring-1 focus-visible:ring-foreground/20"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[11px] font-light text-muted-foreground">Username</Label>
            <Input
              placeholder="johndoe"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="h-9 text-xs font-light rounded-lg border-border bg-background placeholder:text-muted-foreground/50 focus-visible:ring-1 focus-visible:ring-foreground/20"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-[11px] font-light text-muted-foreground">Password</Label>
            <Input
              type="password"
              placeholder="********"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="h-9 text-xs font-light rounded-lg border-border bg-background placeholder:text-muted-foreground/50 focus-visible:ring-1 focus-visible:ring-foreground/20"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-9 rounded-lg text-xs font-normal mt-2"
          >
            {isSubmitting ? "Creating..." : "Create account"}
          </Button>
        </form>

        <p className="text-[11px] text-muted-foreground font-light text-center mt-6">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-foreground hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
