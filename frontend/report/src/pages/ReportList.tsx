import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '@shared/api/client';
import Layout from '../components/Layout';
import type { Report } from '../types';

interface ApiResponse {
  success: boolean;
  data: Report[];
  total: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  Finance:     'text-success bg-success-subtle',
  Marketing:   'text-primary bg-primary-subtle',
  Technical:   'text-info bg-info-subtle',
  Engineering: 'text-warning bg-warning-subtle',
  HR:          'text-secondary bg-secondary-subtle',
  Management:  'text-danger bg-danger-subtle',
};

export default function ReportList() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get<ApiResponse>('/api/report/list')
      .then((res) => setReports(res.data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout title="Reports">
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white d-flex align-items-center justify-content-between py-3">
          <h5 className="mb-0 fw-semibold">
            <i className="bi bi-bar-chart-fill me-2 text-primary" />
            Reports
            {!loading && (
              <span className="badge bg-primary ms-2 fw-normal" style={{ fontSize: 12 }}>
                {reports.length}
              </span>
            )}
          </h5>
        </div>

        <div className="card-body p-0">
          {loading && (
            <div className="text-center py-5 text-muted">
              <div className="spinner-border spinner-border-sm me-2" />
              Loading reports…
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
                    <th>Title</th>
                    <th>Category</th>
                    <th>Author</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th className="text-end pe-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((r) => (
                    <tr key={r.id}>
                      <td className="ps-4 text-muted">{r.id}</td>
                      <td className="fw-medium">{r.title}</td>
                      <td>
                        <span className={`badge rounded-pill px-3 ${CATEGORY_COLORS[r.category] ?? 'text-secondary bg-secondary-subtle'}`}>
                          {r.category}
                        </span>
                      </td>
                      <td className="text-muted">{r.author}</td>
                      <td>
                        <span
                          className={`badge rounded-pill ${
                            r.status === 'Published'
                              ? 'bg-success-subtle text-success'
                              : 'bg-warning-subtle text-warning'
                          }`}
                        >
                          <i className={`bi ${r.status === 'Published' ? 'bi-check-circle' : 'bi-pencil'} me-1`} />
                          {r.status}
                        </span>
                      </td>
                      <td className="text-muted">{formatDate(r.created)}</td>
                      <td className="text-end pe-4">
                        <Link
                          to={`/detail/${r.id}`}
                          className="btn btn-sm btn-outline-primary"
                        >
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

function formatDate(d: string): string {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
