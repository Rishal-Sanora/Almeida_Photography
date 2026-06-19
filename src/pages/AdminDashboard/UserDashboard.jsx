import { Link } from "react-router-dom";

function UserDashboard() {

  return (

    <section>

      <h1 className="text-5xl text-gray-800 font-bold mb-10">

        User Dashboard

      </h1>

      <div className="grid lg:grid-cols-4 gap-8">

        <Link
        to="/user-dashboard/profile"
        className="bg-white shadow p-8 rounded-3xl"
        >

          Profile

        </Link>

        <Link
        to="/user-dashboard/my-bookings"
        className="bg-white shadow p-8 rounded-3xl"
        >

          My Bookings

        </Link>

        <Link
        to="/user-dashboard/upload-photos"
        className="bg-white shadow p-8 rounded-3xl"
        >

          Upload Photos

        </Link>

        <Link
        to="/user-dashboard/notifications"
        className="bg-white shadow p-8 rounded-3xl"
        >

          Notifications

        </Link>

      </div>

    </section>

  );

}

export default UserDashboard;