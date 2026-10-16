import { createContext, useContext, useState, ReactNode } from 'react';
import { Doctor, doctors } from '../data/mockData';

interface AuthContextType {
  isLoggedIn: boolean;
  currentDoctor: Doctor | null;
  login: (email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentDoctor, setCurrentDoctor] = useState<Doctor | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (email: string, password: string) => {
    const doctor = doctors.find(
      (d) => d.email.toLowerCase() === email.toLowerCase() && d.password === password
    );

    if (doctor) {
      setCurrentDoctor(doctor);
      setIsLoggedIn(true);
      return { success: true, message: 'Login successful' };
    }

    return { success: false, message: 'Invalid email or password' };
  };

  const logout = () => {
    setCurrentDoctor(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentDoctor, login, logout }}>
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
