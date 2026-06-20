import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPortfolio } from "../../services/portfolioService";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../../config";

function CategoryGallery() {

  const { category } = useParams();

  const [photos, setPhotos] = useState([]);

  useEffect(() => {

    const fetchPhotos = async () => {

      try {

        const data = await getPortfolio();

        const filteredPhotos = data.filter(
          (photo) =>
            photo.category &&
            photo.category.toLowerCase() === category.toLowerCase()
        );

        setPhotos(filteredPhotos);

      } catch (error) {

        console.error(error);

      }

    };

    fetchPhotos();

  }, [category]);

  return (
    <section className="bg-transparent min-h-screen py-32 px-10 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto mb-16 text-center"
      >
        <h1 className="text-4xl md:text-6xl text-gray-900 font-extrabold capitalize tracking-[0.2em] drop-shadow-sm">
          {category} <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">Gallery</span>
        </h1>
        <p className="text-gray-500 tracking-widest uppercase mt-4 text-sm font-light">
          Elegant Moments
        </p>
      </motion.div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 max-w-7xl mx-auto"
      >
        {photos.map((photo) => (
          <motion.div
            key={photo._id}
            variants={{
              hidden: { opacity: 0, scale: 0.9, filter: "blur(10px)" },
              visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" } }
            }}
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="rounded-xl overflow-hidden group relative shadow-sm hover:shadow-[0_4px_20px_rgba(236,72,153,0.15)] border border-pink-100 cursor-pointer h-48"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-400/20 to-yellow-400/20 opacity-0 group-hover:opacity-100 transition duration-500 z-10 pointer-events-none"></div>
            <img
              src={photo.image.startsWith("http") ? photo.image : `${API_BASE_URL}${photo.image}`}
              alt={photo.title}
              className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
            />
          </motion.div>
        ))}
      </motion.div>

      {photos.length === 0 && (
        <div className="text-center text-gray-500 font-light tracking-widest uppercase mt-20">
          No photos found in this category.
        </div>
      )}
    </section>
  );
}

export default CategoryGallery;