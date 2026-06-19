import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

function RegisterForm() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    setLoading(true);
    try {
      const { confirmPassword, ...payload } = data;
      const responseUser = await registerUser(payload);
      
      // Guarantee the email and phone are stored in context even if backend omits it
      const userToStore = { ...responseUser, email: payload.email, phone: payload.phone };
      login(userToStore);
      toast.success("Account created successfully!");
      if (responseUser.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/booking");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message;
      if (errorMsg === "User already exists") {
        toast.error("An account with this email already exists. Please login instead.");
      } else {
        toast.error(errorMsg || "Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <input
        type="text"
        placeholder="Full Name"
        required
        {...register("name")}
        className="w-full bg-[#1a1a1a] border border-gray-800 p-4 rounded-xl text-gray-100 outline-none focus:border-[#D4AF37] transition"
      />

      <input
        type="email"
        placeholder="Email"
        required
        {...register("email")}
        className="w-full bg-[#1a1a1a] border border-gray-800 p-4 rounded-xl text-gray-100 outline-none focus:border-[#D4AF37] transition"
      />

      <input
        type="tel"
        placeholder="Phone Number"
        required
        {...register("phone")}
        className="w-full bg-[#1a1a1a] border border-gray-800 p-4 rounded-xl text-gray-100 outline-none focus:border-[#D4AF37] transition"
      />

      <input
        type="password"
        placeholder="Password"
        required
        {...register("password")}
        className="w-full bg-[#1a1a1a] border border-gray-800 p-4 rounded-xl text-gray-100 outline-none focus:border-[#D4AF37] transition"
      />

      <input
        type="password"
        placeholder="Confirm Password"
        required
        {...register("confirmPassword")}
        className="w-full bg-[#1a1a1a] border border-gray-800 p-4 rounded-xl text-gray-100 outline-none focus:border-[#D4AF37] transition"
      />

      <button
        disabled={loading}
        className="w-full bg-[#D4AF37] py-4 rounded-xl text-[#0a0a0a] font-bold hover:bg-[#b08d29] shadow-md transition disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Account"}
      </button>

      <p className="text-center text-gray-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-[#D4AF37] font-semibold hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  );
}

export default RegisterForm;