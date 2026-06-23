"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { Github, Linkedin } from "../ui/Icons";
import { toast } from "sonner";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { globalAnimConfig } from "@/lib/animations";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    // Web3Forms requires access_key in the payload
    data.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "");
    data.append("subject", `Portfolio Contact — ${data.get("name") ?? "New message"}`);
    data.append("from_name", "Portfolio Contact Form");
    // Redirect to same page (no redirect)
    data.append("redirect", "false");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });

      const json = await res.json();

      if (json.success) {
        setStatus("success");
        toast.success("Message sent! I'll get back to you soon.");
        form.reset();
        // Reset status after a beat so the button returns to normal
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        throw new Error(json.message ?? "Submission failed");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      toast.error("Something went wrong. Please try again or email me directly.");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current) {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { scale: 3, filter: "blur(20px)", opacity: 0 },
          {
            scale: 1,
            filter: "blur(0px)",
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
          }
        );
      }

      if (gridRef.current) {
        gsap.to(gridRef.current, {
          backgroundPosition: "50% 100%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      const formContainer = sectionRef.current.querySelector(".contact-card");
      if (formContainer) {
        gsap.fromTo(
          formContainer,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: globalAnimConfig.duration,
            ease: globalAnimConfig.ease,
            scrollTrigger: { trigger: formContainer, start: "top 80%" },
          }
        );
      }
    }
  }, []);

  const isSubmitting = status === "submitting";

  return (
    <section id="contact" className="py-32 relative bg-black overflow-hidden" ref={sectionRef}>

      {/* Background perspective grid */}
      <div
        ref={gridRef}
        className="absolute inset-0 z-0 opacity-20 pointer-events-none perspective-1000"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 245, 255, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 245, 255, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          transform: "rotateX(60deg) scale(2) translateY(-100px)",
          transformOrigin: "top center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">

        {/* Section heading */}
        <div className="section-heading-wrapper mx-auto mb-12">
          <span className="section-number">05</span>
          <h2 className="section-heading">Contact</h2>
          <div className="heading-line" />
        </div>

        <div className="contact-heading-wrapper text-center mb-10 md:mb-20 overflow-hidden py-6 md:py-10">
          <h2 ref={headingRef} className="text-3xl sm:text-5xl md:text-8xl font-black font-heading mb-4 md:mb-6 tracking-tighter will-change-transform">
            Let's Build <br className="md:hidden" />
            <span className="text-transparent bg-clip-text premium-gradient">Something.</span>
          </h2>
          <p className="text-base md:text-xl text-white/60 max-w-2xl mx-auto font-light px-4 md:px-0">
            Ready to architect the next big thing? Drop me a line, and let's turn your vision into reality.
          </p>
        </div>

        <div className="contact-card w-full max-w-5xl grid md:grid-cols-5 gap-8 md:gap-12 glass-card p-6 md:p-12 rounded-3xl relative overflow-hidden">

          {/* Left — contact info */}
          <div className="md:col-span-2 flex flex-col justify-between relative z-10">
            <div>
              <h3 className="text-3xl font-bold font-heading mb-2 text-white">Contact Info</h3>
              <p className="text-white/60 mb-6 md:mb-12">Feel free to reach out through any of these platforms.</p>

              <div className="space-y-5 md:space-y-8">
                <a
                  href="mailto:fouzanf17@gmail.com"
                  className="flex items-center gap-6 text-white/70 hover:text-cyan-400 transition-colors group"
                >
                  <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/10 group-hover:border-cyan-500/50 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,245,255,0.3)]">
                    <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="font-medium tracking-wide">
                    fouzanf17<br />@gmail.com
                  </span>
                </a>

                <a
                  href="https://linkedin.com/in/md-fouzanf"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-6 text-white/70 hover:text-cyan-400 transition-colors group"
                >
                  <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/10 group-hover:border-cyan-500/50 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,245,255,0.3)]">
                    <Linkedin className="w-6 h-6 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
                  </div>
                  <span className="font-medium tracking-wide">LinkedIn Profile</span>
                </a>

                <a
                  href="https://github.com/fouzanf"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-6 text-white/70 hover:text-cyan-400 transition-colors group"
                >
                  <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/10 group-hover:border-cyan-500/50 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,245,255,0.3)]">
                    <Github className="w-6 h-6 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
                  </div>
                  <span className="font-medium tracking-wide">GitHub Profile</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="md:col-span-3 relative z-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-white/50 ml-1 uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    disabled={isSubmitting}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 shadow-[0_0_0_rgba(0,245,255,0)] focus:shadow-[0_0_15px_rgba(0,245,255,0.15)] disabled:opacity-50"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white/50 ml-1 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    disabled={isSubmitting}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 shadow-[0_0_0_rgba(0,245,255,0)] focus:shadow-[0_0_15px_rgba(0,245,255,0.15)] disabled:opacity-50"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-white/50 ml-1 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  disabled={isSubmitting}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 resize-none shadow-[0_0_0_rgba(0,245,255,0)] focus:shadow-[0_0_15px_rgba(0,245,255,0.15)] disabled:opacity-50"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative group overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-4"
              >
                <div className="absolute inset-0 premium-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex items-center justify-center py-4 text-white font-semibold tracking-wide">
                  {status === "submitting" && (
                    <span className="flex items-center gap-3">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  )}
                  {status === "success" && (
                    <span className="flex items-center gap-3 text-green-400">
                      <CheckCircle className="w-5 h-5" />
                      Message Sent!
                    </span>
                  )}
                  {status === "error" && (
                    <span className="flex items-center gap-3 text-red-400">
                      <AlertCircle className="w-5 h-5" />
                      Try Again
                    </span>
                  )}
                  {status === "idle" && (
                    <span className="flex items-center gap-3">
                      Transmit Message
                      <Send className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform duration-300" />
                    </span>
                  )}
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
