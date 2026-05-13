import React, { createContext, useState, useEffect } from 'react';
import api from '../api/axiosConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for initial session fetch

  useEffect(() => {
    // Check if token exists in localStorage on initial boot
    const verifySession = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        // Technically we could make a /api/users/me call here to re-validate the token against the DB
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    verifySession();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/users/login', { email, password });
      
      // Save to local storage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        _id: data._id,
        username: data.username,
        email: data.email
      }));
      
      setUser({ _id: data._id, username: data.username, email: data.email });
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to login');
    }
  };

  const register = async (username, email, password) => {
    try {
      const { data } = await api.post('/users', { username, email, password });
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        _id: data._id,
        username: data.username,
        email: data.email
      }));
      
      setUser({ _id: data._id, username: data.username, email: data.email });
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to register');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
