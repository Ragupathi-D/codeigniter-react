import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '@shared/components/ProtectedRoute';
import ReportList from './pages/ReportList';
import ReportDetail from './pages/ReportDetail';

export default function ReportRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route index element={<Navigate to="/list" replace />} />
        <Route path="list" element={<ReportList />} />
        <Route path="detail/:id" element={<ReportDetail />} />
      </Route>
    </Routes>
  );
}
