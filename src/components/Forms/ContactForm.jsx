import { useForm } from "react-hook-form";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useState } from "react";

function ContactForm() {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.post("/contact", data);
      toast.success("Message Sent! We will contact you soon.");
      reset();
    } catch (err) {
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="gap-6 bg-white/60 backdrop-blur-xl border border-pink-200/50 shadow-[0_4px_30px_rgba(236,72,153,0.1)] p-8 rounded-2xl h-full flex flex-col"
    >
      <div>
        <input
          type="text"
          placeholder="Your Name"
          {...register("name", { required: true })}
          className="w-full bg-white/50 border border-pink-200 p-4 rounded-xl text-gray-900 outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-300 transition placeholder-gray-400 font-light tracking-wide"
        />
      </div>

      <div>
        <input
          type="email"
          placeholder="Your Email"
          {...register("email", { required: true })}
          className="w-full bg-white/50 border border-pink-200 p-4 rounded-xl text-gray-900 outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-300 transition placeholder-gray-400 font-light tracking-wide"
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Subject"
          {...register("subject", { required: true })}
          className="w-full bg-white/50 border border-pink-200 p-4 rounded-xl text-gray-900 outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-300 transition placeholder-gray-400 font-light tracking-wide"
        />
      </div>

      <div className="flex-1 flex flex-col">
        <textarea
          placeholder="Message"
          {...register("message", { required: true })}
          className="w-full h-full flex-1 bg-white/50 border border-pink-200 p-4 rounded-xl text-gray-900 outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-300 transition placeholder-gray-400 font-light tracking-wide resize-none min-h-[120px]"
        />
      </div>

      <button
        disabled={loading}
        className="mt-auto w-full bg-transparent border-2 border-pink-400 px-8 py-4 rounded-xl text-pink-600 text-sm font-bold tracking-[0.2em] uppercase hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 hover:text-white hover:border-transparent shadow-sm hover:shadow-[0_4px_20px_rgba(236,72,153,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

export default ContactForm;