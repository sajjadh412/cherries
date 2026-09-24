import { EggCrack, Hamburger } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { CTA } from "@/components/CTA";
import { PageHeader } from "@/components/PageHeader";
import { ExpandBand } from "@/components/motion/ExpandBand";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { IMG, SITE, wix } from "@/data/site";

export const metadata: Metadata = {
  title: "Catering | Cherries Diner",
  description:
    "Catering from Cherries Diner in downtown Pittsburgh: build-your-own burger bars, omelette stations, and breakfast or lunch for any event.",
  alternates: { canonical: "/catering/" },
};

export default function Catering() {
  return (
    <>
      <PageHeader
        lines={[{ text: "Let us cater" }, { text: "your next event.", accent: true }]}
        lede="Business meetings, family gatherings and special occasions. Breakfast or lunch, with vegetarian and gluten-free choices."
      />

      <ExpandBand src={wix(IMG.spread, 2000, 1200)} alt="A spread of catered dishes on a bright table">
        <div className="max-w-[620px]">
          <SplitHeadline as="h2" onView lines={[{ text: "Fresh food for" }, { text: "any size group." }]} className="text-[clamp(2.6rem,5.4vw,5.4rem)]" />
          <Reveal delay={0.3}>
            <p className="mt-6 mb-10 text-[1.2rem] text-on-cherry/85">Menus built around your event, your guests and your budget.</p>
            <CTA href="#quote" variant="light" icon="down" magnetic>Request a quote</CTA>
          </Reveal>
        </div>
      </ExpandBand>

      <section className="wrap py-[clamp(96px,11vw,160px)]">
        <div className="grid gap-4 md:grid-cols-12">
          <Reveal className="flex min-h-[380px] flex-col justify-between gap-10 rounded-card bg-panel p-8 text-on-panel sm:p-12 md:col-span-5 md:mt-24">
            <EggCrack size={48} aria-hidden />
            <div>
              <h3 className="mb-4 text-[clamp(2rem,3.2vw,3rem)]">Make-your-own omelette station</h3>
              <p className="text-lg text-on-panel/75">Cooked to order for breakfast events, with all the fillings from our kitchen.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="flex min-h-[380px] flex-col justify-between gap-10 rounded-card bg-cherry p-8 text-on-cherry sm:p-12 md:col-span-7">
            <Hamburger size={48} aria-hidden />
            <div>
              <h3 className="mb-4 text-[clamp(2rem,3.2vw,3rem)]">Build-your-own burger bar</h3>
              <p className="max-w-[40ch] text-lg text-on-cherry/90">A customer favorite. Guests pick their toppings and sauces for the perfect burger.</p>
            </div>
          </Reveal>
        </div>
        <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-20">
          <Reveal>
            <h3 className="mb-3 text-[1.6rem] tracking-[-0.02em]">Fresh and local</h3>
            <p className="text-muted">Locally sourced produce and meats, with homemade sauces and dressings that make the meal.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="mb-3 text-[1.6rem] tracking-[-0.02em]">Flexible and affordable</h3>
            <p className="text-muted">Every event is different. Tell us what you need and we will build a menu that fits it and your budget.</p>
          </Reveal>
        </div>
      </section>

      <section id="quote" className="wrap grid items-start gap-10 pb-[clamp(96px,11vw,160px)] md:grid-cols-12">
        <div className="md:col-span-5">
          <SplitHeadline as="h2" onView lines={[{ text: "Request a quote" }]} className="text-[clamp(2.6rem,4.6vw,4.6rem)]" />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-[40ch] text-muted">
              Tell us about your event and we will get back to you shortly. Prefer the phone? Call{" "}
              <a href={SITE.phoneHref} className="text-ink underline">{SITE.phone}</a>.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="md:col-span-7">
          <ContactForm id="cat" subject="Catering request" submitLabel="Request a quote" withDetails />
        </Reveal>
      </section>
    </>
  );
}
