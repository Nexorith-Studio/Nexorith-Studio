"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect } from "react";

/**
 * Soft spotlight that follows the pointer — reads as high-end ambient lighting.
 */
export function CursorGlow() {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 28, damping: 22, mass: 0.9 });
  const sy = useSpring(y, { stiffness: 28, damping: 22, mass: 0.9 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y, reduce]);

  const layerA = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, rgba(110,231,255,0.11), transparent 62%)`;
  const layerB = useMotionTemplate`radial-gradient(380px circle at ${sx}px ${sy}px, rgba(167,139,250,0.09), transparent 55%)`;

  if (reduce) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[0] hidden mix-blend-screen md:block"
      aria-hidden
    >
      <motion.div className="absolute inset-0" style={{ background: layerA }} />
      <motion.div
        className="absolute inset-0 opacity-80"
        style={{ background: layerB }}
      />
    </div>
  );
}
