import React, { createContext, useState, useEffect } from 'react';

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider component to wrap around your application
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check if user is authenticated (could be based on token in localStorage)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true); // Set to true if token exists
    }
  }, []);

  // Function to login
  const login = (token) => {
    localStorage.setItem('token', token); // Store token
    setIsAuthenticated(true); // Update state
  };

  // Function to logout
  const logout = () => {
    localStorage.removeItem('token'); // Remove token
    setIsAuthenticated(false); // Update state
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
