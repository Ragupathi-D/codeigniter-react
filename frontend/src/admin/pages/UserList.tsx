import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '@shared/api/client';
import Layout from '../components/Layout';
import type { User } from '../types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, CheckCircle, MinusCircle, Eye, AlertTriangle } from 'lucide-react';

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
      <Card className="shadow-sm border-0">
        <CardHeader className="flex-row items-center py-3 border-b space-y-0">
          <h5 className="font-semibold flex items-center gap-2 m-0">
            <Users size={16} className="text-primary" />
            Users
            {!loading && (
              <Badge className="font-normal text-xs">{users.length}</Badge>
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
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right pr-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="pl-6 text-muted-foreground">{u.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="size-[34px] shrink-0">
                          <AvatarFallback
                            className="text-white text-[13px] font-bold"
                            style={{ background: avatarColor(u.name) }}
                          >
                            {initials(u.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{u.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{u.email}</TableCell>
                    <TableCell>{u.department}</TableCell>
                    <TableCell>{u.role}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`rounded-full gap-1 ${
                          u.status === 'Active'
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : 'bg-slate-50 text-slate-500 border-slate-200'
                        }`}
                      >
                        {u.status === 'Active'
                          ? <CheckCircle size={11} />
                          : <MinusCircle size={11} />}
                        {u.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(u.joined)}</TableCell>
                    <TableCell className="text-right pr-6">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/users/${u.id}`} className="gap-1.5">
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

function initials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
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
