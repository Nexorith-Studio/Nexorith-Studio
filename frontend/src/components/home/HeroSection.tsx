"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { FloatingParticles } from "./FloatingParticles";
import { AnimatedHeading } from "./AnimatedHeading";
import { Magnetic } from "./Magnetic";
import { ShimmerButton } from "./ShimmerButton";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yOrb1 = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const yOrb2 = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.55], [0.45, 0.08]);
  const headlineY = useTransform(scrollYProgress, [0, 0.45], ["0%", "-8%"]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0.15]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden px-6 pt-28 lg:px-10"
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          style={{ y: yOrb1 }}
          className="animate-aurora absolute -left-1/4 top-[-20%] h-[72%] w-[72%] rounded-full bg-cyan-500/22 blur-[130px]"
        />
        <motion.div
          style={{ y: yOrb2 }}
          className="animate-aurora absolute bottom-[-32%] right-[-22%] h-[62%] w-[58%] rounded-full bg-violet-600/28 blur-[140px] [animation-delay:-7s]"
        />
        <motion.div
          style={{ opacity: gridOpacity }}
          className="absolute inset-0 bg-grid-fine bg-grid"
        />
        <div className="noise absolute inset-0 opacity-[0.55]" />
        <FloatingParticles />
      </div>

      <motion.div
        style={reduce ? undefined : { y: headlineY, opacity: headlineOpacity }}
        className="relative z-[2] mx-auto flex max-w-7xl flex-col justify-center gap-16 pb-24 pt-8 lg:min-h-[calc(100svh-4rem)] lg:flex-row lg:items-center lg:gap-20 lg:pt-0 lg:pb-28"
      >
        <div className="max-w-3xl flex-1">
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/[0.12] bg-gradient-to-r from-white/[0.06] to-white/[0.02] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-cyan-100/95 shadow-[0_0_40px_-12px_rgba(34,211,238,0.35)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400/50 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
            </span>
            Web · AI · SaaS
          </motion.p>

          <AnimatedHeading line1="The Next-Generation" line2="AI & Web Studio" />

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 max-w-xl text-lg leading-relaxed text-white/50 md:text-xl"
          >
            Nexorith Studio crafts <span className="text-white/80">AI-driven ecosystems</span> and hyper-scale web applications. Bold, massive, and intelligent.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex flex-wrap items-center gap-5"
          >
            <Magnetic strength={0.22}>
              <ShimmerButton href="#contact">Start Your Project</ShimmerButton>
            </Magnetic>
            <Magnetic strength={0.18}>
              <motion.a
                href="#vision"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/[0.04] px-9 py-4 text-base font-medium text-white/90 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset] backdrop-blur-md transition-colors hover:border-white/35 hover:text-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="pointer-events-none absolute inset-0 translate-y-full bg-gradient-to-t from-white/10 to-transparent opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100" />
                <span className="relative">Explore the vision</span>
              </motion.a>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-14 flex flex-wrap gap-10 border-t border-white/[0.08] pt-10 text-sm text-white/40"
          >
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/30">
                Delivery
              </p>
              <p className="mt-2 font-display text-2xl font-semibold text-white/90">
                10× faster
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/30">
                Craft
              </p>
              <p className="mt-2 font-display text-2xl font-semibold text-white/90">
                Studio-grade
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/30">
                Trust
              </p>
              <p className="mt-2 font-display text-2xl font-semibold text-white/90">
                NDA-first
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.15, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-12 w-full max-w-md flex-1 lg:mt-0 lg:max-w-lg"
        >
          <div className="relative overflow-hidden rounded-[2rem] p-px">
            <motion.div
              className="absolute left-1/2 top-1/2 h-[220%] w-[220%] -translate-x-1/2 -translate-y-1/2 opacity-95"
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(110,231,255,0.55), rgba(167,139,250,0.55), rgba(244,114,182,0.4), rgba(110,231,255,0.55))",
              }}
              animate={reduce ? undefined : { rotate: 360 }}
              transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative rounded-[calc(2rem-1px)] bg-[#030306]">
            <div className="glass-panel-luxe relative aspect-square overflow-hidden rounded-[1.95rem]">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/25 via-transparent to-violet-600/35" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.08),transparent_55%)]" />
              <div className="relative flex h-full flex-col justify-between p-9">
                <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.28em] text-white/45">
                  <span>Signal</span>
                  <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[10px] tracking-[0.2em] text-emerald-200/90">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60 opacity-70" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    Live
                  </span>
                </div>
                <div className="space-y-3 font-mono text-[11px] leading-relaxed text-cyan-50/85">
                  {[
                    { c: "text-violet-300", line: <>→ deploy edge · latency <span className="text-white">12ms</span></> },
                    { c: "text-cyan-300", line: <>→ model sync · <span className="text-white">GPU</span> cluster healthy</> },
                    { c: "text-fuchsia-300", line: <>→ pipeline · <span className="text-white">99.99%</span> uptime</> },
                  ].map((row, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.55 + idx * 0.08, duration: 0.5 }}
                      className="rounded-xl border border-white/[0.09] bg-black/45 p-3.5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset]"
                    >
                      <span className={row.c}>{row.line}</span>
                    </motion.p>
                  ))}
                </div>
                <div className="flex items-end justify-between">
                  <div className="text-[10px] uppercase tracking-[0.38em] text-white/35">
                    Nexorith Control
                  </div>
                  <motion.div
                    className="h-10 w-24 rounded-full bg-gradient-to-r from-cyan-400/20 to-violet-500/20 blur-xl"
                    animate={{ opacity: [0.35, 0.75, 0.35] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                </div>
              </div>
            </div>
            </div>
          </div>

          <motion.div
            className="absolute -right-8 -top-8 h-28 w-28 rounded-3xl border border-white/[0.12] bg-gradient-to-br from-white/[0.12] to-transparent backdrop-blur-xl"
            animate={reduce ? undefined : { y: [0, -14, 0], rotate: [0, 4, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-10 -left-6 h-24 w-40 rounded-full bg-gradient-to-r from-cyan-500/35 to-violet-500/25 blur-3xl"
            animate={reduce ? undefined : { opacity: [0.35, 0.85, 0.35], scale: [1, 1.08, 1] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
