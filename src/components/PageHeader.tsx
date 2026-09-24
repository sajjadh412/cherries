import { Reveal } from "./motion/Reveal";
import { SplitHeadline } from "./motion/SplitHeadline";

export function PageHeader({ lines, lede }: { lines: { text: string; accent?: boolean }[]; lede: string }) {
  return (
    <section className="wrap pt-[clamp(128px,15vw,200px)] pb-[clamp(40px,5vw,72px)]">
      <SplitHeadline lines={lines} className="text-[clamp(3rem,7vw,7.2rem)]" />
      <Reveal delay={0.5}>
        <p className="mt-8 max-w-[52ch] text-[1.2rem] text-muted">{lede}</p>
      </Reveal>
    </section>
  );
}
