import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { AnimatePresence, motion } from "framer-motion";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bookings");
        // Filter bookings by the logged in user's email case-insensitively
        const userBookings = res.data.filter((b) => b.email?.toLowerCase() === user?.email?.toLowerCase());
        setBookings(userBookings);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load your bookings");
      }
    };

    if (user?.email) {
      fetchMyBookings();
    }
  }, [user]);

  return (
    <section>
      <h1 className="text-4xl text-gray-900 font-bold mb-10 tracking-wide uppercase">
        My <span className="text-pink-500">Bookings</span>
      </h1>

      <div className="grid gap-6">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking._id} className="bg-white/80 p-8 rounded-2xl border border-pink-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-gray-900 text-2xl font-bold mb-2">
                  {booking.service}
                </h2>
                <p className="text-gray-600 font-medium">
                  Date: {new Date(booking.date).toLocaleDateString()}
                </p>
                <p className="text-gray-500">
                  Location: {booking.location || "N/A"}
                </p>
              </div>
              <div className="text-left md:text-right flex flex-col gap-3 w-full md:w-auto">
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Status</p>
                  <span className={`text-xl font-bold ${
                    booking.status === "Confirmed" ? "text-green-500" :
                    booking.status === "Rejected" ? "text-red-500" : "text-yellow-500"
                  }`}>
                    {booking.status || "Pending"}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedBooking(booking)}
                  className="bg-transparent border border-pink-400 text-pink-600 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-pink-500 hover:text-white transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white/80 p-10 rounded-2xl border border-pink-200 text-center">
            <p className="text-gray-600 text-lg">You have no bookings yet.</p>
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
              onClick={() => setSelectedBooking(null)}
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-lg w-full relative z-10 shadow-2xl border border-pink-100"
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-900 uppercase tracking-widest border-b border-pink-100 pb-4">
                Booking Details
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest">Service</p>
                  <p className="text-lg font-medium text-gray-900">{selectedBooking.service}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest">Date & Time</p>
                  <p className="text-lg font-medium text-gray-900">
                    {new Date(selectedBooking.date).toLocaleDateString()} {selectedBooking.time ? `at ${selectedBooking.time}` : ''}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest">Location</p>
                  <p className="text-lg font-medium text-gray-900">{selectedBooking.location || "N/A"}</p>
                </div>
                {selectedBooking.notes && (
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-widest">Additional Notes</p>
                    <p className="text-md text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200 mt-1">
                      {selectedBooking.notes}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest">Status</p>
                  <span className={`text-lg font-bold ${
                    selectedBooking.status === "Confirmed" ? "text-green-500" :
                    selectedBooking.status === "Rejected" ? "text-red-500" : "text-yellow-500"
                  }`}>
                    {selectedBooking.status || "Pending"}
                  </span>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button 
                  onClick={() => setSelectedBooking(null)}
                  className="px-6 py-2 bg-pink-500 text-white font-bold uppercase text-sm tracking-widest rounded-full hover:bg-pink-600 transition shadow-md"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default MyBookings;