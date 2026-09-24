"use client";

import { motion, useAnimate, useReducedMotion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Home hero headline, a small story in two beats:
// 1. "smile" first appears as a smiley, then melts into the word.
// 2. A cherry hops along "cherry on", drops into the gap in "top", rolls to a stop
//    and becomes the letter o. It literally puts the cherry on top.
// Under reduced motion the headline renders as plain text.
export function HeroHeadline({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [scope, animate] = useAnimate();
  const line2 = useRef<HTMLSpanElement>(null);
  const cherryWord = useRef<HTMLSpanElement>(null);
  const onWord = useRef<HTMLSpanElement>(null);
  const tLetter = useRef<HTMLSpanElement>(null);
  const oLetter = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduce) return;
    let cancelled = false;

    (async () => {
      await document.fonts.ready;

      // Beat 1: the smiley holds for a moment after the first line rises, then turns into "smile".
      await sleep(1800);
      if (cancelled) return;
      animate("[data-smiley]", { opacity: 0, scale: 0.4, rotate: -25 }, { duration: 0.5, ease: EASE });
      animate("[data-smile-word]", { opacity: [0, 1], filter: ["blur(10px)", "blur(0px)"], y: ["0.15em", "0em"] }, { duration: 0.7, delay: 0.1, ease: EASE });

      // Beat 2: send the cherry across the second line.
      await sleep(300);
      if (cancelled || !line2.current || !cherryWord.current || !onWord.current || !tLetter.current || !oLetter.current) return;

      // Layout offsets ignore the words' rise transforms, so this is where each letter will rest.
      const root = line2.current;
      const rel = (el: HTMLElement) => {
        let left = 0;
        let top = 0;
        let node: HTMLElement | null = el;
        while (node && node !== root) {
          left += node.offsetLeft;
          top += node.offsetTop;
          node = node.offsetParent as HTMLElement | null;
        }
        return { left, top, width: el.offsetWidth, height: el.offsetHeight };
      };
      const cw = rel(cherryWord.current);
      const on = rel(onWord.current);
      const t = rel(tLetter.current);
      const o = rel(oLetter.current);

      const size = o.width * 0.86;
      const fontPx = parseFloat(getComputedStyle(line2.current).fontSize);
      const ground = cw.top + fontPx * 0.1 - size; // resting on the tops of the letters
      const oX = o.left + (o.width - size) / 2;
      const oY = o.top + o.height * 0.52 - size / 2; // centred on the x-height, where the o sits
      const hop = fontPx * 0.32;

      const cx = (b: { left: number; width: number }) => b.left + b.width / 2 - size / 2;
      const xs = [cw.left - size, cx(cw), (cx(cw) + cx(on)) / 2, cx(on), (cx(on) + cx(t)) / 2, cx(t), (cx(t) + oX) / 2, oX, oX];
      const ys = [ground - hop * 1.2, ground, ground - hop, ground, ground - hop * 0.7, ground, ground - hop * 0.45, oY, oY];
      const times = [0, 0.15, 0.25, 0.37, 0.47, 0.59, 0.68, 0.84, 1];
      const duration = 2.2;

      const cherry = "[data-cherry]";
      animate(cherry, { width: size, height: size }, { duration: 0 });
      animate(cherry, { opacity: [0, 1] }, { duration: 0.25 });
      animate(cherry, { x: xs }, { duration, times, ease: "linear" });
      animate(cherry, { rotate: [0, 80, 150, 230, 300, 380, 450, 610, 720] }, { duration, times, ease: "linear" });
      // Squash on each landing, stretch in the air.
      animate(
        cherry,
        { scaleY: [1.08, 0.78, 1.06, 0.8, 1.04, 0.84, 1.02, 0.9, 1], scaleX: [0.94, 1.2, 0.96, 1.18, 0.97, 1.14, 0.99, 1.08, 1] },
        { duration, times, ease: "easeInOut" },
      );
      await animate(cherry, { y: ys }, {
        duration,
        times,
        // Gravity: accelerate into each landing, decelerate out of it.
        ease: ["easeIn", "easeOut", "easeIn", "easeOut", "easeIn", "easeOut", "easeIn", "easeOut"],
      });
      if (cancelled) return;

      // The cherry becomes the o.
      animate(cherry, { opacity: 0, scale: 0.7 }, { duration: 0.45, ease: EASE });
      animate(oLetter.current, { opacity: [0, 1], scale: [0.6, 1] }, { duration: 0.6, ease: EASE });
    })();

    return () => {
      cancelled = true;
    };
  }, [animate, reduce]);

  if (reduce) {
    return (
      <h1 className={className}>
        <span className="block">Served with a smile</span>
        <span className="block text-cherry-text">&amp; a cherry on top</span>
      </h1>
    );
  }

  return (
    <motion.h1
      ref={scope}
      className={className}
      aria-label="Served with a smile & a cherry on top"
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.07, delayChildren: 0.1 }}
    >
      <span className="block" aria-hidden>
        <Word>Served</Word> <Word>with</Word> <Word>a</Word>{" "}
        <Word>
          <span className="relative inline-block">
            <span data-smile-word className="inline-block opacity-0">smile</span>
            <span data-smiley className="absolute inset-0 flex items-center justify-center text-[0.85em] leading-none">
              {"\u{1F60A}"}
            </span>
          </span>
        </Word>
      </span>

      <span ref={line2} className="relative mt-[0.28em] block text-cherry-text" aria-hidden>
        <Word>&amp;</Word> <Word>a</Word>{" "}
        <Word innerRef={cherryWord}>cherry</Word> <Word innerRef={onWord}>on</Word>{" "}
        <Word>
          <span ref={tLetter}>t</span>
          <span ref={oLetter} className="inline-block origin-center opacity-0">o</span>
          p
        </Word>
        <span
          data-cherry
          className="pointer-events-none absolute top-0 left-0 opacity-0"
          style={{ width: "0.5em", height: "0.5em" }}
        >
          <Cherry />
        </span>
      </span>
    </motion.h1>
  );
}

function Word({ children, innerRef }: { children: ReactNode; innerRef?: React.Ref<HTMLSpanElement> }) {
  return (
    <span ref={innerRef} className="inline-block overflow-hidden pb-[0.24em] -mb-[0.16em] align-bottom">
      <motion.span
        className="inline-block"
        variants={{
          hidden: { y: "110%", rotate: 4 },
          show: { y: "0%", rotate: 0, transition: { duration: 1, ease: EASE } },
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// A single round cherry built from CSS shapes: glossy body, stem and leaf.
// The stem makes the roll readable; the round body is what turns into the o.
function Cherry() {
  return (
    <span className="relative block size-full">
      <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_30%,#ff6a5c_0%,#d8261c_38%,#8e120c_100%)] shadow-[0_0.06em_0.12em_rgb(90_10_6/0.35)]" />
      <span className="absolute top-[-38%] left-[46%] h-[48%] w-[9%] origin-bottom rotate-[18deg] rounded-full bg-[#4a6b2a]" />
      <span className="absolute top-[-40%] left-[56%] h-[22%] w-[38%] origin-left -rotate-[20deg] rounded-[100%_0] bg-[#5f8a34]" />
    </span>
  );
}
