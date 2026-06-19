import useAuth from "../../hooks/useAuth";

function Profile() {
  const { user } = useAuth();

  return (
    <section>
      <h1 className="text-5xl text-[#D81B60] font-bold mb-10">
        My Profile
      </h1>

      <div className="bg-[#111111] p-10 rounded-3xl border border-gray-800 shadow-xl max-w-2xl">
        
        <div className="flex items-center gap-6 mb-8 border-b border-gray-800 pb-8">
          <div className="w-24 h-24 bg-gradient-to-tr from-[#D81B60] to-yellow-500 rounded-full flex items-center justify-center text-4xl text-white font-bold uppercase shadow-[0_0_20px_rgba(216,27,96,0.5)]">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div>
            <h2 className="text-3xl text-white font-bold">{user?.name || "No Name"}</h2>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-gray-500 uppercase tracking-widest text-sm mb-1">Email Address</p>
            <p className="text-white text-xl">{user?.email || "No Email Provided"}</p>
          </div>
          
          <div>
            <p className="text-gray-500 uppercase tracking-widest text-sm mb-1">Phone Number</p>
            <p className="text-white text-xl">{user?.phone || "No Phone Provided"}</p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Profile;