"use client";

import React, {
  ElementType,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Effect = "fade-up" | "fade-left" | "fade-right" | "pop" | "fade-in";

export interface RevealProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  effect?: Effect;
  delay?: number; // ms
  duration?: number; // ms
  threshold?: number; // Intersection threshold
  once?: boolean; // animate once only
}

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export default function Reveal({
  as: Tag = "div",
  children,
  className,
  effect = "fade-up",
  delay = 0,
  duration = 700,
  threshold = 0.15,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  const reduceMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            if (once) obs.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold }
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold, once, reduceMotion]);

  // Ensure Tailwind picks up all used classes by keeping them in a static map
  const initialMap: Record<Effect, string> = {
    "fade-up": "opacity-0 translate-y-6",
    "fade-left": "opacity-0 -translate-x-6",
    "fade-right": "opacity-0 translate-x-6",
    pop: "opacity-0 scale-95",
    "fade-in": "opacity-0",
  };
  const finalMap: Record<Effect, string> = {
    "fade-up": "opacity-100 translate-y-0",
    "fade-left": "opacity-100 translate-x-0",
    "fade-right": "opacity-100 translate-x-0",
    pop: "opacity-100 scale-100",
    "fade-in": "opacity-100",
  };

  const style: React.CSSProperties = {
    transitionDelay: `${delay}ms`,
    transitionDuration: `${duration}ms`,
  };

  return (
    <Tag
      // cast generic ElementType to HTMLElement for IntersectionObserver
      ref={(node: unknown) => (ref.current = (node as HTMLElement) ?? null)}
      className={cx(
        "aos transition-all ease-out transform-gpu will-change-transform", // base
        visible ? finalMap[effect] : initialMap[effect],
        className
      )}
      style={style}
    >
      {children}
    </Tag>
  );
}
