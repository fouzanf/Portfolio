"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Github } from "../ui/Icons";
import Link from "next/link";
import { SectionHeading } from "../ui/SectionHeading";
import { Badge } from "../ui/Badge";

const projects = [
  {
    id: "enpassant",
    title: "EnPassant",
    type: "AI Proxy Gateway",
    description: "High-performance AI proxy featuring regex-based PII redaction, sliding window rate limiter, and an O(1) semantic cache.",
    tech: ["FastAPI", "MongoDB Atlas", "Python"],
    colSpan: "md:col-span-2",
    githubUrl: "https://github.com/fouzanf/EnPassant",
    liveUrl: "https://en-passant-six.vercel.app/",
  },
  {
    id: "graphenautic",
    title: "Graphenautic",
    type: "Knowledge Graph & RAG Platform",
    description: "Hybrid semantic search combining Pinecone and Neo4j, with rate-limit-aware parallel document chunking.",
    tech: ["Next.js", "FastAPI", "Pinecone", "Neo4j"],
    colSpan: "md:col-span-1",
    githubUrl: "https://github.com/fouzanf/Graphenautic",
    liveUrl: "https://graphenautic.vercel.app/",
  },
  {
    id: "veritas-ai",
    title: "Veritas AI",
    type: "Misinformation Detection",
    description: "Real-time detection using Gemini API, secure SSO via NextAuth, and a mobile-first 3D depth interface.",
    tech: ["Next.js 15", "Gemini API", "NextAuth"],
    colSpan: "md:col-span-1",
    githubUrl: "https://github.com/fouzanf/veritas-ai-detector",
    liveUrl: "https://veritas-ai-detector-pi.vercel.app/",
  },
  {
    id: "sensai",
    title: "SENSAI",
    type: "AI Career Coach",
    description: "Automated mock interviews, persistent Neon DB performance dashboard, and background job processing with Inngest.",
    tech: ["Neon DB", "Inngest", "React"],
    colSpan: "md:col-span-1",
    githubUrl: "https://github.com/fouzanf/AI-Career-Coach-Sensai",
    liveUrl: "https://sensai-rose.vercel.app/",
  },
  {
    id: "vehiql",
    title: "Vehiql",
    type: "AI-Native Marketplace",
    description: "Automated vehicle listing creation using Gemini AI metadata extraction, Prisma/Supabase low-latency data layer, and Clerk RBAC.",
    tech: ["Next.js", "Prisma", "Supabase", "Gemini API", "Clerk"],
    colSpan: "md:col-span-1",
    githubUrl: "https://github.com/fouzanf/AI-Car-Marketplace",
    liveUrl: "https://vehiqlai.vercel.app/",
  },
];

function ProjectCard({ project, idx }: { project: any; idx: number }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      onMouseMove={handleMouseMove}
      className={`glass-panel rounded-3xl p-8 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300 min-h-[320px] relative overflow-hidden ${project.colSpan}`}
    >
      {/* Spotlight Spotlight Glows */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(59, 130, 246, 0.12), transparent 80%)`,
        }}
      />
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(250px circle at ${coords.x}px ${coords.y}px, rgba(139, 92, 246, 0.08), transparent 80%)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-blue-400 text-sm font-medium mb-1">{project.type}</div>
            <h3 className="text-3xl font-bold">{project.title}</h3>
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"><Github className="w-4 h-4" /></a>
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"><ExternalLink className="w-4 h-4" /></a>
          </div>
        </div>
        <p className="text-white/60 line-clamp-3">{project.description}</p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mt-8 relative z-10">
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech: string) => (
            <Badge key={tech} variant="glass" className="bg-white/5">{tech}</Badge>
          ))}
        </div>
        
        <Link href={`/projects/${project.id}`} className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-blue-400 transition-colors whitespace-nowrap">
          View Case Study
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 relative bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading 
          title="Featured Projects" 
          subtitle="Engineering robust systems, from O(1) caching layers to real-time AI platforms."
        />

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
