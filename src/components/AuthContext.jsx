import React, { createContext, useContext, useState } from 'react';

// Create a context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    // Simulate a login function
    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
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

    // Value provided to the context consumers
    const value = {
        currentUser,
        token,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
