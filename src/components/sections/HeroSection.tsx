"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";

export function HeroSection() {
  const { scrollY } = useScroll();
  // 3D Perspective scroll-driven transformations
  const rotateX = useTransform(scrollY, [0, 600], [0, 15]);
  const y = useTransform(scrollY, [0, 600], [0, 80]);
  const scale = useTransform(scrollY, [0, 600], [1, 0.95]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" style={{ perspective: 1200 }}>
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col items-center text-center">
        <motion.div 
          style={{ rotateX, y, scale, opacity, transformStyle: "preserve-3d" }}
          className="flex flex-col items-center text-center w-full"
        >
          {/* Social Proof Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm font-medium text-blue-100">Top 1% in Data Structures & Algorithms (Young Turks)</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-8 leading-[1.1]"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60">Generative AI</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">& Full-Stack Developer</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 max-w-3xl mb-12 leading-relaxed"
          >
            Building production-grade RAG pipelines, AI proxy gateways, knowledge graphs, and LLM-integrated web applications that scale.
          </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button size="lg" onClick={() => document.getElementById('projects')?.scrollIntoView()}>
            View Projects
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => window.open("https://drive.google.com/file/d/19g6D8H_bdxX3LxCaXq5ReE6X-EeJ1yuB/view?usp=drive_link", "_blank")}
          >
            Download Resume
            <Download className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>

        {/* Futuristic HUD Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 w-full max-w-4xl glass-panel rounded-2xl p-6 border border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-left relative overflow-hidden"
        >
          {/* Ambient glow inside HUD */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
          
          <div className="border-r border-white/5 pr-4">
            <div className="text-xs font-mono text-white/40 mb-1">SYSTEM_STATUS</div>
            <div className="text-lg font-bold text-green-400 flex items-center gap-2 font-mono">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              ONLINE_
            </div>
          </div>

          <div className="border-r border-white/5 pr-4 md:pl-4">
            <div className="text-xs font-mono text-white/40 mb-1">PIPELINE_LATENCY</div>
            <div className="text-lg font-bold text-blue-400 font-mono">SUB_100MS_</div>
          </div>

          <div className="border-r border-white/5 pr-4 md:pl-4 col-span-1">
            <div className="text-xs font-mono text-white/40 mb-1">ACTIVE_MODELS</div>
            <div className="text-lg font-bold text-purple-400 font-mono">GEMINI_COGNITIVE_</div>
          </div>

          <div className="md:pl-4 col-span-1">
            <div className="text-xs font-mono text-white/40 mb-1">GRAPH_RELATIONS</div>
            <div className="text-lg font-bold text-amber-400 font-mono">10K+_ENTITIES_</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
  );
}
