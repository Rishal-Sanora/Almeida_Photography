import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function CTA() {
  return (
    <section className="py-16 bg-[#111] relative z-10 text-center border-t border-[#222]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl md:text-6xl text-[#D4AF37] font-bold mb-10 drop-shadow-lg">
          Ready To Capture Your Moments?
        </h2>
        <Link
          to="/booking"
          className="inline-block bg-[#D4AF37] text-[#0a0a0a] px-12 py-5 rounded-xl font-bold text-xl shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:bg-[#b08d29] hover:scale-105 transition-all duration-300"
        >
          Book Now
        </Link>
      </motion.div>
    </section>
  );
}

export default CTA;