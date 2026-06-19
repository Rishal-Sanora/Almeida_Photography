import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import PageTransition from "../../components/PageTransition";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetToken } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/auth/resetpassword/${resetToken}`, { password });
      toast.success("Password reset successful. Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid or expired token");
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
            New Password
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="password"
              placeholder="New Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-gray-800 p-4 rounded-xl text-gray-100 outline-none focus:border-[#D4AF37] transition"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-gray-800 p-4 rounded-xl text-gray-100 outline-none focus:border-[#D4AF37] transition"
            />
            <button
              disabled={loading}
              className="w-full bg-[#D4AF37] py-4 rounded-xl text-[#0a0a0a] font-bold hover:bg-[#b08d29] shadow-md transition disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            <div className="text-center mt-6 flex justify-center">
              <Link to="/login" className="flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition font-medium">
                <FaArrowLeft className="text-sm" /> Back to Login
              </Link>
            </div>
          </form>
        </motion.div>
      </section>
    </PageTransition>
  );
}

export default ResetPassword;
