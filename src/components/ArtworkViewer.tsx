"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useT } from "@/i18n/LocaleProvider";

type DragInfo = {
  startX: number;
  startY: number;
  origX: number;
  origY: number;
  moved: boolean;
};

export default function ArtworkViewer({
  src,
  alt,
  width,
  height,
  compact = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  compact?: boolean;
}) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragInfo = useRef<DragInfo | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function closeViewer() {
    setOpen(false);
    setZoomed(false);
    setPos({ x: 0, y: 0 });
  }

  function onPointerDown(e: React.PointerEvent) {
    if (!zoomed) return;
    dragInfo.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: pos.x,
      origY: pos.y,
      moved: false,
    };
    setDragging(true);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging || !dragInfo.current) return;
    const dx = e.clientX - dragInfo.current.startX;
    const dy = e.clientY - dragInfo.current.startY;
    if (Math.abs(dx) + Math.abs(dy) > 4) dragInfo.current.moved = true;
    setPos({ x: dragInfo.current.origX + dx, y: dragInfo.current.origY + dy });
  }

  function onPointerUp() {
    setDragging(false);
  }

  function onStageClick() {
    if (dragInfo.current?.moved) {
      dragInfo.current.moved = false;
      return;
    }
    if (zoomed) {
      setZoomed(false);
      setPos({ x: 0, y: 0 });
    } else {
      setZoomed(true);
    }
  }

  function goFullscreen(e: React.MouseEvent) {
    e.stopPropagation();
    modalRef.current?.requestFullscreen?.();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={compact
          ? "group relative block border border-ink/40 bg-void/75 px-4 py-3 text-xs uppercase tracking-widest2 text-ink backdrop-blur-sm transition hover:border-ink hover:bg-ink hover:text-void"
          : "group relative block w-full overflow-hidden bg-black"}
        style={compact ? undefined : { aspectRatio: `${width} / ${height}` }}
        aria-label={t("site.viewer.viewFullImage", { title: alt })}
      >
        {compact ? t("site.journey.viewPainting") : (
          <>
            <Image
              src={src}
              alt={alt}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain transition-transform duration-700 ease-smooth group-hover:scale-[1.02]"
            />
            <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-void/70 px-3 py-1.5 text-[10px] uppercase tracking-widest2 text-ink-muted opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4v-4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t("site.viewer.expand")}
            </span>
          </>
        )}
      </button>

      {open && createPortal(
        <div
          ref={modalRef}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeViewer();
          }}
        >
          <button
            type="button"
            onClick={closeViewer}
            aria-label={t("site.viewer.close")}
            className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-ink/30 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-void"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 1L13 13M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={goFullscreen}
            aria-label={t("site.viewer.fullscreen")}
            className="absolute right-20 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-ink/30 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-void"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4v-4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div
            className="relative flex h-full w-full touch-none items-center justify-center overflow-hidden"
            onClick={onStageClick}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              draggable={false}
              className="max-h-[90vh] max-w-[90vw] select-none"
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px) scale(${
                  zoomed ? 2.2 : 1
                })`,
                transition: dragging ? "none" : "transform 400ms cubic-bezier(0.16,1,0.3,1)",
                cursor: zoomed ? (dragging ? "grabbing" : "grab") : "zoom-in",
              }}
            />
          </div>

          <p className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest2 text-ink-faint">
            {zoomed ? t("site.viewer.dragToPan") : t("site.viewer.tapToZoom")}
          </p>
        </div>,
        document.body,
      )}
    </>
  );
}
