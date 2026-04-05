import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Error in auhentication context!");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = ({ data }) => {
    console.log(data);
    localStorage.setItem("token", data.token);
    localStorage.setItem("name", data.name);
    setUser(data.token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser(token);
        }
      } catch (error) {
        logout(); // invalid token
        console.log("Invaid token!");
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
