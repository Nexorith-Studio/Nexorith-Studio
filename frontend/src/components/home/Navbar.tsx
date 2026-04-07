"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const links = [
  { href: "#vision", label: "Vision" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const bg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(3,3,6,0)", "rgba(3,3,6,0.82)"]
  );
  const border = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.08)"]
  );

  return (
    <motion.header
      style={{ backgroundColor: bg, borderBottomColor: border }}
      className="fixed inset-x-0 top-0 z-50 border-b border-transparent backdrop-blur-xl backdrop-saturate-150"
    >
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="group flex items-center gap-3">
          <motion.span
            className="font-display text-xl font-bold tracking-tight text-white"
            whileHover={{ scale: 1.02 }}
          >
            Nexorith Studio
          </motion.span>
          <span className="hidden rounded-full border border-white/15 bg-gradient-to-r from-white/[0.08] to-white/[0.02] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-100/90 shadow-[0_0_24px_-8px_rgba(34,211,238,0.35)] sm:inline">
            Studio
          </span>
        </Link>
        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link-luxe">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/login"
            className="hidden text-xs text-white/30 transition hover:text-white/65 sm:inline"
          >
            Admin
          </Link>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-300 via-cyan-200 to-violet-500 px-6 py-2.5 text-sm font-semibold text-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.2)_inset,0_12px_40px_-16px_rgba(34,211,238,0.55)]"
          >
            <span className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 transition duration-700 group-hover:translate-x-[120%] group-hover:opacity-100" />
            <span className="relative">Start Your Project</span>
          </motion.a>
        </div>
      </div>
    </motion.header>
  );
}
