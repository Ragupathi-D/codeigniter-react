import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from './LoadingSpinner'

interface ProtectedRouteProps {
	roles?: string[]
	redirectTo?: string
}

function getBaseUrl(): string {
	const meta = document.querySelector<HTMLMetaElement>('meta[name="base-url"]')
	return meta?.content?.replace(/\/$/, '') ?? ''
}

function ProtectedRoute({ roles, redirectTo }: ProtectedRouteProps) {
	const { user, loading } = useAuth()

	if (loading) {
		return <LoadingSpinner />
	}

	if (!user) {
		if (redirectTo) {
			return <Navigate to={redirectTo} replace />
		}
		window.location.href = `${getBaseUrl()}/auth/login`
		return null
	}

	if (roles && roles.length > 0 && !roles.includes(user.role)) {
		return <Navigate to="/unauthorized" replace />
	}

	return <Outlet />
}

export default ProtectedRoute
