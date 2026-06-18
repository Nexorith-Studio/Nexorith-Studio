"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
  }, []);

  if (isTouch) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.11, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
