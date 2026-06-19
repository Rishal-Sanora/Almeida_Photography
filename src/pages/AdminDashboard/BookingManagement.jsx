import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function BookingManagement() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load bookings");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBookings();
  }, []);

  const updateStatus = async (booking, status) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/${booking._id}/status`, { status });
      toast.success(`Booking ${status}!`);
      
      if (booking.phone) {
        // Remove any non-numeric characters from the phone number
        const phone = booking.phone.replace(/\D/g, "");
        const dateStr = new Date(booking.date).toLocaleDateString();
        let message = "";

        if (status === "Confirmed") {
          message = `Hello ${booking.name},\n\nYour booking for *${booking.service}* on *${dateStr}* has been officially confirmed!\n\nWe look forward to capturing your moments. Please let us know if you have any questions.\n\n- Almeida Photography`;
        } else if (status === "Rejected") {
          message = `Hello ${booking.name},\n\nWe regret to inform you that your booking request for *${booking.service}* on *${dateStr}* could not be confirmed at this time due to scheduling conflicts.\n\nPlease reach out to us if you would like to explore alternative dates or times.\n\n- Almeida Photography`;
        }

        if (message) {
          window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
        }
      }

      fetchBookings();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  return (
    <section>
      <h1 className="text-5xl text-pink-700 font-bold mb-10">
        Booking Management
      </h1>
      <div className="bg-white shadow-xl rounded-3xl mt-10 overflow-hidden border border-pink-100">
        <table className="w-full text-left">
          <thead className="bg-pink-50 text-pink-800">
            <tr>
              <th className="p-5 font-bold">Name</th>
              <th className="p-5 font-bold">Service</th>
              <th className="p-5 font-bold">Date</th>
              <th className="p-5 font-bold">Status</th>
              <th className="p-5 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-b border-pink-50 hover:bg-pink-50/50 transition">
                <td className="p-5 text-gray-700 font-medium">{booking.name}</td>
                <td className="p-5 text-gray-700 font-medium">{booking.service}</td>
                <td className="p-5 text-gray-600">{new Date(booking.date).toLocaleDateString()}</td>
                <td className={`p-5 font-bold ${
                  booking.status === "Confirmed" ? "text-green-500" :
                  booking.status === "Rejected" ? "text-red-500" : "text-yellow-500"
                }`}>
                  {booking.status || "Pending"}
                </td>
                <td className="p-5 flex gap-2">
                  <button 
                    onClick={() => updateStatus(booking, "Confirmed")}
                    className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm hover:bg-green-200 transition font-semibold"
                  >
                    Confirm
                  </button>
                  <button 
                    onClick={() => updateStatus(booking, "Rejected")}
                    className="bg-red-100 text-red-700 px-4 py-2 rounded-xl text-sm hover:bg-red-200 transition font-semibold"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-400">No bookings found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default BookingManagement;