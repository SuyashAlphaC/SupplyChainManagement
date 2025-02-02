// src/context/AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Store user data or null if not logged in

  const login = (userData) => {
    setUser(userData); // Set user data when logged in
  };

  const logout = () => {
    setUser(null); // Clear user data when logged out
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext); // Hook to use auth context
}
