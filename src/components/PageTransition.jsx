import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import CameraEntry from "./Hero/CameraEntry";
import OldCameraEntry from "./Hero/OldCameraEntry";

function PageTransition({ children }) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [showEntry, setShowEntry] = useState(true);

  useEffect(() => {
    setShowEntry(true);
  }, [location.pathname]);

  return (
    <div className="w-full h-full bg-[#fffaf0]">
      {showEntry && (
        isHome ? (
          <CameraEntry 
            fastMode={false} 
            onEnterComplete={() => setShowEntry(false)} 
          />
        ) : (
          <OldCameraEntry 
            fastMode={true} 
            onEnterComplete={() => setShowEntry(false)} 
          />
        )
      )}
      
      {!showEntry && (
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={{
            initial: { opacity: 0, scale: 0.95, filter: "blur(15px)" },
            in: { opacity: 1, scale: 1, filter: "blur(0px)" },
            out: { opacity: 0, scale: 1.05, filter: "blur(10px)" },
          }}
          transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}

export default PageTransition;
