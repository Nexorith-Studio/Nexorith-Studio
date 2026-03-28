"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stack = [
  { name: "React", abbr: "Rc" },
  { name: "Next.js", abbr: "Nx" },
  { name: "Node.js", abbr: "Nd" },
  { name: "Python", abbr: "Py" },
  { name: "AI / ML", abbr: "AI" },
  { name: "Cloud", abbr: "☁" },
];

export function TechStackSection() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tech-pill",
        { opacity: 0, y: 40, rotateX: -25 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden px-6 py-28 lg:px-10"
    >
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300/80">
            Stack
          </p>
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
            Built on proven foundations
          </h2>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {stack.map((t) => (
            <div
              key={t.name}
              className="tech-pill glass-panel flex min-w-[140px] flex-col items-center justify-center gap-2 rounded-2xl px-8 py-6 text-center"
              style={{ perspective: "800px" }}
            >
              <span className="font-display text-2xl font-bold text-white/90">
                {t.abbr}
              </span>
              <span className="text-sm font-medium text-white/70">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
