import useAuth from "../../hooks/useAuth";

function AdminNavbar() {
  const { user } = useAuth();

  return (

    <header className="bg-pink-100 border-b border-pink-200 px-8 py-5 flex justify-between items-center shadow-sm">
      <h1 className="text-3xl font-bold text-pink-700">
        Dashboard
      </h1>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="bg-white border border-pink-300 text-pink-900 rounded-xl px-4 py-2 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition"
        />
        <img
          src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=FF69B4&color=fff`}
          alt="Profile"
          className="w-12 h-12 rounded-full border-2 border-yellow-400 shadow-sm"
        />
      </div>
    </header>

  );

}

export default AdminNavbar;