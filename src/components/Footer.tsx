"use client";

import { ArrowUp } from "lucide-react";
import { Github, Linkedin } from "./ui/Icons";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-black border-t border-white/5 py-12 overflow-hidden">
      {/* Slow gradient animation background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute -inset-[100%] animate-[spin_60s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,rgba(59,130,246,0.1)_0deg,transparent_120deg,rgba(0,245,255,0.1)_240deg,transparent_360deg)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="w-10 h-10 rounded-full bg-black border border-white/10 flex items-center justify-center text-white shadow-[0_0_15px_rgba(0,245,255,0.1)]">
              <span className="text-sm font-bold font-heading">M</span>
            </span>
            <span className="font-medium text-white/80 font-heading tracking-wide ml-2 text-lg">Mohammed Muneeb Fouzan</span>
          </div>

          <div className="flex items-center gap-6 text-sm font-medium text-white/50">
            <a href="https://github.com/fouzanf" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-cyan-400 hover:text-cyan-400 hover:scale-125 hover:rotate-12 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,245,255,0.3)]">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/md-fouzanf" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-cyan-400 hover:text-cyan-400 hover:scale-125 hover:rotate-12 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,245,255,0.3)]">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          <button 
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 hover:bg-white/10 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 group hover:shadow-[0_0_15px_rgba(0,245,255,0.3)]"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        <div className="mt-12 text-center text-xs text-white/30 tracking-widest uppercase flex items-center justify-center">
          © {new Date().getFullYear()} — Designed & Engineered by Fouzan. All rights reserved.
        </div>
      </div>
    </footer>
  );
}