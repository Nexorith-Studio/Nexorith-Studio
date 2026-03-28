"use client";

import { motion } from "framer-motion";

const quotes = [
  {
    name: "Elena Voss",
    role: "CEO, Lumen Analytics",
    text: "Nexorith shipped a flagship experience in weeks — the craft is unmistakable.",
  },
  {
    name: "Marcus Chen",
    role: "CTO, Orbital Commerce",
    text: "They operate like an elite product org, not a vendor. Rare chemistry.",
  },
  {
    name: "Priya Nair",
    role: "Founder, Helix Health",
    text: "Our AI rollout was production-safe from day one. Exceptional rigor.",
  },
  {
    name: "Julian Ortiz",
    role: "VP Eng, Pulse IoT",
    text: "From design system to edge infra — one team, one bar: excellence.",
  },
];

export function TestimonialsSection() {
  const row = [...quotes, ...quotes];

  return (
    <section className="relative overflow-hidden py-28">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#030306] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#030306] to-transparent" />

      <div className="mb-14 px-6 text-center lg:px-10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300/80">
          Testimonials
        </p>
        <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
          Trusted by builders
        </h2>
      </div>

      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex gap-6 px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 56,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {row.map((q, i) => (
            <div
              key={`${q.name}-${i}`}
              className="glass-panel-luxe w-[min(100vw-3rem,380px)] shrink-0 rounded-3xl p-8 shadow-[0_0_60px_-28px_rgba(110,231,255,0.25)]"
            >
              <p className="text-lg leading-relaxed text-white/75">&ldquo;{q.text}&rdquo;</p>
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="font-semibold text-white">{q.name}</p>
                <p className="text-sm text-white/45">{q.role}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
