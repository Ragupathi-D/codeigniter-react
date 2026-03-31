import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from 'react';
import { authApi, type AuthUser } from '../services/authApi';

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isLoggingIn: boolean;
}

type AuthAction =
  | { type: 'HYDRATE_START' }
  | { type: 'HYDRATE_DONE'; user: AuthUser | null }
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; user: AuthUser }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'HYDRATE_START':  return { ...state, isLoading: true };
    case 'HYDRATE_DONE':   return { ...state, isLoading: false, user: action.user };
    case 'LOGIN_START':    return { ...state, isLoggingIn: true };
    case 'LOGIN_SUCCESS':  return { ...state, isLoggingIn: false, user: action.user };
    case 'LOGIN_FAILURE':  return { ...state, isLoggingIn: false };
    case 'LOGOUT':         return { ...state, user: null };
    default:               return state;
  }
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLoading: true,
    isLoggingIn: false,
  });

  useEffect(() => {
    dispatch({ type: 'HYDRATE_START' });
    authApi
      .check()
      .then((res) =>
        dispatch({
          type: 'HYDRATE_DONE',
          user: res.authenticated && res.user ? res.user : null,
        })
      )
      .catch(() => dispatch({ type: 'HYDRATE_DONE', user: null }));
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await authApi.login(email, password);
      dispatch({ type: 'LOGIN_SUCCESS', user: res.user });
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE' });
      throw err;
    }
  };

  const logout = async () => {
    await authApi.logout().catch(() => undefined);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
