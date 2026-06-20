import { createBrowserRouter, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import MainLayout from "../layouts/MainLayoutComponent";
import DashboardLayout from "../layouts/DashboardLayout";
import UserLayout from "../layouts/UserLayout";

// Public Pages
import Home from "../pages/Home/HomePage";
import AboutPage from "../pages/About/AboutPage";
import Services from "../pages/Services/Services";
import Portfolio from "../pages/Portfolio/Portfolio";
import CategoryGallery from "../components/Portfolio/CategoryGallery";
import Contact from "../pages/Contact/Contact";
import Login from "../pages/Login/Login";
import AdminLogin from "../pages/Login/AdminLogin";
import Register from "../pages/Register/Register";
import Booking from "../pages/Booking/Booking";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";

// User Dashboard Pages
import UserDashboard from "../pages/UserDashboard/UserDashboard";
import Profile from "../pages/UserDashboard/Profile";
import MyBookings from "../pages/UserDashboard/MyBookings";
import UploadPhotos from "../pages/UserDashboard/UploadPhotos";
import Notifications from "../pages/UserDashboard/Notifications";

// Admin Pages
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import Users from "../pages/AdminDashboard/Users";
import ServicesManagement from "../pages/AdminDashboard/ServicesManagement";
import PortfolioManagement from "../pages/AdminDashboard/PortfolioManagement";
import BookingManagement from "../pages/AdminDashboard/BookingManagement";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user || !localStorage.getItem("token")) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user || !localStorage.getItem("token")) {
    return <Navigate to="/login" replace />;
  }
  if (user.role !== "admin") {
    return <Navigate to="/user-dashboard" replace />;
  }
  return children;
};

const UserRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user || !localStorage.getItem("token")) {
    return <Navigate to="/login" replace />;
  }
  // Admins are kept out of the User Dashboard, or if they try to access it, they go to Admin Dashboard
  if (user.role === "admin") {
    return <Navigate to="/admin-dashboard" replace />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <AboutPage /> },
      { path: "services", element: <Services /> },
      { path: "portfolio", element: <Portfolio /> },
      { path: "portfolio/:category", element: <CategoryGallery /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <Login /> },
      { path: "admin-login", element: <AdminLogin /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password/:token", element: <ResetPassword /> },
      { 
        path: "booking", 
        element: (
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        ) 
      },
    ],
  },
  {
    path: "/admin-dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "users", element: <Users /> },
      { path: "services", element: <ServicesManagement /> },
      { path: "portfolio", element: <PortfolioManagement /> },
      { path: "bookings", element: <BookingManagement /> },
    ]
  },
  {
    path: "/user-dashboard",
    element: (
      <UserRoute>
        <UserLayout />
      </UserRoute>
    ),
    children: [
      { index: true, element: <UserDashboard /> },
      { path: "profile", element: <Profile /> },
      { path: "bookings", element: <MyBookings /> },
      { path: "upload-photos", element: <UploadPhotos /> },
      { path: "notifications", element: <Notifications /> },
    ]
  }
]);

export default router;