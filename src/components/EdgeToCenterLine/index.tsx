"use client";

import { useEffect, useRef, useState } from "react";

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

const EdgeToCenterLine = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frame = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const reachedCenterRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const handleScroll = () => {
      if (frame.current !== null) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = null;
        const rect = el.getBoundingClientRect();
        const viewH =
          window.innerHeight || document.documentElement.clientHeight;
        const sectionTopDoc = window.scrollY + rect.top;
        const sectionHeight = rect.height;
        console.log(sectionHeight);
        const maxScrollable = Math.max(1, sectionHeight - viewH);
        const scrolledInto = window.scrollY - sectionTopDoc;
        const p = clamp((scrolledInto * 1.25) / maxScrollable);
        setProgress(p);
        if (reachedCenterRef.current && p < 0.98) {
          reachedCenterRef.current = false;
        }
        if (!reachedCenterRef.current && p >= 0.98) {
          reachedCenterRef.current = true;
        }
      });
    };

    const timeout = setTimeout(() => handleScroll(), 20);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame.current) cancelAnimationFrame(frame.current);
      clearTimeout(timeout);
    };
  }, []);

  const leftStyle = {
    transform: `scaleX(${progress})`,
    transformOrigin: "left center",
  } as const;
  const rightStyle = {
    transform: `scaleX(${progress})`,
    transformOrigin: "right center",
  } as const;

  // Show the label once we've nearly reached the center or if locked
  const showLabel = reachedCenterRef.current || progress >= 0.98;
  return (
    <section
      ref={sectionRef}
      className="relative min-h-[170vh] mt-[-40vh]"
      aria-label="Edge to center line progress"
    >
      {/* Sticky pin: content stays while you scroll through this section */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="relative w-full h-full">
          {/* Left half */}
          <div
            className={`absolute left-0 top-1/2 ${
              showLabel ? "opacity-0" : "opacity-100"
            } transition-all -translate-y-1/2 h-[4px] w-1/2 overflow-hidden`}
          >
            <div
              className="h-full w-full bg-sky-600 dark:bg-white"
              style={leftStyle}
              aria-hidden={true}
            />
          </div>

          {/* Right half */}

          {/* Center label that pops up when the line meets in the middle */}
          <div
            className={[
              "pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-8 z-10",
              "px-4 py-2",
              "w-full text-center text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight gradient-text-animated drop-shadow-sm",
              "transition-all duration-500 ease-out",
              showLabel ? "opacity-100 scale-100" : "opacity-0 scale-95",
            ].join(" ")}
            aria-hidden={!showLabel}
          >
            Les Chiffres-Clés
          </div>
          <div
            className={`absolute right-0 top-1/2 ${
              showLabel ? "opacity-0" : "opacity-100"
            } transition-all -translate-y-1/2 h-[4px] w-1/2 overflow-hidden`}
          >
            <div
              className="h-full w-full bg-sky-600 dark:bg-white"
              style={rightStyle}
              aria-hidden={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EdgeToCenterLine;
