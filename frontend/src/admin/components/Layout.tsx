import { type ReactNode, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '@shared/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
	LayoutGrid,
	Gauge,
	Users,
	BarChart2,
	LogOut,
	Building2,
	ShieldCheck,
	Lock,
	Network,
	UserRound,
	Monitor,
	Mail,
	FileText,
	Package,
	Download,
	Settings,
	Globe,
	Search,
	BookOpen,
	ClipboardList,
	ChevronDown,
} from 'lucide-react'
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

				<div className="flex-1 overflow-y-auto py-4">
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
						Admin
					</p>
					<SideLink to="/suppliers" icon={<Building2 size={15} />} label="Supplier Master" />
					<SideLink to="/users" icon={<Users size={15} />} label="User Master" />
					<SideLink to="/roles" icon={<ShieldCheck size={15} />} label="Role Master" />
					<SideLink to="/manage-access" icon={<Lock size={15} />} label="Manage Access" />
					<SideLink to="/divisions" icon={<Network size={15} />} label="Division Master" />
					<SideLink to="/customers" icon={<UserRound size={15} />} label="Customer Master" />
					<SideLink to="/screen-master" icon={<Monitor size={15} />} label="Screen Master" />
					<SideLink to="/smtp-configure" icon={<Mail size={15} />} label="SMTP Configure" />
					<SideLink to="/declaration-master" icon={<FileText size={15} />} label="Declaration Master" />
					<SideLink to="/customer-parts" icon={<Package size={15} />} label="Customer Part Master" />
					<SideLink to="/download-report" icon={<Download size={15} />} label="Download Report" />
					<SideLink to="/gc-configuration" icon={<Settings size={15} />} label="GC Configuration" />
					<SideLink to="/echa-submission" icon={<Globe size={15} />} label="ECHA Submission Report" />
					<SideLink to="/quick-search" icon={<Search size={15} />} label="Quick Search" />
					<SideLink to="/sds-master" icon={<BookOpen size={15} />} label="SDS/Material Master" />
					<SideLink to="/sds-search" icon={<Search size={15} />} label="SDS/Material Search" />

					<CollapseSection label="BoM" icon={<ClipboardList size={15} />}>
						<SideLink to="/bom" icon={<ClipboardList size={15} />} label="BoM List" indent />
					</CollapseSection>

					<CollapseSection label="Survey" icon={<FileText size={15} />}>
						<SideLink to="/survey" icon={<FileText size={15} />} label="Survey List" indent />
					</CollapseSection>

					<p className="m-0 px-5 pt-4 pb-1.5 text-[10px] tracking-[1.2px] text-[#5a627a] uppercase">
						Reports
					</p>
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
	indent?: boolean
}

const linkBase =
	'flex items-center gap-2.5 py-[9px] px-5 text-[#c8ccd8] no-underline text-sm transition-colors duration-150 hover:bg-white/5'
const linkActive =
	'bg-[rgba(108,142,232,0.15)] text-[#6c8ee8] border-l-[3px] border-[#6c8ee8] !pl-[17px]'
const linkIndent = 'pl-9'

function SideLink({ to, icon, label, external, indent }: SideLinkProps) {
	if (external) {
		return (
			<a href={to} className={cn(linkBase, indent && linkIndent)}>
				{icon}
				{label}
			</a>
		)
	}

	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				cn(linkBase, indent && linkIndent, isActive && linkActive)
			}
		>
			{icon}
			{label}
		</NavLink>
	)
}

interface CollapseSectionProps {
	label: string
	icon: ReactNode
	children: ReactNode
}

function CollapseSection({ label, icon, children }: CollapseSectionProps) {
	const [open, setOpen] = useState(false)
	return (
		<>
			<button
				onClick={() => setOpen((v) => !v)}
				className={cn(
					linkBase,
					'w-full cursor-pointer border-none bg-transparent text-left',
				)}
			>
				{icon}
				<span className="flex-1">{label}</span>
				<ChevronDown
					size={13}
					className={cn(
						'mr-1 transition-transform duration-200',
						open && 'rotate-180',
					)}
				/>
			</button>
			{open && <div className="bg-white/[0.03]">{children}</div>}
		</>
	)
}
