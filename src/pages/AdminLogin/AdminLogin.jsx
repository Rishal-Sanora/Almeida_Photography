import LoginForm from "../../components/Forms/LoginForm";
import PageTransition from "../../components/PageTransition";
import { motion } from "framer-motion";

function AdminLogin() {
  return (
    <PageTransition>
      <section className="min-h-[80vh] flex justify-center items-center py-20 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-[#111111] p-10 rounded-3xl shadow-2xl border border-gray-800"
        >
          <h1 className="text-5xl text-[#D4AF37] font-bold text-center mb-10">
            Admin Portal
          </h1>
          <p className="text-center text-gray-400 mb-8">Secure login for administrators only.</p>
          <LoginForm isAdminLogin={true} />
        </motion.div>
      </section>
    </PageTransition>
  );
}

export default AdminLogin;
