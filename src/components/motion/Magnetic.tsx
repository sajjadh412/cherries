"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

// Primary CTAs lean toward the cursor, a tactile cue that they are the main action.
// Uses motion values only, so pointer movement never re-renders React. Mouse-only.
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 16, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 16, mass: 0.4 });

  const onMove = (e: PointerEvent<HTMLSpanElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span className="inline-flex" style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </motion.span>
  );
}
