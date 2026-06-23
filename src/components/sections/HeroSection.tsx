"use client";

import { useEffect, useRef, useState } from "react";
import { Hero3DScene } from "./Hero3DScene";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight, Download } from "lucide-react";

const ROLES = [
  "Generative AI Developer",
  "Full-Stack Engineer",
  "AI Product Builder",
  "LLM Systems Architect",
];

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const primaryBtnRef = useRef<HTMLButtonElement>(null);

  // Magnetic button
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });

  // Mouse spotlight
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false });

  // Typewriter
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const current = ROLES[roleIdx];
    if (!deleting && typed === current) {
      const t = setTimeout(() => setDeleting(true), 2400);
      return () => clearTimeout(t);
    }
    if (deleting && typed === "") {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
      return;
    }
    const speed = deleting ? 32 : 78;
    const t = setTimeout(() => {
      setTyped((s) => (deleting ? s.slice(0, -1) : current.slice(0, s.length + 1)));
    }, speed);
    return () => clearTimeout(t);
  }, [typed, deleting, roleIdx]);

  // Magnetic primary button
  useEffect(() => {
    const btn = primaryBtnRef.current;
    if (!btn) return;
    const RADIUS = 100;
    const handleMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < RADIUS) {
        setBtnPos({ x: dx * 0.28, y: dy * 0.28 });
      } else {
        setBtnPos({ x: 0, y: 0 });
      }
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Mouse spotlight in hero
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true });
    };
    const handleLeave = () => setSpotlight((s) => ({ ...s, visible: false }));
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Wipe any stale inline styles left by a previous mount's animations BEFORE
    // the new context records "to" snapshots. clearProps must run outside the
    // context so ctx.revert() doesn't restore the old stale values.
    gsap.set([".hero-badge", ".name-word", ".hero-cta", ".hud-bracket"], {
      clearProps: "all",
    });

    // gsap.context() scopes all tweens/ScrollTriggers to containerRef.
    // ctx.revert() on cleanup kills every tween + ScrollTrigger and restores
    // the pre-tween state, so remounts always start from a clean slate.
    const ctx = gsap.context(() => {
      if (containerRef.current && textRef.current) {
        const parallaxTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        parallaxTl.to(textRef.current, { y: 200, ease: "none" }, 0);
        parallaxTl.to("#hero-3d-scene", { y: 50, ease: "none" }, 0);
      }

      const heroTl = gsap.timeline({ delay: 0.2 });
      heroTl
        .from(".hero-badge", { y: -20, opacity: 0, duration: 0.6, ease: "power3.out", delay: 0.5 })
        .from(".hero-role", { y: 30, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.4")
        .from(".hero-cta", { y: 20, opacity: 0, duration: 0.6, stagger: 0.12, ease: "power3.out" }, "-=0.3")
        .from(".hud-bracket", { opacity: 0, scale: 0.8, duration: 0.8, stagger: 0.1 }, "-=0.5");

      gsap.from(".name-word", {
        y: 150,
        opacity: 0,
        rotateX: 90,
        transformPerspective: 800,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={containerRef} className="hero-section">
      <Hero3DScene />

      {/* Mouse spotlight */}
      <div
        className="hero-spotlight"
        style={{
          left: spotlight.x,
          top: spotlight.y,
          opacity: spotlight.visible ? 1 : 0,
        }}
      />

      <div className="nebula nebula-1" />
      <div className="nebula nebula-2" />

      {/* HUD corner brackets */}
      <div className="absolute inset-0 pointer-events-none z-[5] max-w-7xl mx-auto h-full px-6 flex items-center justify-center">
        <div className="relative w-full h-[600px] flex items-center justify-center">
          <div className="hud-bracket absolute -top-10 -left-10 w-8 h-8 border-t-2 border-l-2 border-cyan-400" />
          <div className="hud-bracket absolute -top-10 -right-10 w-8 h-8 border-t-2 border-r-2 border-cyan-400" />
          <div className="hud-bracket absolute -bottom-10 -left-10 w-8 h-8 border-b-2 border-l-2 border-cyan-400" />
          <div className="hud-bracket absolute -bottom-10 -right-10 w-8 h-8 border-b-2 border-r-2 border-cyan-400" />
        </div>
      </div>

      <div className="shooting-stars absolute inset-0 pointer-events-none z-[6]">
        <div className="star star-1" />
        <div className="star star-2" />
        <div className="star star-3" />
      </div>

      {/* Content */}
      <div className="hero-content" ref={textRef}>
        {/* Availability badge */}
        <div className="hero-badge">
          <span className="badge-dot" />
          <span>Available for hire</span>
          <span className="badge-sep">·</span>
          <span>Building in public</span>
        </div>

        {/* Name */}
        <h1 className="hero-name">
          <span className="name-word">Mohammed</span>{" "}
          <span className="name-word">Muneeb</span>{" "}
          <span className="name-word gradient-text">Fouzan</span>
        </h1>

        {/* Typewriter role */}
        <p className="hero-role">
          <span className="typed-text">{typed}</span>
          <span className="typed-cursor" aria-hidden>|</span>
        </p>

        {/* CTAs */}
        <div className="hero-buttons">
          <button
            ref={primaryBtnRef}
            className="hero-cta hero-cta-primary"
            onClick={() => {
              const el = document.querySelector("#projects");
              if (!el) return;
              const lenis = (window as any).__lenis;
              if (lenis) {
                lenis.scrollTo(el, { duration: 1.4, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
              } else {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
            style={{
              transform: `translate(${btnPos.x}px, ${btnPos.y}px)`,
              transition:
                btnPos.x === 0 && btnPos.y === 0
                  ? "transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s ease"
                  : "transform 0.1s ease, box-shadow 0.2s ease",
            }}
          >
            <span>View Projects</span>
            <ArrowRight size={16} strokeWidth={2} />
          </button>

          <a
            href="https://drive.google.com/file/d/19g6D8H_bdxX3LxCaXq5ReE6X-EeJ1yuB/view"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta hero-cta-secondary"
          >
            <Download size={15} strokeWidth={2} />
            <span>Download Resume</span>
          </a>
        </div>

        {/* Scroll hint */}
        <div className="scroll-hint">
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}
