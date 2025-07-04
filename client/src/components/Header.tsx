import { UserRound, Bell, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export default function Header({ currentView, onNavigate }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="gp-navbar sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          <div className="flex items-center">
            <div className="bg-[var(--gp-brand-accent)] text-[var(--gp-surface-base)] rounded-lg w-8 h-8 flex items-center justify-center mr-3">
              <UserRound className="w-4 h-4" />
            </div>
            <h1 className="text-h2 text-[var(--gp-content-primary)]">RepWise(AI)</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`pb-4 text-body-s font-medium border-b-3 gp-motion-fast gp-focus-ring ${
                currentView === 'dashboard'
                  ? 'text-[var(--gp-brand-accent)] border-[var(--gp-brand-accent)]'
                  : 'text-[var(--gp-content-secondary)] hover:text-[var(--gp-content-primary)] border-transparent'
              }`}
              aria-current={currentView === 'dashboard' ? 'page' : undefined}
            >
              Dashboard
            </button>
            <button
              onClick={() => onNavigate('reports')}
              className={`pb-4 text-body-s font-medium border-b-3 gp-motion-fast gp-focus-ring ${
                currentView === 'reports'
                  ? 'text-[var(--gp-brand-accent)] border-[var(--gp-brand-accent)]'
                  : 'text-[var(--gp-content-secondary)] hover:text-[var(--gp-content-primary)] border-transparent'
              }`}
            >
              Reports
            </button>
            <button
              className="text-[var(--gp-content-secondary)] hover:text-[var(--gp-content-primary)] pb-4 text-body-s font-medium border-b-3 border-transparent gp-motion-fast gp-focus-ring"
            >
              Analytics
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" aria-label="Notifications" className="gp-btn-ghost p-2">
              <Bell className="w-5 h-5 text-[var(--gp-content-secondary)]" />
              <span className="sr-only">View notifications</span>
            </Button>
            <div className="flex items-center space-x-2">
              <span className="text-body-s text-[var(--gp-content-primary)]">{user?.name}</span>
              <Badge variant="secondary" className="bg-[var(--gp-brand-accent)] text-[var(--gp-surface-base)] border-0">
                {user?.role === 'manager' ? 'Manager' : 'Rep'}
              </Badge>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={logout}
              aria-label="Logout"
              className="gp-btn-ghost p-2 gp-focus-ring"
            >
              <LogOut className="w-5 h-5 text-[var(--gp-content-secondary)]" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
