"use client";

import { RefObject, useEffect, useEffectEvent } from "react";

type UseRevealMotionOptions = {
  rootRef?: RefObject<HTMLElement | null>;
};

export function useRevealMotion({ rootRef }: UseRevealMotionOptions = {}) {
  const updateProgress = useEffectEvent(() => {
    if (typeof window === "undefined") return;

    const progress = Math.min(window.scrollY / 1200, 1);
    const target = rootRef?.current ?? document.documentElement;
    target.style.setProperty("--page-progress", progress.toFixed(3));
  });

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -10% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });

    return () => window.removeEventListener("scroll", updateProgress);
  }, [updateProgress]);
}
