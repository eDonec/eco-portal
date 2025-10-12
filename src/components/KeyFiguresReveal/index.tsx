"use client";

import { useEffect, useRef, useState } from "react";

export default function KeyFiguresReveal({
  label = "Key figures",
}: {
  label?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const onScroll = () => {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Progress from 0 to 1 as the sticky container scrolls through the viewport
      const start = Math.min(0, rect.top / vh);
      const end = Math.max(-1, (rect.bottom - vh) / vh);
      const total = Math.abs(end - start) || 1;
      const p = clamp((0 - start) / total, 0, 1);
      setProgress(p);
    };
    const onRAF = () => {
      onScroll();
      raf = requestAnimationFrame(onRAF);
    };
    let raf = requestAnimationFrame(onRAF);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const leftWidth = `${progress * 50}%`;
  const rightWidth = `${progress * 50}%`;
  const showText = progress > 0.6;

  return (
    <section className="relative w-full" aria-label="Key figures reveal">
      <div className="relative h-screen">
        <div className="sticky top-0 h-screen" ref={ref}>
          <div className="absolute inset-0 flex items-center">
            <div className="flex-1">
              <div
                className="h-1 bg-gradient-to-r from-blue-600 via-sky-500 to-rose-500"
                style={{ width: leftWidth }}
              />
            </div>
            <div
              className="mx-4 min-w-[8rem] text-center select-none"
              aria-hidden={!showText}
            >
              <span
                className={`text-2xl font-extrabold transition-opacity duration-300 ${
                  showText ? "opacity-100" : "opacity-0"
                }`}
              >
                {label}
              </span>
            </div>
            <div className="flex-1">
              <div
                className="h-1 bg-gradient-to-l from-blue-600 via-sky-500 to-rose-500"
                style={{ width: rightWidth, marginLeft: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}
