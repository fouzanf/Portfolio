"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function ExperienceSection() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Timeline line draws itself
    gsap.to(".timeline-progress-line", {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".timeline-container",
        start: "top 75%",
        end: "bottom 25%",
        scrub: 1,
      }
    });

    // Card slides up and fades in
    gsap.fromTo(".exp-card",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".exp-card",
          start: "top 85%",
          toggleActions: "play none none none",
        }
      }
    );

    // Dot glow pulse when it enters view
    ScrollTrigger.create({
      trigger: ".exp-dot",
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(".exp-dot-inner",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" }
        );
      }
    });

    // Bullet points stagger in
    gsap.fromTo(".exp-bullets li",
      { x: -20, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".exp-bullets",
          start: "top 85%",
        }
      }
    );
  }, []);

  return (
    <section className="experience-section" id="experience">
      <div className="section-heading-wrapper w-full md:w-fit">
        <span className="section-bg-number">02</span>
        <p className="section-label">· EXPERIENCE</p>
        <h2 className="section-title">Where I've Worked</h2>
      </div>

      <div className="timeline-container">
        {/* Animated SVG line */}
        <div className="timeline-line-wrap">
          <svg className="timeline-svg" width="2" height="100%"
            preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
            <line className="timeline-bg-line"
              x1="1" y1="0" x2="1" y2="100%"
              stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
            <line className="timeline-progress-line"
              x1="1" y1="0" x2="1" y2="100%"
              stroke="url(#lineGrad)" strokeWidth="2"
              strokeDasharray="2000" strokeDashoffset="2000" />
          </svg>
        </div>

        {/* Experience card */}
        <div className="exp-card">
          <div className="exp-dot">
            <div className="exp-dot-inner" />
            <div className="exp-dot-ring" />
          </div>
          <div className="exp-content">
            <div className="exp-header">
              <div>
                <h3 className="exp-role">AI Prompt Engineering Intern</h3>
                <p className="exp-company">Deccan AI</p>
              </div>
              <span className="exp-date">Feb 2026 – Apr 2026</span>
            </div>
            <p className="exp-location">📍 Bengaluru, Karnataka (Remote)</p>
            <ul className="exp-bullets">
              <li>Evaluated next-gen generative video models against naturalness benchmarks</li>
              <li>Designed prompt templates for complex multi-layered style transfers</li>
              <li>Documented edge-case failures for model optimization cycles</li>
              <li>Reviewed model output across complex lighting, shadows, and reflections</li>
            </ul>
            <div className="exp-tags">
              {["Prompt Engineering","Generative AI","Video Models","Model Alignment"].map(t => (
                <span key={t} className="exp-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
