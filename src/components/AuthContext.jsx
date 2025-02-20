import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Using named export

// Create a context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    // Function to check if the token is valid and not expired
    const isTokenValid = (token) => {
        if (!token) {
            return false; // No token found
        }

        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000);

            // Check if the token is expired
            if (decodedToken.exp && decodedToken.exp > currentTime) {
                return true; // Token is valid
            } else {
                return false; // Token is expired
            }
        } catch (error) {
            return false; // Invalid token
        }
    };

    // Function to simulate login
    const login = async (email, password) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                setToken(data.token);
                localStorage.setItem('token', data.token);  // Store the token in localStorage
                setCurrentUser(data.user);  // Assuming the response has a user object
                return { success: true };
            } else {
                throw new Error(data.message || 'Failed to login');
            }
        } catch (error) {
            console.error('Login Error:', error);
            return { success: false, message: error.message };
        }
    };

    // Function to simulate logout
    const logout = () => {
        setToken(null);
        setCurrentUser(null);
        localStorage.removeItem('token');  // Remove the token from localStorage
    };

    // Check token validity on component mount
    useEffect(() => {
        if (token) {
            if (isTokenValid(token)) {
                setCurrentUser(jwtDecode(token).user); // Assuming the user information is in the token
            } else {
                logout();
                alert('Session expired. Please log in again.');
                window.location.href = '/login'; // Redirect to login
            }
        }
    }, [token]);

    // Value provided to the context consumers
    const value = {
        currentUser,
        token,
        login,
        logout,
        isTokenValid // Optional, in case other components need to check token validity
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
