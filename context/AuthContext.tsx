import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

interface AuthUser {
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// In a real app, these would be validated against a secure backend.
const MOCK_ADMIN_EMAIL = 'med14@gmail.com';
const MOCK_ADMIN_PASSWORD = 'Ninjak7al@###@';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const storedUser = sessionStorage.getItem('adminUser');
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback((email: string, password: string): boolean => {
    if (email.toLowerCase() === MOCK_ADMIN_EMAIL && password === MOCK_ADMIN_PASSWORD) {
      const adminUser = { email: MOCK_ADMIN_EMAIL };
      sessionStorage.setItem('adminUser', JSON.stringify(adminUser));
      setUser(adminUser);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem('adminUser');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
