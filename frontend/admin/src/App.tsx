import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@shared/context/AuthContext";
import ProtectedRoute from "@shared/components/ProtectedRoute";
import UserList from "./pages/UserList";
import UserDetail from "./pages/UserDetail";
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function App() {
	return (
		<BrowserRouter basename={BASE}>
			<AuthProvider>
				<Routes>
					{/* All admin routes require authentication */}
					<Route element={<ProtectedRoute />}>
						<Route index element={<Navigate to="/users" replace />} />
						<Route path="users" element={<UserList />} />
						<Route path="users/:id" element={<UserDetail />} />
					</Route>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}
