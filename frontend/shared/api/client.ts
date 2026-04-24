/**
 * API client — thin fetch wrapper for CI3 session-based API.
 *
 * - Always sends credentials (ci_session cookie) with every request.
 * - Reads the base URL from the <meta name="base-url"> tag injected by CI3.
 * - Handles JSON serialisation / deserialisation.
 * - On 401 responses it redirects to the login page automatically.
 */

// ---------------------------------------------------------------------------
// Resolve the CI3 base URL.
//
// Dev  : VITE_API_BASE is set in .env.development to the full Apache origin
//        (e.g. http://localhost/ragu/codeigniter-react).  Requests go
//        cross-origin and Apache returns the proper CORS + credentials headers.
//
// Prod : No env variable — read the <meta name="base-url"> tag that CI3
//        injects into the HTML shell.  Same-origin, no CORS needed.
// ---------------------------------------------------------------------------
function getBaseUrl(): string {
  // Vite replaces import.meta.env.VITE_API_BASE at build/serve time.
  // In production the env var is undefined so we fall through to the meta tag.
  const envBase = import.meta.env.VITE_API_BASE as string | undefined;
  if (envBase) return envBase.replace(/\/$/, '');

  const meta = document.querySelector<HTMLMetaElement>('meta[name="base-url"]');
  return meta?.content?.replace(/\/$/, '') ?? '';
}

// ---------------------------------------------------------------------------
// Core request helper
// ---------------------------------------------------------------------------
interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
  headers?: Record<string, string>;
}

async function request<T = unknown>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = 'GET', body, headers = {} } = options;

  const url = `${getBaseUrl()}${path}`;

  const fetchOptions: RequestInit = {
    method,
    credentials: 'include', // always send ci_session cookie
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

  // Auto-redirect on session expiry
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

  // Return parsed JSON (or null for 204 No Content)
  if (response.status === 204) {
    return null as T;
  }

  return response.json() as Promise<T>;
}

// ---------------------------------------------------------------------------
// Convenience methods
// ---------------------------------------------------------------------------
export const api = {
  get: <T = unknown>(path: string, headers?: Record<string, string>) =>
    request<T>(path, { method: 'GET', headers }),

  post: <T = unknown>(path: string, body?: unknown, headers?: Record<string, string>) =>
    request<T>(path, { method: 'POST', body, headers }),

  put: <T = unknown>(path: string, body?: unknown, headers?: Record<string, string>) =>
    request<T>(path, { method: 'PUT', body, headers }),

  patch: <T = unknown>(path: string, body?: unknown, headers?: Record<string, string>) =>
    request<T>(path, { method: 'PATCH', body, headers }),

  delete: <T = unknown>(path: string, headers?: Record<string, string>) =>
    request<T>(path, { method: 'DELETE', headers }),
};

export default api;
