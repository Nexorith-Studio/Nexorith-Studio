"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function StatusSection() {
  return (
    <section className="px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel-luxe relative overflow-hidden rounded-[3rem] p-12 md:p-20 border-white/5 bg-white/[0.01]"
        >
          {/* Decorative elements */}
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px]" />
          <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-violet-600/10 blur-[100px]" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.5em] text-cyan-400/80">
              Live Visibility
            </p>
            <h2 className="font-display text-4xl font-bold text-white md:text-6xl lg:text-7xl">
              Track your <span className="text-gradient-cyan-violet">Vision</span>
            </h2>
            <p className="mt-8 max-w-2xl text-lg text-white/50 leading-relaxed md:text-xl">
              Transparency is at our core. If we&apos;ve started your journey, use your unique Project ID to monitor real-time progress, milestones, and direct updates from our team.
            </p>
            
            <div className="mt-12 flex flex-col sm:flex-row gap-6">
              <Link
                href="/status"
                className="group relative inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-sm font-bold text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Go to Tracking Portal
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              
              <Link
                href="/#contact"
                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-10 py-5 text-sm font-bold text-white transition-colors hover:bg-white/10 hover:border-white/20"
              >
                Inquire now
              </Link>
            </div>
            
            <div className="mt-16 flex items-center gap-8 text-white/25">
              <div className="flex flex-col items-center gap-2">
                <span className="text-xl font-bold text-white/40">24/7</span>
                <span className="text-[10px] uppercase tracking-widest font-semibold">Uptime</span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex flex-col items-center gap-2">
                <span className="text-xl font-bold text-white/40">Real-time</span>
                <span className="text-[10px] uppercase tracking-widest font-semibold">Updates</span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex flex-col items-center gap-2">
                <span className="text-xl font-bold text-white/40">Direct</span>
                <span className="text-[10px] uppercase tracking-widest font-semibold">Access</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
