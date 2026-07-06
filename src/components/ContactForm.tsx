"use client";

import { useState } from "react";

const CONTACT_EMAIL = "nosiadek.michal@gmail.com";
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // No email service configured yet, fall back to opening the visitor's
    // own email app instead of failing silently.
    if (!WEB3FORMS_ACCESS_KEY) {
      const subject = `Website inquiry from ${name || "a visitor"}`;
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
          subject: `Website inquiry from ${name || "a visitor"}`,
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

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <div>
        <label className="mb-1.5 block text-xs uppercase tracking-widest2 text-ink-faint">
          Name
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-void-line bg-void-raised px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-dawn"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs uppercase tracking-widest2 text-ink-faint">
          Email
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-void-line bg-void-raised px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-dawn"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs uppercase tracking-widest2 text-ink-faint">
          Message
        </label>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-none border border-void-line bg-void-raised px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-dawn"
          placeholder="What would you like to ask or commission?"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-dawn py-3.5 text-sm uppercase tracking-widest2 text-ink transition-colors duration-300 hover:bg-dawn-bright disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {status === "sending"
          ? "Sending…"
          : status === "sent"
          ? WEB3FORMS_ACCESS_KEY
            ? "Message sent"
            : "Opening your email app…"
          : status === "error"
          ? "Something went wrong, try again"
          : "Send message"}
      </button>

      <p className="text-xs leading-relaxed text-ink-faint">
        {WEB3FORMS_ACCESS_KEY
          ? `Sends directly to ${CONTACT_EMAIL}.`
          : `This opens your email app with the message pre-filled to ${CONTACT_EMAIL}. Just hit send from there.`}
      </p>
    </form>
  );
}
