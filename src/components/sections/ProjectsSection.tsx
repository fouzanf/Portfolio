"use client";

import { useRef, useState, useEffect } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Github } from "../ui/Icons";
import { Badge } from "../ui/Badge";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: "enpassant",
    name: "EnPassant",
    tagline: "AI Proxy Gateway",
    description: "Production-grade AI proxy combining PII redaction, O(1) semantic caching returning queries in 2–5ms, and sliding window rate limiting as a single drop-in service.",
    stack: ["Python", "FastAPI", "MongoDB Atlas", "Next.js", "Tailwind CSS", "Vercel"],
    accent: "#3B82F6",
    highlight: "O(1) cache · 2–5ms · Zero token cost",
    liveUrl: "https://enpassant-chess.vercel.app/",
    githubUrl: "https://github.com/fouzanf/enpassant"
  },
  {
    id: "graphenautic",
    name: "Graphenautic",
    tagline: "Knowledge Graph & RAG Platform",
    description: "Multi-tenant RAG platform converting documents into interactive knowledge graph canvases with hybrid Pinecone vector + Neo4j graph traversal search.",
    stack: ["Next.js", "FastAPI", "Neo4j", "Pinecone", "Gemini API", "Zustand"],
    accent: "#8B5CF6",
    highlight: "Multi-hop queries · Zero cross-tenant leakage",
    liveUrl: "https://graphenautic.vercel.app/",
    githubUrl: "https://github.com/fouzanf/graphenautic"
  },
  {
    id: "veritas-ai",
    name: "Veritas AI",
    tagline: "Misinformation Detection Platform",
    description: "Real-time fake news detection using Gemini API with secure Google OAuth SSO and hardware-accelerated 3D visualizations.",
    stack: ["Next.js 15", "TypeScript", "Gemini API", "NextAuth", "Framer Motion"],
    accent: "#00F5FF",
    highlight: "Real-time detection · Google OAuth",
    liveUrl: "https://veritas-ai-detector-pi.vercel.app/",
    githubUrl: "https://github.com/fouzanf/veritas-ai-detector"
  },
  {
    id: "sensai",
    name: "SENSAI",
    tagline: "AI Career Coach",
    description: "Automated mock interview platform with real-time Gemini AI feedback, Neon DB performance tracking, and async inference via Inngest.",
    stack: ["Next.js", "TypeScript", "Gemini API", "Neon DB", "Clerk", "Inngest"],
    accent: "#F59E0B",
    highlight: "Real-time AI feedback · Async inference",
    liveUrl: "https://sensai-learn.vercel.app/",
    githubUrl: "https://github.com/fouzanf/sensai"
  },
  {
    id: "vehiql",
    name: "Vehiql",
    tagline: "AI-Native Car Marketplace",
    description: "Full-stack car marketplace with Gemini-powered metadata extraction, Supabase/Prisma backend, Clerk-based Role-Based Access Control, and a dynamic vehicle scheduling and booking engine.",
    stack: ["Next.js", "TypeScript", "Gemini AI", "Supabase", "Prisma", "Clerk"],
    accent: "#22C55E",
    highlight: "AI metadata extraction · RBAC · Live booking engine",
    liveUrl: "https://vehiqlai.vercel.app/",
    githubUrl: "https://github.com/fouzanf/AI-Car-Marketplace"
  }
];

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      gsap.to(card, {
        rotateY: x * 12,
        rotateX: -y * 12,
        transformPerspective: 1000,
        ease: "power2.out",
        duration: 0.4,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const numString = (index + 1).toString().padStart(2, '0');
  const slugPath = `/projects/${project.id}`;

  return (
    <div
      ref={cardRef}
      className="project-card glass-card rounded-3xl group transition-colors duration-300 relative overflow-hidden md:overflow-visible"
      style={{ '--accent': project.accent } as React.CSSProperties}
    >
      <div className="project-card-inner">
        {/* Massive Faded Background Number */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] md:text-[300px] font-black text-white/[0.03] select-none pointer-events-none font-heading z-0">
          {numString}
        </div>

        {/* Thin Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-10 mix-blend-overlay rounded-3xl group-hover:opacity-20 transition-opacity"
             style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)' }} 
        />
        
        {/* Accent Glow border effect */}
        <div className="absolute inset-0 pointer-events-none z-[5] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_50px_var(--accent)_inset]" />

        {/* Header (Top) */}
        <div className="project-card-top relative z-20">
          <div className="project-card-title-area">
            <div className="project-number mb-2">{project.tagline}</div>
            <h3 className="project-title">{project.name}</h3>
            {project.highlight && (
              <div className="project-highlight font-mono text-cyan-400 mt-2 font-semibold tracking-wider">
                {project.highlight}
              </div>
            )}
          </div>
          <div className="flex gap-2 md:gap-3 shrink-0">
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 shadow-[0_0_0_rgba(0,245,255,0)] hover:shadow-[0_0_15px_rgba(0,245,255,0.4)]">
              <Github className="w-4 h-4 md:w-5 md:h-5" />
            </a>
            {project.liveUrl !== "#" && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 shadow-[0_0_0_rgba(0,245,255,0)] hover:shadow-[0_0_15px_rgba(0,245,255,0.4)]">
                <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            )}
          </div>
        </div>

        {/* Content (Middle) */}
        <div className="project-card-content flex-1 w-full bg-black/60 rounded-xl border border-white/10 overflow-hidden relative flex flex-col group-hover:border-cyan-400/50 transition-colors z-20">
          <div className="h-10 border-b border-white/10 bg-white/5 flex items-center px-2.5 md:px-4 gap-2">
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="mx-auto px-2 md:px-4 py-1 rounded bg-black/50 text-xs text-white/40 font-mono truncate max-w-[110px] sm:max-w-[160px] md:max-w-sm">
              {project.liveUrl}
            </div>
          </div>
          <div className="relative flex items-center justify-center p-4 md:p-8 md:flex-1 min-h-[130px] md:min-h-0">
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
            <p className="text-white/80 text-sm md:text-xl leading-relaxed text-center max-w-3xl font-light relative z-10">
              {project.description}
            </p>
          </div>
        </div>

        {/* Footer (Bottom) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 md:gap-6 relative z-20">
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {project.stack.map((tech: string) => (
              <Badge key={tech} variant="glass" className="bg-white/5 border-white/10 text-cyan-50 text-[0.7rem] md:text-xs px-2 md:px-3 py-0.5 md:py-1">
                {tech}
              </Badge>
            ))}
          </div>

          <button
            onClick={() => window.location.href = slugPath}
            className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all duration-300 overflow-hidden relative group/btn md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 shrink-0"
          >
            <span className="relative z-10 flex items-center">
              View Case Study
              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [hintVisible, setHintVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile || !containerRef.current || !trackRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray(".project-card");
    
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      pin: true,
      pinSpacing: true, // we control the spacing in css
      start: "top top",
      end: () => `+=${(cards.length - 1) * window.innerWidth * 0.85}`,
      scrub: 1.2,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const index = Math.round(self.progress * (cards.length - 1));
        setActiveIndex(index);
        if (self.progress > 0.05) {
          setHintVisible(false);
        }
      }
    });

    gsap.to(cards, {
      xPercent: -100 * (cards.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${(cards.length - 1) * window.innerWidth * 0.85}`,
        scrub: 1.5,
      }
    });

    return () => {
      trigger.kill();
    };
  }, [isMobile]);

  const scrollToCard = (index: number) => {
    setHintVisible(false);
    const trigger = ScrollTrigger.getAll().find(t => t.vars.trigger === containerRef.current);
    if (trigger) {
      const start = trigger.start;
      const end = trigger.end;
      const totalDistance = end - start;
      const targetScroll = start + (index / (projects.length - 1)) * totalDistance;
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth"
      });
    }
  };

  const scrollToNext = () => {
    const nextIdx = Math.min(activeIndex + 1, projects.length - 1);
    scrollToCard(nextIdx);
  };

  const scrollToPrev = () => {
    const prevIdx = Math.max(activeIndex - 1, 0);
    scrollToCard(prevIdx);
  };

  if (isMobile) {
    return (
      <section id="projects" className="bg-black py-16 px-4 w-full projects-section overflow-x-hidden">
        {/* Section header */}
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-bg-number">03</span>
          <span className="section-label">· SELECTED WORK</span>
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">Things I've built that actually ship</p>
        </motion.div>

        <div className="mobile-projects flex flex-col gap-6 w-full mt-8">
          {/* Featured project — blur-lift entrance */}
          <motion.div
            initial={{ opacity: 0, y: 70, scale: 0.95, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProjectCard project={projects[0]} index={0} />
          </motion.div>

          {/* See All button */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="flex justify-center"
          >
            <button className="see-all-btn" onClick={() => setShowAll(!showAll)}>
              {/* Animated shimmer sweep */}
              <span className="see-all-shimmer" aria-hidden="true" />
              {/* Plus ↔ × icon */}
              <span
                className="see-all-icon"
                style={{
                  transform: showAll ? "rotate(45deg)" : "rotate(0deg)",
                  transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
              <span className="see-all-text">
                {showAll ? "Show Less" : "View All Projects"}
              </span>
              {!showAll && <span className="see-all-count">{projects.length}</span>}
            </button>
          </motion.div>

          {/* Expandable drawer */}
          <AnimatePresence initial={false}>
            {showAll && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="projects-drawer flex flex-col gap-6 overflow-hidden"
              >
                {projects.slice(1).map((p, idx) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 60, scale: 0.96, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{
                      duration: 0.85,
                      delay: idx * 0.13,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <ProjectCard project={p} index={idx + 1} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    );
  }

  const progressPercent = activeIndex / (projects.length - 1);

  return (
    <section className="projects-section bg-black" ref={containerRef}>
      
      {/* Section header — compact, clean */}
      <div className="projects-header">
        {/* Background number — much smaller and more faded */}
        <span className="section-bg-number">03</span>
        
        {/* ONE label only — not both label and title showing same info */}
        <span className="section-label">· SELECTED WORK</span>
        
        {/* Title — properly sized, not giant */}
        <h2 className="section-title">Projects</h2>
        
        <p className="section-subtitle">
          Things I've built that actually ship
        </p>
      </div>

      {/* Scrolling cards track — completely separate from header */}
      <div className="projects-track-wrapper">
        
        {/* Swipe explore hint */}
        <div 
          className={`absolute top-4 left-1/2 -translate-x-1/2 z-40 pointer-events-none transition-all duration-500 flex items-center gap-4 text-cyan-400 font-mono bg-black/60 px-8 py-2 rounded-full border border-cyan-400/30 backdrop-blur-md ${
            hintVisible ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          Swipe/Scroll to explore <ArrowRight className="w-5 h-5 animate-pulse" />
        </div>

        {/* Arrow buttons */}
        <button 
          onClick={scrollToPrev} 
          disabled={activeIndex === 0}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-40 w-14 h-14 rounded-full border border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:border-cyan-400 hover:text-cyan-400 disabled:opacity-20 disabled:pointer-events-none transition-all duration-300 cursor-pointer"
        >
          ←
        </button>
        <button 
          onClick={scrollToNext} 
          disabled={activeIndex === projects.length - 1}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-40 w-14 h-14 rounded-full border border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:border-cyan-400 hover:text-cyan-400 disabled:opacity-20 disabled:pointer-events-none transition-all duration-300 cursor-pointer"
        >
          →
        </button>

        <div className="projects-track" ref={trackRef}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>

      {/* Progress bar and dots BELOW cards */}
      <div className="projects-controls relative h-16 w-full">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/10 z-[100]">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 transition-all duration-300 origin-left"
            style={{ width: `${progressPercent * 100}%` }}
          />
        </div>
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-40 flex gap-4">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === i 
                  ? "bg-cyan-400 scale-125 shadow-[0_0_10px_#00f5ff]" 
                  : "bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
