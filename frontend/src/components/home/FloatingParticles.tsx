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
            className="absolute rounded-full bg-gradient-to-br from-cyan-400/20 to-violet-500/15 blur-3xl"
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
                    y: [0, -40, 0],
                    x: [0, 20, 0],
                    opacity: [0.15, 0.45, 0.15],
                    scale: [1, 1.2, 1],
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
                    y: [0, -60, 0],
                    opacity: [0.15, 0.8, 0.15],
                    scale: [1, 2, 1],
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
            width: 400 + i * 350,
            height: 400 + i * 350,
            left: `${-10 + i * 35}%`,
            top: `${-10 + i * 15}%`,
          }}
          animate={
            reduce
              ? undefined
              : {
                  rotate: [0, 360],
                  opacity: [0.08, 0.25, 0.08],
                  scale: [1, 1.1, 1],
                }
          }
          transition={{
            rotate: { duration: 60 + i * 18, repeat: Infinity, ease: "linear" },
            opacity: { duration: 12 + i * 3, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 18 + i * 4, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      ))}
    </div>
  );
}
