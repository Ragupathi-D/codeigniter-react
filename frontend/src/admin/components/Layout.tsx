import { type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '@shared/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { LayoutGrid, Gauge, Users, BarChart2, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

function getBaseUrl(): string {
	const meta = document.querySelector<HTMLMetaElement>('meta[name="base-url"]')
	return meta?.content?.replace(/\/$/, '') ?? ''
}

interface LayoutProps {
	children: ReactNode
	title: string
}

export default function Layout({ children, title }: LayoutProps) {
	const { user, logout } = useAuth()
	const base = getBaseUrl()

	const initials = user?.name
		? user.name
				.split(' ')
				.map((n) => n[0])
				.join('')
				.toUpperCase()
				.slice(0, 2)
		: 'U'

	async function handleLogout() {
		await logout()
		window.location.href = `${base}/auth/login`
	}

	return (
		<div className="flex w-full">
			<nav className="flex min-h-screen w-[230px] shrink-0 flex-col bg-[#1e2130] text-[#c8ccd8]">
				<div className="border-b border-white/[0.07] px-5 pt-5 pb-3.5">
					<span className="flex items-center gap-2 text-lg font-bold tracking-wide text-white">
						<LayoutGrid size={18} className="text-[#6c8ee8]" />
						CI Demo
					</span>
				</div>

				<div className="flex-1 py-4">
					<p className="m-0 px-5 pb-1.5 text-[10px] tracking-[1.2px] text-[#5a627a] uppercase">
						Main
					</p>
					<SideLink
						to={`${base}/dashboard`}
						icon={<Gauge size={15} />}
						label="Dashboard"
						external
					/>
					<p className="m-0 px-5 pt-4 pb-1.5 text-[10px] tracking-[1.2px] text-[#5a627a] uppercase">
						Modules
					</p>
					<SideLink to="/users" icon={<Users size={15} />} label="Admin" />
					<SideLink
						to={`${base}/report`}
						icon={<BarChart2 size={15} />}
						label="Reports"
						external
					/>
				</div>

				<div className="border-t border-white/[0.07] px-5 py-3 text-xs text-[#5a627a]">
					© 2024 CI Demo
				</div>
			</nav>

			<div className="flex flex-1 flex-col bg-[#f4f6fb]">
				<header className="flex h-14 items-center gap-3 border-b border-[#e8ecf1] bg-white px-6">
					<span className="flex-1 text-[17px] font-semibold">{title}</span>
					<Avatar className="size-[34px]">
						<AvatarFallback className="bg-[#6c8ee8] text-[13px] font-bold text-white">
							{initials}
						</AvatarFallback>
					</Avatar>
					<div className="leading-tight">
						<div className="text-[13px] font-semibold">{user?.name}</div>
						<div className="text-[11px] text-muted-foreground capitalize">
							{user?.role}
						</div>
					</div>
					<Button
						variant="outline"
						size="sm"
						onClick={handleLogout}
						className="ml-2 gap-1.5"
					>
						<LogOut size={13} />
						Logout
					</Button>
				</header>

				<main className="flex-1 p-7">{children}</main>
			</div>
		</div>
	)
}

interface SideLinkProps {
	to: string
	icon: ReactNode
	label: string
	external?: boolean
}

const linkBase =
	'flex items-center gap-2.5 py-[9px] px-5 text-[#c8ccd8] no-underline text-sm transition-colors duration-150 hover:bg-white/5'
const linkActive =
	'bg-[rgba(108,142,232,0.15)] text-[#6c8ee8] border-l-[3px] border-[#6c8ee8] !pl-[17px]'

function SideLink({ to, icon, label, external }: SideLinkProps) {
	if (external) {
		return (
			<a href={to} className={linkBase}>
				{icon}
				{label}
			</a>
		)
	}

	return (
		<NavLink
			to={to}
			className={({ isActive }) => cn(linkBase, isActive && linkActive)}
		>
			{icon}
			{label}
		</NavLink>
	)
}
