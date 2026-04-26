import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { type ColumnDef } from '@tanstack/react-table';
import api from '@shared/api/client';
import Layout from '../components/Layout';
import type { User } from '../types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { DataTable } from '@/components/ui/data-table';
import { Users, CheckCircle, MinusCircle, Eye, AlertTriangle } from 'lucide-react';

interface ApiResponse {
  success: boolean;
  data: User[];
  total: number;
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ getValue }) => (
      <span className="text-muted-foreground">{getValue<number>()}</span>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Name',
    enableColumnFilter: true,
    cell: ({ getValue }) => {
      const name = getValue<string>();
      return (
        <div className="flex items-center gap-2">
          <Avatar className="size-[34px] shrink-0">
            <AvatarFallback
              className="text-white text-[13px] font-bold"
              style={{ background: avatarColor(name) }}
            >
              {initials(name)}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    enableColumnFilter: true,
    cell: ({ getValue }) => (
      <span className="text-muted-foreground">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: 'department',
    header: 'Department',
    enableColumnFilter: true,
  },
  {
    accessorKey: 'role',
    header: 'Role',
    enableColumnFilter: true,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    enableColumnFilter: true,
    cell: ({ getValue }) => {
      const status = getValue<string>();
      const isActive = status === 'Active';
      return (
        <Badge
          variant="outline"
          className={`rounded-full gap-1 ${
            isActive
              ? 'bg-green-50 text-green-700 border-green-200'
              : 'bg-slate-50 text-slate-500 border-slate-200'
          }`}
        >
          {isActive ? <CheckCircle size={11} /> : <MinusCircle size={11} />}
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'joined',
    header: 'Joined',
    cell: ({ getValue }) => (
      <span className="text-muted-foreground">{formatDate(getValue<string>())}</span>
    ),
  },
  {
    id: 'actions',
    header: () => <span className="flex justify-end pr-4">Actions</span>,
    cell: ({ row }) => (
      <div className="text-right pr-4">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/users/${row.original.id}`} className="gap-1.5">
            <Eye size={13} />
            View
          </Link>
        </Button>
      </div>
    ),
  },
];

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

          {!loading && !error && <DataTable columns={columns} data={users} />}
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
