import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '@shared/api/client';
import Layout from '../components/Layout';
import type { Report } from '../types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ArrowLeft, CheckCircle, Pencil, AlertTriangle, FileText, AlignLeft,
  DollarSign, Megaphone, Cpu, Wrench, Users, Briefcase,
} from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

interface ApiResponse {
  success: boolean;
  data: Report;
}

const CATEGORY_CLASSES: Record<string, string> = {
  Finance: 'bg-green-100 text-green-700 border-green-200',
  Marketing: 'bg-blue-100 text-blue-700 border-blue-200',
  Technical: 'bg-cyan-100 text-cyan-700 border-cyan-200',
  Engineering: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  HR: 'bg-slate-100 text-slate-600 border-slate-200',
  Management: 'bg-red-100 text-red-700 border-red-200',
};

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Finance: DollarSign,
  Marketing: Megaphone,
  Technical: Cpu,
  Engineering: Wrench,
  HR: Users,
  Management: Briefcase,
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
      <div className="mb-4">
        <Button variant="outline" size="sm" asChild>
          <Link to="/list" className="gap-1.5">
            <ArrowLeft size={14} />
            Back to Reports
          </Link>
        </Button>
      </div>

      {loading && (
        <div className="grid grid-cols-[1fr_2fr] gap-4">
          <Skeleton className="h-64 rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-40 rounded-xl" />
            <Skeleton className="h-40 rounded-xl" />
          </div>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTriangle size={16} />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {report && (
        <div className="grid grid-cols-[1fr_2fr] gap-4">
          <Card className="shadow-sm border-0 text-center">
            <CardContent className="pt-8 pb-6 flex flex-col items-center">
              {(() => {
                const Icon = CATEGORY_ICONS[report.category] ?? FileText;
                const cls = CATEGORY_CLASSES[report.category] ?? 'bg-slate-100 text-slate-600';
                return (
                  <div className={`size-[72px] rounded-full flex items-center justify-center mb-3 ${cls}`}>
                    <Icon size={30} />
                  </div>
                );
              })()}
              <h5 className="font-bold text-[15px] mb-2">{report.title}</h5>
              <Badge
                variant="outline"
                className={`rounded-full px-3 py-1 mb-2 ${CATEGORY_CLASSES[report.category] ?? 'bg-slate-100 text-slate-600 border-slate-200'}`}
              >
                {report.category}
              </Badge>
              <Badge
                variant="outline"
                className={`rounded-full gap-1 px-3 py-1 ${
                  report.status === 'Published'
                    ? 'bg-green-50 text-green-700 border-green-200'
                    : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                }`}
              >
                {report.status === 'Published'
                  ? <CheckCircle size={12} />
                  : <Pencil size={12} />}
                {report.status}
              </Badge>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card className="shadow-sm border-0">
              <CardHeader className="py-3 border-b space-y-0">
                <h6 className="font-semibold flex items-center gap-2 m-0">
                  <FileText size={15} className="text-primary" />
                  Report Information
                </h6>
              </CardHeader>
              <CardContent className="pt-5">
                <dl className="grid grid-cols-[9rem_1fr] gap-y-4">
                  <DetailRow label="Report ID" value={`#${report.id}`} />
                  <DetailRow label="Title" value={report.title} />
                  <DetailRow label="Category" value={report.category} />
                  <DetailRow label="Author" value={report.author} />
                  <DetailRow label="Status" value={report.status} />
                  <DetailRow label="Created" value={formatDate(report.created)} />
                </dl>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-0">
              <CardHeader className="py-3 border-b space-y-0">
                <h6 className="font-semibold flex items-center gap-2 m-0">
                  <AlignLeft size={15} className="text-primary" />
                  Summary
                </h6>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-[#444] leading-relaxed">{report.summary}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </Layout>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt className="text-muted-foreground text-sm font-normal">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </>
  );
}

function formatDate(d: string): string {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
