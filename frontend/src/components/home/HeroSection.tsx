"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FloatingParticles } from "./FloatingParticles";
import { AnimatedHeading } from "./AnimatedHeading";
import { Magnetic } from "./Magnetic";
import { ShimmerButton } from "./ShimmerButton";
import { TiltCard } from "./TiltCard";

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

  const [telemetry, setTelemetry] = useState({
    cpu: 72.4,
    packets: 849,
    coords: "0x4F9B:0x127A",
    latency: 12,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        cpu: +(70 + Math.random() * 20).toFixed(1),
        packets: prev.packets + Math.floor(Math.random() * 4) + 1,
        coords: `0x${Math.floor(Math.random() * 65535)
          .toString(16)
          .toUpperCase()
          .padStart(4, "0")}:0x${Math.floor(Math.random() * 65535)
          .toString(16)
          .toUpperCase()
          .padStart(4, "0")}`,
        latency: Math.floor(Math.random() * 6) + 8,
      }));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

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
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent blur-[1px] opacity-40 animate-scanline" />
        <div className="noise absolute inset-0 opacity-[0.55]" />
        <FloatingParticles />
      </div>

      <motion.div
        style={reduce ? undefined : { y: headlineY, opacity: headlineOpacity }}
        className="relative z-[2] mx-auto flex max-w-7xl flex-col justify-center gap-16 pb-24 pt-8 lg:min-h-[calc(100svh-4rem)] lg:flex-row lg:items-center lg:gap-20 lg:pt-0 lg:pb-28"
      >
        <div className="max-w-3xl flex-1 relative pl-4 lg:pl-8 border-l border-white/[0.04]">
          {/* Top-Left Corner HUD brackets */}
          <div className="absolute -left-px top-0 h-14 w-[1px] bg-gradient-to-b from-cyan-400/80 to-transparent" />
          <div className="absolute -left-px top-0 h-[1px] w-6 bg-cyan-400/80" />
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
          <TiltCard className="relative w-full">
            <div className="relative overflow-hidden rounded-[2rem] p-px">
              <motion.div
                className="absolute left-1/2 top-1/2 h-[220%] w-[220%] -translate-x-1/2 -translate-y-1/2 opacity-95 pointer-events-none"
                style={{
                  background:
                    "conic-gradient(from 0deg, rgba(110,231,255,0.4), rgba(167,139,250,0.4), rgba(244,114,182,0.3), rgba(110,231,255,0.4))",
                }}
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
              />
              <div className="relative rounded-[calc(2rem-1px)] bg-[#030306]/95 backdrop-blur-xl">
                <div className="glass-panel-luxe relative aspect-square overflow-hidden rounded-[1.95rem] flex flex-col justify-between p-7 lg:p-9">
                  {/* Cyber Laser Scanline Beam */}
                  <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
                    <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent blur-[1px] opacity-75 animate-scanline" />
                  </div>

                  {/* Ambient internal card glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 via-transparent to-violet-600/20 pointer-events-none" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.06),transparent_55%)] pointer-events-none" />

                  {/* Header HUD Signal indicator */}
                  <div className="relative z-10 flex items-center justify-between text-[10px] font-mono font-medium uppercase tracking-[0.25em] text-white/45">
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      NEX_NODE_09
                    </span>
                    <span className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[9px] tracking-[0.15em] text-emerald-300">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60 opacity-70" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      </span>
                      SYS_ACTIVE
                    </span>
                  </div>

                  {/* Dynamic Graphic Radar / Sine Wave Display */}
                  <div className="relative z-10 h-36 w-full rounded-xl border border-white/[0.05] bg-black/40 overflow-hidden flex items-center justify-center">
                    {/* Pulsing ring grid */}
                    <div className="absolute h-32 w-32 rounded-full border border-cyan-500/5 animate-[ping_4s_ease-in-out_infinite]" />
                    <div className="absolute h-20 w-20 rounded-full border border-violet-500/10 animate-[ping_6s_ease-in-out_infinite_delay-2s]" />

                    {/* Radar swept lines */}
                    <svg className="absolute inset-0 h-full w-full opacity-25 animate-[spin_12s_linear_infinite]" viewBox="0 0 100 100">
                      <line x1="50" y1="50" x2="100" y2="50" stroke="rgba(110, 231, 255, 0.7)" strokeWidth="0.5" />
                      <circle cx="50" cy="50" r="45" stroke="rgba(110, 231, 255, 0.1)" strokeWidth="0.5" fill="none" />
                      <circle cx="50" cy="50" r="30" stroke="rgba(110, 231, 255, 0.1)" strokeWidth="0.5" fill="none" />
                      <path d="M 50 2 L 50 6 M 50 94 L 50 98 M 2 50 L 6 50 M 94 50 L 98 50" stroke="rgba(110, 231, 255, 0.3)" strokeWidth="0.5" />
                    </svg>

                    {/* AI Waveforms */}
                    <div className="absolute bottom-1 inset-x-3 h-14 opacity-70">
                      <svg className="w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none">
                        <motion.path
                          d="M0,30 Q25,5 50,30 T100,30 T150,30 T200,30"
                          fill="none"
                          stroke="#6ee7ff"
                          strokeWidth="1.5"
                          animate={{
                            d: [
                              "M0,30 Q25,5 50,30 T100,30 T150,30 T200,30",
                              "M0,30 Q25,48 50,30 T100,18 T150,42 T200,30",
                              "M0,30 Q25,5 50,30 T100,30 T150,30 T200,30",
                            ]
                          }}
                          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.path
                          d="M0,35 Q25,45 50,35 T100,35 T150,35 T200,35"
                          fill="none"
                          stroke="#a78bfa"
                          strokeWidth="1"
                          className="opacity-60"
                          animate={{
                            d: [
                              "M0,35 Q25,45 50,35 T100,35 T150,35 T200,35",
                              "M0,35 Q25,12 50,35 T100,42 T150,18 T200,35",
                              "M0,35 Q25,45 50,35 T100,35 T150,35 T200,35",
                            ]
                          }}
                          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                        />
                      </svg>
                    </div>

                    <div className="absolute top-2.5 left-3 font-mono text-[8px] text-cyan-400/80 tracking-widest">
                      [SYS_WAVEFORM_DYN]
                    </div>
                    <div className="absolute top-2.5 right-3 font-mono text-[8px] text-violet-400/80 tracking-widest">
                      REF_SIG_5.80G
                    </div>
                  </div>

                  {/* Telemetry data list */}
                  <div className="relative z-10 space-y-2.5 font-mono text-[10px] leading-relaxed text-cyan-50/80">
                    <div
                      className="flex items-center justify-between rounded-lg border border-white/[0.05] bg-black/40 px-3.5 py-2.5 shadow-[0_0_12px_rgba(0,0,0,0.25)]"
                    >
                      <span className="text-violet-300">→ deploy edge · latency</span>
                      <span className="font-semibold text-white tracking-wide">{telemetry.latency}ms</span>
                    </div>
                    <div
                      className="flex items-center justify-between rounded-lg border border-white/[0.05] bg-black/40 px-3.5 py-2.5 shadow-[0_0_12px_rgba(0,0,0,0.25)]"
                    >
                      <span className="text-cyan-300">→ model sync · CPU load</span>
                      <span className="font-semibold text-white tracking-wide">{telemetry.cpu}%</span>
                    </div>
                    <div
                      className="flex items-center justify-between rounded-lg border border-white/[0.05] bg-black/40 px-3.5 py-2.5 shadow-[0_0_12px_rgba(0,0,0,0.25)]"
                    >
                      <span className="text-fuchsia-300">→ neural map · node index</span>
                      <span className="font-semibold text-white tracking-wide font-mono">{telemetry.coords}</span>
                    </div>
                  </div>

                  {/* Control / Branding Row */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="text-[9px] font-mono uppercase tracking-[0.35em] text-white/30">
                      Nexorith Terminal v2.1
                    </div>
                    <motion.div
                      className="h-8 w-20 rounded-full bg-gradient-to-r from-cyan-400/25 to-violet-500/25 blur-lg"
                      animate={{ opacity: [0.35, 0.75, 0.35] }}
                      transition={{ duration: 5, repeat: Infinity }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Floating background details */}
          <motion.div
            className="absolute -right-8 -top-8 h-28 w-28 rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.1] to-transparent backdrop-blur-xl pointer-events-none"
            animate={reduce ? undefined : { y: [0, -14, 0], rotate: [0, 4, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-10 -left-6 h-24 w-40 rounded-full bg-gradient-to-r from-cyan-500/30 to-violet-500/20 blur-3xl pointer-events-none"
            animate={reduce ? undefined : { opacity: [0.35, 0.85, 0.35], scale: [1, 1.08, 1] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
