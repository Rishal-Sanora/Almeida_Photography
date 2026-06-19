import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getServices } from "../../services/serviceService";
import ServiceCard from "../ServiceCard/ServiceCard";
import { motion } from "framer-motion";

function FeaturedServices() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setFeatured(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch featured services", error);
      }
    };
    fetchServices();
  }, []);

  return (
    <section className="py-16 bg-transparent relative z-10 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 tracking-[0.1em] uppercase text-gray-900"
        >
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">Services</span>
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
          {featured.map((service) => (
            <motion.div 
              key={service._id || service.id}
              className="w-full sm:w-[220px]"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
            >
              <ServiceCard service={service} />
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
            to="/services"
            className="group relative px-10 py-4 bg-transparent overflow-hidden rounded-full border border-pink-400 text-pink-600 font-semibold tracking-[0.2em] uppercase text-sm transition-all duration-500 hover:border-transparent hover:text-white hover:shadow-[0_4px_25px_rgba(236,72,153,0.4)] inline-block"
          >
            <div className="absolute inset-0 w-0 bg-gradient-to-r from-pink-500 to-yellow-500 transition-all duration-500 ease-out group-hover:w-full z-0"></div>
            <span className="relative z-10">View All Services</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedServices;