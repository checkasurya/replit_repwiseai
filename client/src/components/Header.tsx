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
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="bg-blue-500 text-white rounded-lg w-8 h-8 flex items-center justify-center mr-3">
              <UserRound className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">RepWise(AI)</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
                currentView === 'dashboard'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 border-transparent'
              }`}
              aria-current={currentView === 'dashboard' ? 'page' : undefined}
            >
              Dashboard
            </button>
            <button
              onClick={() => onNavigate('reports')}
              className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
                currentView === 'reports'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 border-transparent'
              }`}
            >
              Reports
            </button>
            <button
              className="text-gray-500 hover:text-gray-700 pb-4 text-sm font-medium border-b-2 border-transparent"
            >
              Analytics
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" aria-label="Notifications">
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="sr-only">View notifications</span>
            </Button>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">{user?.name}</span>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {user?.role === 'manager' ? 'Manager' : 'Rep'}
              </Badge>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={logout}
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5 text-gray-400" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
