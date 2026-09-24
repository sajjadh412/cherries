export type ButtonVariant = "cherry" | "ghost" | "light";

const variants: Record<ButtonVariant, string> = {
  cherry: "border-transparent bg-cherry text-white hover:bg-cherry-hover",
  ghost: "border-ink text-ink hover:bg-ink hover:text-page",
  light: "border-transparent bg-on-cherry text-[#1b1818] hover:bg-white",
};

export function buttonClass(variant: ButtonVariant = "cherry", size: "md" | "sm" = "md") {
  return [
    "group inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border-2 font-semibold leading-none",
    "cursor-pointer transition-[background-color,color,border-color] duration-300 active:scale-[0.98]",
    size === "md" ? "px-7 py-[18px] text-base" : "px-5 py-3 text-[0.95rem]",
    variants[variant],
  ].join(" ");
}

export const iconNudge = "transition-transform duration-300 ease-out-expo group-hover:translate-x-[3px]";
