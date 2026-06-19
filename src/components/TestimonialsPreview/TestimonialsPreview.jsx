import { motion } from "framer-motion";

function TestimonialsPreview() {
  const testimonials = [
    { text: "Amazing photography experience. Highly recommended.", name: "Sarah L." },
    { text: "Professional and creative photographer.", name: "Mark D." },
    { text: "Beautiful memories captured perfectly.", name: "Jessica M." }
  ];

  return (
    <section className="py-24 bg-transparent relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-[#D4AF37] text-center mb-16"
        >
          Testimonials
        </motion.h2>

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
          className="grid md:grid-cols-3 gap-10"
        >
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 30 },
                visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
              }}
              whileHover={{ y: -10 }}
              className="bg-[#111] p-10 rounded-2xl shadow-2xl border border-[#333] relative group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[#D4AF37] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <p className="text-gray-300 italic mb-6 text-lg">
                "{t.text}"
              </p>
              <h4 className="text-[#D4AF37] font-bold">— {t.name}</h4>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default TestimonialsPreview;