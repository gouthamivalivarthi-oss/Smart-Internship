import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const res = await authApi.getMe();
          if (res.data.success && res.data.user) {
            setUser(res.data.user);
            localStorage.setItem('user', JSON.stringify(res.data.user));
          }
        } catch (err) {
          console.warn('Session expired or invalid token');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          setToken(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await authApi.login({ email, password });
      if (res.data.success) {
        const { token: newToken, user: newUser } = res.data;
        setToken(newToken);
        setUser(newUser);
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(newUser));
        toast.success(`Welcome back, ${newUser.name}!`);
        return { success: true, user: newUser };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please check credentials.';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const register = async (userData) => {
    try {
      const res = await authApi.register(userData);
      if (res.data.success) {
        const { token: newToken, user: newUser } = res.data;
        setToken(newToken);
        setUser(newUser);
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(newUser));
        toast.success('Account created successfully!');
        return { success: true, user: newUser };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed.';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
    toast.success('Logged out successfully');
  };

  const updateProfile = async (fields) => {
    try {
      const res = await authApi.updateProfile(fields);
      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        toast.success('Profile updated');
        return { success: true, user: res.data.user };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update profile';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const uploadResume = async (file) => {
    try {
      const formData = new FormData();
      formData.append('resume', file);
      const res = await authApi.uploadResume(formData);
      if (res.data.success) {
        if (res.data.updatedUser) {
          setUser(res.data.updatedUser);
          localStorage.setItem('user', JSON.stringify(res.data.updatedUser));
        }
        toast.success('Resume analyzed and saved!');
        return { success: true, data: res.data };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Resume upload failed';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isAdmin: user?.role === 'admin',
        loading,
        login,
        register,
        logout,
        updateProfile,
        uploadResume
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
