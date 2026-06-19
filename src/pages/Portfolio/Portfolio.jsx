import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPortfolio } from "../../services/portfolioService";
import { motion } from "framer-motion";

function Portfolio() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPhotos = async () => {
    try {
      const data = await getPortfolio();
      const photoArray = Array.isArray(data) ? data : [];
      
      const grouped = {};
      photoArray.forEach((photo) => {
        if (!photo.category) return;
        // Normalize the category string so "Wedding" and "wedding" don't duplicate
        const normalizedKey = photo.category.trim().toLowerCase();
        
        if (!grouped[normalizedKey]) {
          // Capitalize the first letter for display
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
      
      setCategories(Object.values(grouped));
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
      </div>
    );
  }

  return (
    <section className="py-24 bg-transparent min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-6xl font-extrabold mb-16 text-center text-white uppercase tracking-[0.2em]"
        >
          Our <span className="text-[#D4AF37]">Portfolios</span>
        </motion.h1>

        {categories.length > 0 ? (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="grid lg:grid-cols-3 md:grid-cols-2 gap-10"
          >
            {categories.map((category) => (
              <motion.div
                key={category.name}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
              >
                <Link
                  to={`/portfolio/${encodeURIComponent(category.name)}`}
                  className="rounded-2xl overflow-hidden shadow-2xl relative group bg-[#050505] block border border-[#D4AF37]/20"
                >
                  <div className="relative">
                    <img
                      src={category.coverImage.startsWith("http") ? category.coverImage : `http://localhost:5000${category.coverImage}`}
                      alt={category.name}
                      className="w-full h-64 object-contain transition-all duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 filter grayscale group-hover:grayscale-0 bg-[#050505]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-0"></div>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-8 z-10 flex flex-col items-center text-center">
                    <h2 className="text-2xl font-bold text-white tracking-[0.2em] uppercase drop-shadow-lg mb-2">
                      {category.name}
                    </h2>
                    <p className="text-[#D4AF37] font-semibold tracking-widest uppercase text-xs">
                      {category.count} {category.count === 1 ? "Photo" : "Photos"}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center text-gray-500 font-light tracking-widest uppercase text-lg mt-20">
            No portfolio categories available yet.
          </div>
        )}
      </div>
    </section>
  );
}

export default Portfolio;