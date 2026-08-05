"use client";

import { useState } from "react";
import { useT } from "@/i18n/LocaleProvider";

const CONTACT_EMAIL = "nosiadek.michal@gmail.com";
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

type Status = "idle" | "sending" | "sent" | "error";

export default function NewsletterForm() {
  const t = useT();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const subject = t("site.newsletterForm.signupSubject");

    if (!WEB3FORMS_ACCESS_KEY) {
      const body = t("site.newsletterForm.signupBody", { email });
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      window.setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject,
          email,
          message: `New newsletter signup: ${email}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const buttonLabel =
    status === "sending"
      ? t("site.newsletterForm.sending")
      : status === "sent"
      ? t("site.newsletterForm.subscribed")
      : status === "error"
      ? t("site.newsletterForm.tryAgain")
      : t("site.newsletterForm.subscribe");

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full flex-1 border border-void-line bg-void-raised px-4 py-3.5 text-sm text-ink outline-none transition-colors focus:border-dawn"
          placeholder={t("site.newsletterForm.emailPlaceholder")}
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="whitespace-nowrap border border-ink/30 px-6 py-3.5 text-sm uppercase tracking-widest2 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-void disabled:opacity-60"
        >
          {buttonLabel}
        </button>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-ink-faint">
        {WEB3FORMS_ACCESS_KEY
          ? t("site.newsletterForm.noteDirect")
          : t("site.newsletterForm.noteMailto", { email: CONTACT_EMAIL })}
      </p>
    </form>
  );
}
