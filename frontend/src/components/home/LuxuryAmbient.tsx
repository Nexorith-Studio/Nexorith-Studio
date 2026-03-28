"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Fixed atmospheric layers: mesh orbs, slow drift, vignette — no pointer tracking.
 */
export function LuxuryAmbient() {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#030306]" />
      <div className="absolute inset-x-0 top-0 h-[55vh] bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,rgba(99,102,241,0.22),transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-[45vh] bg-[radial-gradient(ellipse_80%_60%_at_50%_120%,rgba(244,114,182,0.08),transparent)]" />

      {!reduce && (
        <>
          <motion.div
            className="absolute -left-[20%] top-[10%] h-[55vh] w-[55vh] rounded-full bg-cyan-500/15 blur-[140px]"
            animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-[15%] top-[25%] h-[45vh] w-[45vh] rounded-full bg-violet-600/18 blur-[130px]"
            animate={{ x: [0, -35, 0], y: [0, 25, 0], scale: [1, 1.06, 1] }}
            transition={{
              duration: 32,
              repeat: Infinity,
              ease: "easeInOut",
              delay: -4,
            }}
          />
          <motion.div
            className="absolute bottom-[-10%] left-[20%] h-[40vh] w-[50vh] rounded-full bg-fuchsia-500/10 blur-[120px]"
            animate={{ opacity: [0.35, 0.65, 0.35] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {reduce && (
        <>
          <div className="absolute -left-[20%] top-[10%] h-[55vh] w-[55vh] rounded-full bg-cyan-500/12 blur-[140px]" />
          <div className="absolute -right-[15%] top-[25%] h-[45vh] w-[45vh] rounded-full bg-violet-600/14 blur-[130px]" />
        </>
      )}

      <div className="absolute right-[8%] top-[40%] h-64 w-64 rounded-full bg-amber-400/[0.045] blur-[90px]" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,3,6,0.55)_75%,rgba(3,3,6,0.92)_100%)]" />

      <div className="noise absolute inset-0 opacity-[0.07]" />
    </div>
  );
}
