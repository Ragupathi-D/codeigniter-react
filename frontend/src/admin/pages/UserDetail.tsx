import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '@shared/api/client'
import Layout from '../components/Layout'
import type { User } from '../types'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import {
	ArrowLeft,
	CheckCircle,
	MinusCircle,
	AlertTriangle,
	UserRound,
} from 'lucide-react'

interface ApiResponse {
	success: boolean
	data: User
}

export default function UserDetail() {
	const { id } = useParams<{ id: string }>()
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		api
			.get<ApiResponse>(`/api/admin/users/${id}`)
			.then((res) => setUser(res.data))
			.catch((err: Error) => setError(err.message))
			.finally(() => setLoading(false))
	}, [id])

	return (
		<Layout title="Admin — User Detail">
			<div className="mb-4">
				<Button variant="outline" size="sm" asChild>
					<Link to="/users" className="gap-1.5">
						<ArrowLeft size={14} />
						Back to Users
					</Link>
				</Button>
			</div>

			{loading && (
				<div className="grid grid-cols-[1fr_2fr] gap-4">
					<Skeleton className="h-64 rounded-xl" />
					<Skeleton className="h-64 rounded-xl" />
				</div>
			)}

			{error && (
				<Alert variant="destructive">
					<AlertTriangle size={16} />
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}

			{user && (
				<div className="grid grid-cols-[1fr_2fr] gap-4">
					<Card className="border-0 text-center shadow-sm">
						<CardContent className="flex flex-col items-center pt-8 pb-6">
							<Avatar className="mb-4 size-20">
								<AvatarFallback
									className="text-3xl font-bold text-white"
									style={{ background: avatarColor(user.name) }}
								>
									{initials(user.name)}
								</AvatarFallback>
							</Avatar>
							<h5 className="mb-1 font-bold">{user.name}</h5>
							<p className="mb-4 text-sm text-muted-foreground">{user.role}</p>
							<Badge
								variant="outline"
								className={`gap-1 rounded-full px-3 py-1 ${
									user.status === 'Active'
										? 'border-green-200 bg-green-50 text-green-700'
										: 'border-slate-200 bg-slate-50 text-slate-500'
								}`}
							>
								{user.status === 'Active' ? (
									<CheckCircle size={12} />
								) : (
									<MinusCircle size={12} />
								)}
								{user.status}
							</Badge>
						</CardContent>
					</Card>

					<Card className="border-0 shadow-sm">
						<CardHeader className="space-y-0 border-b py-3">
							<h6 className="m-0 flex items-center gap-2 font-semibold">
								<UserRound size={15} className="text-primary" />
								User Information
							</h6>
						</CardHeader>
						<CardContent className="pt-5">
							<dl className="grid grid-cols-[9rem_1fr] gap-y-4">
								<DetailRow label="User ID" value={`#${user.id}`} />
								<DetailRow label="Full Name" value={user.name} />
								<DetailRow label="Email" value={user.email} />
								<DetailRow label="Department" value={user.department} />
								<DetailRow label="Role" value={user.role} />
								<DetailRow label="Status" value={user.status} />
								<DetailRow label="Joined" value={formatDate(user.joined)} />
							</dl>
						</CardContent>
					</Card>
				</div>
			)}
		</Layout>
	)
}

function DetailRow({ label, value }: { label: string; value: string }) {
	return (
		<>
			<dt className="text-sm font-normal text-muted-foreground">{label}</dt>
			<dd className="font-medium">{value}</dd>
		</>
	)
}

function initials(name: string): string {
	return name
		.split(' ')
		.map((n) => n[0])
		.join('')
		.toUpperCase()
		.slice(0, 2)
}

const COLORS = [
	'#6c8ee8',
	'#e87c6c',
	'#6ce8b4',
	'#e8c46c',
	'#c46ce8',
	'#6cc4e8',
]
function avatarColor(name: string): string {
	let hash = 0
	for (const c of name) hash = (hash * 31 + c.charCodeAt(0)) & 0xffffffff
	return COLORS[Math.abs(hash) % COLORS.length]
}

function formatDate(d: string): string {
	return new Date(d).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	})
}
