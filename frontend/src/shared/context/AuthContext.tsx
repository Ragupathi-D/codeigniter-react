import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import api from '../api/client';

export interface AuthUser {
  id: number;
  username: string;
  name: string;
  role: string;
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface CheckResponse {
  authenticated: boolean;
  user?: AuthUser;
}

interface LoginResponse {
  success: boolean;
  user: AuthUser;
  message?: string;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<CheckResponse>('/api/auth/check')
      .then((data) => {
        if (data.authenticated && data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {
        // Network error or server down — stay unauthenticated
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const data = await api.post<LoginResponse>('/api/auth/login', {
      username,
      password,
    });
    if (data.success && data.user) {
      setUser(data.user);
    } else {
      throw new Error(data.message ?? 'Login failed');
    }
  }, []);

  const logout = useCallback(async () => {
    await api.post('/api/auth/logout');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return ctx;
}

export default AuthContext;
