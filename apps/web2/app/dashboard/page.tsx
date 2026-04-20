"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ModeToggle } from "@/components/themetoggler";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type WebsiteStatus = "up" | "down" | "unknow";

interface WebsiteTick {
  id: number;
  Response_time_ms: number;
  Status: WebsiteStatus;
  region_id: number;
  website_id: number;
  createdAt: string;
  updatedAt: string;
}

interface WebsiteRecord {
  id: number;
  url: string;
  createdAt: string;
  updatedAt: string;
  ticks: WebsiteTick[];
}

interface WebsiteResponse {
  websitedata: WebsiteRecord | null;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:4000";
const TOKEN_STORAGE_KEY = "pulsewatch_token";

function getUserIdFromToken(token: string) {
  try {
    const payload = token.split(".")[1];

    if (!payload) {
      return "unknown";
    }

    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(window.atob(normalized));

    return String(decoded.userId ?? "unknown");
  } catch {
    return "unknown";
  }
}

function getWebsiteIdsStorageKey(token: string) {
  return `pulsewatch_website_ids_${getUserIdFromToken(token)}`;
}

function readStoredWebsiteIds(token: string) {
  const rawIds = window.localStorage.getItem(getWebsiteIdsStorageKey(token));

  if (!rawIds) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawIds);

    return Array.isArray(parsed)
      ? parsed
          .map((value) => Number(value))
          .filter((value) => Number.isInteger(value) && value > 0)
      : [];
  } catch {
    return [];
  }
}

function writeStoredWebsiteIds(token: string, ids: number[]) {
  window.localStorage.setItem(getWebsiteIdsStorageKey(token), JSON.stringify(ids));
}

function getWebsiteLabel(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function formatStatusLabel(status?: WebsiteStatus) {
  if (status === "up") return "Operational";
  if (status === "down") return "Down";

  return "Unknown";
}

function formatStatusTone(status?: WebsiteStatus) {
  if (status === "up") return "bg-[hsl(var(--success))]";
  if (status === "down") return "bg-[hsl(var(--destructive))]";

  return "bg-[hsl(var(--warning))]";
}

function formatStatusBadge(status?: WebsiteStatus) {
  if (status === "up") return "bg-[hsl(var(--success)/0.1)] text-[hsl(var(--success))]";
  if (status === "down") return "bg-[hsl(var(--destructive)/0.1)] text-[hsl(var(--destructive))]";

  return "bg-[hsl(var(--warning)/0.1)] text-[hsl(var(--warning))]";
}

export default function Dashboard() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [websites, setWebsites] = useState<WebsiteRecord[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSiteUrl, setNewSiteUrl] = useState("");
  const [selectedSite, setSelectedSite] = useState<number | null>(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [isLoadingWebsites, setIsLoadingWebsites] = useState(false);
  const [isCreatingWebsite, setIsCreatingWebsite] = useState(false);
  const [deletingWebsiteId, setDeletingWebsiteId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const selected = useMemo(
    () => websites.find((website) => website.id === selectedSite) ?? null,
    [selectedSite, websites],
  );

  async function fetchWebsiteById(websiteId: number, authToken: string) {
    const response = await fetch(`${API_BASE_URL}/api/v2/content/website/${websiteId}`, {
      headers: {
        Authorization: authToken,
      },
      cache: "no-store",
    });

    const payload = (await response.json()) as WebsiteResponse & { message?: string };

    if (!response.ok) {
      throw new Error(payload.message ?? "Failed to fetch website data.");
    }

    return payload.websitedata;
  }

  async function loadWebsites(authToken: string) {
    setIsLoadingWebsites(true);
    setErrorMessage("");

    try {
      // The backend currently has no "list websites for user" endpoint, so we
      // persist the created website ids per logged-in user and hydrate each card
      // from the real GET /website/:websiteID response instead of rendering mocks.
      const storedIds = readStoredWebsiteIds(authToken);

      if (storedIds.length === 0) {
        setWebsites([]);
        return;
      }

      const websiteResults = await Promise.all(
        storedIds.map(async (websiteId) => {
          try {
            return await fetchWebsiteById(websiteId, authToken);
          } catch {
            return null;
          }
        }),
      );

      const realWebsites = websiteResults.filter((website): website is WebsiteRecord => Boolean(website));
      const realIds = realWebsites.map((website) => website.id);

      writeStoredWebsiteIds(authToken, realIds);
      setWebsites(realWebsites);
      setSelectedSite((current) => (realIds.includes(current ?? -1) ? current : realIds[0] ?? null));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to load monitors.");
    } finally {
      setIsLoadingWebsites(false);
    }
  }

  useEffect(() => {
    // Dashboard access depends on the JWT issued by POST /api/v1/users/login.
    const storedToken = window.localStorage.getItem(TOKEN_STORAGE_KEY);

    if (!storedToken) {
      router.replace("/auth/login");
      return;
    }

    setToken(storedToken);
    void loadWebsites(storedToken).finally(() => setIsBootstrapping(false));
  }, [router]);

  async function handleAddWebsite(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!token || !newSiteUrl.trim()) {
      return;
    }

    setIsCreatingWebsite(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/v2/content/website`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          url: newSiteUrl.trim(),
        }),
      });

      const payload = (await response.json()) as { websiteID?: number; message?: string };

      if (!response.ok || !payload.websiteID) {
        throw new Error(payload.message ?? "Failed to create monitor.");
      }

      const nextIds = [payload.websiteID, ...readStoredWebsiteIds(token).filter((id) => id !== payload.websiteID)];
      writeStoredWebsiteIds(token, nextIds);

      await loadWebsites(token);
      setNewSiteUrl("");
      setShowAddForm(false);
      setSelectedSite(payload.websiteID);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to create monitor.");
    } finally {
      setIsCreatingWebsite(false);
    }
  }

  async function handleDeleteWebsite(websiteId: number) {
    if (!token) {
      return;
    }

    setDeletingWebsiteId(websiteId);
    setErrorMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/v2/content/websitedelete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          websiteID: websiteId,
        }),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message ?? "Failed to delete monitor.");
      }

      const nextIds = readStoredWebsiteIds(token).filter((id) => id !== websiteId);
      writeStoredWebsiteIds(token, nextIds);
      setWebsites((current) => current.filter((website) => website.id !== websiteId));
      setSelectedSite((current) => (current === websiteId ? null : current));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to delete monitor.");
    } finally {
      setDeletingWebsiteId(null);
    }
  }

  function handleSignOut() {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    router.replace("/auth/login");
  }

  if (isBootstrapping) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <p className="text-xs font-light text-muted-foreground">Loading your monitors...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="text-xs font-medium tracking-tight">
            BetterUptime
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-light text-muted-foreground">Dashboard</span>
            <ModeToggle />
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-[11px] font-light"
              onClick={handleSignOut}
            >
              Sign out
            </Button>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-extralight tracking-tight">Monitors</h1>
            <p className="mt-0.5 text-[11px] font-light text-muted-foreground">
              {websites.length} monitor{websites.length !== 1 ? "s" : ""} loaded from your backend
            </p>
          </div>
          <Button
            size="sm"
            className="h-8 rounded-lg px-4 text-[11px] font-normal"
            onClick={() => setShowAddForm((current) => !current)}
          >
            {showAddForm ? "Close form" : "+ Add website"}
          </Button>
        </div>

        {errorMessage ? (
          <div className="mb-6 rounded-xl border border-[hsl(var(--destructive)/0.3)] bg-[hsl(var(--destructive)/0.06)] px-4 py-3 text-[11px] font-light text-[hsl(var(--destructive))]">
            {errorMessage}
          </div>
        ) : null}

        <AnimatePresence initial={false}>
          {showAddForm ? (
            <motion.div
              className="mb-6 rounded-xl border border-border bg-card p-5"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <form onSubmit={handleAddWebsite} className="space-y-3">
                <div className="space-y-1.5">
                  <Label className="text-[11px] font-light text-muted-foreground">
                    Website URL
                  </Label>
                  <Input
                    placeholder="https://example.com"
                    value={newSiteUrl}
                    onChange={(event) => setNewSiteUrl(event.target.value)}
                    className="h-9 rounded-lg border-border bg-background text-xs font-light placeholder:text-muted-foreground/50 focus-visible:ring-1 focus-visible:ring-foreground/20"
                  />
                </div>
                <p className="text-[10px] font-light text-muted-foreground">
                  This form posts directly to your existing `POST /api/v2/content/website` endpoint,
                  which accepts only a `url`.
                </p>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 text-[11px] font-light"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    className="h-8 rounded-lg px-4 text-[11px] font-normal"
                    disabled={isCreatingWebsite}
                  >
                    {isCreatingWebsite ? "Adding..." : "Add monitor"}
                  </Button>
                </div>
              </form>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {isLoadingWebsites ? (
          <div className="rounded-xl border border-border px-6 py-10 text-center">
            <p className="text-xs font-light text-muted-foreground">Refreshing monitor data...</p>
          </div>
        ) : websites.length === 0 ? (
          <motion.div
            className="rounded-xl border border-dashed border-border p-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="mb-3 text-xs font-light text-muted-foreground">
              No monitors are indexed in this dashboard yet.
            </p>
            <p className="mb-5 text-[11px] font-light text-muted-foreground">
              Because your backend does not expose a list endpoint, this page remembers each created
              monitor id for the logged-in user and then reloads every card from the backend.
            </p>
            <Button
              size="sm"
              variant="outline"
              className="h-8 rounded-lg px-4 text-[11px] font-normal"
              onClick={() => setShowAddForm(true)}
            >
              Add your first website
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-2">
            {websites.map((site, index) => {
              const latestTick = site.ticks[0];

              return (
                <motion.div
                  key={site.id}
                  className={`rounded-xl border p-4 transition-all duration-200 ${
                    selectedSite === site.id
                      ? "border-foreground/20 bg-card shadow-sm"
                      : "border-border bg-background hover:border-foreground/10 hover:bg-card/50"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <button
                      type="button"
                      className="flex flex-1 items-start gap-3 text-left"
                      onClick={() => setSelectedSite((current) => (current === site.id ? null : site.id))}
                    >
                      <div className={`mt-1.5 h-2 w-2 rounded-full ${formatStatusTone(latestTick?.Status)}`} />
                      <div>
                        <p className="text-xs font-medium">{getWebsiteLabel(site.url)}</p>
                        <p className="text-[10px] font-light text-muted-foreground">{site.url}</p>
                        <p className="mt-1 text-[10px] font-light text-muted-foreground">
                          Added {new Date(site.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </button>

                    <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-light ${formatStatusBadge(latestTick?.Status)}`}
                      >
                        {formatStatusLabel(latestTick?.Status)}
                      </span>
                      <span className="text-[10px] font-light text-muted-foreground">
                        {latestTick
                          ? `${latestTick.Response_time_ms}ms - last checked ${new Date(latestTick.createdAt).toLocaleString()}`
                          : "No checks written yet"}
                      </span>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="h-7 rounded-lg px-3 text-[10px] font-normal"
                        onClick={() => handleDeleteWebsite(site.id)}
                        disabled={deletingWebsiteId === site.id}
                      >
                        {deletingWebsiteId === site.id ? "Deleting..." : "Delete"}
                      </Button>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {selectedSite === site.id ? (
                      <motion.div
                        className="mt-4 border-t border-border pt-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* The backend GET response currently exposes the website row plus only the
                            latest tick, so this detail panel intentionally renders exactly that
                            contract instead of inventing historical logs or uptime percentages. */}
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                          <div className="rounded-lg border border-border bg-background/70 p-3">
                            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                              Monitor ID
                            </p>
                            <p className="mt-2 text-xs font-medium">{site.id}</p>
                          </div>
                          <div className="rounded-lg border border-border bg-background/70 p-3">
                            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                              Current status
                            </p>
                            <p className="mt-2 text-xs font-medium">{formatStatusLabel(latestTick?.Status)}</p>
                          </div>
                          <div className="rounded-lg border border-border bg-background/70 p-3">
                            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                              Response time
                            </p>
                            <p className="mt-2 text-xs font-medium">
                              {latestTick ? `${latestTick.Response_time_ms}ms` : "No data yet"}
                            </p>
                          </div>
                          <div className="rounded-lg border border-border bg-background/70 p-3">
                            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                              Region ID
                            </p>
                            <p className="mt-2 text-xs font-medium">
                              {latestTick ? latestTick.region_id : "Not available"}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 rounded-lg border border-border bg-muted/20 p-3">
                          <p className="text-[11px] font-medium">Latest backend tick</p>
                          <div className="mt-3 grid gap-2 text-[11px] font-light text-muted-foreground sm:grid-cols-2">
                            <p>Website created: {new Date(site.createdAt).toLocaleString()}</p>
                            <p>Website updated: {new Date(site.updatedAt).toLocaleString()}</p>
                            <p>
                              Last tick created:{" "}
                              {latestTick ? new Date(latestTick.createdAt).toLocaleString() : "No tick yet"}
                            </p>
                            <p>
                              Last tick updated:{" "}
                              {latestTick ? new Date(latestTick.updatedAt).toLocaleString() : "No tick yet"}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}

        {selected ? (
          <p className="mt-4 text-[10px] font-light text-muted-foreground">
            Selected monitor: {selected.id}
          </p>
        ) : null}
      </div>
    </div>
  );
}
