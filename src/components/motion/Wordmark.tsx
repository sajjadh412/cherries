"use client";

import { motion, useReducedMotion } from "motion/react";

// Footer sign-off: the name rises letter by letter as the page ends.
export function Wordmark({ text }: { text: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.p
      aria-hidden
      className="flex select-none justify-between overflow-x-visible overflow-y-clip font-display text-[clamp(4.5rem,20vw,20rem)] font-extrabold leading-[0.8] tracking-normal text-cherry"
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: 0.05 }}
    >
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block pb-[0.06em]"
          variants={{
            hidden: { y: "100%" },
            show: { y: "0%", transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
          }}
        >
          {ch}
        </motion.span>
      ))}
    </motion.p>
  );
}
