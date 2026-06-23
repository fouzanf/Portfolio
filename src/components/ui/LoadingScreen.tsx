"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Glowing Logo Initials */}
            <div className="w-24 h-24 flex items-center justify-center border border-white/10 rounded-xl bg-white/5 backdrop-blur-md relative overflow-hidden">
              <span className="text-4xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
                MF
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
            {/* Outer pulse */}
            <motion.div
              className="absolute -inset-4 border border-blue-500/30 rounded-2xl"
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
