import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { API_CONFIG } from '../config/api.config';

// Create a context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAdmin, setIsAdmin] = useState(false);

  // Function to check if the token is valid and not expired
  const isTokenValid = (token) => {
    if (!token) return false;
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp && decodedToken.exp > currentTime;
    } catch (error) {
      return false;
    }
  };

  // Function to handle login
  const login = async (email, password, isAdminLogin = false) => {
    try {
      console.log('Login attempt:', { email, isAdminLogin });
      const endpoint = `${API_CONFIG.API_URL}${isAdminLogin ? '/admin/login' : '/auth/login'}`;
      console.log('Using endpoint:', endpoint);
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Non-JSON response received:', contentType);
        throw new Error('Server returned non-JSON response');
      }

      const data = await response.json();
      console.log('Response data:', data);
      
      if (response.ok) {
        console.log('Login successful');
        setToken(data.token);
        localStorage.setItem('token', data.token);
        setCurrentUser(data.user);
        setIsAdmin(isAdminLogin && data.user && data.user.role === 'admin');
        return { success: true };
      } else {
        console.error('Login failed:', data);
        throw new Error(data.error || data.message || 'Failed to login');
      }
    } catch (error) {
      console.error('Login Error:', error);
      return { 
        success: false, 
        message: error.message || 'An error occurred during login'
      };
    }
  };

  // Function to handle logout
  const logout = () => {
    setToken(null);
    setCurrentUser(null);
    setIsAdmin(false);
    localStorage.removeItem('token');
  };

  // Check token validity on component mount
  useEffect(() => {
    if (token) {
      if (isTokenValid(token)) {
        try {
          const decoded = jwtDecode(token);
          // Check if the token contains user information directly or in a user property
          const userData = decoded.user || decoded;
          setCurrentUser(userData);
          setIsAdmin(userData.role === 'admin');
        } catch (error) {
          console.error('Error decoding token:', error);
          logout();
        }
      } else {
        logout();
        alert('Session expired. Please log in again.');
        window.location.href = '/login';
      }
    }
  }, [token]);

  // Value provided to the context consumers
  const value = {
    currentUser,
    token,
    isAdmin,
    login,
    logout,
    isTokenValid,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
