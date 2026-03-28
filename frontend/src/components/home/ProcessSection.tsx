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
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 65%",
            end: "bottom 45%",
            scrub: true,
          },
          transformOrigin: "top center",
        }
      );

      steps.forEach((_, i) => {
        gsap.fromTo(
          `.process-step-${i}`,
          { opacity: 0.2, x: -16 },
          {
            opacity: 1,
            x: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: `.process-step-${i}`,
              start: "top 78%",
              end: "top 55%",
              scrub: true,
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
      className="scroll-mt-24 px-6 py-28 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300/80">
            Process
          </p>
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
            A rhythm you can feel
          </h2>
        </div>

        <div className="relative grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div className="relative hidden lg:block">
            <div className="sticky top-32">
              <div className="relative h-[420px] w-2 rounded-full bg-white/5">
                <div
                  ref={lineRef}
                  className="absolute left-0 top-0 h-full w-full origin-top rounded-full bg-gradient-to-b from-cyan-400 to-violet-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-12">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className={`process-step-${i} glass-panel rounded-3xl p-10`}
              >
                <div className="mb-3 flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-sm font-bold text-cyan-200">
                    {i + 1}
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-white">
                    {s.title}
                  </h3>
                </div>
                <p className="text-white/55">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
