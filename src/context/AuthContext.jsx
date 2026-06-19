import { createContext, useState, useEffect } from "react";
import { getProfile } from "../services/authService";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const fetchAndSetProfile = async () => {
    try {
      if (localStorage.getItem("token")) {
        const profileData = await getProfile();
        setUser((prev) => {
          const updated = { ...prev, ...profileData };
          localStorage.setItem("user", JSON.stringify(updated));
          return updated;
        });
      }
    } catch (err) {
      console.error("Failed to fetch user profile", err);
    }
  };

  useEffect(() => {
    fetchAndSetProfile();
  }, []);

  const login = async (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
    // Fetch full profile immediately after setting token
    await fetchAndSetProfile();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;