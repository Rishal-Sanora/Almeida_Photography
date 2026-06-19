import StatsCard from "../../components/DashboardCards/StatsCard";

function AdminDashboard() {
  return (
    <section>
      <h1 className="text-5xl text-pink-700 font-bold mb-10">
        Dashboard Overview
      </h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
        <StatsCard
          title="Users"
          value="120"
          icon="👤"
        />
        <StatsCard
          title="Bookings"
          value="54"
          icon="📅"
        />
        <StatsCard
          title="Portfolio"
          value="320"
          icon="📸"
        />
        <StatsCard
          title="Testimonials"
          value="45"
          icon="⭐"
        />
      </div>
    </section>
  );
}

export default AdminDashboard;