import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

function LoginForm({ isAdminLogin = false }) {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const responseUser = await loginUser(data);
      
      if (isAdminLogin && responseUser.role !== "admin") {
        return toast.error("Unauthorized: Admin access only");
      }
      if (!isAdminLogin && responseUser.role === "admin") {
        navigate("/admin-login");
        return toast.error("Please login via the Admin portal");
      }

      // Guarantee the email is stored in context even if backend omits it
      const userToStore = { ...responseUser, email: data.email };
      login(userToStore);
      toast.success("Login Successful!");
      
      if (responseUser.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <input
        type="email"
        placeholder="Email"
        {...register("email", { required: true })}
        className="w-full bg-[#1a1a1a] border border-gray-800 p-4 rounded-xl text-gray-100 outline-none focus:border-[#D4AF37] transition"
      />

      <input
        type="password"
        placeholder="Password"
        {...register("password", { required: true })}
        className="w-full bg-[#1a1a1a] border border-gray-800 p-4 rounded-xl text-gray-100 outline-none focus:border-[#D4AF37] transition"
      />

      <div className="flex justify-end">
        <Link to="/forgot-password" className="text-sm text-gray-400 hover:text-[#D4AF37] transition">
          Forgot Password?
        </Link>
      </div>

      <button
        className="w-full bg-[#D4AF37] py-4 rounded-xl text-[#0a0a0a] font-bold hover:bg-[#b08d29] shadow-md transition"
      >
        {isAdminLogin ? "Admin Login" : "Login"}
      </button>

      {!isAdminLogin && (
        <p className="text-center text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#D4AF37] font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      )}
    </form>
  );
}

export default LoginForm;