import { type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@shared/context/AuthContext';

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
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  async function handleLogout() {
    await logout();
    window.location.href = `${base}/auth/login`;
  }

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <nav
        style={{
          width: 230,
          minHeight: '100vh',
          background: '#1e2130',
          color: '#c8ccd8',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            padding: '20px 20px 14px',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <span style={{ fontWeight: 700, fontSize: 18, color: '#fff', letterSpacing: 0.5 }}>
            <i className="bi bi-grid-3x3-gap-fill me-2" style={{ color: '#6c8ee8' }} />
            CI Demo
          </span>
        </div>

        <div style={{ padding: '16px 0', flex: 1 }}>
          <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.2, color: '#5a627a', padding: '0 20px 6px', margin: 0 }}>
            Main
          </p>
          <SideLink to={`${base}/dashboard`} icon="bi-speedometer2" label="Dashboard" external />
          <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.2, color: '#5a627a', padding: '16px 20px 6px', margin: 0 }}>
            Modules
          </p>
          <SideLink to="/users" icon="bi-people-fill" label="Admin" />
          <SideLink to={`${base}/report`} icon="bi-bar-chart-fill" label="Reports" external />
        </div>

        <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.07)', fontSize: 12, color: '#5a627a' }}>
          © 2024 CI Demo
        </div>
      </nav>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f4f6fb' }}>
        <header
          style={{
            height: 56,
            background: '#fff',
            borderBottom: '1px solid #e8ecf1',
            display: 'flex',
            alignItems: 'center',
            padding: '0 24px',
            gap: 12,
          }}
        >
          <span style={{ fontWeight: 600, fontSize: 17, flex: 1 }}>{title}</span>
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: '#6c8ee8',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            {initials}
          </span>
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontWeight: 600, fontSize: 13 }}>{user?.name}</div>
            <div style={{ fontSize: 11, color: '#888', textTransform: 'capitalize' }}>{user?.role}</div>
          </div>
          <button onClick={handleLogout} className="btn btn-sm btn-outline-secondary" style={{ marginLeft: 8 }}>
            <i className="bi bi-box-arrow-right me-1" />
            Logout
          </button>
        </header>

        <main style={{ flex: 1, padding: 28 }}>{children}</main>
      </div>
    </div>
  );
}

interface SideLinkProps {
  to: string;
  icon: string;
  label: string;
  external?: boolean;
}

function SideLink({ to, icon, label, external }: SideLinkProps) {
  const baseStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '9px 20px',
    color: '#c8ccd8',
    textDecoration: 'none',
    fontSize: 14,
    transition: 'background 0.15s, color 0.15s',
  };

  const activeStyle: React.CSSProperties = {
    ...baseStyle,
    background: 'rgba(108,142,232,0.15)',
    color: '#6c8ee8',
    borderLeft: '3px solid #6c8ee8',
    paddingLeft: 17,
  };

  if (external) {
    return (
      <a
        href={to}
        style={baseStyle}
        onMouseEnter={(e) => Object.assign(e.currentTarget.style, { background: 'rgba(255,255,255,0.05)' })}
        onMouseLeave={(e) => Object.assign(e.currentTarget.style, { background: 'transparent' })}
      >
        <i className={`bi ${icon}`} />
        {label}
      </a>
    );
  }

  return (
    <NavLink to={to} style={({ isActive }) => (isActive ? activeStyle : baseStyle)}>
      <i className={`bi ${icon}`} />
      {label}
    </NavLink>
  );
}
