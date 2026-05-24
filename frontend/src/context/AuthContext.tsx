'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { api } from '../../lib/api';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = Cookies.get('token');
    const savedUser = Cookies.get('user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Clear any existing tokens before login attempt
    Cookies.remove('token');
    Cookies.remove('user');
    setToken(null);
    setUser(null);

    const response = await api.post('/auth/login', { email, password });
    
    Cookies.set('token', response.token, { expires: 7, sameSite: 'strict' });
    Cookies.set('user', JSON.stringify(response.user), { expires: 7, sameSite: 'strict' });
    
    setToken(response.token);
    setUser(response.user);
  };

  const register = async (email: string, password: string, name?: string) => {
    const response = await api.post('/auth/register', { email, password, name });
    
    Cookies.set('token', response.token, { expires: 7, sameSite: 'strict' });
    Cookies.set('user', JSON.stringify(response.user), { expires: 7, sameSite: 'strict' });
    
    setToken(response.token);
    setUser(response.user);
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
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
