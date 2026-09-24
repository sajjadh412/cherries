"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

// Photo that slowly zooms out and drifts while it crosses the viewport, adding depth
// without moving the layout. `speed` sets the drift; negative values move against the scroll.
export function ParallaxImage({
  src,
  alt,
  className,
  aspect = "aspect-[4/3]",
  speed = 12,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  aspect?: string;
  speed?: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.28, 1.04]);
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed}%`, `${speed}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden rounded-card ${aspect} ${className ?? ""}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        className="absolute inset-0 size-full object-cover"
        style={reduce ? undefined : { scale, y }}
      />
    </div>
  );
}
