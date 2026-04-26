import { ENV } from './../env';

function getBaseUrl(): string {
  const envBase = ENV.BASE_PATH;
  if (envBase) return envBase;
  const meta = document.querySelector<HTMLMetaElement>('meta[name="base-url"]');
  return meta?.content ?? '';
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
  headers?: Record<string, string>;
}

async function request<T = unknown>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = 'GET', body, headers = {} } = options;
  const url = `${getBaseUrl()}${path}`;

  const fetchOptions: RequestInit = {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      ...headers,
    },
  };

  if (body !== undefined) {
    fetchOptions.body = JSON.stringify(body);
  }

  const response = await fetch(url, fetchOptions);

  if (response.status === 401) {
    window.location.href = `${getBaseUrl()}/auth/login`;
    return Promise.reject(new Error('Unauthenticated'));
  }

  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message ?? errorMessage;
    } catch {
      // ignore parse error
    }
    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return null as T;
  }

  return response.json() as Promise<T>;
}

export const api = {
  get: <T = unknown>(path: string, headers?: Record<string, string>) =>
    request<T>(path, { method: 'GET', headers }),

  post: <T = unknown>(
    path: string,
    body?: unknown,
    headers?: Record<string, string>,
  ) => request<T>(path, { method: 'POST', body, headers }),

  put: <T = unknown>(
    path: string,
    body?: unknown,
    headers?: Record<string, string>,
  ) => request<T>(path, { method: 'PUT', body, headers }),

  patch: <T = unknown>(
    path: string,
    body?: unknown,
    headers?: Record<string, string>,
  ) => request<T>(path, { method: 'PATCH', body, headers }),

  delete: <T = unknown>(path: string, headers?: Record<string, string>) =>
    request<T>(path, { method: 'DELETE', headers }),
};

export default api;
