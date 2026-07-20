import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { adminApi, AdminUser } from '../api/admin';

interface AuthContextType {
  admin: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(adminApi.getStoredAdmin());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = adminApi.getToken();
    if (!token) { setLoading(false); return; }
    adminApi.me()
      .then(setAdmin)
      .catch(() => { adminApi.logout(); setAdmin(null); })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const user = await adminApi.login(email, password);
    setAdmin(user);
  };

  const logout = () => {
    adminApi.logout();
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
