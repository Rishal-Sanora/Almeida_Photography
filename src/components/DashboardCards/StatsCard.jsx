function StatsCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-pink-100 hover:scale-105 transition transform">
      <div className="flex justify-between items-center">
        <h3 className="text-pink-600 font-semibold text-xl">
          {title}
        </h3>
        {icon && <span className="text-3xl bg-pink-50 p-3 rounded-xl">{icon}</span>}
      </div>
      <h1 className="text-5xl font-bold text-yellow-500 mt-6">
        {value}
      </h1>
    </div>
  );
}

export default StatsCard;