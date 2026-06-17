"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { title: "Discover", detail: "Immersion workshops, audits, and north-star metrics." },
  { title: "Design", detail: "Product narrative, UX systems, and motion language." },
  { title: "Build", detail: "Typed APIs, CI/CD, observability, and AI guardrails." },
  { title: "Launch", detail: "Progressive rollout, analytics, and continuous iteration." },
];

export function ProcessSection() {
  const root = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    const ctx = gsap.context(() => {
      // Animate the laser pulse line height matching scroll progress
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 60%",
            end: "bottom 70%",
            scrub: true,
          },
          transformOrigin: "top center",
        }
      );

      // Light up nodes and cards dynamically as they scroll into view
      steps.forEach((_, i) => {
        // Node pulse
        gsap.fromTo(
          `.process-node-${i}`,
          { backgroundColor: "rgba(255,255,255,0.08)", scale: 1, boxShadow: "none" },
          {
            backgroundColor: "#6ee7ff",
            scale: 1.35,
            boxShadow: "0 0 16px rgba(110,231,255,0.8)",
            scrollTrigger: {
              trigger: `.process-step-${i}`,
              start: "top 65%",
              end: "bottom 55%",
              toggleActions: "play reverse play reverse",
            },
          }
        );

        // Card border hover/focus glow
        gsap.fromTo(
          `.process-step-${i}`,
          { borderColor: "rgba(255,255,255,0.08)", boxShadow: "none" },
          {
            borderColor: "rgba(110,231,255,0.35)",
            boxShadow: "0 0 45px -15px rgba(110,231,255,0.3)",
            scrollTrigger: {
              trigger: `.process-step-${i}`,
              start: "top 65%",
              end: "bottom 55%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={root}
      className="scroll-mt-24 px-6 py-28 lg:px-10 relative"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300/80">
            Process
          </p>
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
            A rhythm you can feel
          </h2>
        </div>

        {/* Outer Conduit Grid */}
        <div className="relative flex flex-col gap-10">
          {/* Static Background Conduit Track */}
          <div className="absolute left-[39px] top-6 bottom-6 w-[2px] bg-white/5 hidden lg:block" />
          
          {/* Glowing Active Laser Pulse */}
          <div
            ref={lineRef}
            className="absolute left-[39px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-cyan-400 via-cyan-300 to-violet-500 hidden lg:block origin-top"
          />

          {steps.map((s, i) => (
            <div
              key={s.title}
              className="grid grid-cols-1 lg:grid-cols-[80px_1fr] gap-6 lg:gap-12 relative items-center"
            >
              {/* Left Column Node */}
              <div className="hidden lg:flex justify-center z-10">
                <div
                  className={`process-node-${i} h-4 w-4 rounded-full border border-[#030306] bg-white/10 transition-all duration-300`}
                />
              </div>
              
              {/* Right Column Step Card */}
              <div
                className={`process-step-${i} glass-panel rounded-3xl p-10 border border-white/[0.08] bg-white/[0.03] transition-all duration-300`}
              >
                <div className="mb-4 flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 text-sm font-bold text-cyan-200">
                    {i + 1}
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-white">
                    {s.title}
                  </h3>
                </div>
                <p className="text-white/55 leading-relaxed">{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
