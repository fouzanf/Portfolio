"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "./ui/Button";
import { toast } from "sonner";

export function Footer() {
  const formRef = useRef<HTMLFormElement>(null);
  // Replaced useActionState with a simple loading state
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("🔥 THE SUBMIT BUTTON WAS CLICKED!");
    setIsPending(true);

    try {
      const formData = new FormData(e.currentTarget);

      // 1. Send the request directly from the browser to bypass Cloudflare
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          // Notice we use the NEXT_PUBLIC key here
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          name: formData.get("senderName"),
          email: formData.get("senderEmail"),
          message: formData.get("message"),
        }),
      });

      const result = await response.json();

      // 2. Handle the response directly
      if (response.status === 200) {
        toast.success(result.message || "Message sent successfully!");
        formRef.current?.reset();
      } else {
        toast.error(result.message || "Failed to send message.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <footer id="contact" className="relative border-t border-white/10 bg-background overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-16">

          <div className="flex flex-col justify-between">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
              >
                Let&apos;s Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Future.</span>
              </motion.h2>
              <p className="text-white/60 text-lg max-w-md mb-8">
                I&apos;m currently open for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
              </p>
            </div>

            <div className="space-y-4">
              <a href="mailto:fouzanf17@gmail.com" className="flex items-center gap-4 text-white/80 hover:text-white group transition-colors">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-sm text-white/40">Email</div>
                  <div className="font-medium">fouzanf17@gmail.com</div>
                </div>
              </a>
              <div className="flex items-center gap-4 text-white/80">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                  <Phone className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-sm text-white/40">Phone</div>
                  <div className="font-medium">+91 94881 88323</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white/80">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="text-sm text-white/40">Location</div>
                  <div className="font-medium">Bengaluru, India</div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-2xl p-8"
          >
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>

            {/* Changed from action to onSubmit */}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input
                  type="text"
                  id="name"
                  name="senderName"
                  placeholder="Your Name"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  type="email"
                  id="email"
                  name="senderEmail"
                  placeholder="Your Email"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Your Message"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isPending}
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </motion.div>

        </div>

        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-white/40 text-sm">
          <p>© {new Date().getFullYear()} Mohammed Muneeb Fouzan. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://github.com/fouzanf" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/md-fouzanf" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}