import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);

  useEffect(() => {
    // Fetch user profile from backend if token exists
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/api/user/profile', {
        headers: { 'Authorization': `Bearer ${token}` },
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch user profile');
          return res.json();
        })
        .then(data => {
          setUser(data);
        })
        .catch(err => {
          setUser(null);
          localStorage.removeItem('token');
          console.error('Error fetching user profile:', err);
        })
        .finally(() => setLoading(false));
    } else {
      setUser(null);
      setLoading(false);
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
    setShowLogoutMessage(false);
  };

  const logout = (callback) => {
    setUser(null);
    localStorage.removeItem('token');
    setShowLogoutMessage(true);
    if (callback) {
      setTimeout(callback, 0);
    }
  };

  const clearLogoutMessage = () => {
    setShowLogoutMessage(false);
  };

  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem('token');
  };

  const hasRole = (role) => {
    return user && user.role === role;
  };

  const value = {
    user,
    login,
    logout,
    clearLogoutMessage,
    showLogoutMessage,
    isAuthenticated,
    hasRole,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 