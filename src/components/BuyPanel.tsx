"use client";

import { useState } from "react";
import type { Artwork } from "@/lib/artworks";

export default function BuyPanel({ artwork }: { artwork: Artwork }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<
    | { type: "print"; label: string; price: number }
    | { type: "original"; price: number }
  >({ type: "print", label: artwork.prints[0].label, price: artwork.prints[0].price });
  const [framed, setFramed] = useState(false);
  const [added, setAdded] = useState(false);

  const total = selected.price + (framed ? artwork.framingPrice : 0);

  function handleBuy() {
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full bg-dawn py-4 text-sm uppercase tracking-widest2 text-ink transition-colors duration-300 hover:bg-dawn-bright md:w-auto md:px-14"
      >
        Buy
      </button>
    );
  }

  return (
    <div>
      <p className="text-xs uppercase tracking-widest2 text-ink-faint">
        Choose edition
      </p>

      <div className="mt-4 flex flex-col gap-2">
        {artwork.prints.map((p) => {
          const isActive =
            selected.type === "print" && selected.label === p.label;
          return (
            <button
              key={p.label}
              onClick={() =>
                setSelected({ type: "print", label: p.label, price: p.price })
              }
              className={`flex items-center justify-between border px-5 py-3.5 text-left transition-colors duration-300 ${
                isActive
                  ? "border-ink bg-ink/5"
                  : "border-void-line hover:border-ink/40"
              }`}
            >
              <span className="text-sm text-ink">
                Print — {p.label}{" "}
                <span className="text-ink-faint">({p.dimensions})</span>
              </span>
              <span className="text-sm text-ink-muted">${p.price}</span>
            </button>
          );
        })}

        {artwork.original.available && artwork.original.price && (
          <button
            onClick={() =>
              setSelected({ type: "original", price: artwork.original.price! })
            }
            className={`flex items-center justify-between border px-5 py-3.5 text-left transition-colors duration-300 ${
              selected.type === "original"
                ? "border-dawn bg-dawn/10"
                : "border-void-line hover:border-ink/40"
            }`}
          >
            <span className="text-sm text-ink">
              Original painting{" "}
              <span className="text-ink-faint">({artwork.dimensions})</span>
            </span>
            <span className="text-sm text-ink-muted">
              ${artwork.original.price}
            </span>
          </button>
        )}

        {!artwork.original.available && (
          <div className="flex items-center justify-between border border-void-line/50 px-5 py-3.5 opacity-50">
            <span className="text-sm text-ink-faint">Original painting</span>
            <span className="text-xs uppercase tracking-widest2 text-ink-faint">
              Sold
            </span>
          </div>
        )}
      </div>

      <label className="mt-4 flex cursor-pointer items-center justify-between border border-void-line px-5 py-3.5">
        <span className="flex items-center gap-3 text-sm text-ink">
          <span
            className={`relative flex h-5 w-5 shrink-0 items-center justify-center border transition-colors duration-200 ${
              framed ? "border-dawn bg-dawn" : "border-ink-faint/50 bg-void-raised"
            }`}
          >
            <input
              type="checkbox"
              checked={framed}
              onChange={(e) => setFramed(e.target.checked)}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
            {framed && (
              <svg
                width="11"
                height="9"
                viewBox="0 0 11 9"
                fill="none"
                className="pointer-events-none"
              >
                <path
                  d="M1 4.5L4 7.5L10 1"
                  stroke="#c9beb6"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
          Add framing
        </span>
        <span className="text-sm text-ink-muted">
          +${artwork.framingPrice}
        </span>
      </label>

      <button
        onClick={handleBuy}
        className="mt-8 w-full bg-dawn py-4 text-sm uppercase tracking-widest2 text-ink transition-colors duration-300 hover:bg-dawn-bright"
      >
        {added ? "Added — checkout coming soon" : `Buy — $${total}`}
      </button>

      <p className="mt-4 text-xs leading-relaxed text-ink-faint">
        This is a preview store. Checkout isn&apos;t wired up to real payments
        yet — inquire directly at{" "}
        <a
          href="mailto:nosiadek.michal@gmail.com"
          className="underline decoration-ink-faint underline-offset-2 hover:text-ink"
        >
          nosiadek.michal@gmail.com
        </a>
        .
      </p>
    </div>
  );
}
