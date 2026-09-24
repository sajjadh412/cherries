import type { Metadata } from "next";
import { MenuTabs } from "@/components/MenuTabs";
import { PageHeader } from "@/components/PageHeader";
import { breakfast, lunch, lunchCombo } from "@/data/menu";

export const metadata: Metadata = {
  title: "Menu | Cherries Diner",
  description:
    "Breakfast and lunch menu at Cherries Diner in downtown Pittsburgh: pancakes, omelettes, hoagies, burgers, salads and more.",
  alternates: { canonical: "/menu/" },
};

export default function MenuPage() {
  return (
    <>
      <PageHeader lines={[{ text: "Our menu" }]} lede="Everything is cooked to order. Served Monday to Saturday, 8am to 2pm." />
      <MenuTabs
        tabs={[
          { id: "breakfast", label: "Breakfast", groups: breakfast },
          { id: "lunch", label: "Lunch", groups: lunch, combo: lunchCombo },
        ]}
      />
    </>
  );
}
