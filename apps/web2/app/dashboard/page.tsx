"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  RefreshCw, Plus, Trash2, Globe, Activity,
  TrendingUp, AlertCircle, CheckCircle2, XCircle,
  LogOut, ChevronDown, ChevronUp, Clock, Server,
  LayoutDashboard, Radio, X,
} from "lucide-react";

import { ModeToggle } from "@/components/themetoggler";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

// ─── Types ────────────────────────────────────────────────────────────────────

type WStatus = "up" | "down" | "unknow";

interface Tick {
  id: number;
  Response_time_ms: number;
  Status: WStatus;
  region_id: number;
  website_id: number;
  createdAt: string;
  updatedAt: string;
}

interface Site {
  id: number;
  url: string;
  createdAt: string;
  updatedAt: string;
  ticks: Tick[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const API = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:4000";
const TOKEN_KEY = "pulsewatch_token";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function uid(token: string) {
  try {
    const p = token.split(".")[1]!;
    const d = JSON.parse(window.atob(p.replace(/-/g, "+").replace(/_/g, "/")));
    return String(d.userId ?? "u");
  } catch { return "u"; }
}

const idsKey = (t: string) => `pulsewatch_website_ids_${uid(t)}`;

function readIds(t: string): number[] {
  try {
    const raw = localStorage.getItem(idsKey(t));
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.map(Number).filter((n) => n > 0) : [];
  } catch { return []; }
}

function writeIds(t: string, ids: number[]) {
  localStorage.setItem(idsKey(t), JSON.stringify(ids));
}

function host(url: string) {
  try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return url; }
}

function sCfg(s?: WStatus) {
  if (s === "up")    return { label: "Up",      dot: "bg-emerald-500", badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20", row: "border-l-emerald-500" };
  if (s === "down")  return { label: "Down",    dot: "bg-red-500",     badge: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",                row: "border-l-red-500" };
  return                    { label: "Unknown", dot: "bg-amber-400",   badge: "bg-amber-400/10 text-amber-600 dark:text-amber-400 border-amber-400/20",         row: "border-l-amber-400" };
}

function fmtTime(ms: number) {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

function fmtDate(d: string) {
  return new Date(d).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const router = useRouter();
  const [token, setToken]       = useState("");
  const [sites, setSites]       = useState<Site[]>([]);
  const [showAdd, setShowAdd]   = useState(false);
  const [newUrl, setNewUrl]     = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [booting, setBooting]   = useState(true);
  const [loading, setLoading]   = useState(false);
  const [saving, setSaving]     = useState(false);
  const [delId, setDelId]       = useState<number | null>(null);
  const [err, setErr]           = useState("");
  const [spinning, setSpinning] = useState(false);

  // Stats
  const stats = useMemo(() => {
    const up  = sites.filter((s) => s.ticks[0]?.Status === "up").length;
    const dn  = sites.filter((s) => s.ticks[0]?.Status === "down").length;
    const ms  = sites.map((s) => s.ticks[0]?.Response_time_ms).filter(Boolean) as number[];
    const avg = ms.length ? Math.round(ms.reduce((a, b) => a + b, 0) / ms.length) : null;
    return { total: sites.length, up, down: dn, avg };
  }, [sites]);

  // ── API helpers ─────────────────────────────────────────────────────────────

  async function fetchOne(id: number, tok: string): Promise<Site | null> {
    try {
      const r = await fetch(`${API}/api/v2/content/website/${id}`, {
        headers: { Authorization: tok }, cache: "no-store",
      });
      const d = await r.json();
      return r.ok ? d.websitedata : null;
    } catch { return null; }
  }

  async function loadAll(tok: string, quiet = false) {
    quiet ? setSpinning(true) : setLoading(true);
    setErr("");
    try {
      const ids = readIds(tok);
      if (!ids.length) { setSites([]); return; }
      const res = await Promise.all(ids.map((id) => fetchOne(id, tok)));
      const valid = res.filter((s): s is Site => Boolean(s));
      writeIds(tok, valid.map((s) => s.id));
      setSites(valid);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to load.");
    } finally { setLoading(false); setSpinning(false); }
  }

  // ── Effects ─────────────────────────────────────────────────────────────────

  useEffect(() => {
    const tok = localStorage.getItem(TOKEN_KEY);
    if (!tok) { router.replace("/auth/login"); return; }
    setToken(tok);
    loadAll(tok).finally(() => setBooting(false));
  }, [router]);

  // ── Handlers ────────────────────────────────────────────────────────────────

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!token || !newUrl.trim()) return;
    setSaving(true); setErr("");
    try {
      const r = await fetch(`${API}/api/v2/content/website`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify({ url: newUrl.trim() }),
      });
      const d = await r.json();
      if (!r.ok || !d.websiteID) throw new Error(d.message ?? "Failed.");
      writeIds(token, [d.websiteID, ...readIds(token).filter((i) => i !== d.websiteID)]);
      await loadAll(token);
      setNewUrl(""); setShowAdd(false); setExpanded(d.websiteID);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to add.");
    } finally { setSaving(false); }
  }

  async function handleDelete(id: number) {
    if (!token) return;
    setDelId(id); setErr("");
    try {
      const r = await fetch(`${API}/api/v2/content/websitedelete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify({ websiteID: id }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.message ?? "Failed.");
      writeIds(token, readIds(token).filter((i) => i !== id));
      setSites((prev) => prev.filter((s) => s.id !== id));
      setExpanded((cur) => (cur === id ? null : cur));
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to delete.");
    } finally { setDelId(null); }
  }

  function signOut() {
    localStorage.removeItem(TOKEN_KEY);
    router.replace("/auth/login");
  }

  // ── Loading screen ───────────────────────────────────────────────────────────

  if (booting) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-xs text-muted-foreground">Loading…</p>
        </div>
      </div>
    );
  }

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="flex min-h-screen bg-background">

      {/* ── SIDEBAR ─────────────────────────────────────────────────────────── */}
      <aside className="hidden lg:flex w-56 flex-col border-r border-border bg-card shrink-0">
        {/* Brand */}
        <div className="flex h-14 items-center gap-2.5 px-5 border-b border-border">
          <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
            <Activity className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <Link href="/" className="text-sm font-semibold tracking-tight">BetterUptime</Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-2 mb-2">Menu</p>
          {[
            { icon: LayoutDashboard, label: "Dashboard", active: true },
            { icon: Radio, label: "Monitors", active: false },
            { icon: Globe, label: "Websites", active: false },
          ].map(({ icon: Icon, label, active }) => (
            <button
              type="button"
              key={label}
              className={`w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm cursor-pointer transition-colors ${
                active
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="px-3 py-3 border-t border-border space-y-1">
          <button
            type="button"
            onClick={signOut}
            className="w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="sticky top-0 z-40 h-14 border-b border-border bg-background/80 backdrop-blur-md flex items-center justify-between px-6">
          <div>
            <h1 className="text-sm font-semibold">Dashboard</h1>
            <p className="text-[11px] text-muted-foreground leading-tight hidden sm:block">
              Monitor uptime · {stats.total} site{stats.total !== 1 ? "s" : ""} tracked
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 text-xs hidden sm:flex"
              onClick={() => loadAll(token, true)}
              disabled={spinning}
              id="refresh-btn"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${spinning ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button
              size="sm"
              className="h-8 gap-1.5 text-xs"
              onClick={() => setShowAdd((v) => !v)}
              id="add-monitor-btn"
            >
              {showAdd ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
              {showAdd ? "Cancel" : "Add monitor"}
            </Button>
            <ModeToggle />
          </div>
        </header>

        <main className="flex-1 p-6 space-y-5">

          {/* Error */}
          {err && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-2.5 text-xs text-destructive flex items-center gap-2">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {err}
            </div>
          )}

          {/* Add form */}
          <AnimatePresence>
            {showAdd && (
              <motion.div
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.18 }}
                className="overflow-hidden"
              >
                <Card className="border-primary/30 bg-primary/5">
                  <CardContent className="pt-4 pb-4">
                    <p className="text-xs font-semibold mb-3">Add a new monitor</p>
                    <form onSubmit={handleAdd} className="flex items-end gap-3">
                      <div className="flex-1 space-y-1.5">
                        <Label className="text-[11px] text-muted-foreground">Website URL</Label>
                        <Input
                          id="new-url-input"
                          placeholder="https://example.com"
                          value={newUrl}
                          onChange={(e) => setNewUrl(e.target.value)}
                          className="h-8 text-xs"
                          required
                        />
                      </div>
                      <Button id="submit-monitor-btn" type="submit" size="sm" className="h-8 text-xs" disabled={saving}>
                        {saving ? "Adding…" : "Add"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── STAT CARDS ──────────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
            {[
              { label: "Total",       value: stats.total,                          sub: "monitors tracked",    Icon: Globe,         color: "text-blue-500",    bg: "bg-blue-500/10"    },
              { label: "Operational", value: stats.up,                             sub: "sites responding",    Icon: CheckCircle2,  color: "text-emerald-500", bg: "bg-emerald-500/10" },
              { label: "Down",        value: stats.down,                           sub: "sites failing",       Icon: XCircle,       color: "text-red-500",     bg: "bg-red-500/10"     },
              { label: "Avg Response",value: stats.avg !== null ? `${stats.avg}ms` : "—", sub: "average latency", Icon: TrendingUp, color: "text-violet-500",  bg: "bg-violet-500/10"  },
            ].map(({ label, value, sub, Icon, color, bg }) => (
              <Card key={label} className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-xs text-muted-foreground font-medium">{label}</p>
                    <div className={`h-7 w-7 rounded-lg ${bg} flex items-center justify-center`}>
                      <Icon className={`h-3.5 w-3.5 ${color}`} />
                    </div>
                  </div>
                  <p className="text-2xl font-bold tracking-tight">{value}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ── MONITOR TABLE ───────────────────────────────────────────────── */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            {/* Table header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-semibold">Monitors</p>
                <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {sites.length}
                </span>
              </div>
            </div>

            {/* Column labels */}
            {sites.length > 0 && (
              <div className="grid grid-cols-12 items-center px-5 py-2 border-b border-border bg-muted/40 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                <div className="col-span-1" />
                <div className="col-span-4">Website</div>
                <div className="col-span-2 hidden sm:block">Status</div>
                <div className="col-span-2 hidden md:block">Response</div>
                <div className="col-span-2 hidden lg:block">Last Check</div>
                <div className="col-span-1 text-right">Actions</div>
              </div>
            )}

            {/* Rows */}
            {loading ? (
              <div className="divide-y divide-border">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="grid grid-cols-12 items-center gap-3 px-5 py-4">
                    <div className="col-span-1"><Skeleton className="h-2 w-2 rounded-full" /></div>
                    <div className="col-span-4 space-y-1.5">
                      <Skeleton className="h-3 w-28" /><Skeleton className="h-2.5 w-44" />
                    </div>
                    <div className="col-span-2 hidden sm:block"><Skeleton className="h-5 w-16 rounded-full" /></div>
                    <div className="col-span-2 hidden md:block"><Skeleton className="h-3 w-12" /></div>
                    <div className="col-span-2 hidden lg:block"><Skeleton className="h-3 w-24" /></div>
                    <div className="col-span-1" />
                  </div>
                ))}
              </div>
            ) : sites.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                  <Server className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-sm font-semibold mb-1">No monitors yet</p>
                <p className="text-xs text-muted-foreground mb-5 max-w-xs">
                  Add a website to start tracking its uptime and response time.
                </p>
                <Button id="empty-add-btn" size="sm" className="h-8 gap-1.5 text-xs" onClick={() => setShowAdd(true)}>
                  <Plus className="h-3.5 w-3.5" /> Add your first monitor
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {sites.map((site, i) => {
                  const tick = site.ticks[0];
                  const cfg  = sCfg(tick?.Status);
                  const open = expanded === site.id;

                  return (
                    <motion.div
                      key={site.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className={`border-l-2 ${cfg.row} transition-colors`}
                    >
                      {/* ─ Row (div, not button — fixes nested button bug) ─ */}
                      <div
                        className="grid grid-cols-12 items-center gap-2 px-5 py-3.5 cursor-pointer hover:bg-muted/40 transition-colors select-none"
                        onClick={() => setExpanded(open ? null : site.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && setExpanded(open ? null : site.id)}
                        aria-expanded={open}
                      >
                        {/* Status dot */}
                        <div className="col-span-1 flex items-center">
                          <span className={`h-2 w-2 rounded-full ${cfg.dot} ${tick?.Status === "up" ? "animate-pulse" : ""}`} />
                        </div>

                        {/* URL */}
                        <div className="col-span-4 min-w-0">
                          <p className="text-xs font-semibold truncate">{host(site.url)}</p>
                          <p className="text-[10px] text-muted-foreground truncate">{site.url}</p>
                        </div>

                        {/* Status badge */}
                        <div className="col-span-2 hidden sm:block">
                          <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${cfg.badge}`}>
                            {cfg.label}
                          </span>
                        </div>

                        {/* Response */}
                        <div className="col-span-2 hidden md:flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 shrink-0" />
                          {tick ? fmtTime(tick.Response_time_ms) : "—"}
                        </div>

                        {/* Last check */}
                        <div className="col-span-2 hidden lg:block text-[11px] text-muted-foreground">
                          {tick ? fmtDate(tick.createdAt) : "No data"}
                        </div>

                        {/* Actions — stop propagation so row click doesn't fire */}
                        <div className="col-span-1 flex items-center justify-end gap-1.5">
                          <div
                            role="button"
                            tabIndex={0}
                            id={`delete-${site.id}`}
                            onClick={(e) => { e.stopPropagation(); handleDelete(site.id); }}
                            onKeyDown={(e) => { if (e.key === "Enter") { e.stopPropagation(); handleDelete(site.id); } }}
                            className={`flex items-center justify-center h-6 w-6 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer ${delId === site.id ? "opacity-50 pointer-events-none" : ""}`}
                            aria-label="Delete monitor"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </div>
                          <div className="text-muted-foreground">
                            {open ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                          </div>
                        </div>
                      </div>

                      {/* ─ Expanded detail ─────────────────────────────────── */}
                      <AnimatePresence>
                        {open && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 pt-1 bg-muted/20">
                              <Separator className="mb-4" />

                              {/* Tick history label */}
                              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                                Monitor Details
                              </p>

                              {/* Stat cells */}
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                                {[
                                  { label: "Monitor ID",     value: `#${site.id}` },
                                  { label: "Current Status", value: cfg.label },
                                  { label: "Response Time",  value: tick ? fmtTime(tick.Response_time_ms) : "No data" },
                                  { label: "Region",         value: tick ? `Region ${tick.region_id}` : "—" },
                                ].map(({ label, value }) => (
                                  <div key={label} className="rounded-lg border border-border bg-card px-3 py-2.5">
                                    <p className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
                                    <p className="text-xs font-bold">{value}</p>
                                  </div>
                                ))}
                              </div>

                              {/* Up / Down visual bar from ticks */}
                              {site.ticks.length > 0 && (
                                <div className="mb-4">
                                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                                    Last {site.ticks.length} Check{site.ticks.length > 1 ? "s" : ""}
                                  </p>
                                  <div className="flex items-center gap-1">
                                    {site.ticks.slice(0, 30).map((t) => (
                                      <div
                                        key={t.id}
                                        title={`${t.Status} · ${t.Response_time_ms}ms · ${fmtDate(t.createdAt)}`}
                                        className={`h-6 flex-1 rounded-sm ${
                                          t.Status === "up" ? "bg-emerald-500" :
                                          t.Status === "down" ? "bg-red-500" : "bg-amber-400"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <div className="flex items-center justify-between mt-1 text-[10px] text-muted-foreground">
                                    <span>Older</span><span>Latest</span>
                                  </div>
                                </div>
                              )}

                              {/* Timestamps */}
                              <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-[11px] text-muted-foreground">
                                <p>Added: <span className="text-foreground font-medium">{fmtDate(site.createdAt)}</span></p>
                                <p>Updated: <span className="text-foreground font-medium">{fmtDate(site.updatedAt)}</span></p>
                                {tick && (
                                  <>
                                    <p>Last tick: <span className="text-foreground font-medium">{fmtDate(tick.createdAt)}</span></p>
                                    <p>Tick ID: <span className="text-foreground font-medium">#{tick.id}</span></p>
                                  </>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
