import { EnvelopeSimple, InstagramLogo, MapPin, Phone } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact | Cherries Diner",
  description: "Contact Cherries Diner at 115 Forbes Ave, Pittsburgh. Call 412-281-8182 or email cherriesdiner@gmail.com.",
  alternates: { canonical: "/contact-8/" },
};

const contacts = [
  { href: SITE.phoneHref, Icon: Phone, label: SITE.phone },
  { href: `mailto:${SITE.email}`, Icon: EnvelopeSimple, label: SITE.email },
  { href: SITE.instagramUrl, Icon: InstagramLogo, label: SITE.instagramHandle },
  { href: SITE.directionsUrl, Icon: MapPin, label: SITE.address },
];

export default function Contact() {
  return (
    <section className="wrap grid items-start gap-12 pt-[clamp(128px,15vw,200px)] pb-[clamp(96px,11vw,160px)] md:grid-cols-12">
      <div className="md:col-span-5">
        <SplitHeadline lines={[{ text: "We'd love to" }, { text: "hear from you.", accent: true }]} className="text-[clamp(2.8rem,5.2vw,5.4rem)]" />
        <Reveal delay={0.5}>
          <p className="mt-8 max-w-[44ch] text-[1.15rem] text-muted">
            Had a great meal, or something we could do better? Your feedback helps us serve you better every day.
          </p>
          <ul className="mt-10 grid gap-4">
            {contacts.map(({ href, Icon, label }) => (
              <li key={label}>
                <a href={href} className="inline-flex items-center gap-3 hover:text-cherry-text">
                  <Icon size={22} className="text-cherry-text" aria-hidden />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
      <Reveal delay={0.3} className="md:col-span-7">
        <ContactForm id="con" subject="Message from the website" submitLabel="Send message" />
      </Reveal>
    </section>
  );
}
