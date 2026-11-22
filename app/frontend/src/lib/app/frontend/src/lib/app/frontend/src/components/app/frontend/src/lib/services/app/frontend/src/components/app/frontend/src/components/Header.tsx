import { Link, NavLink } from 'react-router-dom';
import { ClipboardList, HardHat, Mail, Building2 } from 'lucide-react';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import { useDB } from '@/lib/store';
import { Button } from '@/components/ui/button';

const NAV = [
  { to: '/company', label: 'Company', icon: Building2, testid: 'nav-company' },
  { to: '/workforce', label: 'Jobseekers & Labor', icon: HardHat, testid: 'nav-workforce' },
  { to: '/recruitment', label: 'Recruitment', icon: ClipboardList, testid: 'nav-recruitment' },
];

export default function Header() {
  const db = useDB();
  const unread = db.outbox.filter((m) => !m.read).length;
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-[#F8F7F1]/90 backdrop-blur-md" data-testid="global-header">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between gap-3">
          <Link to="/" data-testid="header-logo-link" aria-label="WorkNexora home">
            <Logo />
          </Link>
          <div className="flex items-center gap-2 md:hidden">
            <OutboxLink unread={unread} />
            <LanguageSwitcher />
          </div>
        </div>
        <nav className="flex items-center gap-1 overflow-x-auto" data-testid="header-nav">
          {NAV.map(({ to, label, icon: Icon, testid }) => (
            <NavLink
              key={to}
              to={to}
              data-testid={testid}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  isActive ? 'bg-secondary text-primary' : 'text-muted-foreground hover:bg-secondary/60 hover:text-primary'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
          <div className="hidden items-center gap-2 md:flex">
            <OutboxLink unread={unread} />
            <LanguageSwitcher />
            <Button asChild={false} render={undefined} className="hidden" />
            <Link
              to="/company"
              data-testid="header-cta-post-job"
              className="inline-flex shrink-0 items-center rounded-lg bg-accent px-3 py-2 text-sm font-bold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              Post a job
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

function OutboxLink({ unread }: { unread: number }) {
  return (
    <Link
      to="/outbox"
      data-testid="header-outbox-link"
      aria-label={`Outbox${unread ? `, ${unread} unread` : ''}`}
      className="relative flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-primary"
    >
      <Mail className="h-4 w-4" />
      Outbox
      {unread > 0 && (
        <span
          data-testid="outbox-unread-badge"
          className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-extrabold text-accent-foreground"
        >
          {unread}
        </span>
      )}
    </Link>
  );
}
