"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  FileText,
  Mail,
  Code2,
  Briefcase,
  User,
  ExternalLink,
  Link2,
  type LucideIcon,
} from "lucide-react";

interface Command {
  id: string;
  label: string;
  description: string;
  category: "Navigate" | "Links" | "Actions";
  icon: LucideIcon;
  action: () => void;
  kbd?: string;
}

const buildCommands = (): Command[] => [
  {
    id: "projects",
    label: "View Projects",
    description: "See my work and case studies",
    category: "Navigate",
    icon: Code2,
    action: () => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }),
    kbd: "P",
  },
  {
    id: "experience",
    label: "Experience",
    description: "My professional journey",
    category: "Navigate",
    icon: Briefcase,
    action: () => document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" }),
    kbd: "E",
  },
  {
    id: "skills",
    label: "Skills & Tech",
    description: "Technologies I work with",
    category: "Navigate",
    icon: ArrowRight,
    action: () => document.querySelector("#skills")?.scrollIntoView({ behavior: "smooth" }),
    kbd: "S",
  },
  {
    id: "about",
    label: "About Me",
    description: "Who I am and what I do",
    category: "Navigate",
    icon: User,
    action: () => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" }),
    kbd: "A",
  },
  {
    id: "contact",
    label: "Contact Me",
    description: "Get in touch",
    category: "Navigate",
    icon: Mail,
    action: () => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }),
    kbd: "C",
  },
  {
    id: "resume",
    label: "Download Resume",
    description: "Get my latest resume (PDF)",
    category: "Links",
    icon: FileText,
    action: () =>
      window.open(
        "https://drive.google.com/file/d/19g6D8H_bdxX3LxCaXq5ReE6X-EeJ1yuB/view",
        "_blank"
      ),
  },
  {
    id: "github",
    label: "GitHub",
    description: "github.com/fouzanf17",
    category: "Links",
    icon: Link2,
    action: () => window.open("https://github.com/fouzanf17", "_blank"),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    description: "Connect with me on LinkedIn",
    category: "Links",
    icon: Link2,
    action: () => window.open("https://linkedin.com/in/fouzanf17", "_blank"),
  },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const commands = buildCommands();

  const filtered = query.trim()
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.description.toLowerCase().includes(query.toLowerCase()) ||
          c.category.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  const categories = Array.from(new Set(filtered.map((c) => c.category)));

  // Global keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery("");
      setCursor(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  // Keyboard navigation inside palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[cursor]?.action();
      setOpen(false);
    }
  };

  // Expose open fn globally so Navbar can trigger it
  useEffect(() => {
    (window as any).__openCommandPalette = () => setOpen(true);
    return () => {
      delete (window as any).__openCommandPalette;
    };
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cmd-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[900] bg-black/60 backdrop-blur-md"
          />

          {/* Palette */}
          <motion.div
            key="cmd-palette"
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="command-palette"
          >
            {/* Search bar */}
            <div className="cmd-search">
              <Search className="cmd-search-icon" size={17} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCursor(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search commands..."
                className="cmd-input"
                autoComplete="off"
              />
              <kbd className="cmd-esc-key">ESC</kbd>
            </div>

            {/* Results */}
            <div ref={listRef} className="cmd-results">
              {filtered.length === 0 && (
                <div className="cmd-empty">
                  <Search size={28} className="cmd-empty-icon" />
                  <p>No results for &ldquo;{query}&rdquo;</p>
                </div>
              )}

              {categories.map((cat) => {
                const items = filtered.filter((c) => c.category === cat);
                return (
                  <div key={cat} className="cmd-group">
                    <span className="cmd-group-label">{cat}</span>
                    {items.map((cmd) => {
                      const globalIdx = filtered.indexOf(cmd);
                      const Icon = cmd.icon;
                      return (
                        <button
                          key={cmd.id}
                          className={`cmd-item ${globalIdx === cursor ? "cmd-item-active" : ""}`}
                          onClick={() => {
                            cmd.action();
                            setOpen(false);
                          }}
                          onMouseEnter={() => setCursor(globalIdx)}
                        >
                          <span className="cmd-item-icon-wrap">
                            <Icon size={15} />
                          </span>
                          <span className="cmd-item-content">
                            <span className="cmd-item-label">{cmd.label}</span>
                            <span className="cmd-item-desc">{cmd.description}</span>
                          </span>
                          <span className="cmd-item-right">
                            {cmd.kbd && <kbd className="cmd-item-kbd">{cmd.kbd}</kbd>}
                            {cmd.category === "Links" && (
                              <ExternalLink size={12} className="cmd-item-ext" />
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="cmd-footer">
              <span><kbd>↑↓</kbd> navigate</span>
              <span><kbd>↵</kbd> open</span>
              <span><kbd>esc</kbd> close</span>
              <span className="cmd-footer-brand">⌘K</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
