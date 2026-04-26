import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '@shared/components/ProtectedRoute'
import UserList from './pages/UserList'
import UserDetail from './pages/UserDetail'

export default function AdminRoutes() {
	return (
		<Routes>
			<Route element={<ProtectedRoute />}>
				<Route index element={<Navigate to="/users" replace />} />
				<Route path="users" element={<UserList />} />
				<Route path="users/:id" element={<UserDetail />} />
			</Route>
		</Routes>
	)
}
