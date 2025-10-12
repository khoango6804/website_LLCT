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
        if (typeof window !== 'undefined') {
          localStorage.setItem('access_token', data.access_token);
        }
        return data.access_token;
      }
    } catch {}
    return null;
  };

  const authFetch = async (url: string, options?: RequestInit): Promise<Response> => {
    let currentToken = token || (typeof window !== 'undefined' ? localStorage.getItem('access_token') : null);
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
      // Try MongoDB API first
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log('MongoDB login successful for:', email);
          setToken(data.access_token);
          setRefreshToken(data.refresh_token);
          setUser(data.user);
          if (typeof window !== 'undefined') {
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            localStorage.setItem('user', JSON.stringify(data.user));
          }
          return true;
        } else {
          console.error('MongoDB login failed:', data.detail);
          // Fall back to mock login
        }
      } catch (apiError) {
        console.log('MongoDB API not available, using mock login');
      }

      // Mock login fallback
      // Default demo users
      const defaultUsers = {
        'admin@demo.com': {
          id: 1,
          email: 'admin@demo.com',
          username: 'admin',
          full_name: 'Admin User',
          is_superuser: true,
          is_instructor: false,
          role: 'admin',
          is_active: true,
          created_at: new Date().toISOString()
        },
        'instructor@demo.com': {
          id: 2,
          email: 'instructor@demo.com',
          username: 'instructor',
          full_name: 'Instructor User',
          is_superuser: false,
          is_instructor: true,
          role: 'instructor',
          is_active: true,
          created_at: new Date().toISOString()
        },
        'student@demo.com': {
          id: 3,
          email: 'student@demo.com',
          username: 'student',
          full_name: 'Student User',
          is_superuser: false,
          is_instructor: false,
          role: 'student',
          is_active: true,
          created_at: new Date().toISOString()
        }
      };

      const defaultPasswords = {
        'admin@demo.com': 'admin123',
        'instructor@demo.com': 'instructor123',
        'student@demo.com': 'student123'
      };

      // Get users from localStorage (registered users)
      let mockUsers = defaultUsers;
      let mockPasswords = defaultPasswords;
      
      if (typeof window !== 'undefined') {
        const storedUsers = localStorage.getItem('mockUsers');
        const storedPasswords = localStorage.getItem('mockPasswords');
        
        if (storedUsers) {
          mockUsers = { ...defaultUsers, ...JSON.parse(storedUsers) };
        }
        if (storedPasswords) {
          mockPasswords = { ...defaultPasswords, ...JSON.parse(storedPasswords) };
        }
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Login attempt for:', email);
      console.log('Available users:', Object.keys(mockUsers));
      console.log('Available passwords:', Object.keys(mockPasswords));
      console.log('Password check:', mockPasswords[email as keyof typeof mockPasswords] === password);

      if (mockPasswords[email as keyof typeof mockPasswords] === password) {
        const user = mockUsers[email as keyof typeof mockUsers];
        const token = `mock_token_${Date.now()}`;
        
        setToken(token);
        setRefreshToken(token);
        setUser(user);
        if (typeof window !== 'undefined') {
          localStorage.setItem('access_token', token);
          localStorage.setItem('refresh_token', token);
          localStorage.setItem('user', JSON.stringify(user));
        }
        return true;
      } else {
        console.error('Login failed: Invalid credentials');
        return false;
      }

      // Real API call (commented out for now)
      /*
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
        if (typeof window !== 'undefined') {
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token || data.access_token);
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        return true;
      } else {
        console.error('Login failed:', data.detail);
        return false;
      }
      */
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      // Try MongoDB API first
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
          console.log('MongoDB registration successful for:', userData.email);
          return true;
        } else {
          console.error('MongoDB registration failed:', data.detail);
          // Fall back to mock registration
        }
      } catch (apiError) {
        console.log('MongoDB API not available, using mock registration');
      }

      // Mock registration fallback
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save new user to localStorage
      if (typeof window !== 'undefined') {
        const existingUsers = JSON.parse(localStorage.getItem('mockUsers') || '{}');
        const existingPasswords = JSON.parse(localStorage.getItem('mockPasswords') || '{}');
        
        // Generate new user ID
        const userId = Date.now();
        
        // Save user data
        existingUsers[userData.email] = {
          id: userId,
          email: userData.email,
          username: userData.username,
          full_name: userData.full_name,
          is_superuser: false,
          is_instructor: userData.is_instructor,
          role: userData.is_instructor ? 'instructor' : 'student',
          is_active: true,
          created_at: new Date().toISOString()
        };
        
        // Save password
        existingPasswords[userData.email] = userData.password;
        
        // Store in localStorage
        localStorage.setItem('mockUsers', JSON.stringify(existingUsers));
        localStorage.setItem('mockPasswords', JSON.stringify(existingPasswords));
        
        console.log('Mock registration successful for:', userData.email);
        console.log('User saved to localStorage:', existingUsers[userData.email]);
      }
      
      return true;

      // Real API call (commented out for now)
      /*
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
      */
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    }
  };

  useEffect(() => {
    const initAuth = () => {
      try {
        if (typeof window !== 'undefined') {
          const storedToken = localStorage.getItem('access_token');
          const storedRefresh = localStorage.getItem('refresh_token');
          const storedUser = localStorage.getItem('user');

          if (storedToken && storedUser) {
            setToken(storedToken);
            setRefreshToken(storedRefresh);
            setUser(JSON.parse(storedUser));
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
        }
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
