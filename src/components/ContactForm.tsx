"use client";

import { useState } from "react";
import { useT } from "@/i18n/LocaleProvider";

const CONTACT_EMAIL = "nosiadek.michal@gmail.com";
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const t = useT();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const subject = t("site.contactForm.inquirySubject", {
      name: name || t("site.contactForm.anonymousVisitor"),
    });

    // No email service configured yet, fall back to opening the visitor's
    // own email app instead of failing silently.
    if (!WEB3FORMS_ACCESS_KEY) {
      const body = `${message}\n\nFrom: ${name}\n${email}`;
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
          from_name: name,
          email,
          message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const buttonLabel =
    status === "sending"
      ? t("site.contactForm.sending")
      : status === "sent"
      ? WEB3FORMS_ACCESS_KEY
        ? t("site.contactForm.sent")
        : t("site.contactForm.openingMailApp")
      : status === "error"
      ? t("site.contactForm.error")
      : t("site.contactForm.send");

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <div>
        <label className="mb-1.5 block text-xs uppercase tracking-widest2 text-ink-faint">
          {t("site.contactForm.nameLabel")}
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-void-line bg-void-raised px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-dawn"
          placeholder={t("site.contactForm.namePlaceholder")}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs uppercase tracking-widest2 text-ink-faint">
          {t("site.contactForm.emailLabel")}
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-void-line bg-void-raised px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-dawn"
          placeholder={t("site.contactForm.emailPlaceholder")}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs uppercase tracking-widest2 text-ink-faint">
          {t("site.contactForm.messageLabel")}
        </label>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-none border border-void-line bg-void-raised px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-dawn"
          placeholder={t("site.contactForm.messagePlaceholder")}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-dawn py-3.5 text-sm uppercase tracking-widest2 text-ink transition-colors duration-300 hover:bg-dawn-bright disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {buttonLabel}
      </button>

      <p className="text-xs leading-relaxed text-ink-faint">
        {WEB3FORMS_ACCESS_KEY
          ? t("site.contactForm.noteDirect", { email: CONTACT_EMAIL })
          : t("site.contactForm.noteMailto", { email: CONTACT_EMAIL })}
      </p>
    </form>
  );
}
