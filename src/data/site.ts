// Photos still live in the Wix media library. Copy them into /public before cancelling Wix.
export const wix = (id: string, w: number, h: number) =>
  `https://static.wixstatic.com/media/${id}/v1/fill/w_${w},h_${h},al_c,q_80,enc_auto/${id}`;

export const IMG = {
  logo: "e80368_c2189817b240405f981f016efbff2e80~mv2.png",
  pancakes: "e80368_54b2b5d8428e480ba7b8e4d1c221428d~mv2.jpeg",
  eggs: "e80368_6f4561a7e91d42c69083df7c9e4f169d~mv2.jpg",
  storefront: "e80368_2a87baecd387489f98c9df68712063fb~mv2.jpg",
  spread: "c837a6_b39fee213349476083359dfcece65f32~mv2.jpg",
};

export const SITE = {
  name: "Cherries Diner",
  orderUrl: "https://cash.app/$cherriesdiner",
  instagramUrl: "https://www.instagram.com/cherriesdiner.pgh/",
  instagramHandle: "@cherriesdiner.pgh",
  phone: "412-281-8182",
  phoneHref: "tel:+14122818182",
  email: "cherriesdiner@gmail.com",
  street: "115 Forbes Ave",
  cityLine: "Pittsburgh, PA 15222",
  address: "115 Forbes Ave, Pittsburgh, PA 15222",
  hours: "Mon-Sat 8am-2pm",
  directionsUrl:
    "https://www.google.com/maps/search/?api=1&query=Cherries+Diner+115+Forbes+Ave+Pittsburgh+PA+15222",
  mapEmbedUrl: "https://www.google.com/maps?q=115+Forbes+Ave,+Pittsburgh,+PA+15222&output=embed",
};

export const NAV = [
  { href: "/menu/", label: "Menu" },
  { href: "/ourstory/", label: "Our Story" },
  { href: "/catering/", label: "Catering" },
  { href: "/contact-8/", label: "Contact" },
];
