"use client";

import { motion, useReducedMotion } from "motion/react";

type Line = { text: string; accent?: boolean };

// Kinetic headline: every word rises out of its own mask, line by line.
// `onView` waits until the headline scrolls into view; otherwise it plays on load (heroes).
export function SplitHeadline({
  lines,
  as: Tag = "h1",
  className,
  onView = false,
  delay = 0.1,
}: {
  lines: Line[];
  as?: "h1" | "h2";
  className?: string;
  onView?: boolean;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const MotionTag = Tag === "h1" ? motion.h1 : motion.h2;

  const trigger = onView
    ? { whileInView: "show", viewport: { once: true, amount: 0.5 } }
    : { animate: "show" };

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : "hidden"}
      {...trigger}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
    >
      {lines.map((line, li) => (
        <span key={li} className={`block ${line.accent ? "text-cherry-text" : ""}`}>
          {line.text.split(" ").map((word, wi, words) => {
            return (
              <span key={wi} className="inline-block overflow-hidden pb-[0.24em] -mb-[0.16em] align-bottom">
                <motion.span
                  className="inline-block"
                  variants={{
                    hidden: { y: "110%", rotate: 4 },
                    show: { y: "0%", rotate: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  {word}
                </motion.span>
                {wi < words.length - 1 ? "\u00a0" : ""}
              </span>
            );
          })}
        </span>
      ))}
    </MotionTag>
  );
}
