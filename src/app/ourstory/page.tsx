import { CookingPot, Plant } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { PageHeader } from "@/components/PageHeader";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollText } from "@/components/motion/ScrollText";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { IMG, SITE, wix } from "@/data/site";

export const metadata: Metadata = {
  title: "Our Story | Cherries Diner",
  description:
    "Cherries Diner is a family-owned American diner in downtown Pittsburgh, serving fresh breakfast and lunch for more than 16 years.",
  alternates: { canonical: "/ourstory/" },
};

export default function OurStory() {
  return (
    <>
      <PageHeader lines={[{ text: "Our story" }]} lede="A family-owned American diner in the heart of Pittsburgh." />

      <section className="wrap">
        <ParallaxImage
          src={wix(IMG.storefront, 1600, 900)}
          alt="The Cherries Diner storefront on Forbes Ave"
          aspect="aspect-[4/3] md:aspect-[16/8]"
          speed={8}
          priority
        />
      </section>

      <section className="wrap py-[clamp(96px,11vw,160px)]">
        <ScrollText
          text="Our passion for food started more than 16 years ago, when our family opened its first diner in Market Square. Today Cherries serves fresh breakfast and lunch at 115 Forbes Ave, six days a week."
          className="max-w-[26ch] font-display text-[clamp(2rem,4.4vw,4.4rem)] font-bold leading-[1.08] tracking-[-0.03em]"
        />
      </section>

      <section className="wrap grid gap-4 pb-[clamp(96px,11vw,160px)] md:grid-cols-12">
        <Reveal className="flex min-h-[360px] flex-col justify-between gap-10 rounded-card bg-cherry p-8 text-on-cherry sm:p-12 md:col-span-7">
          <CookingPot size={48} aria-hidden />
          <div>
            <h3 className="mb-4 text-[clamp(2rem,3.4vw,3.2rem)]">American classics</h3>
            <p className="max-w-[40ch] text-lg text-on-cherry/90">Pancakes, omelettes, burgers, sandwiches, salads and more, all made to order.</p>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="flex min-h-[360px] flex-col justify-between gap-10 rounded-card bg-panel p-8 text-on-panel sm:p-12 md:col-span-5 md:mt-24">
          <Plant size={48} aria-hidden />
          <div>
            <h3 className="mb-4 text-[clamp(2rem,3.4vw,3.2rem)]">Local when we can</h3>
            <p className="max-w-[40ch] text-lg text-on-panel/75">Fresh, locally sourced produce and meats whenever possible, plus homemade sauces and dressings.</p>
          </div>
        </Reveal>
      </section>

      <section className="wrap grid items-center gap-10 pb-[clamp(96px,11vw,160px)] md:grid-cols-12">
        <div className="md:col-span-5">
          <SplitHeadline as="h2" onView lines={[{ text: "Hungry already?" }]} className="text-[clamp(2.6rem,5vw,5rem)]" />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-[40ch] text-[1.15rem] text-muted">Order your favorites online and pick them up on your way through downtown.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <CTA href={SITE.orderUrl} icon="right" magnetic>Order online</CTA>
              <CTA href="/menu/" variant="ghost">See the menu</CTA>
            </div>
          </Reveal>
        </div>
        <ParallaxImage src={wix(IMG.eggs, 1200, 900)} alt="Fresh eggs, flour and breakfast ingredients" className="md:col-span-6 md:col-start-7" />
      </section>
    </>
  );
}
