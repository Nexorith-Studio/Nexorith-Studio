import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// Define the props for the component
interface AnimatedFeatureCardProps extends Omit<HTMLMotionProps<"div">, 'title'> {
  /** The numerical index to display, e.g., "001" */
  index: string;
  /** The tag or category label */
  tag: string;
  /** The main title or description */
  title: React.ReactNode;
  /** The URL for the central image */
  imageSrc: string;
  /** The color variant which determines the gradient and tag color */
  color: "orange" | "purple" | "blue" | "white";
}

// Define HSL color values for each variant
const colorVariants = {
  orange: {
    '--feature-color': 'hsl(35, 91%, 55%)',
    '--feature-color-light': 'hsl(41, 100%, 85%)',
    '--feature-color-dark': 'hsl(24, 98%, 98%)',
  },
  purple: {
    '--feature-color': 'hsl(262, 85%, 60%)',
    '--feature-color-light': 'hsl(261, 100%, 87%)',
    '--feature-color-dark': 'hsl(264, 100%, 98%)',
  },
  blue: {
    '--feature-color': 'hsl(211, 100%, 60%)',
    '--feature-color-light': 'hsl(210, 100%, 83%)',
    '--feature-color-dark': 'hsl(216, 100%, 98%)',
  },
  white: {
    '--feature-color': 'hsl(0, 0%, 100%)',
    '--feature-color-light': 'hsl(0, 0%, 95%)',
    '--feature-color-dark': 'hsl(0, 0%, 10%)',
  },
};

const AnimatedFeatureCard = React.forwardRef<
  HTMLDivElement,
  AnimatedFeatureCardProps
>(({ className, index, tag, title, imageSrc, color, ...props }, ref) => {
  const cardStyle = colorVariants[color] as React.CSSProperties;

  return (
    <motion.div
      ref={ref}
      style={cardStyle}
      className={cn(
        "relative flex h-[380px] w-full flex-col justify-end overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-950/50 p-4 sm:p-6 shadow-lg transition-all duration-500 ease-in-out",
        // Add hover-reveal effect only on desktop
        "md:group-hover:scale-[0.97] md:group-hover:opacity-60 md:group-hover:blur-[2px]",
        "md:hover:!scale-105 md:hover:!opacity-100 md:hover:!blur-none",
        className
      )}
      whileHover="hover"
      initial="initial"
      variants={{
        initial: { 
          y: 0,
          scale: 1
        },
        hover: {
          y: -15,
          scale: 1.02,
          transition: {
            duration: 0.4,
            ease: "easeOut"
          }
        },
      }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      {...props}
    >
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 30%, var(--feature-color-light) 0%, transparent 70%)`,
        }}
      />

      {/* Index Number */}
      <div className="card-index absolute top-4 left-4 sm:top-6 sm:left-6 font-mono text-base sm:text-lg font-bold text-zinc-500">
        {index}
      </div>

      {/* Main Image */}
      <motion.div
        className="absolute inset-0 z-10 flex items-center justify-center"
        style={{ marginTop: '-40px' }}
        variants={{
          initial: { 
            scale: 1, 
            y: 0
          },
          hover: {
            scale: 1.15, 
            y: -20,
            transition: {
              duration: 0.5,
              ease: "easeOut"
            }
          },
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={tag}
          className="w-32 h-32 sm:w-40 sm:h-40 object-contain filter drop-shadow-lg"
        />
      </motion.div>

      {/* Content */}
      <div className="card-content relative z-20 rounded-lg border border-zinc-700 bg-black/80 p-3 sm:p-4 backdrop-blur-sm">
        <span
          className="card-tag mb-1 sm:mb-2 inline-block rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold"
          style={{
            backgroundColor: 'var(--feature-color-dark)',
            color: 'var(--feature-color)',
          }}
        >
          {tag}
        </span>
        <p className="card-title text-sm sm:text-base text-white">{title}</p>
      </div>
    </motion.div>
  );
});

AnimatedFeatureCard.displayName = "AnimatedFeatureCard";

export { AnimatedFeatureCard };
