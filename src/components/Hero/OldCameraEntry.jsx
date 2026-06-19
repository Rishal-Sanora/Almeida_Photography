import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function OldCameraEntry({ onEnterComplete, fastMode = false }) {
  const [phase, setPhase] = useState("drawing");

  useEffect(() => {
    const drawTimer = setTimeout(() => {
      setPhase("flash");
      setTimeout(() => {
        setPhase("exit");
        setTimeout(() => {
          if (onEnterComplete) onEnterComplete();
        }, 800);
      }, fastMode ? 300 : 800);
    }, fastMode ? 500 : 1500);

    return () => clearTimeout(drawTimer);
  }, [fastMode, onEnterComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#fffaf0] pointer-events-auto"
        >
          <div className="relative w-32 h-32 md:w-48 md:h-48 mb-8 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "flash" ? [0, 1, 0] : 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0 bg-white scale-150 rounded-full blur-2xl z-10"
            />
            
            <svg viewBox="0 0 100 100" className="w-full h-full text-pink-500 overflow-visible relative z-20">
              <motion.path
                d="M 20 35 L 35 35 L 45 20 L 55 20 L 65 35 L 80 35 C 85.5 35 90 39.5 90 45 L 90 75 C 90 80.5 85.5 85 80 85 L 20 85 C 14.5 85 10 80.5 10 75 L 10 45 C 10 39.5 14.5 35 20 35 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: fastMode ? 0.5 : 1.2, ease: "easeInOut" }}
              />
              <motion.circle
                cx="50"
                cy="60"
                r="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: fastMode ? 0.5 : 1.0, delay: 0.2, ease: "easeInOut" }}
              />
              <motion.circle
                cx="75"
                cy="45"
                r="3"
                fill="currentColor"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: fastMode ? 0.3 : 0.8 }}
              />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default OldCameraEntry;
