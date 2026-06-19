import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Sidebar() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <aside className="w-72 bg-pink-100 border-r border-pink-200 shadow-lg min-h-screen sticky top-0">
      <div className="p-8">
        <h1 className="text-3xl font-bold text-pink-600 mb-12">
          {user?.name || "Dashboard"}
        </h1>

        <div className="space-y-5">
          {isAdmin ? (
            <>
              <Link to="/admin-dashboard" className="block text-pink-800 hover:text-yellow-600 font-medium transition">Dashboard</Link>
              <Link to="/admin-dashboard/services" className="block text-pink-800 hover:text-yellow-600 font-medium transition">Services</Link>
              <Link to="/admin-dashboard/portfolio" className="block text-pink-800 hover:text-yellow-600 font-medium transition">Portfolio</Link>
              <Link to="/admin-dashboard/bookings" className="block text-pink-800 hover:text-yellow-600 font-medium transition">Bookings</Link>
            </>
          ) : (
            <>
              <Link to="/user-dashboard" className="block text-pink-800 hover:text-yellow-600 font-medium transition">My Dashboard</Link>
              <Link to="/user-dashboard/bookings" className="block text-pink-800 hover:text-yellow-600 font-medium transition">My Bookings</Link>
            </>
          )}
          <Link to="/" className="block text-pink-800 hover:text-yellow-600 font-medium transition mt-8 pt-8 border-t border-pink-200">Back to Website</Link>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;