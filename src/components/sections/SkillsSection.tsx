"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const techStack = {
  row1: [
    { name: "React",         icon: "https://cdn.simpleicons.org/react/61DAFB" },
    { name: "Next.js",       icon: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
    { name: "TypeScript",    icon: "https://cdn.simpleicons.org/typescript/3178c6" },
    { name: "Tailwind CSS",  icon: "https://cdn.simpleicons.org/tailwindcss/06b6d4" },
    { name: "Framer Motion", icon: "https://cdn.simpleicons.org/framermotion/00F5FF" },
    { name: "Docker",        icon: "https://cdn.simpleicons.org/docker/2496ed" },
    { name: "FastAPI",       icon: "https://cdn.simpleicons.org/fastapi/009688" },
    { name: "Vercel",        icon: "https://cdn.simpleicons.org/vercel/ffffff" },
  ],
  row2: [
    { name: "Python",     icon: "https://cdn.simpleicons.org/python/ffd43b" },
    { name: "TensorFlow", icon: "https://cdn.simpleicons.org/tensorflow/ff6f00" },
    { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/336791" },
    { name: "MongoDB",    icon: "https://cdn.simpleicons.org/mongodb/47a248" },
    { name: "InfluxDB",   icon: "https://cdn.simpleicons.org/influxdb/22adf6" },
    { name: "Neo4j",      icon: "https://cdn.simpleicons.org/neo4j/008CC1" },
    { name: "Prisma",     icon: "https://cdn.simpleicons.org/prisma/ffffff" },
    { name: "Supabase",   icon: "https://cdn.simpleicons.org/supabase/3ECF8E" },
  ],
};

export function SkillsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const marqueeLeftRef = useRef<HTMLDivElement>(null);
  const marqueeRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    const pills = document.querySelectorAll(".tech-pill");
    pills.forEach((pill) => {
      pill.addEventListener("mouseenter", () => {
        gsap.to(pill, { scale: 1.08, y: -4, duration: 0.3, ease: "back.out(2)" });
      });
      pill.addEventListener("mouseleave", () => {
        gsap.to(pill, { scale: 1, y: 0, duration: 0.35, ease: "power2.out" });
      });
    });

    if (marqueeLeftRef.current && marqueeRightRef.current) {
      marqueeLeftRef.current.innerHTML += marqueeLeftRef.current.innerHTML;
      marqueeRightRef.current.innerHTML += marqueeRightRef.current.innerHTML;
      gsap.to(marqueeLeftRef.current, { xPercent: -50, ease: "none", duration: 30, repeat: -1 });
      gsap.fromTo(marqueeRightRef.current, { xPercent: -50 }, { xPercent: 0, ease: "none", duration: 30, repeat: -1 });
    }
  }, []);

  return (
    <section id="skills" ref={containerRef} className="py-24 bg-black overflow-hidden relative">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="section-heading-wrapper w-full md:w-fit mx-auto md:mx-0 mb-10 md:mb-14">
          <span className="section-number">04</span>
          <p className="section-label">· TECH STACK</p>
          <h2 className="section-heading section-title">What I Build With</h2>
          <div className="heading-line" />
        </div>
      </div>

      <div className="tech-marquee-section select-none">
        <div className="marquee-row-wrapper">
          <div className="overflow-hidden w-full flex">
            <div ref={marqueeLeftRef} className="marquee-row flex">
              {techStack.row1.map((tech, idx) => (
                <div key={idx} className="tech-pill">
                  <img src={tech.icon} alt={tech.name} />
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden w-full flex">
            <div ref={marqueeRightRef} className="marquee-row flex">
              {techStack.row2.map((tech, idx) => (
                <div key={idx} className="tech-pill">
                  <img src={tech.icon} alt={tech.name} />
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
