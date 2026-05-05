import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '@shared/components/ProtectedRoute'
import UserList from './pages/UserList'
import UserDetail from './pages/UserDetail'
import DummyPage from './pages/DummyPage'

export default function AdminRoutes() {
	return (
		<Routes>
			<Route element={<ProtectedRoute />}>
				<Route index element={<Navigate to="/users" replace />} />
				<Route path="users" element={<UserList />} />
				<Route path="users/:id" element={<UserDetail />} />
				<Route path="suppliers" element={<DummyPage title="Supplier Master" />} />
				<Route path="roles" element={<DummyPage title="Role Master" />} />
				<Route path="manage-access" element={<DummyPage title="Manage Access" />} />
				<Route path="divisions" element={<DummyPage title="Division Master" />} />
				<Route path="customers" element={<DummyPage title="Customer Master" />} />
				<Route path="screen-master" element={<DummyPage title="Screen Master" />} />
				<Route path="smtp-configure" element={<DummyPage title="SMTP Configure" />} />
				<Route path="declaration-master" element={<DummyPage title="Declaration Master" />} />
				<Route path="customer-parts" element={<DummyPage title="Customer Part Master" />} />
				<Route path="download-report" element={<DummyPage title="Download Report" />} />
				<Route path="gc-configuration" element={<DummyPage title="GC Configuration" />} />
				<Route path="echa-submission" element={<DummyPage title="ECHA Submission Report" />} />
				<Route path="quick-search" element={<DummyPage title="Quick Search" />} />
				<Route path="sds-master" element={<DummyPage title="SDS / Material Master" />} />
				<Route path="sds-search" element={<DummyPage title="SDS / Material Search" />} />
				<Route path="bom" element={<DummyPage title="BoM" />} />
				<Route path="survey" element={<DummyPage title="Survey" />} />
			</Route>
		</Routes>
	)
}
