import LoginForm from "../../components/Forms/LoginForm";
import PageTransition from "../../components/PageTransition";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function AdminLogin() {
  return (
    <PageTransition>
      <section className="min-h-[80vh] flex justify-center items-center py-20 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-[#111111] p-10 rounded-3xl shadow-2xl border border-[#D4AF37] border-opacity-30"
        >
          <h1 className="text-5xl text-[#D4AF37] font-bold text-center mb-10">
            Admin Login
          </h1>
          <LoginForm isAdminLogin={true} />
          <div className="mt-6 text-center">
            <Link to="/login" className="text-xs text-gray-500 hover:text-[#D4AF37] transition">
              User Access
            </Link>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  );
}

export default AdminLogin;
