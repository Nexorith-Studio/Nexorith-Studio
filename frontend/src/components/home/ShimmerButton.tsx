"use client";

import { motion } from "framer-motion";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function ShimmerButton({ href, children, className = "" }: Props) {
  return (
    <motion.a
      href={href}
      className={`group relative inline-flex overflow-hidden rounded-full ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="pointer-events-none absolute -inset-[1px] rounded-full bg-gradient-to-r from-cyan-400/50 via-white/40 to-violet-500/50 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100" />
      <span className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition duration-700 group-hover:translate-x-[120%] group-hover:opacity-100" />
      <span className="glow-ring relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-300 via-cyan-200 to-violet-500 px-10 py-4 text-base font-semibold text-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.2)_inset,0_24px_60px_-24px_rgba(34,211,238,0.55)]">
        {children}
      </span>
    </motion.a>
  );
}
