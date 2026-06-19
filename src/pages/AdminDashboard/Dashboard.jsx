import StatsCard from "../../components/DashboardCards/StatsCard";

function Dashboard() {

  return (

    <section>

      <h1 className="text-5xl font-bold text-gray-800 mb-10">

        Dashboard Overview

      </h1>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">

        <StatsCard
          title="Users"
          value="120"
        />

        <StatsCard
          title="Bookings"
          value="54"
        />

        <StatsCard
          title="Portfolio Images"
          value="300"
        />

        <StatsCard
          title="Testimonials"
          value="48"
        />

      </div>

    </section>

  );

}

export default Dashboard;