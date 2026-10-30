"use client";

import { useEffect, useState } from "react";

type Floater = {
  id: string;
  text: string;
  top: string;
  left: string;
  delay: string;
  duration: string;
  rotate: string;
  size: "sm" | "md" | "lg";
};

const FLOATERS: Floater[] = [
  { id: "h2o", text: "H₂O", top: "12%", left: "6%", delay: "0s", duration: "18s", rotate: "-8deg", size: "lg" },
  { id: "abc", text: "A B C", top: "22%", left: "78%", delay: "1.2s", duration: "22s", rotate: "6deg", size: "md" },
  { id: "xyz", text: "X Y Z", top: "68%", left: "8%", delay: "2s", duration: "20s", rotate: "4deg", size: "md" },
  { id: "1to10", text: "1 2 3…10", top: "78%", left: "72%", delay: "0.8s", duration: "24s", rotate: "-5deg", size: "sm" },
  { id: "play", text: "Play", top: "38%", left: "4%", delay: "1.6s", duration: "19s", rotate: "-12deg", size: "md" },
  { id: "nur", text: "Nursery", top: "48%", left: "86%", delay: "2.4s", duration: "21s", rotate: "8deg", size: "sm" },
  { id: "v", text: "Class V", top: "58%", left: "48%", delay: "0.4s", duration: "26s", rotate: "-3deg", size: "sm" },
  { id: "x", text: "Class X", top: "16%", left: "42%", delay: "3s", duration: "23s", rotate: "5deg", size: "sm" },
  { id: "xii", text: "Class XII", top: "84%", left: "38%", delay: "1s", duration: "25s", rotate: "-6deg", size: "md" },
  { id: "plus", text: "2 + 2 = 4", top: "32%", left: "58%", delay: "2.8s", duration: "17s", rotate: "10deg", size: "sm" },
  { id: "e", text: "E = mc²", top: "72%", left: "22%", delay: "1.4s", duration: "20s", rotate: "-9deg", size: "sm" },
  { id: "atoz", text: "A → Z", top: "8%", left: "62%", delay: "0.6s", duration: "19s", rotate: "3deg", size: "lg" },
];

const sizeClass = {
  sm: "text-base md:text-lg",
  md: "text-xl md:text-2xl",
  lg: "text-2xl md:text-4xl",
};

/**
 * Soft classroom chalkboard doodles — decorative only (aria-hidden).
 * Honors reduced-motion and skips on very small / low-power hints when possible.
 */
export function SchoolAtmosphere() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    try {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const narrow = window.matchMedia("(max-width: 640px)").matches;
      // Keep a lighter set on mobile; still enable for classroom feel
      setEnabled(!reduce);
      if (narrow) setEnabled(!reduce);
    } catch {
      setEnabled(true);
    }
  }, []);

  if (!enabled) {
    return <div className="classroom-wash pointer-events-none fixed inset-0 -z-10" aria-hidden />;
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="classroom-wash absolute inset-0" />
      <div className="classroom-grid absolute inset-0 opacity-[0.35]" />
      {FLOATERS.map((item) => (
        <span
          key={item.id}
          className={`classroom-float font-hand absolute select-none font-semibold text-[#1A237E]/[0.08] ${sizeClass[item.size]}`}
          style={{
            top: item.top,
            left: item.left,
            animationDelay: item.delay,
            animationDuration: item.duration,
            ["--twirl" as string]: item.rotate,
          }}
        >
          {item.text}
        </span>
      ))}
    </div>
  );
}
