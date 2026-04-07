"use client";

import { motion } from "framer-motion";

type Props = {
  line1: string;
  line2: string;
  className?: string;
};

const wordContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.045, delayChildren: 0.06 },
  },
};

const word = {
  hidden: { opacity: 0, y: 28, rotateX: -18 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function AnimatedHeading({ line1, line2, className = "" }: Props) {
  const words1 = line1.split(" ");
  const words2 = line2.split(" ");

  return (
    <h1
      className={`font-display text-4xl font-bold leading-[1.06] tracking-tight sm:text-5xl lg:text-7xl xl:text-8xl ${className}`}
      style={{ perspective: 1200 }}
    >
      <motion.span
        className="block overflow-hidden"
        initial="hidden"
        animate="show"
        variants={wordContainer}
      >
        {words1.map((w, i) => (
          <motion.span
            key={`${w}-${i}`}
            variants={word}
            className="animated-gradient-text mr-[0.2em] inline-block"
            style={{ transformStyle: "preserve-3d" }}
          >
            {w}
          </motion.span>
        ))}
      </motion.span>
      <motion.span
        className="mt-1 block overflow-hidden sm:mt-2"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.05, delayChildren: 0.35 } },
        }}
      >
        {words2.map((w, i) => (
          <motion.span
            key={`${w}-2-${i}`}
            variants={word}
            className="mr-[0.2em] inline-block text-white/[0.96]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {w}
          </motion.span>
        ))}
      </motion.span>
    </h1>
  );
}
