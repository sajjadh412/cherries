import { InstagramLogo } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { NAV, SITE } from "@/data/site";
import { Wordmark } from "./motion/Wordmark";

export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-line bg-surface pt-16">
      <div className="wrap">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
          <p className="max-w-[26ch] font-display text-[clamp(1.6rem,2.4vw,2.2rem)] font-bold leading-tight tracking-[-0.02em]">
            Family-owned breakfast and lunch in downtown Pittsburgh.
          </p>
          <div>
            <h2 className="mb-4 font-sans text-sm font-semibold tracking-normal text-muted">Visit</h2>
            <ul className="grid gap-2">
              <li>{SITE.street}</li>
              <li>{SITE.cityLine}</li>
              <li>{SITE.hours}, Sunday closed</li>
              <li>
                <a href={SITE.phoneHref} className="hover:text-cherry-text">{SITE.phone}</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 font-sans text-sm font-semibold tracking-normal text-muted">Explore</h2>
            <ul className="grid gap-2">
              {NAV.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-cherry-text">{label}</Link>
                </li>
              ))}
              <li>
                <a href={SITE.instagramUrl} className="inline-flex items-center gap-2 hover:text-cherry-text">
                  <InstagramLogo size={18} aria-hidden /> Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-14 text-sm text-muted">&copy; {new Date().getFullYear()} Cherries Diner</p>
        <div className="mt-8 -mb-[0.12em]">
          <Wordmark text="Cherries" />
        </div>
      </div>
    </footer>
  );
}
