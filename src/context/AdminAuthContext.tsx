import { createContext, useContext, useState, ReactNode } from 'react';

interface AdminUser {
  name: string;
  email: string;
  role: string;
  avatar: string;
}

interface AdminAuthContextType {
  isLoggedIn: boolean;
  currentAdmin: AdminUser | null;
  login: (email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
}

// Admin credentials
const ADMIN_CREDENTIALS = [
  {
    email: 'admin@boensummit.com',
    password: 'admin123',
    user: {
      name: 'System Administrator',
      email: 'admin@boensummit.com',
      role: 'Super Admin',
      avatar: 'SA',
    },
  },
  {
    email: 'manager@boensummit.com',
    password: 'manager123',
    user: {
      name: 'Hospital Manager',
      email: 'manager@boensummit.com',
      role: 'Manager',
      avatar: 'HM',
    },
  },
];

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (email: string, password: string) => {
    const admin = ADMIN_CREDENTIALS.find(
      (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password
    );

    if (admin) {
      setCurrentAdmin(admin.user);
      setIsLoggedIn(true);
      return { success: true, message: 'Login successful' };
    }

    return { success: false, message: 'Invalid email or password' };
  };

  const logout = () => {
    setCurrentAdmin(null);
    setIsLoggedIn(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isLoggedIn, currentAdmin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
