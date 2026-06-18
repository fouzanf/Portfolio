"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { Badge } from "../ui/Badge";

const skillCategories = [
  {
    title: "AI & ML",
    skills: ["Generative AI", "LLMs", "RAG Systems", "Prompt Engineering", "Model Alignment"],
    gradient: "from-blue-500/20 to-purple-500/20",
    border: "border-blue-500/20",
  },
  {
    title: "Languages",
    skills: ["Python", "JavaScript", "TypeScript", "C++"],
    gradient: "from-yellow-500/20 to-orange-500/20",
    border: "border-yellow-500/20",
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "HTML5", "CSS3", "Shadcn UI"],
    gradient: "from-cyan-500/20 to-blue-500/20",
    border: "border-cyan-500/20",
  },
  {
    title: "Backend & Databases",
    skills: ["Node.js", "Express.js", "FastAPI", "Flask", "Prisma ORM", "MongoDB Atlas", "Supabase", "Neon DB", "Firebase", "Neo4j", "Pinecone"],
    gradient: "from-green-500/20 to-emerald-500/20",
    border: "border-green-500/20",
  },
];

function SkillCard({ category, idx }: { category: any; idx: number }) {
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      onMouseMove={handleMouseMove}
      className={`glass-panel p-8 rounded-2xl relative overflow-hidden group hover:border-white/20 transition-all duration-300 z-0`}
    >
      {/* Spotlight Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.05), transparent 80%)`,
        }}
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none z-0`} />
      
      <h3 className="text-2xl font-semibold mb-6 relative z-10">{category.title}</h3>
      <div className="flex flex-wrap gap-2 relative z-10">
        {category.skills.map((skill: string) => (
          <Badge key={skill} variant="glass" className="group-hover:bg-white/10 group-hover:border-white/20 transition-colors">
            {skill}
          </Badge>
        ))}
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading 
          title="Tech Stack & Expertise" 
          subtitle="A comprehensive toolkit for building modern, AI-integrated web applications."
        />

        <div className="grid md:grid-cols-2 gap-6 mt-16">
          {skillCategories.map((category, idx) => (
            <SkillCard key={category.title} category={category} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
