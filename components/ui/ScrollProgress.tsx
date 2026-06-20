"use client";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (scrolled / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 inset-x-0 z-[60] h-1 pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full origin-right transition-[width] duration-150 ease-out"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #0B7A57, #34D8A6, #7BE8B0, #E0A82E)",
          boxShadow: "0 0 12px rgba(52,216,166,0.6)",
        }}
      />
    </div>
  );
}
