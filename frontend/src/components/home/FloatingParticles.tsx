"use client";

import { useReducedMotion } from "framer-motion";

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
          <div
            key={`bokeh-${i}`}
            className="absolute rounded-full bg-gradient-to-br from-cyan-400/20 to-violet-500/15 blur-3xl will-change-transform"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              animation: reduce
                ? undefined
                : `float-bokeh ${16 + (i % 6)}s ease-in-out infinite`,
              animationDelay: reduce ? undefined : `${i * 0.4}s`,
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
          <span
            key={i}
            className={`absolute rounded-full will-change-transform ${
              gold ? "bg-amber-200/35" : "bg-cyan-200/30"
            }`}
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              animation: reduce
                ? undefined
                : `float-spark ${duration}s ease-in-out infinite`,
              animationDelay: reduce ? undefined : `${delay}s`,
            }}
          />
        );
      })}

      {/* Floating rings */}
      {[0, 1, 2].map((i) => (
        <div
          key={`ring-${i}`}
          className="absolute rounded-full border border-white/[0.07] will-change-transform"
          style={{
            width: 400 + i * 350,
            height: 400 + i * 350,
            left: `${-10 + i * 35}%`,
            top: `${-10 + i * 15}%`,
            animation: reduce
              ? undefined
              : `rotate-ring ${60 + i * 18}s linear infinite, pulse-ring ${
                  12 + i * 3
                }s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}
