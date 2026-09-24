"use client";

import { Cherries } from "@phosphor-icons/react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef } from "react";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

// The one marquee on the site: a run of menu staples that speeds up and flips
// direction with scroll velocity, showing the breadth of the kitchen at a glance.
export function Marquee({ items, baseVelocity = -2 }: { items: string[]; baseVelocity?: number }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = direction.current * baseVelocity * (delta / 1000);
    if (factor.get() < 0) direction.current = -1;
    else if (factor.get() > 0) direction.current = 1;
    move += direction.current * move * factor.get();
    baseX.set(baseX.get() + move);
  });

  const run = (
    <span className="flex shrink-0 items-center">
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span className="px-6 md:px-10">{item}</span>
          <Cherries weight="fill" className="size-[0.6em] text-cherry" aria-hidden />
        </span>
      ))}
    </span>
  );

  return (
    <div className="overflow-hidden border-y border-line py-6 md:py-9" aria-label={items.join(", ")} role="img">
      <motion.div
        className="flex whitespace-nowrap font-display text-[clamp(2.4rem,6vw,5.5rem)] font-extrabold leading-none tracking-[-0.03em]"
        style={{ x: reduce ? "-25%" : x }}
        aria-hidden
      >
        {run}
        {run}
        {run}
        {run}
      </motion.div>
    </div>
  );
}
