"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  decay: number;
}

/**
 * High-end cursor animation, glowing spotlights, and HTML5 canvas interactive effects.
 */
export function CursorGlow() {
  const reduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Motion Values for pointer tracking
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  
  // Smooth spring tracking for the outer target ring (lag-effect)
  const sx = useSpring(x, { stiffness: 140, damping: 20, mass: 0.45 });
  const sy = useSpring(y, { stiffness: 140, damping: 20, mass: 0.45 });

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Keep track of particles and ripples for the canvas
  const particlesRef = useRef<Particle[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const lastMousePos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (reduce) return;

    // Apply global stylesheet hiding standard cursor
    document.body.classList.add("custom-cursor-active");

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize handler with retina pixel ratio support
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Particle factory
    const spawnParticles = (mx: number, my: number, count = 1, burst = false) => {
      const particles = particlesRef.current;
      const limit = burst ? 100 : 45;
      if (particles.length > limit && !burst) return;

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        // Faster burst velocity, slower drag trail velocity
        const speed = burst ? Math.random() * 4.5 + 1.5 : Math.random() * 1.2 + 0.3;
        particles.push({
          x: mx,
          y: my,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (burst ? 0 : 0.3), // gentle upward drift
          size: Math.random() * (burst ? 2.5 : 1.8) + 0.8,
          // Alternate between neon cyan and magenta/purple
          color: Math.random() > 0.45 ? "rgba(110, 231, 255, " : "rgba(167, 139, 250, ",
          alpha: 1,
          decay: burst ? Math.random() * 0.035 + 0.025 : Math.random() * 0.025 + 0.015,
        });
      }
      startAnimation();
    };

    // Animation loop control
    let animId: number | null = null;
    const isAnimating = { current: false };

    const startAnimation = () => {
      if (!isAnimating.current) {
        isAnimating.current = true;
        render();
      }
    };

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        isAnimating.current = false;
        return;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        isAnimating.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);

      // 1. Render ripples
      const ripples = ripplesRef.current;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += (r.maxRadius - r.radius) * 0.14;
        r.alpha -= r.decay;
        
        if (r.alpha <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(110, 231, 255, ${r.alpha * 0.75})`;
        ctx.lineWidth = 1.2;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(110, 231, 255, 0.4)";
        ctx.stroke();
      }

      // 2. Render particles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha * 0.85})`;
        ctx.shadowBlur = p.size * 2.5;
        ctx.shadowColor = `${p.color}0.6)`;
        ctx.fill();
      }

      ctx.shadowBlur = 0; // Reset shadow effects

      if (ripples.length === 0 && particles.length === 0) {
        ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
        isAnimating.current = false;
        animId = null;
        return;
      }

      animId = requestAnimationFrame(render);
    };

    // Event listeners
    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      x.set(e.clientX);
      y.set(e.clientY);

      // Emit trail particle if cursor moved enough
      const dx = Math.abs(e.clientX - lastMousePos.current.x);
      const dy = Math.abs(e.clientY - lastMousePos.current.y);
      if (dx > 2 || dy > 2) {
        spawnParticles(e.clientX, e.clientY, 1);
        lastMousePos.current = { x: e.clientX, y: e.clientY };
      }

      // Lock-on target detection
      const target = e.target as HTMLElement | null;
      if (target) {
        const hoverable = target.closest("a, button, [role='button'], .magnetic, .nav-link-luxe");
        setIsHovered(!!hoverable);
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsClicked(true);
      // Spawn burst of sparks
      spawnParticles(e.clientX, e.clientY, 15, true);
      // Add ripple wave
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 2,
        maxRadius: 36,
        alpha: 1,
        decay: 0.05,
      });
      startAnimation();
    };

    const onMouseUp = () => {
      setIsClicked(false);
    };

    const onMouseLeaveWindow = () => {
      setIsVisible(false);
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeaveWindow, { passive: true });

    return () => {
      if (animId !== null) cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeaveWindow);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [x, y, reduce]);

  // Ambient back-glow template
  const layerA = useMotionTemplate`radial-gradient(450px circle at ${sx}px ${sy}px, rgba(110,231,255,0.08), transparent 65%)`;
  const layerB = useMotionTemplate`radial-gradient(320px circle at ${sx}px ${sy}px, rgba(167,139,250,0.07), transparent 60%)`;

  if (reduce) return null;

  return (
    <>
      {/* 1. Ambient Lighting (Background layer) */}
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

      {/* 2. Interactive FX Canvas (Sparks and click ripples) */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9990] hidden w-full h-full mix-blend-screen md:block"
        aria-hidden
      />

      {/* 3. Custom Cursor Elements */}
      {isVisible && (
        <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block" aria-hidden>
          {/* Inner Dot */}
          <motion.div
            style={{ x, y }}
            animate={{
              scale: isClicked ? 0.6 : isHovered ? 0.35 : 1,
              backgroundColor: isHovered ? "#a78bfa" : "#6ee7ff",
            }}
            transition={{ type: "spring", stiffness: 450, damping: 28 }}
            className="fixed top-0 left-0 h-2 w-2 rounded-full shadow-[0_0_8px_#6ee7ff] -translate-x-1/2 -translate-y-1/2"
          />

          {/* Outer Ring with futuristic HUD segments */}
          <motion.div
            style={{ x: sx, y: sy }}
            animate={{
              scale: isClicked ? 0.8 : isHovered ? 1.6 : 1,
              width: isHovered ? 48 : 30,
              height: isHovered ? 48 : 30,
              color: isHovered ? "#a78bfa" : "#6ee7ff",
              borderColor: isHovered ? "rgba(167,139,250,0.35)" : "rgba(110,231,255,0.25)",
            }}
            transition={{ type: "spring", stiffness: 220, damping: 22, mass: 0.5 }}
            className="fixed top-0 left-0 flex items-center justify-center rounded-full border -translate-x-1/2 -translate-y-1/2"
          >
            {/* Cyber HUD Brackets/Ticks inside ring */}
            <svg
              className="absolute h-[115%] w-[115%] animate-[spin-slow_16s_linear_infinite]"
              viewBox="0 0 40 40"
              style={{ color: "currentColor" }}
            >
              <circle
                cx="20"
                cy="20"
                r="18"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="3 7"
                fill="none"
                className="opacity-40"
              />
              {/* Four crosshair ticks */}
              <path
                d="M 20 1 L 20 4 M 20 36 L 20 39 M 1 20 L 4 20 M 36 20 L 39 20"
                stroke="currentColor"
                strokeWidth="1"
                className="opacity-70"
              />
            </svg>
          </motion.div>
        </div>
      )}
    </>
  );
}
