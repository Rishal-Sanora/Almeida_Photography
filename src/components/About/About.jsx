import { motion } from "framer-motion";
import logo from "../../assets/images/logo/logo.JPG.jpeg";
import { useEffect, useState } from "react";

// Simple floating particles component
const Particles = () => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-pink-400/20"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const features = [
  { icon: "📸", title: "Professional Photography" },
  { icon: "🎬", title: "Cinematic Storytelling" },
  { icon: "❤️", title: "Authentic Emotions" },
  { icon: "✨", title: "Timeless Memories" }
];

function About() {
  return (
    <section className="relative py-24 px-6 bg-[#fffaf0] border-y border-pink-100/50 overflow-hidden">
      {/* Background & Particles */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fffaf0] via-[#fffaf0]/90 to-pink-50/30 z-0"></div>
      <Particles />
      
      {/* Subtle blurred background effect */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-pink-200/30 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center items-center group"
        >
          {/* Subtle Glow Behind Logo */}
          <div className="absolute inset-0 bg-pink-300/30 rounded-2xl blur-3xl transform group-hover:scale-110 transition duration-700"></div>
          
          <img
            src={logo}
            alt="Almeida Photography Logo"
            className="relative z-10 w-full max-w-md rounded-3xl shadow-[0_0_40px_rgba(236,72,153,0.15)] object-contain"
          />
        </motion.div>

        {/* Right Side: Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
        >
          <motion.h2 
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-[0.05em] leading-tight mb-6 drop-shadow-sm"
          >
            Capturing Moments, <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">Creating Memories</span>
          </motion.h2>

          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
            className="text-gray-600 font-light leading-relaxed tracking-wide text-lg mb-12"
          >
            At Almeida Photography, we believe every moment tells a story. From weddings and engagements to maternity and candid portraits, we capture emotions, details, and memories with a cinematic and artistic approach. Our passion is transforming beautiful moments into timeless photographs that you will cherish forever.
          </motion.p>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
                whileHover={{ scale: 1.05, y: -5, backgroundColor: "rgba(255,255,255,0.9)", boxShadow: "0 10px 30px rgba(236,72,153,0.15)" }}
                className="flex items-center gap-4 bg-white/60 backdrop-blur-md border border-pink-100 p-5 rounded-2xl shadow-sm transition-all duration-300 group cursor-default"
              >
                <div className="text-3xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-gray-800 font-medium text-sm tracking-wide uppercase">
                  {feature.title}
                </h4>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;