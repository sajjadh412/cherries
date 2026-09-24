"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { useIsDesktop } from "./useIsDesktop";

export type Favorite = {
  name: string;
  desc: string;
  price: string;
  tone: "cherry" | "soft" | "panel" | "photo";
  image?: string;
  imageAlt?: string;
  badge?: string;
};

const tones = {
  cherry: "bg-cherry text-on-cherry",
  soft: "bg-cherry-soft text-ink",
  panel: "bg-panel text-on-panel",
  photo: "bg-panel text-on-cherry",
};

// Sticky stack: each dish pins near the top and the previous one shrinks back
// as the next slides over it, so the favorites are presented one at a time.
export function FavoritesStack({ items }: { items: Favorite[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const desktop = useIsDesktop();
  const animate = desktop && !reduce;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className="relative grid gap-4 md:block">
      {items.map((item, i) => (
        <Card
          key={item.name}
          item={item}
          index={i}
          progress={scrollYProgress}
          range={[i / items.length, 1]}
          targetScale={1 - (items.length - i) * 0.04}
          animate={animate}
        />
      ))}
    </div>
  );
}

function Card({
  item,
  index,
  progress,
  range,
  targetScale,
  animate,
}: {
  item: Favorite;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  animate: boolean;
}) {
  const scale = useTransform(progress, range, [1, targetScale]);
  const dim = useTransform(progress, range, [0, 0.35]);

  return (
    <div className="md:sticky md:top-0 md:flex md:h-[100dvh] md:items-center">
      <motion.article
        className={`relative flex w-full origin-top overflow-hidden rounded-card md:h-[68dvh] md:min-h-[440px] ${tones[item.tone]}`}
        style={animate ? { scale, top: `calc(${index * 28}px - 4dvh)` } : undefined}
      >
        {item.image && (
          <img
            src={item.image}
            alt={item.imageAlt ?? ""}
            loading="lazy"
            className={
              item.tone === "photo"
                ? "absolute inset-0 size-full object-cover"
                : "hidden w-[46%] object-cover md:block md:order-2"
            }
          />
        )}
        {item.tone === "photo" && (
          <div className="absolute inset-0 bg-gradient-to-t from-[rgb(18_14_14/0.9)] via-[rgb(18_14_14/0.35)] to-transparent md:bg-gradient-to-r md:from-[rgb(18_14_14/0.88)] md:via-[rgb(18_14_14/0.45)]" />
        )}

        <div className="relative flex min-h-[380px] flex-1 flex-col justify-between gap-10 p-7 sm:p-10 md:p-14">
          <div>
            {item.badge && (
              <span className="rounded-full bg-cherry px-3.5 py-1.5 text-sm font-semibold text-white">{item.badge}</span>
            )}
          </div>
          <div className="max-w-[560px]">
            <h3 className="text-[clamp(2.4rem,5vw,4.6rem)]">{item.name}</h3>
            <p className="mt-4 max-w-[44ch] text-lg opacity-85">{item.desc}</p>
            <p className="mt-8 font-display text-[clamp(2.2rem,3.4vw,3.2rem)] font-extrabold tracking-[-0.03em]">${item.price}</p>
          </div>
        </div>

        {animate && <motion.div className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: dim }} />}
      </motion.article>
    </div>
  );
}
