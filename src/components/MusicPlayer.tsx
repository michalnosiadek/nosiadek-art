"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "@/i18n/LocaleProvider";

export default function MusicPlayer({
  track,
  title,
}: {
  track?: string;
  title: string;
}) {
  const t = useT();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration);
    };
    const onEnd = () => {
      setPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
    };
  }, [track]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }

  if (!track) {
    return (
      <div className="flex items-center gap-4 border border-void-line/70 px-5 py-4 opacity-60">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink-faint/40">
          <span className="text-xs">♪</span>
        </div>
        <div>
          <p className="text-sm text-ink-faint">{t("site.music.comingSoon")}</p>
          <p className="text-xs text-ink-faint/70">
            {t("site.music.comingSoonSub", { title })}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 border border-void-line px-5 py-4">
      <audio ref={audioRef} src={track} preload="none" />
      <button
        onClick={toggle}
        aria-label={playing ? t("site.music.pause") : t("site.music.play")}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/50 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-void"
      >
        {playing ? (
          <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor">
            <rect x="1" y="1" width="3.5" height="10" />
            <rect x="7" y="1" width="3.5" height="10" />
          </svg>
        ) : (
          <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor">
            <path d="M1 1L11 6L1 11Z" />
          </svg>
        )}
      </button>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm text-ink">{t("site.music.listen")}</p>
        <div className="mt-2 h-px w-full bg-void-line">
          <div
            className="h-px bg-dawn transition-[width] duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
