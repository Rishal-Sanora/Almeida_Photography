import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { getServices } from "../../services/serviceService";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";

function BookingForm() {
  const { register, handleSubmit, reset } = useForm();
  const [servicesData, setServicesData] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServicesData(data);
      } catch (error) {
        console.error("Failed to load services", error);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || ""
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:5000/api/bookings", data);
      toast.success("Booking submitted successfully!");
      reset({
        name: user?.name || "",
        email: user?.email || ""
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit booking.");
    }
  };

  return (
    <motion.form
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white/60 backdrop-blur-xl border border-pink-200/50 shadow-[0_4px_30px_rgba(236,72,153,0.1)] rounded-2xl p-10 grid md:grid-cols-2 gap-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-400/5 to-transparent pointer-events-none"></div>

      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}>
        <input
          {...register("name", { required: true })}
          placeholder="Full Name"
          className="w-full bg-white/50 border border-pink-200 p-4 rounded-xl text-gray-900 outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-300 transition placeholder-gray-400 font-light tracking-wide"
        />
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}>
        <input
          {...register("email", { required: true })}
          placeholder="Email"
          readOnly={!!user}
          className={`w-full bg-white/50 border border-pink-200 p-4 rounded-xl text-gray-900 outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-300 transition placeholder-gray-400 font-light tracking-wide ${user ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}>
        <input
          {...register("phone", { required: true })}
          placeholder="Phone Number"
          className="w-full bg-white/50 border border-pink-200 p-4 rounded-xl text-gray-900 outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-300 transition placeholder-gray-400 font-light tracking-wide"
        />
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}>
        <select
          {...register("service", { required: true })}
          className="w-full bg-white/50 border border-pink-200 p-4 rounded-xl text-gray-900 outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-300 transition font-light tracking-wide appearance-none"
        >
          <option value="" className="bg-white text-gray-500">Select a Service</option>
          {servicesData.map((service) => (
            <option key={service._id || service.id} value={service.title} className="bg-white text-gray-900">
              {service.title}
            </option>
          ))}
        </select>
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}>
        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          {...register("date", { required: true })}
          className="w-full bg-white/50 border border-pink-200 p-4 rounded-xl text-gray-900 outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-300 transition placeholder-gray-400 font-light tracking-wide css-date-icon"
        />
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}>
        <input
          type="time"
          {...register("time")}
          className="w-full bg-white/50 border border-pink-200 p-4 rounded-xl text-gray-900 outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-300 transition placeholder-gray-400 font-light tracking-wide css-time-icon"
        />
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }} className="md:col-span-2">
        <input
          {...register("location")}
          placeholder="Location"
          className="w-full bg-white/50 border border-pink-200 p-4 rounded-xl text-gray-900 outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-300 transition placeholder-gray-400 font-light tracking-wide"
        />
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }} className="md:col-span-2">
        <textarea
          {...register("notes")}
          placeholder="Additional Notes"
          className="w-full bg-white/50 border border-pink-200 p-4 rounded-xl text-gray-900 outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-300 transition placeholder-gray-400 font-light tracking-wide h-32 resize-none"
        />
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }} className="md:col-span-2">
        <button
          className="w-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-sm hover:opacity-90 hover:shadow-[0_4px_20px_rgba(236,72,153,0.4)] transition-all duration-500 border border-transparent"
        >
          Confirm Booking
        </button>
      </motion.div>
    </motion.form>
  );
}

export default BookingForm;