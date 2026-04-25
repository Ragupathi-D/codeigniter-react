import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@shared/context/AuthContext";
import ProtectedRoute from "@shared/components/ProtectedRoute";
import ReportList from "./pages/ReportList";
import ReportDetail from "./pages/ReportDetail";

// The CI3 sub-path this app lives under (must match vite.config base)
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function App() {
	return (
		<BrowserRouter basename={BASE}>
			<AuthProvider>
				<Routes>
					{/* All report routes require authentication */}
					<Route element={<ProtectedRoute />}>
						<Route index element={<Navigate to="/list" replace />} />
						<Route path="list" element={<ReportList />} />
						<Route path="detail/:id" element={<ReportDetail />} />
					</Route>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}
