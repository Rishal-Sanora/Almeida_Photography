import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const heroImages = [
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1920&q=80", // DSLR camera
  "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1920&q=80"
];

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center text-center px-6 overflow-hidden bg-[#fffaf0]">
      {/* Background Images with Sliding Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ x: "100%", opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={heroImages[currentIndex]}
              alt="Hero Background"
              className="w-full h-full object-cover opacity-80 filter contrast-[1.1] saturate-[1.2] brightness-75"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-[#fffaf0]/60 via-[#fffaf0]/30 to-[#fffaf0] pointer-events-none z-10"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 max-w-4xl mix-blend-normal"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} 
          className="text-5xl md:text-8xl font-extrabold text-gray-900 tracking-tight leading-none mb-6 drop-shadow-lg"
        >
          Elegant <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">Perfection</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
          className="text-lg md:text-xl text-gray-800 font-medium mb-12 tracking-widest uppercase max-w-2xl mx-auto drop-shadow-md"
        >
          Luxury Photography For Your Most Defining Moments
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-center"
        >
          <Link
            to="/portfolio"
            className="group relative px-10 py-4 bg-white/80 backdrop-blur-sm overflow-hidden rounded-full border border-pink-400 text-pink-600 font-semibold tracking-[0.2em] uppercase text-sm transition-all duration-500 hover:border-transparent hover:text-white hover:shadow-[0_4px_25px_rgba(236,72,153,0.4)]"
          >
            <div className="absolute inset-0 w-0 bg-gradient-to-r from-pink-500 to-yellow-500 transition-all duration-500 ease-out group-hover:w-full z-0"></div>
            <span className="relative z-10">Explore Portfolio</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;