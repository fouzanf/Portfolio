"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading 
          title="Professional Experience" 
        />

        <div className="mt-16 relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10 hidden md:block" />

          {/* Deccan AI */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col md:flex-row gap-8 items-start"
          >
            {/* Timeline dot */}
            <div className="hidden md:flex relative z-10 w-16 h-16 rounded-full glass items-center justify-center shrink-0 border-blue-500/30">
              <Briefcase className="w-6 h-6 text-blue-400" />
            </div>

            <div className="glass-panel p-8 rounded-2xl flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                <div>
                  <h3 className="text-2xl font-bold">AI Prompt Engineering Intern</h3>
                  <div className="text-blue-400 font-medium">Deccan AI</div>
                </div>
                <div className="px-3 py-1 rounded-full bg-white/5 text-sm text-white/60 border border-white/10 whitespace-nowrap">
                  Feb 2026 - Apr 2026
                </div>
              </div>
              
              <ul className="space-y-3 text-white/70 mt-6">
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1">▹</span>
                  <span>Evaluated next-generation generative video models against naturalness benchmarks, identifying critical optimization paths.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1">▹</span>
                  <span>Designed multi-layered style transfer prompt templates to significantly improve visual output consistency.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1">▹</span>
                  <span>Documented edge-case failures to support model optimization and algorithmic refinement for the core ML team.</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
