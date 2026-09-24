"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { MenuGroup } from "@/data/menu";

type Tab = { id: "breakfast" | "lunch"; label: string; groups: MenuGroup[]; combo?: { title: string; desc: string; price: string } };

// Breakfast/lunch switcher. The active pill slides between tabs (shared layout),
// and the panels cross-fade so the change of menu is obvious but calm.
export function MenuTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState<Tab["id"]>("breakfast");
  const reduce = useReducedMotion();
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const fromHash = tabs.find((t) => `#${t.id}` === window.location.hash);
    if (fromHash) setActive(fromHash.id);
  }, [tabs]);

  const select = (id: Tab["id"], focus = false) => {
    setActive(id);
    history.replaceState(null, "", `#${id}`);
    if (focus) refs.current[id]?.focus();
  };

  const onKey = (e: KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
    select(next.id, true);
  };

  const current = tabs.find((t) => t.id === active)!;

  return (
    <>
      <div className="wrap">
        <div role="tablist" aria-label="Menu" className="mt-10 inline-flex gap-1 rounded-full border border-line bg-surface p-1.5 max-sm:flex max-sm:w-full">
          {tabs.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[t.id] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-controls={`panel-${t.id}`}
              aria-selected={active === t.id}
              tabIndex={active === t.id ? 0 : -1}
              onClick={() => select(t.id)}
              onKeyDown={(e) => onKey(e, i)}
              className="relative cursor-pointer rounded-full px-8 py-4 font-semibold leading-none text-muted transition-colors duration-300 hover:text-ink aria-selected:text-white max-sm:flex-1"
            >
              {active === t.id && (
                <motion.span
                  layoutId="menu-tab-pill"
                  className="absolute inset-0 rounded-full bg-cherry"
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current.id}
          role="tabpanel"
          id={`panel-${current.id}`}
          aria-labelledby={`tab-${current.id}`}
          className="wrap pt-6 pb-[clamp(96px,11vw,160px)]"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -12 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {current.combo && (
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 rounded-card bg-cherry p-7 text-on-cherry sm:p-10">
              <div>
                <h2 className="text-[clamp(1.8rem,2.8vw,2.6rem)]">{current.combo.title}</h2>
                <p className="mt-1 text-on-cherry/90">{current.combo.desc}</p>
              </div>
              <span className="font-display text-[clamp(2.4rem,3.4vw,3.2rem)] font-extrabold sm:ml-auto">${current.combo.price}</span>
            </div>
          )}
          {current.groups.map((group) => (
            <MenuSection key={group.title} group={group} reduce={!!reduce} />
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function MenuSection({ group, reduce }: { group: MenuGroup; reduce: boolean }) {
  const item = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
  };
  return (
    <section className="grid gap-6 border-line py-12 lg:grid-cols-[320px_1fr] lg:gap-20 lg:py-20 [&+&]:border-t">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <h2 className="text-[clamp(2rem,3.2vw,3rem)]">{group.title}</h2>
        {group.note && <p className="mt-3 text-muted">{group.note}</p>}
      </div>

      <motion.ul
        className={
          group.style === "chips"
            ? "grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2.5"
            : "grid gap-x-14 gap-y-7 sm:grid-cols-2 sm:gap-y-10"
        }
        initial={reduce ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        transition={{ staggerChildren: 0.04 }}
      >
        {group.items.map((it) =>
          group.style === "chips" ? (
            <motion.li
              key={it.name}
              variants={item}
              className="flex justify-between gap-3 rounded-input border border-line bg-surface px-5 py-4 transition-colors hover:border-cherry"
            >
              <span>{it.name}</span>
              <span className="font-semibold tabular-nums text-cherry-text">${it.price}</span>
            </motion.li>
          ) : (
            <motion.li key={it.name} variants={item} className="group">
              <div className="flex items-baseline gap-3">
                <span className="text-[1.15rem] font-semibold transition-colors group-hover:text-cherry-text">{it.name}</span>
                {it.isNew && <span className="rounded-full bg-cherry px-2.5 py-0.5 text-xs font-semibold text-white">New</span>}
                <span className="mx-1 flex-1 translate-y-[-4px] border-b border-dashed border-line" aria-hidden />
                <span className="font-display text-lg font-bold tabular-nums text-cherry-text">${it.price}</span>
              </div>
              {it.desc && <p className="mt-1.5 max-w-[48ch] text-muted">{it.desc}</p>}
            </motion.li>
          ),
        )}
      </motion.ul>
    </section>
  );
}
