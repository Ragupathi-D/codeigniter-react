import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '@shared/api/client';
import Layout from '../components/Layout';
import type { User } from '../types';

interface ApiResponse {
  success: boolean;
  data: User[];
  total: number;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get<ApiResponse>('/api/admin/users')
      .then((res) => setUsers(res.data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout title="Admin — User Management">
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white d-flex align-items-center justify-content-between py-3">
          <h5 className="mb-0 fw-semibold">
            <i className="bi bi-people-fill me-2 text-primary" />
            Users
            {!loading && (
              <span className="badge bg-primary ms-2 fw-normal" style={{ fontSize: 12 }}>
                {users.length}
              </span>
            )}
          </h5>
        </div>

        <div className="card-body p-0">
          {loading && (
            <div className="text-center py-5 text-muted">
              <div className="spinner-border spinner-border-sm me-2" />
              Loading users…
            </div>
          )}

          {error && (
            <div className="alert alert-danger m-3">
              <i className="bi bi-exclamation-triangle me-2" />
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-4">#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th className="text-end pe-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td className="ps-4 text-muted">{u.id}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div
                            style={{
                              width: 34,
                              height: 34,
                              borderRadius: '50%',
                              background: avatarColor(u.name),
                              color: '#fff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              fontSize: 13,
                              flexShrink: 0,
                            }}
                          >
                            {initials(u.name)}
                          </div>
                          <span className="fw-medium">{u.name}</span>
                        </div>
                      </td>
                      <td className="text-muted">{u.email}</td>
                      <td>{u.department}</td>
                      <td>{u.role}</td>
                      <td>
                        <span
                          className={`badge rounded-pill ${
                            u.status === 'Active'
                              ? 'bg-success-subtle text-success'
                              : 'bg-secondary-subtle text-secondary'
                          }`}
                        >
                          <i className={`bi ${u.status === 'Active' ? 'bi-check-circle' : 'bi-dash-circle'} me-1`} />
                          {u.status}
                        </span>
                      </td>
                      <td className="text-muted">{formatDate(u.joined)}</td>
                      <td className="text-end pe-4">
                        <Link to={`/users/${u.id}`} className="btn btn-sm btn-outline-primary">
                          <i className="bi bi-eye me-1" />
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
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
