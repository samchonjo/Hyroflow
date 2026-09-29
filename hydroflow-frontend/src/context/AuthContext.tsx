import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import { mockUsers } from '../data/mockData';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: { identifier: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('hydroflow_user');
    const token = localStorage.getItem('hydroflow_token');

    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser) as User);
      } catch {
        localStorage.removeItem('hydroflow_user');
        localStorage.removeItem('hydroflow_token');
      }
    }

    setLoading(false);
  }, []);

  const login = async (credentials: { identifier: string; password: string }) => {
    const normalizedIdentifier = credentials.identifier.trim();
    const account = mockUsers.find((userItem) => {
      const matchesEmail = userItem.email.toLowerCase() === normalizedIdentifier.toLowerCase();
      const matchesRegNumber = userItem.regNumber?.toLowerCase() === normalizedIdentifier.toLowerCase();
      return matchesEmail || matchesRegNumber;
    });

    if (!account || account.password !== credentials.password) {
      throw new Error('Invalid email or password. Try student123, tech123 or admin123.');
    }

    const userProfile: User = {
      id: account.id,
      regNumber: account.regNumber,
      name: account.name,
      email: account.email,
      role: account.role,
      hostelBlock: account.hostelBlock,
      roomNumber: account.roomNumber,
      phone: account.phone,
      meterNumber: account.meterNumber,
    };

    localStorage.setItem('hydroflow_user', JSON.stringify(userProfile));
    localStorage.setItem('hydroflow_token', 'demo-token');
    setUser(userProfile);
  };

  const logout = () => {
    localStorage.removeItem('hydroflow_user');
    localStorage.removeItem('hydroflow_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
