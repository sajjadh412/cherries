import { Clock, InstagramLogo, MapPin, Phone } from "@phosphor-icons/react/ssr";
import { CTA, TextLink } from "@/components/CTA";
import { ExpandBand } from "@/components/motion/ExpandBand";
import { FavoritesStack, type Favorite } from "@/components/motion/FavoritesStack";
import { HeroHeadline } from "@/components/motion/HeroHeadline";
import { HeroMedia } from "@/components/motion/HeroMedia";
import { Marquee } from "@/components/motion/Marquee";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollText } from "@/components/motion/ScrollText";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { IMG, SITE, wix } from "@/data/site";

const favorites: Favorite[] = [
  {
    name: "Cherry Bomb Pancakes",
    desc: "Stuffed with cherries, blueberries or strawberries and topped with a generous pile of whipped cream.",
    price: "8.28",
    tone: "cherry",
    image: wix(IMG.pancakes, 900, 1000),
    imageAlt: "Stacks of pancakes on diner plates",
  },
  {
    name: "Early Bird Special",
    desc: "Two eggs, home fries, choice of meat, served with a pancake or toast.",
    price: "12.89",
    tone: "photo",
    image: wix(IMG.eggs, 1600, 1000),
    imageAlt: "Fresh eggs and breakfast ingredients",
  },
  {
    name: "Very Cherry French Toast",
    desc: "Stuffed with cream cheese, with your choice of strawberries, blueberries or cherries.",
    price: "8.80",
    tone: "soft",
  },
  {
    name: "Loaded Home Fries",
    desc: "Fresh-cut seasoned potatoes, peppers, onions, chopped meat and a handful of cheese.",
    price: "11.35",
    tone: "panel",
    badge: "New",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Cherries Diner",
  url: "https://www.cherriesdiner.com/",
  telephone: "+1-412-281-8182",
  email: SITE.email,
  servesCuisine: "American",
  priceRange: "$",
  image: wix(IMG.pancakes, 1200, 800),
  menu: "https://www.cherriesdiner.com/menu/",
  address: {
    "@type": "PostalAddress",
    streetAddress: "115 Forbes Ave",
    addressLocality: "Pittsburgh",
    addressRegion: "PA",
    postalCode: "15222",
    addressCountry: "US",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "14:00",
    },
  ],
  sameAs: [SITE.instagramUrl],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero: kinetic headline across the top, copy left, layered photos right */}
      <section className="wrap pt-[clamp(108px,12vw,136px)] pb-16 md:pb-24">
        <HeroHeadline className="text-[clamp(2.8rem,6.6vw,7rem)]" />
        <div className="mt-10 grid items-end gap-10 md:mt-12 md:grid-cols-12 md:gap-8">
          <Reveal delay={0.7} className="md:col-span-4 md:pb-4">
            <p className="max-w-[34ch] text-[1.2rem] text-muted">
              Big breakfasts and hearty lunches, cooked to order six days a week on Forbes Ave.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <CTA href="/menu/" icon="right" magnetic>See the menu</CTA>
              <CTA href={SITE.orderUrl} variant="ghost">Order online</CTA>
            </div>
          </Reveal>
          <div className="md:col-span-8">
            <HeroMedia
              main={wix(IMG.pancakes, 1600, 1000)}
              mainAlt="Pancakes, bacon, fried eggs and coffee on a diner table"
              inset={wix(IMG.storefront, 700, 525)}
              insetAlt="The Cherries Diner storefront on Forbes Ave"
            />
          </div>
        </div>
      </section>

      <Marquee items={["Pancakes", "Omelettes", "Hoagies", "Home fries", "Burgers", "French toast", "Gyros", "Waffles"]} />

      {/* Hours and location */}
      <section aria-label="Hours and location" className="wrap grid py-4 md:grid-cols-3">
        {[
          { Icon: Clock, title: "Mon-Sat, 8am-2pm", sub: "Closed Sunday" },
          { Icon: MapPin, title: SITE.street, sub: SITE.cityLine, href: SITE.directionsUrl },
          { Icon: Phone, title: "Call ahead", sub: SITE.phone, href: SITE.phoneHref },
        ].map(({ Icon, title, sub, href }, i) => (
          <Reveal key={title} delay={i * 0.08} className={`flex items-start gap-4 py-6 ${i ? "border-t border-line md:border-t-0 md:border-l md:pl-10" : ""}`}>
            <Icon size={26} className="mt-0.5 shrink-0 text-cherry-text" aria-hidden />
            <div>
              <strong className="block font-semibold">{title}</strong>
              {href ? <a href={href} className="text-muted hover:text-ink hover:underline">{sub}</a> : <span className="text-muted">{sub}</span>}
            </div>
          </Reveal>
        ))}
      </section>

      {/* Favorites: sticky card stack */}
      <section className="wrap pt-[clamp(96px,11vw,160px)] pb-[clamp(64px,8vw,120px)]">
        <SplitHeadline as="h2" onView lines={[{ text: "The house favorites" }]} className="text-[clamp(2.6rem,5.4vw,5.4rem)]" />
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-[48ch] text-[1.15rem] text-muted">Large portions for the hungry, and cherries on just about everything.</p>
        </Reveal>
        <div className="mt-12 md:mt-0">
          <FavoritesStack items={favorites} />
        </div>
        <Reveal className="mt-10">
          <TextLink href="/menu/">See the menu</TextLink>
        </Reveal>
      </section>

      {/* Story: scroll-lit statement over two drifting photos */}
      <section className="wrap py-[clamp(96px,11vw,160px)]">
        <ScrollText
          text="Our family opened its first diner in Market Square more than 16 years ago. Cherries carries the same idea to Forbes Ave: fresh food, big portions and a warm welcome."
          className="max-w-[24ch] font-display text-[clamp(2rem,4.4vw,4.4rem)] font-bold leading-[1.08] tracking-[-0.03em]"
        />
        <div className="mt-16 grid items-start gap-6 md:mt-24 md:grid-cols-12">
          <ParallaxImage
            src={wix(IMG.storefront, 1179, 880)}
            alt="The Cherries Diner storefront on Forbes Ave"
            className="md:col-span-7"
          />
          <div className="md:col-span-4 md:col-start-9 md:mt-40">
            <ParallaxImage src={wix(IMG.eggs, 800, 1000)} alt="Fresh eggs, flour and breakfast ingredients" aspect="aspect-[4/5]" speed={-10} />
            <Reveal className="mt-8">
              <p className="text-muted">Everything is made to order, with local produce and meats whenever we can get them.</p>
              <div className="mt-6">
                <TextLink href="/ourstory/">Read our story</TextLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Catering: band opens to full bleed */}
      <ExpandBand src={wix(IMG.spread, 2000, 1200)} alt="A spread of catered dishes on a bright table">
        <div className="max-w-[640px]">
          <span className="mb-5 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-[#ffb3aa]">Catering</span>
          <SplitHeadline as="h2" onView lines={[{ text: "Feeding the" }, { text: "whole office?" }]} className="text-[clamp(2.8rem,6vw,6rem)]" />
          <Reveal delay={0.3}>
            <p className="mt-6 mb-10 max-w-[44ch] text-[1.2rem] text-on-cherry/85">
              Build-your-own burger bars, omelette stations, and breakfast or lunch spreads sized for your group.
            </p>
            <CTA href="/catering/" variant="light" icon="right" magnetic>Plan your catering</CTA>
          </Reveal>
        </div>
      </ExpandBand>

      {/* Visit */}
      <section className="wrap grid gap-12 py-[clamp(96px,11vw,160px)] md:grid-cols-12">
        <div className="md:col-span-5">
          <SplitHeadline as="h2" onView lines={[{ text: "Come" }, { text: "hungry.", accent: true }]} className="text-[clamp(3.4rem,8vw,8rem)]" />
          <Reveal delay={0.2} className="mt-10">
            <dl className="grid max-w-[380px] gap-2 text-lg">
              <div className="flex justify-between gap-6"><dt className="font-semibold">Monday to Saturday</dt><dd className="text-muted">8am-2pm</dd></div>
              <div className="flex justify-between gap-6"><dt className="font-semibold">Sunday</dt><dd className="text-muted">Closed</dd></div>
            </dl>
            <ul className="mt-8 grid gap-4">
              <li><a href={SITE.directionsUrl} className="inline-flex items-center gap-3 hover:text-cherry-text"><MapPin size={22} className="text-cherry-text" aria-hidden />{SITE.address}</a></li>
              <li><a href={SITE.phoneHref} className="inline-flex items-center gap-3 hover:text-cherry-text"><Phone size={22} className="text-cherry-text" aria-hidden />{SITE.phone}</a></li>
              <li><a href={SITE.instagramUrl} className="inline-flex items-center gap-3 hover:text-cherry-text"><InstagramLogo size={22} className="text-cherry-text" aria-hidden />{SITE.instagramHandle}</a></li>
            </ul>
            <div className="mt-10">
              <CTA href={SITE.directionsUrl} icon="right" magnetic>Get directions</CTA>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="min-h-[440px] overflow-hidden rounded-card border border-line bg-surface md:col-span-7">
          <iframe
            title="Map showing Cherries Diner at 115 Forbes Ave"
            src={SITE.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-full min-h-[440px] w-full border-0"
          />
        </Reveal>
      </section>
    </>
  );
}
