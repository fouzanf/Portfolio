"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollToTop() {
  const pathname = usePathname();

  // Disable the browser's native scroll restoration so it never auto-scrolls to
  // a previous position on back/forward navigation — we handle it ourselves.
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  // useLayoutEffect fires synchronously AFTER DOM mutations but BEFORE useEffect callbacks.
  // React processes ALL useLayoutEffects before ANY useEffects across the whole tree.
  // This means our scroll-to-0 fires before HeroSection's useEffect creates its
  // GSAP ScrollTrigger, so the trigger initialises at scroll=0 (not a stale position).
  useLayoutEffect(() => {
    window.scrollTo(0, 0); // synchronous — no RAF, no smooth easing

    const lenis = (window as any).__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
