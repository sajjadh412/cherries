# Cherries Diner website

Redesign of cherriesdiner.com, built with Next.js (App Router), Tailwind CSS v4 and Motion.

## Getting started
You need Node.js 20 or newer.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```

The site is exported as plain static files (`out/`), so it can be hosted on Netlify, Vercel, GitHub Pages or any static host.

## Where things live
| Path | What it is |
| --- | --- |
| `src/app/` | One folder per page. URLs match the current site (`/menu/`, `/ourstory/`, `/catering/`, `/contact-8/`) |
| `src/data/menu.ts` | Every menu item and price. Edit this file to update the menu |
| `src/data/site.ts` | Phone, email, address, hours, order link and photo IDs |
| `src/components/motion/` | Animation pieces: kinetic headlines, hero reveal, marquee, sticky favorites stack, scroll-lit text, parallax photos, expanding catering band |
| `src/components/` | Nav, footer, buttons, menu tabs and the contact form |
| `src/app/globals.css` | Color tokens (light and dark) and theme settings |

All animations turn off for visitors who have "reduce motion" enabled on their device.

## Before launch
- Photos are loaded from the existing Wix media library (`static.wixstatic.com`). Copy them into `public/` before cancelling Wix.
- The catering and contact forms open the visitor's email app, addressed to cherriesdiner@gmail.com. To receive submissions directly, connect a form service such as Formspree or Netlify Forms in `src/components/ContactForm.tsx`.
- "Order online" links to the same Cash App page the current site uses (`SITE.orderUrl` in `src/data/site.ts`).
