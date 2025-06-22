
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState, LoginCredentials } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check for stored auth data on app initialization
    const storedUser = localStorage.getItem('auth_user');
    const storedToken = localStorage.getItem('auth_token');
    
    if (storedUser && storedToken) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      // TODO: Replace with actual API call to your Python backend
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const { user, token } = data;

      localStorage.setItem('auth_user', JSON.stringify(user));
      localStorage.setItem('auth_token', token);

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      // For demo purposes, simulate login with mock data
      console.log('Using mock login for development');
      
      let mockUser: User;
      if (credentials.email === 'admin@example.com') {
        mockUser = {
          id: '1',
          email: credentials.email,
          role: 'admin',
          name: 'Admin User',
        };
      } else {
        mockUser = {
          id: '2',
          email: credentials.email,
          role: 'portfolio_manager',
          name: 'Portfolio Manager',
          portfolio_owner_id: 'pm1',
        };
      }

      localStorage.setItem('auth_user', JSON.stringify(mockUser));
      localStorage.setItem('auth_token', 'mock_token');

      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
