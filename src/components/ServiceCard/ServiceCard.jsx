import { Link } from "react-router-dom";
import GlassCard from "../Common/GlassCard";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../../config";

function ServiceCard({ service }) {
  const imageUrl = service.image?.startsWith("/uploads") 
    ? `${API_BASE_URL}${service.image}` 
    : service.image;

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-full flex flex-col"
    >
      <GlassCard className="h-full flex flex-col group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-400/20 to-yellow-400/20 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none z-0"></div>
        <div className="overflow-hidden h-40 relative z-0 w-full">
          <img
            src={imageUrl}
            alt={service.title}
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition duration-700 opacity-90 group-hover:opacity-100"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow relative z-20 bg-white/80 backdrop-blur-md mt-[-15px] rounded-t-2xl">
          <h2 className="text-lg font-bold text-gray-900 tracking-[0.05em] uppercase mb-1">
            {service.title}
          </h2>
          <p className="text-gray-600 mb-4 flex-grow text-xs font-light leading-relaxed line-clamp-3">
            {service.description}
          </p>
          <div className="flex justify-between mb-4 border-t border-pink-100 pt-3">
            <div>
              <h4 className="text-pink-500 font-semibold text-[9px] uppercase tracking-[0.1em] mb-1">
                Price
              </h4>
              <p className="text-gray-800 font-medium text-sm">
                ₹{service.price}
              </p>
            </div>
            {service.duration ? (
              <div className="text-right">
                <h4 className="text-pink-500 font-semibold text-[10px] uppercase tracking-[0.1em] mb-1">
                  Duration
                </h4>
                <p className="text-gray-600 font-light text-sm">
                  {service.duration}
                </p>
              </div>
            ) : (
              <div className="text-right">
                {/* Empty div for flex spacing if duration is not present */}
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <Link
              to="/booking"
              className="flex-1 text-center bg-transparent border border-pink-300 px-4 py-3 rounded-full text-pink-600 text-xs font-bold uppercase tracking-[0.1em] transition-all duration-500 hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 hover:text-white hover:border-transparent hover:shadow-[0_4px_15px_rgba(236,72,153,0.3)]"
            >
              Book Session
            </Link>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export default ServiceCard;