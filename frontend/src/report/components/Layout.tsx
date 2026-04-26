import { type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@shared/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LayoutGrid, Gauge, Users, BarChart2, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

function getBaseUrl(): string {
  const meta = document.querySelector<HTMLMetaElement>('meta[name="base-url"]');
  return meta?.content?.replace(/\/$/, '') ?? '';
}

interface LayoutProps {
  children: ReactNode;
  title: string;
}

export default function Layout({ children, title }: LayoutProps) {
  const { user, logout } = useAuth();
  const base = getBaseUrl();

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  async function handleLogout() {
    await logout();
    window.location.href = `${base}/auth/login`;
  }

  return (
    <div className="flex w-full">
      <nav className="w-[230px] min-h-screen bg-[#1e2130] text-[#c8ccd8] shrink-0 flex flex-col">
        <div className="px-5 pt-5 pb-3.5 border-b border-white/[0.07]">
          <span className="font-bold text-lg text-white tracking-wide flex items-center gap-2">
            <LayoutGrid size={18} className="text-[#6c8ee8]" />
            CI Demo
          </span>
        </div>

        <div className="py-4 flex-1">
          <p className="text-[10px] uppercase tracking-[1.2px] text-[#5a627a] px-5 pb-1.5 m-0">Main</p>
          <SideLink to={`${base}/dashboard`} icon={<Gauge size={15} />} label="Dashboard" external />
          <p className="text-[10px] uppercase tracking-[1.2px] text-[#5a627a] px-5 pt-4 pb-1.5 m-0">Modules</p>
          <SideLink to={`${base}/admin`} icon={<Users size={15} />} label="Admin" external />
          <SideLink to="/list" icon={<BarChart2 size={15} />} label="Reports" />
        </div>

        <div className="px-5 py-3 border-t border-white/[0.07] text-xs text-[#5a627a]">
          © 2024 CI Demo
        </div>
      </nav>

      <div className="flex-1 flex flex-col bg-[#f4f6fb]">
        <header className="h-14 bg-white border-b border-[#e8ecf1] flex items-center px-6 gap-3">
          <span className="font-semibold text-[17px] flex-1">{title}</span>
          <Avatar className="size-[34px]">
            <AvatarFallback className="bg-[#6c8ee8] text-white text-[13px] font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="leading-tight">
            <div className="font-semibold text-[13px]">{user?.name}</div>
            <div className="text-[11px] text-muted-foreground capitalize">{user?.role}</div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="ml-2 gap-1.5">
            <LogOut size={13} />
            Logout
          </Button>
        </header>

        <main className="flex-1 p-7">{children}</main>
      </div>
    </div>
  );
}

interface SideLinkProps {
  to: string;
  icon: ReactNode;
  label: string;
  external?: boolean;
}

const linkBase = 'flex items-center gap-2.5 py-[9px] px-5 text-[#c8ccd8] no-underline text-sm transition-colors duration-150 hover:bg-white/5';
const linkActive = 'bg-[rgba(108,142,232,0.15)] text-[#6c8ee8] border-l-[3px] border-[#6c8ee8] !pl-[17px]';

function SideLink({ to, icon, label, external }: SideLinkProps) {
  if (external) {
    return (
      <a href={to} className={linkBase}>
        {icon}
        {label}
      </a>
    );
  }

  return (
    <NavLink to={to} className={({ isActive }) => cn(linkBase, isActive && linkActive)}>
      {icon}
      {label}
    </NavLink>
  );
}
