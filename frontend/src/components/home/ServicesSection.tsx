"use client";

import { motion } from "framer-motion";
import { TiltCard } from "./TiltCard";
import { Reveal } from "./Reveal";

interface ServiceItem {
  title: string;
  desc: string;
  tag: string;
  colSpanClass: string;
  mockup: React.ReactNode;
}

export function ServicesSection() {
  const services: ServiceItem[] = [
    {
      title: "Web Development",
      desc: "High-performance web apps with obsessive attention to polish and animations.",
      tag: "Engineering",
      colSpanClass: "col-span-1 md:col-span-2",
      mockup: (
        <div className="mt-6 rounded-xl border border-white/10 bg-black/60 p-2.5 text-left font-mono text-[9px] text-white/50 space-y-2 overflow-hidden h-28 flex flex-col justify-between shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-1.5 border-b border-white/5 pb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500/60" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500/60" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/60" />
            <span className="ml-2 text-[7px] text-white/30 bg-white/5 px-2 py-0.5 rounded">localhost:3000/console</span>
          </div>
          <div className="flex-1 flex flex-col justify-center space-y-1">
            <div className="flex items-center justify-between text-cyan-300">
              <span>{"import { App } from \"nexorith\";"}</span>
              <span className="text-[7px] text-emerald-400 font-bold">✓ READY</span>
            </div>
            <div className="h-1.5 w-3/4 rounded bg-white/10" />
            <div className="h-1.5 w-1/2 rounded bg-white/5" />
          </div>
        </div>
      ),
    },
    {
      title: "AI Solutions",
      desc: "Models, pipelines, and product intelligence.",
      tag: "Intelligence",
      colSpanClass: "col-span-1",
      mockup: (
        <div className="mt-6 rounded-xl border border-white/10 bg-black/60 p-2 h-28 flex items-center justify-center relative overflow-hidden shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]">
          <div className="absolute h-1.5 w-1.5 rounded-full bg-cyan-400 left-4 top-1/2 -translate-y-1/2 shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
          <div className="absolute h-1.5 w-1.5 rounded-full bg-violet-400 right-4 top-1/2 -translate-y-1/2 shadow-[0_0_8px_rgba(167,139,250,0.7)]" />
          <svg className="w-full h-full" viewBox="0 0 100 50">
            <path d="M 10 25 Q 50 5 90 25 M 10 25 Q 50 45 90 25" stroke="rgba(110,231,255,0.15)" strokeWidth="0.75" fill="none" strokeDasharray="2 2" />
            <circle cx="50" cy="25" r="3" fill="#a78bfa" className="animate-pulse" />
            <circle cx="10" cy="25" r="1.5" fill="#6ee7ff">
              <animate attributeName="cx" values="10;50;90" dur="2s" repeatCount="indefinite" />
              <animate attributeName="cy" values="25;12;25" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      ),
    },
    {
      title: "SaaS Platforms",
      desc: "Multi-tenant scale-ready foundations.",
      tag: "Product",
      colSpanClass: "col-span-1",
      mockup: (
        <div className="mt-6 rounded-xl border border-white/10 bg-black/60 p-3.5 h-28 flex flex-col justify-between font-mono text-[9px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]">
          <div className="flex justify-between items-center text-white/30">
            <span>[SYS_TENANTS]</span>
            <span className="text-emerald-400 font-bold">ONLINE</span>
          </div>
          <div className="flex items-center gap-2 rounded bg-white/5 p-2 justify-between">
            <span className="text-white/60">Cluster status</span>
            <span className="rounded bg-cyan-500/20 px-2 py-0.5 text-cyan-300 font-semibold">ENTERPRISE</span>
          </div>
        </div>
      ),
    },
    {
      title: "Startup MVP",
      desc: "Rapid validation with a direct route to launch.",
      tag: "Velocity",
      colSpanClass: "col-span-1",
      mockup: (
        <div className="mt-6 rounded-xl border border-white/10 bg-black/60 p-3.5 h-28 flex flex-col justify-between font-mono text-[9px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]">
          <div className="flex justify-between text-white/30">
            <span>METRIC // INDEX</span>
            <span className="text-cyan-300 font-bold">98%</span>
          </div>
          <div className="w-full h-1.5 rounded bg-white/5 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 rounded" style={{ width: '92%' }} />
          </div>
          <span className="text-[7px] text-white/20">ROADMAP LEVEL: PILOT STAGE</span>
        </div>
      ),
    },
    {
      title: "Automation Systems",
      desc: "Workflows that connect teams, tools, and databases.",
      tag: "Systems",
      colSpanClass: "col-span-1",
      mockup: (
        <div className="mt-6 rounded-xl border border-white/10 bg-black/60 p-3.5 h-28 flex items-center justify-around font-mono text-[8px] text-white/40 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]">
          <div className="flex flex-col items-center gap-1 rounded bg-white/5 px-2 py-1.5 border border-white/5">
            <span className="text-cyan-300 font-bold">TRIGGER</span>
            <span>API Hook</span>
          </div>
          <span className="text-cyan-400/40">➔</span>
          <div className="flex flex-col items-center gap-1 rounded bg-white/5 px-2 py-1.5 border border-white/5">
            <span className="text-violet-300 font-bold">ACTION</span>
            <span>Sync DB</span>
          </div>
        </div>
      ),
    },
    {
      title: "UI/UX Design",
      desc: "Interfaces that feel intuitive — motion, grids, clarity.",
      tag: "Experience",
      colSpanClass: "col-span-1",
      mockup: (
        <div className="mt-6 rounded-xl border border-white/10 bg-black/60 h-28 overflow-hidden flex items-center justify-center relative shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)] bg-grid bg-[size:10px_10px] opacity-80">
          <div className="h-10 w-24 rounded border border-cyan-400/25 flex items-center justify-center text-[7px] font-mono text-cyan-300 bg-[#030306]">
            [CONTAINER_GRID]
          </div>
        </div>
      ),
    },
    {
      title: "Digital Transformation",
      desc: "Legacy modernization with zero-downtime database migrations.",
      tag: "Enterprise",
      colSpanClass: "col-span-1",
      mockup: (
        <div className="mt-6 rounded-xl border border-white/10 bg-black/60 p-3 h-28 flex flex-col justify-between font-mono text-[8px] text-white/40 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]">
          <div className="flex justify-between items-center text-cyan-300">
            <span>[SYS_MIGRATION]</span>
            <span className="text-cyan-400 font-bold">99.9%</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Active shards</span>
            <span className="text-white font-bold">12 / 12</span>
          </div>
          <div className="h-1 bg-gradient-to-r from-cyan-400 to-violet-500 rounded" />
        </div>
      ),
    },
    {
      title: "Website Maintenance & Redesign",
      desc: "Continuous performance audits and secure website redesigns.",
      tag: "Growth",
      colSpanClass: "col-span-1",
      mockup: (
        <div className="mt-6 rounded-xl border border-white/10 bg-black/60 p-3 h-28 flex flex-col justify-between font-mono text-[8px] text-white/40 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]">
          <div className="flex justify-between text-cyan-300">
            <span>LIGHTHOUSE_SCORE</span>
            <span className="text-emerald-400 font-bold">100/100</span>
          </div>
          <div className="flex justify-between items-center border-t border-white/5 pt-2">
            <span>Perf Audits</span>
            <span className="text-white">Active</span>
          </div>
        </div>
      ),
    },
    {
      title: "Social Media Marketing",
      desc: "Futuristic brand strategies, content workflows, and lead-gen campaigns via our marketing division — Nexorith Marketing.",
      tag: "Marketing",
      colSpanClass: "col-span-1 md:col-span-3",
      mockup: (
        <div className="mt-6 rounded-xl border border-white/10 bg-black/60 p-3.5 h-28 flex items-center justify-between font-mono text-[9px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)] w-full">
          <div className="flex flex-col justify-between h-full w-1/2">
            <span className="text-white/30">[CAMPAIGN_METRICS]</span>
            <span className="text-cyan-300 font-bold text-lg">3.4x CTR boost</span>
            <span className="text-[7px] text-white/20">TARGETING ENGINE: ACTIVE</span>
          </div>
          <div className="h-full flex items-end gap-1.5 w-1/3 justify-end">
            <div className="w-3 bg-white/5 h-[20%] rounded-t" />
            <div className="w-3 bg-white/10 h-[45%] rounded-t" />
            <div className="w-3 bg-cyan-400/20 h-[65%] rounded-t" />
            <div className="w-3 bg-gradient-to-t from-cyan-400 to-violet-500 h-[90%] rounded-t" />
          </div>
        </div>
      ),
    },
  ];

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 36 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section id="services" className="scroll-mt-24 px-6 py-32 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-20 max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300/80">
            Services
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Capabilities that compound
          </h2>
          <div className="mt-8 h-px w-24 bg-gradient-to-r from-cyan-400/60 to-transparent" />
          <p className="mt-8 text-lg leading-relaxed text-white/50">
            Every engagement is led by senior builders — strategy, design, and
            engineering in one continuous motion.
          </p>
        </Reveal>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s) => (
            <motion.div key={s.title} variants={item} className={s.colSpanClass}>
              <TiltCard className="h-full">
                <div className="group glass-panel-luxe relative h-full overflow-hidden rounded-3xl p-8 transition-shadow duration-500 hover:shadow-[0_0_80px_-20px_rgba(110,231,255,0.45)] border-white/[0.08] bg-white/[0.03]">
                  <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-violet-600/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
                  <span className="relative mb-5 inline-flex rounded-full border border-white/12 bg-gradient-to-r from-white/[0.08] to-white/[0.02] px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-100/90 shadow-[0_0_30px_-10px_rgba(34,211,238,0.35)]">
                    {s.tag}
                  </span>
                  <h3 className="relative font-display text-2xl font-semibold tracking-tight text-white">
                    {s.title}
                  </h3>
                  <p className="relative mt-4 text-sm leading-relaxed text-white/55">
                    {s.desc}
                  </p>
                  
                  {/* Interactive Mockup Element */}
                  <div className="relative">
                    {s.mockup}
                  </div>
                  
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
