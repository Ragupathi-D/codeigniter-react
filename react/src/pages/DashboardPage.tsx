import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <p>Welcome back, <strong>{user?.username}</strong>!</p>
      <p>Email: {user?.email}</p>
      <button onClick={handleLogout}>Sign Out</button>
    </div>
  );
}
