import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import PageTransition from "../../components/PageTransition";
import { motion } from "framer-motion";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [fallbackLink, setFallbackLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFallbackLink("");
    try {
      const response = await axios.post("http://localhost:5000/api/auth/forgotpassword", { email });
      toast.success(response.data.message || "Reset link sent!");
      
      if (response.data.etherealUrl) {
        setFallbackLink(response.data.etherealUrl);
      } else if (response.data.resetUrl) {
        setFallbackLink(response.data.resetUrl); // Fallback to raw link if ethereal fails somehow
      }
      setEmail("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <section className="min-h-[80vh] flex justify-center items-center py-20 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-[#111111] p-10 rounded-3xl shadow-2xl border border-gray-800"
        >
          <h1 className="text-4xl text-[#D4AF37] font-bold text-center mb-6">
            Forgot Password
          </h1>
          <p className="text-gray-400 text-center mb-8">
            Enter your email to receive a password reset link.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-gray-800 p-4 rounded-xl text-gray-100 outline-none focus:border-[#D4AF37] transition"
            />
            <button
              disabled={loading}
              className="w-full bg-[#D4AF37] py-4 rounded-xl text-[#0a0a0a] font-bold hover:bg-[#b08d29] shadow-md transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
            
            {fallbackLink && (
              <div className="mt-6 p-4 bg-[#1a1a1a] border border-[#D4AF37] rounded-xl text-center">
                <p className="text-gray-300 text-sm mb-2">Gmail configuration missing. Sent via temporary Test Inbox instead!</p>
                <a href={fallbackLink} target="_blank" rel="noopener noreferrer" className="text-[#D81B60] font-bold text-lg hover:underline block mt-3">
                  Click here to view your Email Inbox
                </a>
              </div>
            )}

            <div className="text-center mt-4">
              <Link to="/login" className="text-gray-400 hover:text-[#D4AF37] transition">
                Back to Login
              </Link>
            </div>
          </form>
        </motion.div>
      </section>
    </PageTransition>
  );
}

export default ForgotPassword;
