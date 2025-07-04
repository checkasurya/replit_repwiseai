import Dashboard from '@/components/Dashboard';

interface DashboardPageProps {
  onNavigateToReport: (reportId: string) => void;
  onNavigateToAnalytics?: () => void;
  onNavigateToGoals?: () => void;
  onNavigateToNotifications?: () => void;
}

export default function DashboardPage({ 
  onNavigateToReport, 
  onNavigateToAnalytics, 
  onNavigateToGoals, 
  onNavigateToNotifications 
}: DashboardPageProps) {
  return (
    <Dashboard 
      onNavigateToReport={onNavigateToReport}
      onNavigateToAnalytics={onNavigateToAnalytics}
      onNavigateToGoals={onNavigateToGoals}
      onNavigateToNotifications={onNavigateToNotifications}
    />
  );
}
