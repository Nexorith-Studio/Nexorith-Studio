"use client";

import { motion, useReducedMotion } from "framer-motion";

const seeds = Array.from({ length: 64 }, (_, i) => i);

export function FloatingParticles() {
  const reduce = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {/* Large soft bokeh */}
      {seeds.slice(0, 12).map((i) => {
        const size = 40 + (i % 5) * 22;
        const left = (i * 61) % 100;
        const top = (i * 47) % 100;
        return (
          <motion.div
            key={`bokeh-${i}`}
            className="absolute rounded-full bg-gradient-to-br from-cyan-400/15 to-violet-500/10 blur-2xl"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
            }}
            animate={
              reduce
                ? undefined
                : {
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                    opacity: [0.12, 0.35, 0.12],
                    scale: [1, 1.08, 1],
                  }
            }
            transition={{
              duration: 16 + (i % 6),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        );
      })}

      {/* Spark points */}
      {seeds.map((i) => {
        const size = 1.5 + (i % 6) * 0.6;
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;
        const delay = (i % 10) * 0.12;
        const duration = 14 + (i % 10);
        const gold = i % 7 === 0;
        return (
          <motion.span
            key={i}
            className={`absolute rounded-full ${gold ? "bg-amber-200/35" : "bg-cyan-200/30"}`}
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
            }}
            animate={
              reduce
                ? undefined
                : {
                    y: [0, -36, 0],
                    opacity: [0.12, 0.65, 0.12],
                    scale: [1, 1.5, 1],
                  }
            }
            transition={{
              duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
          />
        );
      })}

      {/* Floating rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute rounded-full border border-white/[0.07]"
          style={{
            width: 120 + i * 90,
            height: 120 + i * 90,
            left: `${18 + i * 22}%`,
            top: `${12 + i * 8}%`,
          }}
          animate={
            reduce
              ? undefined
              : {
                  rotate: [0, 360],
                  opacity: [0.06, 0.14, 0.06],
                }
          }
          transition={{
            rotate: { duration: 48 + i * 12, repeat: Infinity, ease: "linear" },
            opacity: { duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      ))}
    </div>
  );
}
