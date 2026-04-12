"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, Plus, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type MonitorStatus = "Up" | "Down" | "Pending";

type Monitor = {
  id: string;
  url: string;
  status: MonitorStatus;
  uptime: string;
  response: string;
  checks: string;
  region: string;
  lastChecked: string;
};

type SiteRef = { id: number; url: string };

type Tick = {
  Response_time_ms: number;
  Status: string;
  region_id: number;
  createdAt: string;
};

function rowFromWebsite(
  w: { id: number; url: string; ticks: Tick[] },
): Monitor {
  const tick = w.ticks[0];
  const raw = tick?.Status;
  let status: MonitorStatus = "Pending";
  if (raw === "up") status = "Up";
  if (raw === "down") status = "Down";

  return {
    id: String(w.id),
    url: w.url,
    status,
    uptime: "—",
    response: tick ? `${tick.Response_time_ms} ms` : "—",
    checks: "—",
    region: tick ? `Region ${tick.region_id}` : "—",
    lastChecked: tick ? new Date(tick.createdAt).toLocaleString() : "—",
  };
}

const API_BASE_URL = "http://localhost:4000"

/** Needed so reloads know which GET /website/:id to call (API has no “list all” route). */
const SITE_REFS_STORAGE_KEY = "pulsewatch_dashboard_site_refs";
const POLL_INTERVAL_MS = 30_000;

export default function DashboardPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [formError, setFormError] = useState("");
  const [  monitorRows , setmonitorRows] = useState<Monitor[]>([])
  const [siteRefs, setSiteRefs] = useState<SiteRef[]>([]);
  const token = localStorage.getItem("authToken")
  const hydratedFromStorage = useRef(false);

  // Restore saved website ids on load, then keep them in sync (so refresh keeps your list).
  useEffect(() => {
    if (!hydratedFromStorage.current) {
      hydratedFromStorage.current = true;
      try {
        const raw = localStorage.getItem(SITE_REFS_STORAGE_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw) as unknown;
        if (!Array.isArray(parsed)) return;
        const next: SiteRef[] = [];
        for (const item of parsed) {
          if (
            item &&
            typeof item === "object" &&
            "id" in item &&
            "url" in item &&
            typeof (item as SiteRef).id === "number" &&
            typeof (item as SiteRef).url === "string"
          ) {
            next.push({ id: (item as SiteRef).id, url: (item as SiteRef).url });
          }
        }
        setSiteRefs(next);
      } catch {
        // ignore bad storage
      }
      return;
    }
    try {
      localStorage.setItem(SITE_REFS_STORAGE_KEY, JSON.stringify(siteRefs));
    } catch {
      // ignore quota / private mode
    }
  }, [siteRefs]);

  const refreshRowsFromRefs = useCallback(async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken || siteRefs.length === 0) {
      setmonitorRows([]);
      return;
    }

    const next: Monitor[] = [];
    const still: SiteRef[] = [];

    for (const ref of siteRefs) {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/v2/content/website/${ref.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: authToken,
            },
          },
        );
        const data = await res.json();
        const w = data.websitedata as {
          id: number;
          url: string;
          ticks: Tick[];
        } | null;
        if (!w) continue;
        still.push({ id: w.id, url: w.url });
        next.push(rowFromWebsite(w));
      } catch {
        // skip failed id
      }
    }

    setmonitorRows(next);
    setSiteRefs((prev) => {
      const same =
        prev.length === still.length &&
        prev.every(
          (p, i) =>
            still[i] !== undefined &&
            p.id === still[i].id &&
            p.url === still[i].url,
        );
      return same ? prev : still;
    });
  }, [siteRefs]);

  useEffect(() => {
    void refreshRowsFromRefs();
  }, [refreshRowsFromRefs]);

  // Poll GET /website/:id on a timer so the table stays fresh while you stay on the page.
  useEffect(() => {
    const t = setInterval(() => {
      void refreshRowsFromRefs();
    }, POLL_INTERVAL_MS);
    return () => clearInterval(t);
  }, [refreshRowsFromRefs]);

  const handleAddWebsite = async() => {
    const normalizedUrl = websiteUrl.trim();

    if (!normalizedUrl) {
      setFormError("Website URL is required.");
      return;
    }

    // TODO: Implement add website API call here.
    // TODO: After API success, update your monitor list state with backend data.

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setFormError("Log in first.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/v2/content/website`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        body: JSON.stringify({ url: normalizedUrl }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.message ?? "Request failed.");
        return;
      }
      setSiteRefs((prev) => [
        ...prev,
        { id: data.websiteID as number, url: normalizedUrl },
      ]);
    } catch (error) {
      setFormError("Could not reach the server.");
      return;
    }
    setShowModal(false);
    setWebsiteUrl("");
    setFormError("");
  };

  const handleDelete = async (id: string) => {
    // TODO: Implement delete website API call here using `id`.
    // TODO: After API success, remove the deleted monitor from your state.
    const authToken = localStorage.getItem("authToken");
    if (!authToken) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/v2/content/websitedelete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        body: JSON.stringify({ websiteID: Number(id) }),
      });
      const data = await res.json();
      if (!res.ok) return;
      setSiteRefs((prev) => prev.filter((r) => String(r.id) !== id));
    } catch {
      // ignore
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="w-fit rounded-full border-slate-200 bg-white text-slate-700"
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>

          <Button
            onClick={() => setShowModal(true)}
            className="w-fit rounded-full bg-emerald-500 text-white hover:bg-emerald-600"
          >
            <Plus className="size-4" />
            Add Website
          </Button>
        </div>

        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-slate-800">
              Website monitors
            </CardTitle>
            <CardDescription className="text-base text-slate-500">
              UI only. Add your own API integration in the marked TODO sections.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {monitorRows.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-12 text-center text-slate-500">
                No websites added yet. Add one to start monitoring.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-4">Website</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Uptime</TableHead>
                    <TableHead>Response</TableHead>
                    <TableHead>Checks</TableHead>
                    <TableHead>Last checked</TableHead>
                    <TableHead className="pr-4 text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {monitorRows.map((monitor) => (
                    <TableRow key={monitor.id}>
                      <TableCell className="pl-4">
                        <div className="space-y-1">
                          <p className="font-semibold text-slate-700">
                            {monitor.url}
                          </p>
                          <p className="text-sm text-slate-400">
                            {monitor.region}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                            monitor.status === "Up"
                              ? "bg-emerald-100 text-emerald-700"
                              : monitor.status === "Down"
                                ? "bg-rose-100 text-rose-600"
                                : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {monitor.status}
                        </span>
                      </TableCell>
                      <TableCell className="font-semibold text-slate-700">
                        {monitor.uptime}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {monitor.response}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {monitor.checks}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {monitor.lastChecked}
                      </TableCell>
                      <TableCell className="pr-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(monitor.id)}
                          className="rounded-full border-rose-200 bg-white text-rose-500 hover:bg-rose-50 hover:text-rose-600"
                        >
                          <Trash2 className="size-4" />
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-800">
                  Add website
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Enter website URL to start monitoring.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setFormError("");
                }}
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="mt-6 space-y-3">
              <label className="block text-sm font-medium text-slate-700">
                Website URL
              </label>
              <input
                value={websiteUrl}
                onChange={(event) => {
                  setWebsiteUrl(event.target.value);
                  if (formError) {
                    setFormError("");
                  }
                }}
                placeholder="https://yourwebsite.com"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-500"
              />
              {formError && (
                <p className="text-sm text-rose-500">{formError}</p>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowModal(false);
                  setFormError("");
                }}
                className="rounded-full"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddWebsite}
                className="rounded-full bg-emerald-500 text-white hover:bg-emerald-600"
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
