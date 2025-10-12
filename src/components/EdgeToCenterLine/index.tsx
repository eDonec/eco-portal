"use client";

import { useEffect, useRef, useState } from "react";

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

const EdgeToCenterLine = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frame = useRef<number | null>(null);
  const [progress, setProgress] = useState(0); // 0 -> 1 while scrolling through the section
  const reachedCenterRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (frame.current !== null) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = null;
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const viewH =
          window.innerHeight || document.documentElement.clientHeight;

        // Compute document-relative top for the section
        const sectionTopDoc = window.scrollY + rect.top;
        const sectionHeight = rect.height;
        const maxScrollable = Math.max(1, sectionHeight - viewH); // avoid divide-by-zero

        // How far into the section we've scrolled while it's in view
        const scrolledInto = window.scrollY - sectionTopDoc;
        const p = clamp(scrolledInto / maxScrollable);
        setProgress(p);
        if (reachedCenterRef.current && p < 0.98) {
          reachedCenterRef.current = false;
        }
        if (!reachedCenterRef.current && p >= 0.98) {
          reachedCenterRef.current = true;
        }
      });
    };

    onScroll(); // initialize on mount and on resize
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  // Scale from edges toward the center as progress goes 0 -> 1
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
      className="relative min-h-[200vh]"
      aria-label="Edge to center line progress"
    >
      {/* Sticky pin: content stays while you scroll through this section */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="relative w-full h-full">
          {/* Left half */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[4px] w-1/2 overflow-hidden">
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
              "text-sm md:text-5xl font-medium text-sky-600 dark:text-slate-200",
              "transition-all duration-500 ease-out",
              showLabel ? "opacity-100 scale-100" : "opacity-0 scale-95",
            ].join(" ")}
            aria-hidden={!showLabel}
          >
            Les Chiffres-Clés
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[4px] w-1/2 overflow-hidden">
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
