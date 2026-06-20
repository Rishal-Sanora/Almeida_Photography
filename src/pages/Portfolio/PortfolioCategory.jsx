import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPortfolio } from "../../services/portfolioService";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../../config";

function PortfolioCategory() {
  const { category } = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const data = await getPortfolio();
        const photoArray = Array.isArray(data) ? data : [];
        
        // Filter photos by category, case-insensitive
        const decodedCategory = decodeURIComponent(category);
        const filtered = photoArray.filter(
          (p) => p.category?.toLowerCase() === decodedCategory.toLowerCase()
        );
        
        setPhotos(filtered);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, [category]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
      </div>
    );
  }

  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.8, filter: "brightness(2) blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "brightness(1) blur(0px)" }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
      className="py-24 bg-transparent min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6">
        <Link 
          to="/portfolio" 
          className="inline-block mb-8 text-[#D4AF37] hover:text-white transition uppercase tracking-widest text-sm font-semibold border border-[#D4AF37] px-6 py-2 rounded-full hover:bg-[#D4AF37]"
        >
          &larr; Back to Portfolios
        </Link>
        
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-6xl font-extrabold mb-16 text-center text-white uppercase tracking-[0.2em]"
        >
          <span className="text-[#D4AF37]">{decodeURIComponent(category)}</span>
        </motion.h1>

        {photos.length > 0 ? (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6"
          >
            {photos.map((photo, index) => (
              <motion.div
                key={photo._id || index}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                className="break-inside-avoid relative group overflow-hidden rounded-2xl bg-[#050505] border border-[#D4AF37]/20 shadow-2xl"
              >
                <img
                  src={photo.image?.startsWith("/uploads") ? `${API_BASE_URL}${photo.image}` : photo.image}
                  alt={photo.category}
                  className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-[#D4AF37] text-sm uppercase tracking-widest font-bold border border-[#D4AF37] px-4 py-2 rounded-full shadow-lg bg-black/40">
                    View
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center text-gray-500 font-light tracking-widest uppercase text-lg mt-20">
            No photos found in this category.
          </div>
        )}
      </div>
    </motion.section>
  );
}

export default PortfolioCategory;
