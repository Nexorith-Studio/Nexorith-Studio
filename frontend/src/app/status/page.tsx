"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchLeadStatus } from "@/lib/api";
import Link from "next/link";
import { LuxuryAmbient } from "@/components/home/LuxuryAmbient";

export default function StatusPage() {
  const [trackingId, setTrackingId] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheck(e: React.FormEvent) {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setLoading(true);
    setError("");
    setData(null);

    try {
      const result = await fetchLeadStatus(trackingId.trim());
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid tracking ID");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen bg-[#030306] selection:bg-cyan-500/30">
      <LuxuryAmbient />
      
      <div className="relative z-10 mx-auto max-w-2xl px-6 pt-32 pb-20">
        <Link href="/" className="mb-12 inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors group">
          <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Studio
        </Link>

        <header className="mb-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-cyan-400">
            Project Tracking
          </p>
          <h1 className="font-display text-4xl font-bold text-white md:text-5xl">
            Check Status
          </h1>
          <p className="mt-6 text-lg text-white/50 leading-relaxed">
            Enter your unique project ID to view current progress and latest updates from our team.
          </p>
        </header>

        <form onSubmit={handleCheck} className="relative mb-12">
          <div className="glass-panel-luxe rounded-3xl p-2 flex gap-2 border-white/5 bg-white/[0.02]">
            <input
              required
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="e.g. NX-A1B2C3D4"
              className="w-full bg-transparent px-6 py-4 text-lg font-mono text-white outline-none placeholder:text-white/20"
            />
            <button
              disabled={loading}
              className="rounded-2xl bg-white px-8 py-4 text-sm font-bold text-black transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Checking..." : "Track"}
            </button>
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-sm text-rose-400 pl-4"
            >
              {error}
            </motion.p>
          )}
        </form>

        <AnimatePresence mode="wait">
          {data && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-panel-luxe rounded-[2.5rem] p-8 md:p-12 border-white/10"
            >
              <div className="mb-10 flex flex-wrap items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{data.name}</h2>
                  <p className="text-sm text-white/40 uppercase tracking-widest">{data.projectType}</p>
                </div>
                <div className="inline-flex items-center gap-3 rounded-full bg-cyan-400/10 px-6 py-3 border border-cyan-400/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  <span className="text-sm font-bold text-cyan-300 uppercase tracking-wider">{data.projectStatus}</span>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30">
                    Latest Update
                  </p>
                  <div className="rounded-2xl bg-white/[0.03] p-6 border border-white/5 leading-relaxed text-white/80">
                    {data.projectUpdate || "No detailed updates available yet. We are currently reviewing your inquiry."}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                  <div>
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/30">
                      Inquiry Date
                    </p>
                    <p className="text-sm text-white/60">
                      {new Date(data.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/30">
                      Last Updated
                    </p>
                    <p className="text-sm text-white/60">
                      {new Date(data.updatedAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
