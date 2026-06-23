import { gsap } from "gsap";

// Global Animation Configuration
export const globalAnimConfig = {
  ease: "power4.out",
  duration: 0.9,
  stagger: 0.12,
};

// Common ScrollTrigger defaults
export const scrollTriggerDefaults = {
  toggleActions: "play none none none",
};

// Reusable Framer Motion Variants
export const fadeInVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.9, ease: [0.25, 1, 0.5, 1] } // roughly power4.out
  }
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    }
  }
};

/**
 * Utility to split text into chars or words for GSAP animations
 * If using SplitText (GSAP Club), you'd use that, but here's a basic manual split for words.
 */
export const splitWordsForGSAP = (text: string) => {
  return text.split(" ").map(word => `<span class="inline-block overflow-hidden"><span class="inline-block word-split">${word}</span></span>`).join(" ");
};
