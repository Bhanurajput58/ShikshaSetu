import React, { createContext, useContext, useState, useEffect } from 'react';
import { createApiUrl } from '../config/api';

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
      fetch(createApiUrl('/api/users/profile'), {
        headers: { 'Authorization': `Bearer ${token}` },
      })
        .then(async (res) => {
          if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP ${res.status}: Failed to fetch user profile`);
          }
          return res.json();
        })
        .then(data => {
          console.log('User profile loaded successfully:', data);
          setUser(data);
        })
        .catch(err => {
          console.error('Error fetching user profile:', err);
          setUser(null);
          localStorage.removeItem('token');
          // Don't show logout message for token validation errors
          if (err.message.includes('401') || err.message.includes('Unauthorized')) {
            console.log('Token invalid or expired, clearing authentication');
          }
        })
        .finally(() => setLoading(false));
    } else {
      setUser(null);
      setLoading(false);
    }
  }, []);

  const login = (userData, token) => {
    console.log('Logging in user:', userData);
    setUser(userData);
    localStorage.setItem('token', token);
    setShowLogoutMessage(false);
  };

  const logout = (callback) => {
    console.log('Logging out user');
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