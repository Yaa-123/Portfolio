import { useState, useEffect, useContext, createContext } from 'react';
import api from '../services/api';

// Create auth context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAdminAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [tokens, setTokens] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = () => {
      try {
        const storedTokens = localStorage.getItem('adminTokens');
        const storedAdmin = localStorage.getItem('adminData');
        
        if (storedTokens && storedAdmin) {
          setTokens(JSON.parse(storedTokens));
          setAdmin(JSON.parse(storedAdmin));
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = async (username, password, twoFactorToken = null) => {
    try {
      const response = await api.post('/admin/login', {
        username,
        password,
        twoFactorToken
      });

      if (response.data.requires2FA && !twoFactorToken) {
        return { requires2FA: true };
      }

      const { tokens: authTokens, twoFactorEnabled } = response.data;
      
      // Store tokens and admin data
      setTokens(authTokens);
      setAdmin({ username, twoFactorEnabled });
      
      // Save to localStorage
      localStorage.setItem('adminTokens', JSON.stringify(authTokens));
      localStorage.setItem('adminData', JSON.stringify({ username, twoFactorEnabled }));
      
      return { success: true, twoFactorEnabled };
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.response) {
        return { 
          success: false, 
          message: error.response.data.message || 'Login failed' 
        };
      }
      
      return { success: false, message: 'Network error' };
    }
  };

  // Logout function
  const logout = () => {
    setAdmin(null);
    setTokens(null);
    localStorage.removeItem('adminTokens');
    localStorage.removeItem('adminData');
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!admin && !!tokens;
  };

  // Check if 2FA is enabled
  const is2FAEnabled = () => {
    return admin?.twoFactorEnabled || false;
  };

  // Value to be provided by context
  const value = {
    admin,
    tokens,
    login,
    logout,
    isAuthenticated,
    is2FAEnabled,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};