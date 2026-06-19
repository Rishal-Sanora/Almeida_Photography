import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function CameraEntry({ onEnterComplete, onExitStart, fastMode = false }) {
  const [phase, setPhase] = useState("entering");

  const letters = ["A", "L", "M", "E", "I", "D", "A"];
  
  // Deterministic scatter positions
  const scatterPositions = [
    { x: -100, y: -200, rotate: -30 },
    { x: 150, y: -100, rotate: 20 },
    { x: -200, y: 100, rotate: -40 },
    { x: 50, y: 150, rotate: 30 },
    { x: -80, y: -200, rotate: -20 },
    { x: 200, y: 80, rotate: 45 },
    { x: -150, y: 150, rotate: -60 },
  ];

  // Glitter Particles (Reduced to 35 for performance)
  const colors = ["#22d3ee", "#38bdf8", "#fde047", "#ffffff", "#c084fc"];
  const particles = Array.from({ length: 35 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 5 + 2,
    duration: Math.random() * 1.5 + 0.8,
    delay: Math.random() * 2,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));

  useEffect(() => {
    // Letters entrance finishes at ~2.4s. 
    // Start exit smoothly at 2.6s so there is zero stagnant "stuck" time.
    const timerExit = setTimeout(() => {
      setPhase("exiting");
      if (onExitStart) onExitStart();
      
      // The exit wipe takes 2.4s max. Unmount exactly at 2600ms to guarantee no clips.
      setTimeout(() => {
        if (onEnterComplete) onEnterComplete();
      }, 2600);
    }, fastMode ? 800 : 2600);

    return () => clearTimeout(timerExit);
  }, [fastMode, onEnterComplete, onExitStart]);

  // Smooth cinematic ease
  const exitEase = [0.65, 0, 0.35, 1];

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center pointer-events-auto overflow-hidden bg-transparent">
      
      {/* --- SLEEK WAVY LAYERED WIPE --- */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
        
        {/* Base Background Wave */}
        <motion.svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          initial={{ y: 0 }}
          animate={{ y: phase === "exiting" ? "-120vh" : 0 }}
          transition={{ duration: 1.8, ease: exitEase, delay: phase === "exiting" ? 0.25 : 0 }} 
          className="absolute inset-0 w-full h-[120vh] z-[3] will-change-transform fill-[#FFFFFF] drop-shadow-2xl"
        >
          {/* Asymmetric fluid wave */}
          <path d="M0,0 L100,0 L100,80 C70,110 30,60 0,90 Z" />
        </motion.svg>

        {/* Secondary Color Wave */}
        <motion.svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          initial={{ y: 0 }}
          animate={{ y: phase === "exiting" ? "-120vh" : 0 }}
          transition={{ duration: 1.8, ease: exitEase, delay: phase === "exiting" ? 0.12 : 0 }} 
          className="absolute inset-0 w-full h-[120vh] z-[2] will-change-transform fill-[#FBBF24]/90"
        >
          {/* Organic intersecting wave */}
          <path d="M0,0 L100,0 L100,85 C65,100 35,70 0,85 Z" />
        </motion.svg>

        {/* Tertiary Color Wave */}
        <motion.svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          initial={{ y: 0 }}
          animate={{ y: phase === "exiting" ? "-120vh" : 0 }}
          transition={{ duration: 1.8, ease: exitEase, delay: phase === "exiting" ? 0 : 0 }} 
          className="absolute inset-0 w-full h-[120vh] z-[1] will-change-transform fill-[#FB7185]/95"
        >
          {/* Sweeping deep wave */}
          <path d="M0,0 L100,0 L100,75 C75,95 25,65 0,85 Z" />
        </motion.svg>
      </div>

      {/* --- ELEGANT AURORA WAVES BACKGROUND --- */}
      <motion.div
        initial={{ y: 0, opacity: 0 }}
        animate={{ 
          y: phase === "exiting" ? "-120vh" : 0,
          opacity: phase === "exiting" ? 0 : 1 
        }}
        transition={{ 
          duration: phase === "exiting" ? 1.8 : 2.5, 
          ease: phase === "exiting" ? exitEase : "easeOut",
          delay: phase === "exiting" ? 0.25 : 0 
        }}
        className="absolute inset-0 z-[4] pointer-events-none overflow-hidden mix-blend-multiply opacity-80"
      >
        <motion.svg
          viewBox="0 0 200 100"
          preserveAspectRatio="none"
          animate={{ x: ["0vw", "-100vw"] }}
          transition={{ duration: 15, ease: "linear", repeat: Infinity }}
          className="absolute bottom-0 w-[200vw] h-[60vh] fill-amber-300/40 will-change-transform"
        >
          <path d="M0,50 Q25,80 50,50 T100,50 T150,50 T200,50 L200,100 L0,100 Z" />
        </motion.svg>
        <motion.svg
          viewBox="0 0 200 100"
          preserveAspectRatio="none"
          animate={{ x: ["-100vw", "0vw"] }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          className="absolute bottom-0 w-[200vw] h-[75vh] fill-rose-300/40 will-change-transform"
        >
          <path d="M0,60 Q25,30 50,60 T100,60 T150,60 T200,60 L200,100 L0,100 Z" />
        </motion.svg>
        <motion.svg
          viewBox="0 0 200 100"
          preserveAspectRatio="none"
          animate={{ x: ["-50vw", "-150vw"] }}
          transition={{ duration: 18, ease: "linear", repeat: Infinity }}
          className="absolute bottom-0 w-[200vw] h-[50vh] fill-orange-300/50 will-change-transform"
        >
          <path d="M0,40 Q25,90 50,40 T100,40 T150,40 T200,40 L200,100 L0,100 Z" />
        </motion.svg>
      </motion.div>

      {/* --- EFFECTS & PARTICLES --- */}
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ 
           y: phase === "exiting" ? "-100vh" : 0,
           opacity: phase === "exiting" ? 0 : 1 
         }}
         transition={{ duration: 2.0, ease: exitEase }}
         className="absolute inset-0 z-[4] flex items-center justify-center pointer-events-none will-change-transform mix-blend-multiply"
      >
         {/* Performant Radial Gradients instead of CSS Blur filters */}
         <motion.div 
           animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
           transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
           className="w-[70vw] h-[70vw] absolute -top-[20%] -left-[10%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-400/30 via-orange-300/10 to-transparent"
         />
         <motion.div 
           animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
           transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
           className="w-[70vw] h-[70vw] absolute -bottom-[20%] -right-[10%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-400/30 via-pink-300/10 to-transparent"
         />
         <motion.div 
           animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
           transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
           className="w-[60vw] h-[60vw] absolute top-[10%] right-[20%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-300/30 via-cyan-300/10 to-transparent mix-blend-screen"
         />

         {/* Contrasting Glitters */}
         {particles.map((p) => (
           <motion.div
             key={p.id}
             initial={{ opacity: 0, top: p.y + "%", left: p.x + "%" }}
             animate={{ 
               opacity: [0, 1, 0], 
               scale: [0, 1.2, 0]
             }}
             transition={{ 
               duration: p.duration, 
               repeat: Infinity, 
               delay: p.delay,
               ease: "easeInOut" 
             }}
             className="absolute rounded-full will-change-transform"
             style={{ 
               width: p.size, 
               height: p.size, 
               backgroundColor: p.color,
               boxShadow: `0 0 ${p.size * 2}px ${p.color}`
             }}
           />
         ))}
      </motion.div>

      {/* LETTERS IN BOXES */}
      <motion.div 
        className="flex gap-2 md:gap-5 z-20 pointer-events-none"
      >
        {letters.map((letter, i) => (
          <motion.div
            key={i}
            initial={{ ...scatterPositions[i], opacity: 0, scale: 2.0, filter: "blur(15px)" }}
            animate={{
              x: phase === "exiting" ? `${scatterPositions[i].x}px` : 0,
              y: phase === "exiting" ? "-100vh" : 0,
              rotate: phase === "exiting" ? scatterPositions[i].rotate : 0,
              opacity: phase === "exiting" ? 0 : 1,
              scale: phase === "exiting" ? 0.8 : 1,
              filter: phase === "exiting" ? "blur(10px)" : "blur(0px)",
            }}
            transition={{
              type: "tween",
              delay: phase === "exiting" ? i * 0.05 : i * 0.08,
              duration: phase === "exiting" ? 1.5 : 1.8,
              ease: phase === "exiting" ? exitEase : [0.34, 1.15, 0.64, 1]
            }}
            className="relative w-12 h-12 md:w-20 md:h-20 flex items-center justify-center bg-white/40 border border-white/60 shadow-[0_8px_30px_rgba(236,72,153,0.3)] rounded-xl overflow-hidden group will-change-transform"
          >
            {/* Shimmer inside the box */}
            <motion.div 
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2.0, repeat: Infinity, repeatDelay: 1.0, ease: "easeInOut", delay: i * 0.1 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-12"
            />
            
            <span className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-pink-600 via-pink-400 to-yellow-500 uppercase tracking-widest drop-shadow-md relative z-10">
              {letter}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* SUBTEXT */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 1.1, filter: "blur(15px)" }}
        animate={{ 
          opacity: phase === "exiting" ? 0 : 1, 
          y: phase === "exiting" ? "-100vh" : 0,
          scale: phase === "exiting" ? 0.8 : 1,
          filter: phase === "exiting" ? "blur(10px)" : "blur(0px)"
        }}
        transition={{ 
          duration: phase === "exiting" ? 1.5 : 1.8, 
          ease: phase === "exiting" ? exitEase : [0.34, 1.15, 0.64, 1],
          delay: phase === "exiting" ? 0 : 0.6
        }}
        className="mt-14 z-20 relative pointer-events-none will-change-transform"
      >
        <h2 className="text-xl md:text-3xl font-light text-gray-800 tracking-[0.7em] uppercase drop-shadow-sm relative z-10">
          Photography
        </h2>
      </motion.div>

    </div>
  );
}

export default CameraEntry;
