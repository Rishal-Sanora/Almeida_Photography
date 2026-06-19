import { motion } from "framer-motion";
import GlassCard from "../Common/GlassCard";

function PortfolioCard({ photo }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -3 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-full"
    >
      <GlassCard className="h-full flex flex-col overflow-hidden group">
        <div className="relative overflow-hidden h-36">
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-400/20 to-yellow-400/20 opacity-0 group-hover:opacity-100 transition duration-500 z-10 pointer-events-none"></div>
          <img
            src={photo.image}
            alt={photo.title}
            className="h-full w-full object-cover transform group-hover:scale-105 transition-all duration-700 opacity-90 group-hover:opacity-100"
          />
        </div>
        <div className="p-4 bg-white/80 backdrop-blur-md flex-grow">
          <h2 className="text-lg text-gray-900 font-bold tracking-[0.05em] uppercase mb-1">
            {photo.title}
          </h2>
          <p className="text-gray-600 font-light text-xs mb-3 leading-relaxed line-clamp-2">
            {photo.description}
          </p>
          <div className="pt-3 border-t border-pink-100 flex justify-between items-center">
            <span className="text-gray-500 text-[10px] font-semibold uppercase tracking-[0.1em]">Category</span>
            <span className="text-pink-600 text-[10px] font-bold uppercase tracking-[0.1em] px-2 py-1 bg-pink-100/50 rounded-full border border-pink-200">
              {photo.category}
            </span>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export default PortfolioCard;