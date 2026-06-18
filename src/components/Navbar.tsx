"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Mail } from "lucide-react";
import { Github, Linkedin } from "./ui/Icons";
import Link from "next/link";
import { Button } from "./ui/Button";

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "glass border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
            M
          </span>
          <span>Fouzan</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <a href="#skills" className="hover:text-white transition-colors">Skills</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#experience" className="hover:text-white transition-colors">Experience</a>
        </nav>

        <div className="flex items-center gap-4">
          <a href="https://github.com/fouzanf" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/md-fouzanf" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <Button variant="primary" size="sm" className="hidden md:inline-flex" onClick={() => document.getElementById('contact')?.scrollIntoView()}>
            <Mail className="w-4 h-4 mr-2" />
            Let&apos;s Talk
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
