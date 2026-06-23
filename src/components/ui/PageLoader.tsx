"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // The loading sequence takes ~2 seconds before fading out
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // at 2.0s, hero sequence begins, meaning loader unmounts

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Container for the sequence */}
          <div className="relative flex items-center justify-center w-40 h-40">
            {/* 0.0s - Small dot expands into circle (0.0s -> 0.3s) */}
            <motion.div
              className="absolute w-2 h-2 bg-white rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0] }}
              transition={{ duration: 0.4, times: [0, 0.8, 1], ease: "easeOut" }}
            />

            {/* 0.3s - Circle outline draws itself */}
            <motion.svg
              className="absolute w-32 h-32"
              viewBox="0 0 100 100"
              initial="hidden"
              animate="visible"
            >
              <motion.circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="2"
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  visible: { 
                    pathLength: 1, 
                    opacity: 1,
                    transition: { delay: 0.3, duration: 1, ease: "easeInOut" }
                  }
                }}
              />
            </motion.svg>

            {/* 0.8s - Initials appear */}
            <motion.div 
              className="absolute flex items-center justify-center text-2xl font-bold tracking-widest font-heading text-white"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
            >
              MF
            </motion.div>

            {/* 1.5s - Radial burst / shatter */}
            <motion.div
              className="absolute inset-0 border border-cyan-400 rounded-full"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 2, 4] }}
              transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
