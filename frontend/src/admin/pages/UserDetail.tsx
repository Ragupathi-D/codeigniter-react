import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '@shared/api/client';
import Layout from '../components/Layout';
import type { User } from '../types';

interface ApiResponse {
  success: boolean;
  data: User;
}

export default function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get<ApiResponse>(`/api/admin/users/${id}`)
      .then((res) => setUser(res.data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <Layout title="Admin — User Detail">
      <div className="mb-3">
        <Link to="/users" className="btn btn-sm btn-outline-secondary">
          <i className="bi bi-arrow-left me-1" />
          Back to Users
        </Link>
      </div>

      {loading && (
        <div className="text-center py-5 text-muted">
          <div className="spinner-border spinner-border-sm me-2" />
          Loading…
        </div>
      )}

      {error && (
        <div className="alert alert-danger">
          <i className="bi bi-exclamation-triangle me-2" />
          {error}
        </div>
      )}

      {user && (
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 text-center p-4">
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: avatarColor(user.name),
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 28,
                  margin: '0 auto 16px',
                }}
              >
                {initials(user.name)}
              </div>
              <h5 className="fw-bold mb-1">{user.name}</h5>
              <p className="text-muted mb-3" style={{ fontSize: 14 }}>{user.role}</p>
              <span
                className={`badge rounded-pill px-3 py-2 ${
                  user.status === 'Active'
                    ? 'bg-success-subtle text-success'
                    : 'bg-secondary-subtle text-secondary'
                }`}
              >
                <i className={`bi ${user.status === 'Active' ? 'bi-check-circle' : 'bi-dash-circle'} me-1`} />
                {user.status}
              </span>
            </div>
          </div>

          <div className="col-md-8">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-header bg-white py-3">
                <h6 className="mb-0 fw-semibold">
                  <i className="bi bi-person-lines-fill me-2 text-primary" />
                  User Information
                </h6>
              </div>
              <div className="card-body">
                <dl className="row mb-0">
                  <DetailRow label="User ID" value={`#${user.id}`} />
                  <DetailRow label="Full Name" value={user.name} />
                  <DetailRow label="Email" value={user.email} />
                  <DetailRow label="Department" value={user.department} />
                  <DetailRow label="Role" value={user.role} />
                  <DetailRow label="Status" value={user.status} />
                  <DetailRow label="Joined" value={formatDate(user.joined)} />
                </dl>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt className="col-sm-4 text-muted fw-normal" style={{ fontSize: 14 }}>{label}</dt>
      <dd className="col-sm-8 fw-medium mb-3">{value}</dd>
    </>
  );
}

function initials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

const COLORS = ['#6c8ee8', '#e87c6c', '#6ce8b4', '#e8c46c', '#c46ce8', '#6cc4e8'];
function avatarColor(name: string): string {
  let hash = 0;
  for (const c of name) hash = (hash * 31 + c.charCodeAt(0)) & 0xffffffff;
  return COLORS[Math.abs(hash) % COLORS.length];
}

function formatDate(d: string): string {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
