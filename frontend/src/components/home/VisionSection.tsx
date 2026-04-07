"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lines = [
  "We architect resilient digital infrastructure for the next decade of product velocity.",
  "Nexorith Studio unifies web craftsmanship, AI systems, and cloud-native scale — so your roadmap moves at the speed of ambition.",
  "From first sketch to global launch, every interaction is considered, measured, and elevated.",
];

export function VisionSection() {
  const root = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      lines.forEach((_, i) => {
        gsap.fromTo(
          `.vision-line-${i}`,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: `.vision-line-${i}`,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      const paths = svgRef.current?.querySelectorAll("circle, line, path");
      if (paths?.length) {
        gsap.fromTo(
          paths,
          { opacity: 0, scale: 0.85, transformOrigin: "50% 50%" },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.06,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: svgRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      gsap.to(".orbit-ring", {
        rotate: 360,
        duration: 40,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="vision"
      ref={root}
      className="relative scroll-mt-24 px-6 py-32 lg:px-10"
    >
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300/80">
            Vision
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
            Modern digital infrastructure
          </h2>
          <div className="mt-10 space-y-8 text-lg leading-relaxed text-white/55">
            {lines.map((text, i) => (
              <p key={i} className={`vision-line-${i}`}>
                {text}
              </p>
            ))}
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="glass-panel relative aspect-square w-full max-w-md overflow-hidden p-10">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-600/20" />
            <svg
              ref={svgRef}
              viewBox="0 0 400 400"
              className="relative h-full w-full"
              aria-hidden
            >
              <defs>
                <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              <circle
                className="orbit-ring"
                cx="200"
                cy="200"
                r="140"
                fill="none"
                stroke="url(#g1)"
                strokeWidth="1"
                strokeDasharray="6 10"
                opacity="0.5"
              />
              <circle cx="200" cy="200" r="90" fill="none" stroke="rgba(255,255,255,0.08)" />
              <circle cx="200" cy="200" r="40" fill="rgba(110,231,255,0.15)" />
              <circle cx="200" cy="200" r="12" fill="#67e8f9" />
              <circle cx="320" cy="140" r="22" fill="rgba(167,139,250,0.35)" />
              <circle cx="90" cy="260" r="18" fill="rgba(52,211,153,0.35)" />
              <circle cx="280" cy="300" r="14" fill="rgba(244,114,182,0.35)" />
              <line x1="200" y1="200" x2="320" y2="140" stroke="rgba(255,255,255,0.15)" />
              <line x1="200" y1="200" x2="90" y2="260" stroke="rgba(255,255,255,0.12)" />
              <line x1="200" y1="200" x2="280" y2="300" stroke="rgba(255,255,255,0.12)" />
              <path
                d="M 60 120 Q 120 80 180 120 T 300 100"
                fill="none"
                stroke="rgba(110,231,255,0.25)"
                strokeWidth="1.5"
              />
            </svg>
            <p className="absolute bottom-6 left-0 right-0 text-center text-xs uppercase tracking-[0.3em] text-white/35">
              Connected ecosystem
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
