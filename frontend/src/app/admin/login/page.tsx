"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { adminLogin } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await adminLogin(email, password);
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#030306] px-6 py-16">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(110,231,255,0.08),transparent_50%)]" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel relative w-full max-w-md rounded-[2rem] p-10"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
          Admin
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold text-white">
          Sign in
        </h1>
        <p className="mt-2 text-sm text-white/45">
          Secure access to lead submissions.
        </p>
        <form onSubmit={onSubmit} className="mt-10 space-y-6">
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-wider text-white/45">
              Email
            </span>
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-cyan-400/50"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-wider text-white/45">
              Password
            </span>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-cyan-400/50"
            />
          </label>
          {error && <p className="text-sm text-rose-300">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 py-3.5 text-sm font-semibold text-zinc-950 disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Continue"}
          </button>
        </form>
        <Link
          href="/"
          className="mt-8 block text-center text-sm text-white/40 hover:text-white/70"
        >
          ← Back to site
        </Link>
      </motion.div>
    </div>
  );
}
