"use client";

import { motion } from "framer-motion";
import { TiltCard } from "./TiltCard";
import { Reveal } from "./Reveal";

const services = [
  {
    title: "Web Development",
    desc: "High-performance web apps with obsessive attention to polish.",
    tag: "Engineering",
  },
  {
    title: "AI Solutions",
    desc: "Models, pipelines, and product intelligence that ship safely.",
    tag: "Intelligence",
  },
  {
    title: "SaaS Platforms",
    desc: "Multi-tenant SaaS, billing, and scale-ready foundations.",
    tag: "Product",
  },
  {
    title: "Startup MVP",
    desc: "Rapid validation with a roadmap to Series A.",
    tag: "Velocity",
  },
  {
    title: "Automation Systems",
    desc: "Workflows that connect teams, data, and tools in real time.",
    tag: "Systems",
  },
  {
    title: "UI/UX Design",
    desc: "Interfaces that feel inevitable — motion, clarity, delight.",
    tag: "Experience",
  },
  {
    title: "Digital Transformation",
    desc: "Legacy modernization with zero-downtime migration paths.",
    tag: "Enterprise",
  },
   // NEW SERVICE 1
  {
    title: "Website Maintenance & Redesign",
    desc: "Continuous updates, performance improvements, and modern redesigns to keep your website fast, secure, and relevant.",
    tag: "Growth",
  },

  // NEW SERVICE 2
  {
    title: "Social Media Marketing",
    desc: "Content strategy, brand growth, and lead generation through our upcoming marketing division — Nexorith Marketing.",
    tag: "Marketing",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 48 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-24 px-6 py-32 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-20 max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-violet-300/90">
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
          className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
        >
          {services.map((s) => (
            <motion.div key={s.title} variants={item}>
              <TiltCard className="h-full">
                <div className="group glass-panel-luxe relative h-full overflow-hidden rounded-3xl p-8 transition-shadow duration-500 hover:shadow-[0_0_80px_-20px_rgba(110,231,255,0.45)]">
                  <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-violet-600/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="relative mb-5 inline-flex rounded-full border border-white/12 bg-gradient-to-r from-white/[0.08] to-white/[0.02] px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-100/90 shadow-[0_0_30px_-10px_rgba(34,211,238,0.35)]">
                    {s.tag}
                  </span>
                  <h3 className="relative font-display text-2xl font-semibold tracking-tight text-white">
                    {s.title}
                  </h3>
                  <p className="relative mt-4 text-sm leading-relaxed text-white/55">
                    {s.desc}
                  </p>
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
