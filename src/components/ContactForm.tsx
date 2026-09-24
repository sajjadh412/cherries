"use client";

// No backend yet: on submit this validates, then opens the visitor's email app
// addressed to the diner. Swap in Formspree or Netlify Forms to receive submissions directly.
import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { SITE } from "@/data/site";
import { buttonClass } from "./ui";

type Errors = Partial<Record<"first" | "email" | "message", string>>;

const input =
  "w-full rounded-input border-[1.5px] border-ink/25 bg-page px-4 py-3.5 text-base text-ink transition-[border-color,box-shadow] duration-200 focus:border-cherry focus:shadow-[0_0_0_4px_rgb(200_35_26/0.2)] focus:outline-none aria-[invalid=true]:border-cherry";
const label = "text-[0.95rem] font-semibold";

export function ContactForm({
  id,
  subject,
  submitLabel,
  withDetails = false,
}: {
  id: string;
  subject: string;
  submitLabel: string;
  withDetails?: boolean;
}) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const next: Errors = {};
    if (!get("first_name")) next.first = "Please fill this in.";
    if (!get("email")) next.email = "Please fill this in.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get("email"))) next.email = "Please enter a valid email address.";
    if (!get("message")) next.message = "Please fill this in.";
    setErrors(next);

    const firstBad = (["first", "email", "message"] as const).find((k) => next[k]);
    if (firstBad) {
      setStatus({ ok: false, text: "A few fields need attention." });
      form.querySelector<HTMLElement>(`#${id}-${firstBad}`)?.focus();
      return;
    }

    const name = `${get("first_name")} ${get("last_name")}`.trim();
    const body = `${get("message")}\n\n${name}\n${get("email")}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(get("subject") || subject)}&body=${encodeURIComponent(body)}`;
    setStatus({ ok: true, text: "Your email app should open with the message ready to send." });
  };

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="grid items-start gap-5 rounded-card border border-line bg-surface p-6 sm:grid-cols-2 sm:p-10"
    >
      <div className="grid gap-2">
        <label htmlFor={`${id}-first`} className={label}>First name</label>
        <input id={`${id}-first`} name="first_name" autoComplete="given-name" aria-invalid={!!errors.first} aria-describedby={`${id}-first-error`} className={input} />
        <FieldError id={`${id}-first-error`} message={errors.first} />
      </div>
      <div className="grid gap-2">
        <label htmlFor={`${id}-last`} className={label}>Last name</label>
        <input id={`${id}-last`} name="last_name" autoComplete="family-name" className={input} />
      </div>
      <div className="grid gap-2 sm:col-span-2">
        <label htmlFor={`${id}-email`} className={label}>Email</label>
        <input id={`${id}-email`} name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={`${id}-email-error`} className={input} />
        <FieldError id={`${id}-email-error`} message={errors.email} />
      </div>
      {withDetails && (
        <div className="grid gap-2 sm:col-span-2">
          <label htmlFor={`${id}-subject`} className={label}>Event details</label>
          <input id={`${id}-subject`} name="subject" aria-describedby={`${id}-subject-help`} className={input} />
          <span id={`${id}-subject-help`} className="text-sm text-muted">Date, group size, or breakfast vs. lunch.</span>
        </div>
      )}
      <div className="grid gap-2 sm:col-span-2">
        <label htmlFor={`${id}-message`} className={label}>Message</label>
        <textarea id={`${id}-message`} name="message" aria-invalid={!!errors.message} aria-describedby={`${id}-message-error`} className={`${input} min-h-[160px] resize-y`} />
        <FieldError id={`${id}-message-error`} message={errors.message} />
      </div>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" className={buttonClass()}>{submitLabel}</button>
        <p role="status" className={status?.ok ? "font-medium text-ink" : "text-muted"}>{status?.text}</p>
      </div>
    </form>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <span id={id} className="text-sm font-medium text-cherry-text empty:hidden">
      <AnimatePresence>
        {message && (
          <motion.span className="block" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {message}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
