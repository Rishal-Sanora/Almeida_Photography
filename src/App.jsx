import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MainLayout from "./layouts/MainLayoutComponent";
import DashboardLayout from "./layouts/DashboardLayout";
import UserLayout from "./layouts/UserLayout";

// Public Pages
import Home from "./pages/Home/HomePage";
import Portfolio from "./pages/Portfolio/Portfolio";
import PortfolioCategory from "./pages/Portfolio/PortfolioCategory";
import Services from "./pages/Services/Services";
import Booking from "./pages/Booking/Booking";
import Login from "./pages/Login/Login";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import Register from "./pages/Register/Register";
import Contact from "./pages/Contact/Contact";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Testimonials from "./pages/Testimonials/Testimonials";
import NotFound from "./pages/NotFound/NotFound";
import AboutPage from "./pages/About/AboutPage";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import BookingManagement from "./pages/AdminDashboard/BookingManagement";
import PortfolioManagement from "./pages/AdminDashboard/PortfolioManagement";
import ServicesManagement from "./pages/AdminDashboard/ServicesManagement";
import ClientPhotos from "./pages/AdminDashboard/ClientPhotos";
import Messages from "./pages/AdminDashboard/Messages";
import Analytics from "./pages/AdminDashboard/Analytics";

// User Pages
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import MyBookings from "./pages/UserDashboard/MyBookings";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:category" element={<PortfolioCategory />} />
          <Route path="/services" element={<Services />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-dashboard/bookings" element={<BookingManagement />} />
          <Route path="/admin-dashboard/portfolio" element={<PortfolioManagement />} />
          <Route path="/admin-dashboard/services" element={<ServicesManagement />} />
          <Route path="/admin-dashboard/client-photos" element={<ClientPhotos />} />
          <Route path="/admin-dashboard/messages" element={<Messages />} />
          <Route path="/admin-dashboard/analytics" element={<Analytics />} />
        </Route>

        <Route element={<UserLayout />}>
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/user-dashboard/bookings" element={<MyBookings />} />
        </Route>

        {/* 404 Catch All */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;