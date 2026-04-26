import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@shared/context/AuthContext'
import AdminRoutes from './routes'

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

export default function App() {
	return (
		<BrowserRouter basename={BASE}>
			<AuthProvider>
				<AdminRoutes />
			</AuthProvider>
		</BrowserRouter>
	)
}
