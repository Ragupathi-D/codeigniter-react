/**
 * ProtectedRoute
 *
 * Wraps a route so that unauthenticated users are redirected to
 * the CI3 login page. Shows a loading indicator while the auth
 * check is in-flight.
 *
 * Usage (with react-router-dom v6):
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="users" element={<UserList />} />
 *   </Route>
 *
 *   // Or with optional role guard:
 *   <Route element={<ProtectedRoute roles={['admin']} />}>
 *     <Route path="settings" element={<Settings />} />
 *   </Route>
 */

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  /** If provided, the user's role must be in this list. */
  roles?: string[];
  /** Where to redirect when unauthenticated. Defaults to CI3 login page. */
  redirectTo?: string;
}

function ProtectedRoute({ roles, redirectTo }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    // Redirect to the CI3 server-side login page (full page load)
    if (redirectTo) {
      return <Navigate to={redirectTo} replace />;
    }
    // Fall back to CI3 login — outside React Router, needs full navigation
    window.location.href = `${getBaseUrl()}/auth/login`;
    return null;
  }

  if (roles && roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

function getBaseUrl(): string {
  const meta = document.querySelector<HTMLMetaElement>('meta[name="base-url"]');
  return meta?.content?.replace(/\/$/, '') ?? '';
}

export default ProtectedRoute;
