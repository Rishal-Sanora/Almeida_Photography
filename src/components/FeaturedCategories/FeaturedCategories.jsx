import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPortfolio } from "../../services/portfolioService";
import { API_BASE_URL } from "../../config";

function FeaturedCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const data = await getPortfolio();
        const photoArray = Array.isArray(data) ? data : [];
        
        const grouped = {};
        photoArray.forEach((photo) => {
          if (!photo.category) return;
          const normalizedKey = photo.category.trim().toLowerCase();
          
          if (!grouped[normalizedKey]) {
            const displayTitle = normalizedKey.charAt(0).toUpperCase() + normalizedKey.slice(1);
            grouped[normalizedKey] = {
              name: displayTitle,
              coverImage: photo.image,
              count: 1
            };
          } else {
            grouped[normalizedKey].count++;
          }
        });
        
        let uniqueCats = Object.values(grouped);
        // Duplicate array to create a seamless infinite scrolling loop if there are at least some categories
        if (uniqueCats.length > 0) {
          // Make sure we have enough items to scroll nicely
          while (uniqueCats.length < 8) {
            uniqueCats = [...uniqueCats, ...Object.values(grouped)];
          }
          setCategories(uniqueCats);
        }
      } catch (error) {
        console.error("Error fetching portfolio categories:", error);
      }
    };
    fetchPhotos();
  }, []);

  if (categories.length === 0) return null;

  return (
    <section className="py-16 bg-transparent relative z-10 overflow-hidden border-t border-pink-100/50">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 tracking-[0.1em] uppercase text-gray-900"
        >
          Portfolio <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">Categories</span>
        </motion.h2>

        <div className="flex overflow-hidden relative py-4 px-4">
          {/* Gradient masks for smooth fading on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#fffaf0] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#fffaf0] to-transparent z-10"></div>

          <motion.div 
            className="flex gap-8 min-w-max items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 15, // Made faster
              repeat: Infinity,
            }}
          >
            {categories.map((category, idx) => (
              <div
                key={`${category.name}-${idx}`}
                className="w-[260px] flex-shrink-0"
              >
                <Link
                  to={`/portfolio/${encodeURIComponent(category.name)}`}
                  className="rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(236,72,153,0.1)] relative group bg-[#050505] block border border-[#D4AF37]/20 transform transition duration-500 hover:-translate-y-2"
                >
                  <div className="relative">
                    <img
                      src={category.coverImage.startsWith("http") ? category.coverImage : `${API_BASE_URL}${category.coverImage}`}
                      alt={category.name}
                      className="w-full h-48 object-contain bg-[#050505] transition-all duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 filter grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-0"></div>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-6 z-10 flex flex-col items-center text-center">
                    <h2 className="text-xl font-bold text-white tracking-[0.2em] uppercase drop-shadow-lg mb-1">
                      {category.name}
                    </h2>
                    <p className="text-[#D4AF37] font-semibold tracking-widest uppercase text-[10px]">
                      {category.count} {category.count === 1 ? "Photo" : "Photos"}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedCategories;
