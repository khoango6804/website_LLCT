'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface User {
  id: number;
  email: string;
  username: string;
  full_name: string;
  is_active: boolean;
  is_superuser: boolean;
  is_instructor: boolean;
  avatar_url?: string;
  bio?: string;
  created_at: string;
  updated_at?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  hasRole: (role: 'admin' | 'instructor' | 'student') => boolean;
  authFetch: (url: string, options?: RequestInit) => Promise<Response>;
}

interface RegisterData {
  full_name: string;
  email: string;
  username: string;
  password: string;
  is_instructor: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!token;

  const hasRole = (role: 'admin' | 'instructor' | 'student'): boolean => {
    if (!user) return false;
    
    switch (role) {
      case 'admin':
        return user.is_superuser;
      case 'instructor':
        return user.is_instructor;
      case 'student':
        return !user.is_superuser && !user.is_instructor;
      default:
        return false;
    }
  };

  const refreshAccessToken = async (): Promise<string | null> => {
    if (!refreshToken) return null;
    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken })
      });
      if (res.ok) {
        const data = await res.json();
        setToken(data.access_token);
        localStorage.setItem('access_token', data.access_token);
        return data.access_token;
      }
    } catch {}
    return null;
  };

  const authFetch = async (url: string, options?: RequestInit): Promise<Response> => {
    let currentToken = token || localStorage.getItem('access_token');
    const headers = new Headers(options?.headers || {});
    if (currentToken) headers.set('Authorization', `Bearer ${currentToken}`);

    let res = await fetch(url, { ...options, headers });
    if (res.status === 401 && refreshToken) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        headers.set('Authorization', `Bearer ${newToken}`);
        res = await fetch(url, { ...options, headers });
      }
    }
    return res;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.access_token);
        setRefreshToken(data.refresh_token || data.access_token);
        setUser(data.user);
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token || data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return true;
      } else {
        console.error('Login failed:', data.detail);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        return true;
      } else {
        console.error('Registration failed:', data.detail);
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const initAuth = () => {
      try {
        const storedToken = localStorage.getItem('access_token');
        const storedRefresh = localStorage.getItem('refresh_token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setRefreshToken(storedRefresh);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const value: AuthContextType = {
    user,
    token,
    refreshToken,
    login,
    register,
    logout,
    isLoading,
    isAuthenticated,
    hasRole,
    authFetch,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
