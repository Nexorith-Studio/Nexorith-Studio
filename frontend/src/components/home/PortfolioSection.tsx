"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const projects = [
  {
    title: "Lumen Analytics",
    category: "SaaS",
    height: "h-72",
    gradient: "from-cyan-500/30 to-blue-600/20",
    preview: "Real-time dashboards with edge streaming.",
  },
  {
    title: "Orbital Commerce",
    category: "Web",
    height: "h-96",
    gradient: "from-violet-500/30 to-fuchsia-600/20",
    preview: "Headless storefront with AI recommendations.",
  },
  {
    title: "Nexus Automations",
    category: "Automation",
    height: "h-64",
    gradient: "from-emerald-500/25 to-cyan-600/20",
    preview: "Cross-tool orchestration for ops teams.",
  },
  {
    title: "Helix Health",
    category: "AI",
    height: "h-80",
    gradient: "from-rose-500/25 to-violet-600/20",
    preview: "Clinical copilots with guardrails.",
  },
  {
    title: "Vector Studio",
    category: "Design System",
    height: "h-72",
    gradient: "from-amber-500/20 to-orange-600/15",
    preview: "Token-driven UI kit + motion primitives.",
  },
  {
    title: "Pulse IoT",
    category: "Cloud",
    height: "h-64",
    gradient: "from-sky-500/25 to-indigo-600/20",
    preview: "Fleet telemetry at planetary scale.",
  },
];

export function PortfolioSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="work" className="scroll-mt-24 px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-fuchsia-300/80">
              Portfolio
            </p>
            <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
              Selected work
            </h2>
          </div>
          <p className="max-w-md text-white/50">
            A Pinterest-style mosaic of launches — hover any tile for a glimpse
            of the build.
          </p>
        </div>

        <div className="columns-1 gap-6 sm:columns-2 xl:columns-3">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.05 }}
              className="mb-6 break-inside-avoid"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <motion.div
                layout
                className={`glass-panel group relative overflow-hidden rounded-3xl ${p.height}`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${p.gradient}`}
                />
                <div className="noise absolute inset-0 opacity-40" />
                <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/45" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <span className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/50">
                    {p.category}
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-white">
                    {p.title}
                  </h3>
                  <motion.p
                    initial={false}
                    animate={{
                      opacity: hovered === i ? 1 : 0,
                      y: hovered === i ? 0 : 12,
                    }}
                    transition={{ duration: 0.35 }}
                    className="mt-3 max-w-xs text-sm text-white/80"
                  >
                    {p.preview}
                  </motion.p>
                </div>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
