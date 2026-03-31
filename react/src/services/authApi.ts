const API_BASE = '/api';

export interface AuthUser {
  id: number;
  username: string;
  email: string;
}

interface LoginResponse {
  message: string;
  user: AuthUser;
}

interface CheckResponse {
  authenticated: boolean;
  user?: AuthUser;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error((err as { error: string }).error ?? 'Request failed');
  }
  return res.json() as Promise<T>;
}

export const authApi = {
  login: (email: string, password: string) =>
    request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  logout: () =>
    request<{ message: string }>('/auth/logout', { method: 'POST' }),

  check: () =>
    request<CheckResponse>('/auth/check'),
};
