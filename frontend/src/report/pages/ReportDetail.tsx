import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '@shared/api/client';
import Layout from '../components/Layout';
import type { Report } from '../types';

interface ApiResponse {
  success: boolean;
  data: Report;
}

const CATEGORY_COLORS: Record<string, string> = {
  Finance: 'text-success bg-success-subtle',
  Marketing: 'text-primary bg-primary-subtle',
  Technical: 'text-info bg-info-subtle',
  Engineering: 'text-warning bg-warning-subtle',
  HR: 'text-secondary bg-secondary-subtle',
  Management: 'text-danger bg-danger-subtle',
};

const CATEGORY_ICONS: Record<string, string> = {
  Finance: 'bi-currency-dollar',
  Marketing: 'bi-megaphone-fill',
  Technical: 'bi-cpu-fill',
  Engineering: 'bi-wrench-adjustable',
  HR: 'bi-people-fill',
  Management: 'bi-briefcase-fill',
};

export default function ReportDetail() {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get<ApiResponse>(`/api/report/detail/${id}`)
      .then((res) => setReport(res.data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <Layout title="Reports — Detail">
      <div className="mb-3">
        <Link to="/list" className="btn btn-sm btn-outline-secondary">
          <i className="bi bi-arrow-left me-1" />
          Back to Reports
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

      {report && (
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 text-center p-4">
              <div
                className={`mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle ${CATEGORY_COLORS[report.category] ?? 'text-secondary bg-secondary-subtle'}`}
                style={{ width: 72, height: 72, fontSize: 30 }}
              >
                <i className={`bi ${CATEGORY_ICONS[report.category] ?? 'bi-file-earmark-text'}`} />
              </div>
              <h5 className="fw-bold mb-2" style={{ fontSize: 15 }}>{report.title}</h5>
              <span
                className={`badge rounded-pill px-3 py-2 mb-3 mx-auto ${CATEGORY_COLORS[report.category] ?? 'text-secondary bg-secondary-subtle'}`}
              >
                {report.category}
              </span>
              <span
                className={`badge rounded-pill px-3 py-2 mx-auto ${
                  report.status === 'Published'
                    ? 'bg-success-subtle text-success'
                    : 'bg-warning-subtle text-warning'
                }`}
              >
                <i className={`bi ${report.status === 'Published' ? 'bi-check-circle' : 'bi-pencil'} me-1`} />
                {report.status}
              </span>
            </div>
          </div>

          <div className="col-md-8">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white py-3">
                <h6 className="mb-0 fw-semibold">
                  <i className="bi bi-file-earmark-text-fill me-2 text-primary" />
                  Report Information
                </h6>
              </div>
              <div className="card-body">
                <dl className="row mb-0">
                  <DetailRow label="Report ID" value={`#${report.id}`} />
                  <DetailRow label="Title" value={report.title} />
                  <DetailRow label="Category" value={report.category} />
                  <DetailRow label="Author" value={report.author} />
                  <DetailRow label="Status" value={report.status} />
                  <DetailRow label="Created" value={formatDate(report.created)} />
                </dl>
              </div>
            </div>

            <div className="card border-0 shadow-sm mt-4">
              <div className="card-header bg-white py-3">
                <h6 className="mb-0 fw-semibold">
                  <i className="bi bi-text-paragraph me-2 text-primary" />
                  Summary
                </h6>
              </div>
              <div className="card-body">
                <p className="mb-0" style={{ lineHeight: 1.7, color: '#444' }}>{report.summary}</p>
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

function formatDate(d: string): string {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
