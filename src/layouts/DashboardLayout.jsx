import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import AdminNavbar from "../components/Navbar/AdminNavbar";
import { AnimatePresence } from "framer-motion";

function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="flex bg-gradient-to-br from-pink-50 to-yellow-50 min-h-screen text-gray-800 font-sans">
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

export default DashboardLayout;