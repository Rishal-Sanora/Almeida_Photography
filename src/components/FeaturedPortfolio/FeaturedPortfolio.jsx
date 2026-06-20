import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { API_BASE_URL } from "../../config";

function FeaturedPortfolio() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await api.get("/portfolio");
        setImages(response.data.slice(0, 10)); // Show top 10
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      }
    };
    fetchPortfolio();
  }, []);

  return (
    <section className="py-16 bg-transparent relative z-10 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 tracking-[0.1em] uppercase text-gray-900"
        >
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">Portfolio</span>
        </motion.h2>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
          className="flex flex-wrap justify-center gap-6"
        >
          {images.map((img) => (
            <motion.div
              key={img._id}
              className="w-full sm:w-[220px] group relative overflow-hidden rounded-2xl shadow-[0_4px_20px_rgba(236,72,153,0.1)] border border-pink-200 cursor-pointer aspect-square"
              variants={{
                hidden: { opacity: 0, scale: 0.9, filter: "blur(10px)" },
                visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" } }
              }}
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-400/20 to-yellow-400/20 opacity-0 group-hover:opacity-100 transition duration-500 z-10 pointer-events-none"></div>
              <img
                className="w-full h-full object-cover object-center transform transition-all duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                src={img.image.startsWith("http") ? img.image : `${API_BASE_URL}${img.image}`}
                alt={img.title}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-20"
        >
          <Link
            to="/portfolio"
            className="group relative px-10 py-4 bg-transparent overflow-hidden rounded-full border border-pink-400 text-pink-600 font-semibold tracking-[0.2em] uppercase text-sm transition-all duration-500 hover:border-transparent hover:text-white hover:shadow-[0_4px_25px_rgba(236,72,153,0.4)] inline-block"
          >
            <div className="absolute inset-0 w-0 bg-gradient-to-r from-pink-500 to-yellow-500 transition-all duration-500 ease-out group-hover:w-full z-0"></div>
            <span className="relative z-10">View All Portfolio</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedPortfolio;