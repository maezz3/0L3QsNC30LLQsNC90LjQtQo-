import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext({
    isAuthenticated: true, // Измените на false для теста
    user: { name: "Тестовый Пользователь" },
    login: () => {},
    logout: () => {}
  });

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    isLoading: true
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/auth/check', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        
        setAuth({
          isAuthenticated: true,
          user: response.data.user,
          isLoading: false
        });
      } catch (error) {
        localStorage.removeItem('access_token');
        setAuth({
          isAuthenticated: false,
          user: null,
          isLoading: false
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password
      });

      localStorage.setItem('access_token', response.data.access_token);
      setAuth({
        isAuthenticated: true,
        user: response.data.user,
        isLoading: false
      });
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Ошибка входа'
      };
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });
    } finally {
      localStorage.removeItem('access_token');
      setAuth({
        isAuthenticated: false,
        user: null,
        isLoading: false
      });
    }
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};