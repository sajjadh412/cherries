import { ArrowDown, ArrowRight } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import type { ReactNode } from "react";
import { Magnetic } from "./motion/Magnetic";
import { buttonClass, iconNudge, type ButtonVariant } from "./ui";

// Button-styled link. Internal routes use next/link; primary actions get the magnetic pull.
export function CTA({
  href,
  children,
  variant = "cherry",
  icon,
  magnetic = false,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: "right" | "down";
  magnetic?: boolean;
}) {
  const Icon = icon === "down" ? ArrowDown : ArrowRight;
  const nudge = icon === "down" ? iconNudge.replace("translate-x", "translate-y") : iconNudge;
  const inner = (
    <>
      {children}
      {icon && <Icon size={18} className={nudge} aria-hidden />}
    </>
  );
  const internal = href.startsWith("/");
  const link = internal ? (
    <Link href={href} className={buttonClass(variant)}>{inner}</Link>
  ) : (
    <a href={href} className={buttonClass(variant)}>{inner}</a>
  );
  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 border-b-2 border-current pb-0.5 font-semibold text-cherry-text"
    >
      {children}
      <ArrowRight size={16} className={iconNudge} aria-hidden />
    </Link>
  );
}
