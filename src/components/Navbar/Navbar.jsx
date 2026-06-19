import { Link, useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-white/80 backdrop-blur-md border-pink-200/50 py-3 shadow-sm' : 'bg-transparent border-transparent py-6'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 text-2xl font-bold tracking-widest text-gray-900 group"
        >
          <FaCamera className="text-pink-500 text-3xl group-hover:rotate-12 transition-transform duration-500" />
          <span className="uppercase text-sm tracking-[0.3em] bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500">Almeida</span>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex gap-10 text-gray-600 text-xs font-semibold uppercase tracking-[0.2em]">

          <Link to="/" className="hover:text-pink-500 transition duration-300 relative group">
            Home
            <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link to="/about" className="hover:text-pink-500 transition duration-300 relative group">
            About
            <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link to="/portfolio" className="hover:text-pink-500 transition duration-300 relative group">
            Portfolio
            <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link to="/services" className="hover:text-pink-500 transition duration-300 relative group">
            Services
            <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link to="/contact" className="hover:text-pink-500 transition duration-300 relative group">
            Contact
            <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>

        </div>

        {/* Buttons */}
        <div className="hidden md:flex gap-5 items-center">
          
          {user ? (
            <>
              <Link
                to={user.role === "admin" ? "/admin-dashboard" : "/user-dashboard"}
                className="text-gray-600 text-xs tracking-widest uppercase hover:text-pink-500 transition duration-300"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-xs tracking-widest uppercase text-gray-600 hover:text-pink-500 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-xs tracking-widest uppercase text-gray-600 hover:text-pink-500 transition duration-300"
            >
              Login
            </Link>
          )}

          <Link
            to="/booking"
            className="bg-transparent border border-pink-400 text-pink-600 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 hover:text-white hover:border-transparent hover:shadow-[0_4px_15px_rgba(236,72,153,0.3)] transition-all duration-500"
          >
            Book Now
          </Link>

        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;