"use client";

import { useEffect, useRef, useState } from "react";
import { useColorBlindMode } from "@/components/version3/ColorBlindModeContext";

export default function LessonDisplayMenu() {
  const [open, setOpen] = useState(false);
  const { colorBlindFriendly, setColorBlindFriendly } = useColorBlindMode();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="rounded-lg border border-black/15 bg-white px-3 py-1.5 text-sm font-medium text-black/80 shadow-sm transition hover:bg-black/[0.04]"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((o) => !o)}
      >
        Menu
      </button>
      {open ? (
        <div
          className="absolute right-0 top-[calc(100%+6px)] z-30 w-[min(18rem,calc(100vw-2rem))] rounded-xl border border-black/10 bg-white p-3 shadow-lg"
          role="menu"
        >
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="text-pretty text-black/80">
              Color-blind friendly colors
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={colorBlindFriendly}
              aria-label="Toggle color-blind friendly colors"
              onClick={() => setColorBlindFriendly(!colorBlindFriendly)}
              className={`flex h-7 w-12 shrink-0 items-center rounded-full p-0.5 transition-colors ${
                colorBlindFriendly
                  ? "justify-end bg-[#0b4f8c]"
                  : "justify-start bg-black/25"
              }`}
            >
              <span className="pointer-events-none h-6 w-6 shrink-0 rounded-full bg-white shadow" />
            </button>
          </div>
          <p className="mt-2 text-xs leading-snug text-black/50">
            Stronger contrast; avoids red vs green for right and wrong.
          </p>
        </div>
      ) : null}
    </div>
  );
}
