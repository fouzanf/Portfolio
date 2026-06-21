"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function ScrollAnimations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Respect OS accessibility preference — skip all GSAP animations
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const t = setTimeout(() => {
      // ── 1. Section headings — blur-lift reveal ────────────────────────────
      gsap.utils.toArray<HTMLElement>(".section-title, .section-heading").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 55, opacity: 0, filter: "blur(14px)", scale: 0.93 },
          {
            y: 0, opacity: 1, filter: "blur(0px)", scale: 1,
            duration: 1.1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          }
        );
      });

      // ── 2. Section labels — expand letter-spacing in ──────────────────────
      gsap.utils.toArray<HTMLElement>(".section-label").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, letterSpacing: "0.45em", y: 12 },
          {
            opacity: 1, letterSpacing: "0.2em", y: 0,
            duration: 0.85, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 92%" },
          }
        );
      });

      // ── 3. Background ghost numbers — upward parallax ────────────────────
      gsap.utils.toArray<HTMLElement>(".section-bg-number, .section-number").forEach((el) => {
        const section = el.closest("section") ?? el;
        gsap.to(el, {
          y: -70, ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.8 },
        });
      });

      // ── 4. Heading accent lines — scale-x from left ──────────────────────
      gsap.utils.toArray<HTMLElement>(".heading-line").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1, duration: 1.1, ease: "power3.inOut",
            scrollTrigger: { trigger: el, start: "top 94%" },
          }
        );
      });

      // ── 5. Mission brief — subtle background parallax ─────────────────────
      const missionSection = document.querySelector(".mission-brief");
      if (missionSection) {
        gsap.to(missionSection, {
          backgroundPosition: "50% 30%",
          ease: "none",
          scrollTrigger: { trigger: missionSection, start: "top bottom", end: "bottom top", scrub: true },
        });
      }

      // ── 6. Mission cards — stagger float-up reveal ────────────────────────
      gsap.utils.toArray<HTMLElement>(".mission-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0, scale: 0.96 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.85, ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
          }
        );
      });

      // ── 7. Experience card — slide from right ─────────────────────────────
      gsap.utils.toArray<HTMLElement>(".exp-content").forEach((el) => {
        gsap.fromTo(
          el,
          { x: 40, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      // ── 8. Tech marquee section heading ───────────────────────────────────
      gsap.utils.toArray<HTMLElement>(".tech-marquee-section .section-heading-wrapper").forEach((el) => {
        gsap.fromTo(
          el,
          { x: -40, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });

      // ── 9. Section dividers — scale from center ───────────────────────────
      gsap.utils.toArray<HTMLElement>(".section-divider").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0, transformOrigin: "center" },
          {
            scaleX: 1, duration: 0.7, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 98%" },
          }
        );
      });

      // ── 10. Contact info links — stagger slide-right ─────────────────────
      gsap.utils.toArray<HTMLElement>(".contact-card a").forEach((el, i) => {
        gsap.fromTo(
          el,
          { x: -30, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.65, ease: "power2.out",
            delay: i * 0.1,
            scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
          }
        );
      });

      // ── 11. Subtle hero nebulas — vertical parallax ───────────────────────
      gsap.utils.toArray<HTMLElement>(".nebula").forEach((el, i) => {
        const yAmt = i % 2 === 0 ? -30 : 30;
        gsap.to(el, {
          y: yAmt, ease: "none",
          scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 2 },
        });
      });
    }, 300);

    return () => clearTimeout(t);
  }, []);

  return null;
}
