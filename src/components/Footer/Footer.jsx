import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaArrowRight
} from "react-icons/fa";

function Footer() {
  const [query, setQuery] = useState("");
  const whatsappNumber = "919482532152"; 

  const handleQuerySubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(query)}`, "_blank");
    setQuery("");
  };

  return (
    <footer className="bg-white/80 backdrop-blur-md text-gray-500 mt-20 border-t border-pink-200 relative overflow-hidden shadow-sm">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-30"></div>
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10 relative z-10">

        {/* About */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-[0.2em] uppercase mb-4">
            Almeida <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">Photography</span>
          </h2>
          <p className="text-gray-500 font-light tracking-wide leading-relaxed">
            Capturing timeless moments with elegance and creativity. A cinematic approach to storytelling.
          </p>
        </div>

        {/* Links */}
        <div>
          <h2 className="text-sm font-bold text-gray-900 tracking-[0.2em] uppercase mb-6">
            Quick Links
          </h2>
          <div className="space-y-4 text-sm tracking-widest uppercase flex flex-col items-start">
            <Link to="/" className="hover:text-pink-500 hover:translate-x-2 cursor-pointer transition-all duration-300">Home</Link>
            <Link to="/about" className="hover:text-pink-500 hover:translate-x-2 cursor-pointer transition-all duration-300">About</Link>
            <Link to="/portfolio" className="hover:text-pink-500 hover:translate-x-2 cursor-pointer transition-all duration-300">Portfolio</Link>
            <Link to="/services" className="hover:text-pink-500 hover:translate-x-2 cursor-pointer transition-all duration-300">Services</Link>
            <Link to="/contact" className="hover:text-pink-500 hover:translate-x-2 cursor-pointer transition-all duration-300">Contact</Link>
          </div>
        </div>

        {/* Social */}
        <div>
          <h2 className="text-sm font-bold text-gray-900 tracking-[0.2em] uppercase mb-6">
            Follow Us
          </h2>
          <div className="flex gap-6 text-2xl text-gray-400 mb-8">
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 hover:-translate-y-1 transition-all duration-300">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/almeida__photography?igsh=MW5yYjVhODc4cTc4Nw==" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 hover:-translate-y-1 transition-all duration-300">
              <FaInstagram />
            </a>
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 hover:-translate-y-1 transition-all duration-300">
              <FaWhatsapp />
            </a>
          </div>

          {/* Query Section */}
          <h3 className="text-xs font-bold text-gray-900 tracking-[0.1em] uppercase mb-3">
            Have a Query?
          </h3>
          <form onSubmit={handleQuerySubmit} className="relative flex items-center w-full max-w-sm">
            <input 
              type="text" 
              placeholder="Ask us on WhatsApp..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-white border border-pink-200 rounded-full py-3 pl-5 pr-12 text-sm text-gray-700 outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all shadow-sm placeholder-gray-400"
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-500 to-yellow-500 text-white p-2 rounded-full hover:scale-105 transition-transform"
            >
              <FaArrowRight className="text-xs" />
            </button>
          </form>
        </div>

      </div>

      <div className="border-t border-pink-100 text-center py-6 text-gray-400 text-xs tracking-[0.2em] uppercase relative z-10">
        © 2026 Almeida Photography. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;