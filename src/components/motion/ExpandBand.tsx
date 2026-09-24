"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

// Image band that opens from a framed card to full bleed as it scrolls in,
// turning the section into a moment and pulling focus to its call to action.
export function ExpandBand({ src, alt, children }: { src: string; alt: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.15"] });
  const inset = useTransform(scrollYProgress, [0, 1], [7, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [28, 0]);
  const clipPath = useTransform(
    [inset, radius],
    ([i, r]: number[]) => `inset(${i}% ${i}% ${i}% ${i}% round ${r}px)`,
  );
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return (
    <section ref={ref} className="relative">
      <motion.div
        className="relative flex min-h-[100dvh] items-end overflow-hidden bg-panel text-on-cherry md:items-center"
        style={reduce ? { clipPath: "inset(0 round 0px)" } : { clipPath }}
      >
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
          style={reduce ? undefined : { scale: imgScale }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgb(18_14_14/0.92)] to-[rgb(18_14_14/0.5)] md:bg-gradient-to-r md:from-[rgb(18_14_14/0.9)] md:via-[rgb(18_14_14/0.55)] md:to-[rgb(18_14_14/0.05)]" />
        <div className="wrap relative py-16">{children}</div>
      </motion.div>
    </section>
  );
}
