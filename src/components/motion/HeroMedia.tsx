"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

// Hero photos: the main image unveils with a clip-path wipe, then both drift at
// different speeds on scroll so the pair reads as layered depth.
export function HeroMedia({
  main,
  mainAlt,
  inset,
  insetAlt,
}: {
  main: string;
  mainAlt: string;
  inset: string;
  insetAlt: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mainY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const insetY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  return (
    <div ref={ref} className="relative">
      <motion.div
        className="relative h-[clamp(300px,52dvh,560px)] overflow-hidden rounded-card shadow-lift"
        initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0% round 28px)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0% round 28px)" }}
        transition={{ duration: 1.4, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.img
          src={main}
          alt={mainAlt}
          fetchPriority="high"
          className="absolute inset-0 h-[118%] w-full object-cover"
          style={reduce ? undefined : { y: mainY }}
          initial={reduce ? false : { scale: 1.25 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>

      <motion.div
        className="absolute -bottom-10 -left-6 hidden w-[34%] overflow-hidden rounded-card border-[6px] border-page shadow-lift lg:block"
        style={reduce ? undefined : { y: insetY }}
        initial={reduce ? false : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <img src={inset} alt={insetAlt} className="aspect-[4/3] w-full object-cover" />
      </motion.div>
    </div>
  );
}
