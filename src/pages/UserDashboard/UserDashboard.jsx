import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { AnimatePresence, motion } from "framer-motion";

function UserDashboard() {
  const { user } = useAuth();
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <section>
      <h1 className="text-4xl text-gray-900 font-bold mb-10 tracking-wide uppercase">
        Welcome, <span className="text-pink-500">{user?.name || "User"}</span>!
      </h1>
      
      <div className="bg-white/80 border border-pink-200 p-8 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Dashboard Overview</h2>
        <p className="text-gray-600 leading-relaxed mb-8">
          Welcome to your personal dashboard. Here you can track your photography and cinematography bookings, review event details, and manage your scheduled sessions with Almeida Photography.
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setShowProfileModal(true)}
            className="bg-white text-pink-600 border border-pink-400 px-8 py-3 rounded-full uppercase tracking-widest text-sm font-bold shadow-sm hover:bg-pink-50 hover:shadow-md transition"
          >
            View My Profile
          </button>
          <Link
            to="/user-dashboard/bookings"
            className="bg-pink-500 text-white px-8 py-3 rounded-full uppercase tracking-widest text-sm font-bold shadow-md hover:bg-pink-600 hover:shadow-lg transition"
          >
            My Bookings
          </Link>
          <Link
            to="/portfolio"
            className="bg-transparent border border-pink-400 text-pink-600 px-8 py-3 rounded-full uppercase tracking-widest text-sm font-bold shadow-sm hover:bg-pink-50 hover:shadow-md transition"
          >
            Explore Portfolio
          </Link>
        </div>
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfileModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
              onClick={() => setShowProfileModal(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl p-10 max-w-md w-full relative z-10 shadow-2xl border border-pink-100"
            >
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 border-2 border-pink-200 shadow-inner">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-widest">
                  {user?.name}
                </h3>
                <p className="text-pink-500 text-sm font-medium tracking-widest uppercase mt-1">
                  Registered Member
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-pink-400"></div>
                  <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Email Address</p>
                  <p className="text-gray-900 font-medium text-lg truncate">
                    {user?.email}
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400"></div>
                  <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Phone Number</p>
                  <p className="text-gray-900 font-medium text-lg">
                    {user?.phone || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="mt-10 flex justify-center">
                <button 
                  onClick={() => setShowProfileModal(false)}
                  className="px-10 py-3 bg-gray-900 text-white font-bold uppercase text-sm tracking-widest rounded-full hover:bg-black transition shadow-lg w-full"
                >
                  Close Profile
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default UserDashboard;