import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);  // New loading state

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setLoading(false);  // Stop loading once the login status is determined
  }, []);

  const handleLogin = (email) => {
    localStorage.setItem('email', email);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('email');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
