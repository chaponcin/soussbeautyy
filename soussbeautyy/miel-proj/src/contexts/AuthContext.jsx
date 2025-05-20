import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("userToken");

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = (token) => {
    Cookies.set("userToken", token, { path: "/" });
    setIsLoggedIn(true);
  };

  const logout = () => {
    Cookies.remove("userToken");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
