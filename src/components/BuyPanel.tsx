"use client";

import { useState } from "react";
import type { Artwork } from "@/lib/artworks";

export default function BuyPanel({ artwork }: { artwork: Artwork }) {
  const [selected, setSelected] = useState<
    { type: "print"; label: string; price: number } | { type: "original"; price: number }
  >({ type: "print", label: artwork.prints[0].label, price: artwork.prints[0].price });

  const [added, setAdded] = useState(false);

  function handleBuy() {
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
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
            <span className="text-sm text-ink-faint">
              Original painting
            </span>
            <span className="text-xs uppercase tracking-widest2 text-ink-faint">
              Sold
            </span>
          </div>
        )}
      </div>

      <button
        onClick={handleBuy}
        className="mt-8 w-full bg-dawn py-4 text-sm uppercase tracking-widest2 text-ink transition-colors duration-300 hover:bg-dawn-bright"
      >
        {added ? "Added — checkout coming soon" : `Buy — $${selected.price}`}
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
