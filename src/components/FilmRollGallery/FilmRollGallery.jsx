import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../../services/api";

function FilmRollGallery() {
  const [frames, setFrames] = useState([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await api.get("/portfolio");
        let portfolioImages = response.data.map(img => 
          img.image.startsWith("http") ? img.image : `http://localhost:5000${img.image}`
        );
        
        // Ensure we have at least 16 images to make 4 grids of 4
        // Instead of using online placeholders, duplicate the user's images
        if (portfolioImages.length > 0 && portfolioImages.length < 16) {
          let duplicated = [...portfolioImages];
          while (duplicated.length < 16) {
            duplicated = [...duplicated, ...portfolioImages];
          }
          portfolioImages = duplicated.slice(0, 16);
        }

        // Chunk images into groups of 4 to form "small grids" inside the film frames
        const chunks = [];
        for (let i = 0; i < portfolioImages.length; i += 4) {
          chunks.push(portfolioImages.slice(i, i + 4));
        }

        // Duplicate the chunks to create a seamless infinite scrolling loop
        if (chunks.length > 0) {
           setFrames([...chunks, ...chunks, ...chunks, ...chunks]);
        }
      } catch (error) {
        console.error("Error fetching portfolio for panorama:", error);
      }
    };
    fetchPortfolio();
  }, []);

  if (frames.length === 0) return null;

  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-b from-[#fffaf0] via-pink-50/40 to-[#fffaf0] border-y border-pink-100/50">
      
      {/* Dreamy Background Effects */}
      <div className="absolute top-[10%] left-1/4 w-[40vw] h-[40vw] bg-pink-200/30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-1/4 w-[35vw] h-[35vw] bg-yellow-200/30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-white/40 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full relative z-10 py-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-light text-gray-800 mb-4 tracking-[0.2em] uppercase drop-shadow-sm">
            Elegant <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 font-bold">Film Roll</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-pink-300 to-transparent mx-auto mb-4"></div>
          <p className="text-gray-500 tracking-[0.15em] max-w-2xl mx-auto text-sm uppercase">
            A continuous journey through our dreamy grids of memories.
          </p>
        </div>
        
        {/* Infinite Scrolling Film Roll */}
        <div className="flex overflow-hidden relative py-8 px-4 border-y border-white/40 bg-white/10 backdrop-blur-sm shadow-inner">
          <motion.div
            className="flex gap-6 min-w-max items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 40,
              repeat: Infinity,
            }}
          >
            {frames.map((chunk, idx) => (
              <div 
                key={idx} 
                className="flex flex-col gap-3 p-3 bg-white/30 backdrop-blur-md rounded-2xl border border-white/60 shadow-[0_15px_35px_rgba(236,72,153,0.15)] flex-shrink-0 w-[220px] md:w-[280px] transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(236,72,153,0.25)]"
              >
                {/* Top Film Perforations */}
                <div className="flex justify-between px-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={`top-${i}`} className="w-5 h-2.5 bg-white/70 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]" />
                  ))}
                </div>

                {/* The Small Grid inside the film frame */}
                <div className="grid grid-cols-2 gap-2 bg-white/40 p-2 rounded-xl shadow-inner border border-white/50 relative group">
                  {/* Dreamy overlay on the grid */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-200/10 to-yellow-200/10 pointer-events-none rounded-xl mix-blend-overlay"></div>
                  
                  {chunk.map((src, imgIdx) => (
                    <div 
                      key={imgIdx} 
                      className="h-[80px] md:h-[100px] rounded-lg overflow-hidden shadow-sm relative group/img bg-gray-100 flex items-center justify-center"
                    >
                      <img 
                        src={src} 
                        alt={`Grid image ${imgIdx}`} 
                        className="w-full h-full object-contain transform transition-transform duration-[1.5s] ease-out group-hover/img:scale-110"
                        style={{ filter: 'contrast(1.05) saturate(1.1) brightness(0.95)' }}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-pink-900/0 group-hover/img:bg-pink-900/20 transition-colors duration-500 pointer-events-none"></div>
                    </div>
                  ))}
                </div>

                {/* Bottom Film Perforations */}
                <div className="flex justify-between px-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={`bottom-${i}`} className="w-5 h-2.5 bg-white/70 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]" />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default FilmRollGallery;
