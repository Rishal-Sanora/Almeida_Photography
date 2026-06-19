import { useEffect, useState } from "react";
import { getServices } from "../../services/serviceService";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import { motion } from "framer-motion";
import PageTransition from "../../components/PageTransition";

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        console.error("Failed to load services", error);
      }
    };
    fetchServices();
  }, []);

  return (
    <PageTransition>
      <section className="bg-transparent min-h-screen py-32 overflow-hidden relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-6xl text-center text-white font-extrabold mb-20 tracking-[0.2em] uppercase drop-shadow-lg"
          >
            Our <span className="text-[#D4AF37]">Services</span>
          </motion.h1>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
            className="grid md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {services.map((service) => (
              <motion.div 
                key={service._id || service.id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}

export default Services;