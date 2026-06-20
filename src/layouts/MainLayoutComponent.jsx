import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { AnimatePresence, motion } from "framer-motion";

function MainLayout() {
  const location = useLocation();
  return (
    <div className="bg-[#fffaf0] min-h-screen text-gray-900 font-sans selection:bg-pink-300 selection:text-white relative overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 50, 0, -50, 0],
            y: [0, -50, 50, 0, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-pink-300/20 rounded-full mix-blend-multiply filter blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -80, 0, 80, 0],
            y: [0, 80, -40, 0, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] bg-yellow-300/20 rounded-full mix-blend-multiply filter blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] left-[40%] w-[30vw] h-[30vw] bg-white/50 rounded-full mix-blend-overlay filter blur-[150px]"
        />
        {/* Subtle noise texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10">
        <Navbar />
        <AnimatePresence mode="wait">
          <div key={location.pathname}>
            <Outlet />
          </div>
        </AnimatePresence>
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;