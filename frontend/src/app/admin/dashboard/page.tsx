"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  adminLogout,
  adminMe,
  deleteLead,
  fetchLeads,
  patchLeadContacted,
  patchLeadStatus,
  type LeadRow,
} from "@/lib/api";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setError("");
    try {
      const data = await fetchLeads(sort);
      setLeads(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    }
  }, [sort]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const me = await adminMe();
      if (cancelled) return;
      if (!me.authenticated) {
        router.replace("/admin/login");
        return;
      }
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  useEffect(() => {
    if (!ready) return;
    load();
  }, [ready, load]);

  async function toggleContacted(lead: LeadRow) {
    try {
      await patchLeadContacted(lead._id, !lead.contacted);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update failed");
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this entry permanently?")) return;
    try {
      await deleteLead(id);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  }

  async function logout() {
    await adminLogout();
    router.push("/admin/login");
    router.refresh();
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030306] text-white/50">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030306] px-6 py-12 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
              Dashboard
            </p>
            <h1 className="font-display text-3xl font-bold text-white md:text-4xl">
              Inquiries
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex rounded-full border border-white/10 bg-white/5 p-1">
              <button
                type="button"
                onClick={() => setSort("newest")}
                className={`rounded-full px-4 py-2 text-sm ${
                  sort === "newest"
                    ? "bg-white text-zinc-950"
                    : "text-white/60"
                }`}
              >
                Newest
              </button>
              <button
                type="button"
                onClick={() => setSort("oldest")}
                className={`rounded-full px-4 py-2 text-sm ${
                  sort === "oldest"
                    ? "bg-white text-zinc-950"
                    : "text-white/60"
                }`}
              >
                Oldest
              </button>
            </div>
            <button
              type="button"
              onClick={() => load()}
              className="rounded-full border border-white/15 px-5 py-2 text-sm text-white/80 hover:bg-white/5"
            >
              Refresh
            </button>
            <button
              type="button"
              onClick={logout}
              className="rounded-full bg-white/10 px-5 py-2 text-sm text-white hover:bg-white/15"
            >
              Log out
            </button>
            <Link
              href="/"
              className="rounded-full border border-white/15 px-5 py-2 text-sm text-white/70 hover:text-white"
            >
              Site
            </Link>
          </div>
        </div>

        {error && (
          <p className="mb-6 text-sm text-rose-300" role="alert">
            {error}
          </p>
        )}

        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.03]">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/45">
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Budget</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <motion.tr
                  key={lead._id}
                  layout
                  className="border-b border-white/5 text-white/80"
                >
                  <td className="whitespace-nowrap px-6 py-4 text-white/50">
                    {new Date(lead.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 font-medium text-white">{lead.name}</td>
                  <td className="px-6 py-4 font-mono text-xs text-cyan-300">{lead.trackingId}</td>
                  <td className="px-6 py-4">{lead.email}</td>
                  <td className="px-6 py-4">{lead.projectType}</td>
                  <td className="px-6 py-4">{lead.budgetRange}</td>
                  <td className="px-6 py-4 text-xs text-white/40">{lead.projectStatus}</td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => toggleContacted(lead)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        lead.contacted
                          ? "bg-emerald-500/20 text-emerald-200"
                          : "bg-amber-500/15 text-amber-200"
                      }`}
                    >
                      {lead.contacted ? "Contacted" : "New"}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => remove(lead._id)}
                      className="text-rose-300/90 hover:text-rose-200"
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {leads.length === 0 && (
            <p className="px-6 py-16 text-center text-white/40">
              No submissions yet.
            </p>
          )}
        </div>

        <div className="mt-10 space-y-8">
          <h2 className="font-display text-xl font-semibold text-white">
            Manage Projects & Updates
          </h2>
          {leads.map((lead) => (
            <div
              key={`msg-${lead._id}`}
              className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-8"
            >
              <div className="mb-6 grid gap-6 lg:grid-cols-[1fr,2fr]">
                <div>
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium text-white">
                      {lead.name}
                    </p>
                    <span className="font-mono text-xs text-cyan-300">
                      {lead.trackingId}
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-1">Email</p>
                      <p className="text-sm text-white/70">{lead.email}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-1">Date</p>
                      <p className="text-sm text-white/70">{new Date(lead.createdAt).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-1">Original Message</p>
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/60 bg-black/20 p-4 rounded-xl border border-white/5">
                        {lead.message}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-6">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Project Status & Client Updates</h3>
                  
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <span className="text-[10px] uppercase tracking-wider text-white/50">Current Status</span>
                      <select
                        value={lead.projectStatus}
                        onChange={async (e) => {
                          try {
                            await patchLeadStatus(lead._id, e.target.value, lead.projectUpdate);
                            await load();
                          } catch (err) {
                            setError(err instanceof Error ? err.message : "Update failed");
                          }
                        }}
                        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white outline-none focus:border-cyan-400/50"
                      >
                        <option value="In Review">In Review</option>
                        <option value="Discovery">Discovery</option>
                        <option value="Design">Design</option>
                        <option value="Development">Development</option>
                        <option value="Beta Testing">Beta Testing</option>
                        <option value="Launched">Launched</option>
                        <option value="On Hold">On Hold</option>
                      </select>
                    </div>

                    <div className="grid gap-2">
                      <span className="text-[10px] uppercase tracking-wider text-white/50">Detailed Update (Visible to Client)</span>
                      <textarea
                        defaultValue={lead.projectUpdate}
                        onBlur={async (e) => {
                          if (e.target.value === lead.projectUpdate) return;
                          try {
                            await patchLeadStatus(lead._id, lead.projectStatus, e.target.value);
                            await load();
                          } catch (err) {
                            setError(err instanceof Error ? err.message : "Update failed");
                          }
                        }}
                        placeholder="Explain the current situation..."
                        className="w-full h-32 resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/50"
                      />
                      <p className="text-[10px] text-white/30 italic">Changes are saved automatically when you click away.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {leads.length === 0 && (
            <p className="text-sm text-white/35">No messages.</p>
          )}
        </div>
      </div>
    </div>
  );
}
