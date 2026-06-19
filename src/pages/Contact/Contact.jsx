import ContactForm from "../../components/Forms/ContactForm";
import { motion } from "framer-motion";

import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaWhatsapp
} from "react-icons/fa";

function Contact() {
  return (
    <section className="bg-[#fffaf0] min-h-screen py-24 relative z-10 flex items-center justify-center overflow-hidden">
      <div className="max-w-4xl w-full mx-auto px-4">
        
        {/* Modal Wrapper */}
        <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(236,72,153,0.1)] border border-pink-100 p-6 md:p-10 relative overflow-hidden">
          
          {/* Subtle decorative background blob in the modal */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          <motion.h1 
            initial={{ opacity: 0, filter: "blur(10px)", y: -30 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-4xl text-center text-gray-900 font-extrabold mb-10 tracking-[0.2em] uppercase drop-shadow-sm"
          >
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">Us</span>
          </motion.h1>

          <div className="grid lg:grid-cols-2 gap-8 mb-16 items-stretch">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="h-full"
            >
              <ContactForm />
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.4 } }
              }}
              className="space-y-6 h-full flex flex-col"
            >
              {[ 
                { icon: FaPhone, title: "Phone", content: "+91 9482532152" },
                { icon: FaEnvelope, title: "Email", content: "almeidaphotography2010@gmail.com" },
                { icon: FaMapMarkerAlt, title: "Address", content: "Halasuru, Bengaluru, Karnataka, India" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                  className="bg-white/80 backdrop-blur-xl border border-pink-100 shadow-[0_4px_20px_rgba(236,72,153,0.05)] p-6 rounded-2xl flex items-center gap-6 group hover:border-pink-300 hover:shadow-[0_8px_30px_rgba(236,72,153,0.15)] transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-pink-500 to-yellow-500 p-4 rounded-full shadow-md group-hover:scale-110 transition-transform duration-500">
                    <item.icon className="text-white text-xl" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-gray-900 tracking-[0.2em] uppercase mb-1">
                      {item.title}
                    </h2>
                    <p className="text-gray-600 font-light tracking-wide text-sm">
                      {item.content}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Social Icons */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
                className="flex gap-8 text-3xl text-gray-400 pt-4 px-4 mb-8"
              >
                <motion.a 
                  href="#" target="_blank" rel="noopener noreferrer"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                >
                  <FaFacebook className="cursor-pointer hover:text-pink-500 transition-colors duration-300" />
                </motion.a>
                <motion.a 
                  href="https://www.instagram.com/almeida__photography?igsh=MW5yYjVhODc4cTc4Nw==" target="_blank" rel="noopener noreferrer"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <FaInstagram className="cursor-pointer hover:text-pink-500 transition-colors duration-300" />
                </motion.a>
                <motion.a 
                  href="https://wa.me/919482532152" target="_blank" rel="noopener noreferrer"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <FaWhatsapp className="cursor-pointer hover:text-pink-500 transition-colors duration-300" />
                </motion.a>
              </motion.div>

              {/* Embedded Map under Social Icons */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                className="w-full flex-1 min-h-[12rem] mt-auto rounded-[1.5rem] overflow-hidden shadow-[0_10px_30px_rgba(236,72,153,0.1)] border border-pink-100 relative"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31104.2343213123!2d77.6143!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sHalasuru%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1652431411234!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;