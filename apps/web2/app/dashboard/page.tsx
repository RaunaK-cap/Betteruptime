"use client";

import { useState } from "react";
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

type Monitor = {
  id: string;
  url: string;
  status: "Up" | "Down";
  uptime: number;
  response: string;
  checks: string;
  region: string;
  incidents: number;
  trend: number[];
};

export default function DashboardPage() {
  const router = useRouter();
  const [monitors, setMonitors] = useState<Monitor[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [formError, setFormError] = useState("");

  const handleAddWebsite = () => {
    const normalizedUrl = websiteUrl.trim();

    if (!normalizedUrl) {
      setFormError("Website URL is required.");
      return;
    }

    if (monitors.some((monitor) => monitor.url === normalizedUrl)) {
      setFormError("This website already exists.");
      return;
    }

    const nextMonitor: Monitor = {
      id: crypto.randomUUID(),
      url: normalizedUrl,
      status: "Up",
      uptime: 100,
      response: "190 ms",
      checks: "30 sec",
      region: "Mumbai",
      incidents: 0,
      trend: [100, 99, 100, 100, 99, 100, 100],
    };

    setMonitors((current) => [nextMonitor, ...current]);
    setWebsiteUrl("");
    setFormError("");
    setShowModal(false);

    // Backend hook:
    // Add your create-monitor API call here.
  };

  const handleDelete = (id: string) => {
    setMonitors((current) => current.filter((monitor) => monitor.id !== id));

    // Backend hook:
    // Add your delete-monitor API call here.
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
              Table-first view with delete action on every URL.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-4">Website</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Uptime</TableHead>
                  <TableHead>Response</TableHead>
                  <TableHead>Checks</TableHead>
                  <TableHead>Trend</TableHead>
                  <TableHead className="pr-4 text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monitors.map((monitor) => (
                  <TableRow key={monitor.id}>
                    <TableCell className="pl-4">
                      <div className="space-y-1">
                        <p className="font-semibold text-slate-700">
                          {monitor.url}
                        </p>
                        <p className="text-sm text-slate-400">
                          Region: {monitor.region} | Incidents:{" "}
                          {monitor.incidents}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                          monitor.status === "Up"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-rose-100 text-rose-600"
                        }`}
                      >
                        {monitor.status}
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold text-slate-700">
                      {monitor.uptime.toFixed(2)}%
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {monitor.response}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {monitor.checks}
                    </TableCell>
                    <TableCell>
                      <div className="flex h-12 items-end gap-1">
                        {monitor.trend.map((point, index) => (
                          <div
                            key={`${monitor.id}-${index}`}
                            className={`w-4 rounded-t-sm ${
                              point >= 95
                                ? "bg-emerald-400"
                                : point >= 90
                                  ? "bg-amber-400"
                                  : "bg-rose-400"
                            }`}
                            style={{ height: `${Math.max(16, point * 0.5)}px` }}
                          />
                        ))}
                      </div>
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
                  if (formError) setFormError("");
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
