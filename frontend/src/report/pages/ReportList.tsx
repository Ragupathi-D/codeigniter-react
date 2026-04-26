import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '@shared/api/client';
import Layout from '../components/Layout';
import type { Report } from '../types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart2, CheckCircle, Pencil, Eye, AlertTriangle } from 'lucide-react';

interface ApiResponse {
  success: boolean;
  data: Report[];
  total: number;
}

const CATEGORY_CLASSES: Record<string, string> = {
  Finance: 'bg-green-100 text-green-700 border-green-200',
  Marketing: 'bg-blue-100 text-blue-700 border-blue-200',
  Technical: 'bg-cyan-100 text-cyan-700 border-cyan-200',
  Engineering: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  HR: 'bg-slate-100 text-slate-600 border-slate-200',
  Management: 'bg-red-100 text-red-700 border-red-200',
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
      <Card className="shadow-sm border-0">
        <CardHeader className="flex-row items-center py-3 border-b space-y-0">
          <h5 className="font-semibold flex items-center gap-2 m-0">
            <BarChart2 size={16} className="text-primary" />
            Reports
            {!loading && (
              <Badge className="font-normal text-xs">{reports.length}</Badge>
            )}
          </h5>
        </CardHeader>

        <CardContent className="p-0">
          {loading && (
            <div className="p-6 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="m-3">
              <AlertTriangle size={16} />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!loading && !error && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6 w-12">#</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right pr-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="pl-6 text-muted-foreground">{r.id}</TableCell>
                    <TableCell className="font-medium">{r.title}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`rounded-full ${CATEGORY_CLASSES[r.category] ?? 'bg-slate-100 text-slate-600 border-slate-200'}`}
                      >
                        {r.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{r.author}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`rounded-full gap-1 ${
                          r.status === 'Published'
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                        }`}
                      >
                        {r.status === 'Published'
                          ? <CheckCircle size={11} />
                          : <Pencil size={11} />}
                        {r.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(r.created)}</TableCell>
                    <TableCell className="text-right pr-6">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/detail/${r.id}`} className="gap-1.5">
                          <Eye size={13} />
                          View
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </Layout>
  );
}

function formatDate(d: string): string {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
