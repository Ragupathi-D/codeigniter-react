import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { type ColumnDef } from '@tanstack/react-table'
import api from '@shared/api/client'
import Layout from '../components/Layout'
import type { Report } from '../types'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { DataTable } from '@/components/ui/data-table'
import {
	BarChart2,
	CheckCircle,
	Pencil,
	Eye,
	AlertTriangle,
} from 'lucide-react'

interface ApiResponse {
	success: boolean
	data: Report[]
	total: number
}

const CATEGORY_CLASSES: Record<string, string> = {
	Finance: 'bg-green-100 text-green-700 border-green-200',
	Marketing: 'bg-blue-100 text-blue-700 border-blue-200',
	Technical: 'bg-cyan-100 text-cyan-700 border-cyan-200',
	Engineering: 'bg-yellow-100 text-yellow-700 border-yellow-200',
	HR: 'bg-slate-100 text-slate-600 border-slate-200',
	Management: 'bg-red-100 text-red-700 border-red-200',
}

const columns: ColumnDef<Report>[] = [
	{
		accessorKey: 'id',
		header: '#',
		cell: ({ getValue }) => (
			<span className="text-muted-foreground">{getValue<number>()}</span>
		),
	},
	{
		accessorKey: 'title',
		header: 'Title',
		enableColumnFilter: true,
		cell: ({ getValue }) => (
			<span className="font-medium">{getValue<string>()}</span>
		),
	},
	{
		accessorKey: 'category',
		header: 'Category',
		enableColumnFilter: true,
		cell: ({ getValue }) => {
			const category = getValue<string>()
			return (
				<Badge
					variant="outline"
					className={`rounded-full ${CATEGORY_CLASSES[category] ?? 'border-slate-200 bg-slate-100 text-slate-600'}`}
				>
					{category}
				</Badge>
			)
		},
	},
	{
		accessorKey: 'author',
		header: 'Author',
		enableColumnFilter: true,
		cell: ({ getValue }) => (
			<span className="text-muted-foreground">{getValue<string>()}</span>
		),
	},
	{
		accessorKey: 'status',
		header: 'Status',
		enableColumnFilter: true,
		cell: ({ getValue }) => {
			const status = getValue<string>()
			const isPublished = status === 'Published'
			return (
				<Badge
					variant="outline"
					className={`gap-1 rounded-full ${
						isPublished
							? 'border-green-200 bg-green-50 text-green-700'
							: 'border-yellow-200 bg-yellow-50 text-yellow-700'
					}`}
				>
					{isPublished ? <CheckCircle size={11} /> : <Pencil size={11} />}
					{status}
				</Badge>
			)
		},
	},
	{
		accessorKey: 'created',
		header: 'Created',
		cell: ({ getValue }) => (
			<span className="text-muted-foreground">
				{formatDate(getValue<string>())}
			</span>
		),
	},
	{
		id: 'actions',
		header: () => <span className="flex justify-end pr-4">Actions</span>,
		cell: ({ row }) => (
			<div className="pr-4 text-right">
				<Button variant="outline" size="sm" asChild>
					<Link to={`/detail/${row.original.id}`} className="gap-1.5">
						<Eye size={13} />
						View
					</Link>
				</Button>
			</div>
		),
	},
]

export default function ReportList() {
	const [reports, setReports] = useState<Report[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		api
			.get<ApiResponse>('/api/report/list')
			.then((res) => setReports(res.data))
			.catch((err: Error) => setError(err.message))
			.finally(() => setLoading(false))
	}, [])

	return (
		<Layout title="Reports">
			<Card className="border-0 shadow-sm">
				<CardHeader className="flex-row items-center space-y-0 border-b py-3">
					<h5 className="m-0 flex items-center gap-2 font-semibold">
						<BarChart2 size={16} className="text-primary" />
						Reports
						{!loading && (
							<Badge className="text-xs font-normal">{reports.length}</Badge>
						)}
					</h5>
				</CardHeader>

				<CardContent className="p-0">
					{loading && (
						<div className="space-y-3 p-6">
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

					{!loading && !error && <DataTable columns={columns} data={reports} />}
				</CardContent>
			</Card>
		</Layout>
	)
}

function formatDate(d: string): string {
	return new Date(d).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	})
}
