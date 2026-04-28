"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { submitLead } from "@/lib/api";

const projectTypes = [
  "Web Development",
  "AI Solutions",
  "SaaS Platform",
  "Startup MVP",
  "Automation",
  "UI/UX Design",
  "Digital Transformation",
  "Other",
];

const budgets = [
  "₹5k – ₹20k",
  "₹20k – ₹50k",
  "₹50k – ₹1L",
  "₹1L – ₹3L",
  "₹3L+",
  "Discuss with team",
];

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  const [projectType, setProjectType] = useState(projectTypes[0]);
  const [budgetRange, setBudgetRange] = useState(budgets[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = useState("");
  const [trackingId, setTrackingId] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrMsg("");
    setTrackingId("");
    try {
      const res = await submitLead({
        name,
        email,
        projectType,
        budgetRange,
        message,
      });
      setStatus("ok");
      setTrackingId(res.trackingId);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("err");
      setErrMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 px-6 py-32 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-violet-300/90">
              Connect
            </p>
            <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
              Let&apos;s architect what&apos;s next
            </h2>
            <p className="mt-8 max-w-md text-lg text-white/50">
              Share a few details — our team replies within one business day with
              next steps and a tailored proposal.
            </p>
            <div className="mt-12 space-y-4 text-sm text-white/40">
              <p>New business · partnerships@nexorith.io</p>
              <p>Global · Remote-first studio</p>
            </div>
          </div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-panel-luxe relative overflow-hidden rounded-[2rem] p-8 md:p-10"
          >
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl" />
            <div className="absolute -bottom-24 -left-16 h-48 w-48 rounded-full bg-violet-600/20 blur-3xl" />

            <div className="relative grid gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/45">
                    Name
                  </span>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none ring-0 transition placeholder:text-white/25 focus:border-cyan-400/50"
                    placeholder="Alex Rivera"
                  />
                </label>
               <label className="block">
                  <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/45">
                     Email
                  </span>
              <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-cyan-400/50"
                  placeholder="you@company.com"
                />
              </label>


              </div>
              <label className="block">
                <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/45">
                  Project type
                </span>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full appearance-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-cyan-400/50"
                >
                  {projectTypes.map((p) => (
                    <option key={p} value={p} className="bg-zinc-900">
                      {p}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/45">
                  Budget range
                </span>
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full appearance-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-cyan-400/50"
                >
                  {budgets.map((b) => (
                    <option key={b} value={b} className="bg-zinc-900">
                      {b}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/45">
                  Message
                </span>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-cyan-400/50"
                  placeholder="Tell us about goals, timeline, and constraints."
                />
              </label>

              {status === "ok" && (
                <div className="rounded-2xl bg-emerald-500/10 p-6 border border-emerald-500/20">
                  <p className="text-sm font-semibold text-emerald-300 mb-2">
                    Inquiry Received Successfully
                  </p>
                  <p className="text-xs text-emerald-200/70 mb-4">
                    Track your project progress using the ID below:
                  </p>
                  <div className="flex items-center justify-between gap-4 rounded-xl bg-black/40 px-4 py-3 border border-emerald-500/20 mb-4">
                    <code className="text-lg font-mono font-bold text-emerald-300">
                      {trackingId}
                    </code>
                    <button
                      type="button"
                      onClick={() => navigator.clipboard.writeText(trackingId)}
                      className="text-[10px] uppercase tracking-widest text-emerald-400/60 hover:text-emerald-400"
                    >
                      Copy
                    </button>
                  </div>
                  <p className="text-[11px] text-white/40 leading-relaxed">
                    Save this ID. You can check your project&apos;s status anytime at{" "}
                    <a href="/status" className="text-cyan-400 hover:underline">
                      nexorith.io/status
                    </a>
                  </p>
                </div>
              )}
              {status === "err" && (
                <p className="text-sm text-rose-300">{errMsg}</p>
              )}

              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 py-4 text-base font-semibold text-zinc-950 disabled:opacity-60"
              >
                {status === "loading" ? "Sending…" : "Submit inquiry"}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
