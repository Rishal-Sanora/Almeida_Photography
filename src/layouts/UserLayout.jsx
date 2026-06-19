import { Outlet, useLocation, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import AdminNavbar from "../components/Navbar/AdminNavbar";
import { AnimatePresence } from "framer-motion";
import useAuth from "../hooks/useAuth";

function UserLayout() {
  const location = useLocation();
  const { user } = useAuth();

  if (!user || user.role === "admin") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex bg-[#fffaf0] min-h-screen text-gray-900 font-sans">
      <Sidebar />
      <div className="flex-1">
        <AdminNavbar />
        <main className="p-8">
          <AnimatePresence mode="wait">
            <div key={location.pathname}>
              <Outlet />
            </div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default UserLayout;