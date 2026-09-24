"use client";

import { List, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IMG, NAV, SITE, wix } from "@/data/site";
import { buttonClass } from "./ui";

// Sticky nav that tucks away while reading down and returns on the way up,
// so photography gets the full screen. The mobile menu is a full-screen sheet.
export function Nav() {
  const path = usePathname();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240 && !open);
    setSolid(y > 12);
  });

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isCurrent = (href: string) => path === href || path === href.replace(/\/$/, "");

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color] duration-300 ${
          solid || open ? "border-b border-line bg-page/85 backdrop-blur-xl backdrop-saturate-150" : "border-b border-transparent"
        }`}
        animate={{ y: hidden && !reduce ? "-100%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="wrap flex h-[76px] items-center gap-8">
          <Link href="/" className="shrink-0" aria-label="Cherries Diner home">
            <img src={wix(IMG.logo, 128, 128)} width={64} height={64} alt="" className="size-16" />
          </Link>
          <nav aria-label="Main" className="ml-auto hidden items-center gap-9 md:flex">
            {NAV.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                aria-current={isCurrent(href) ? "page" : undefined}
                className="group relative py-2 font-medium text-muted transition-colors hover:text-ink aria-[current=page]:text-ink"
              >
                {label}
                <span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-cherry transition-transform duration-500 ease-out-expo group-hover:scale-x-100 group-aria-[current=page]:scale-x-100" />
              </Link>
            ))}
          </nav>
          <div className="hidden md:block">
            <a href={SITE.orderUrl} className={buttonClass("cherry", "sm")}>
              Order online
            </a>
          </div>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="ml-auto inline-flex size-12 items-center justify-center rounded-full border border-line bg-surface md:hidden"
          >
            {open ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[50] flex flex-col bg-page px-4 pt-[100px] pb-10 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduce ? 0 : 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute top-3.5 right-4 inline-flex size-12 items-center justify-center rounded-full border border-line bg-surface"
            >
              <X size={22} />
            </button>
            <nav aria-label="Mobile" className="flex flex-col">
              {[{ href: "/", label: "Home" }, ...NAV].map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={reduce ? false : { y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={href}
                    aria-current={isCurrent(href) ? "page" : undefined}
                    className="block border-b border-line py-4 font-display text-[2.6rem] font-extrabold tracking-[-0.03em] aria-[current=page]:text-cherry-text"
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <a href={SITE.orderUrl} className={`${buttonClass()} mt-auto justify-center`}>
              Order online
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
