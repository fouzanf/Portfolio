"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const CARDS = [
  {
    icon: "⚡",
    title: "10+ Projects",
    desc: "Built and shipped in 3 months of deep focused learning — every one live and open source.",
  },
  {
    icon: "🤖",
    title: "AI-First Builder",
    desc: "Every project integrates Gemini, LLMs, RAG, or intelligent automation — not as afterthought.",
  },
  {
    icon: "🚀",
    title: "Full-Stack",
    desc: "Next.js · FastAPI · Python · React — end-to-end ownership from API design to UI polish.",
  },
];

export function MissionBriefSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.set(".mission-card", { opacity: 1, y: 0 });

    gsap.from(".mission-card", {
      opacity: 0,
      y: 48,
      duration: 0.85,
      stagger: 0.14,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".mission-cards",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    gsap.from(".mission-line", {
      opacity: 0,
      x: -30,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".mission-statement",
        start: "top 80%",
      },
    });
  }, []);

  return (
    <section className="mission-brief" id="about" ref={containerRef}>
      <div className="section-heading-wrapper">
        <span className="section-bg-number">01</span>
        <p className="section-label">· MISSION BRIEF</p>
        <h2 className="section-title">Who I Am</h2>
      </div>

      <div className="mission-statement">
        <p className="mission-line">
          I build <span className="highlight">production-grade AI systems</span>
        </p>
        <p className="mission-line">
          that ship — from <span className="highlight">LLM proxy gateways</span>
        </p>
        <p className="mission-line">
          to <span className="highlight">knowledge graph RAG platforms.</span>
        </p>
      </div>

      <div className="mission-cards">
        {CARDS.map(({ icon, title, desc }) => (
          <div key={title} className="mission-card">
            <div className="mission-card-icon">{icon}</div>
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
