import Dashboard from '@/components/Dashboard';

interface DashboardPageProps {
  onNavigateToReport: (reportId: string) => void;
  onNavigateToAnalytics?: () => void;
  onNavigateToGoals?: () => void;
  onNavigateToNotifications?: () => void;
  onNavigateToAdvancedAnalytics?: () => void;
  onNavigateToReporting?: () => void;
}

export default function DashboardPage({ 
  onNavigateToReport, 
  onNavigateToAnalytics, 
  onNavigateToGoals, 
  onNavigateToNotifications,
  onNavigateToAdvancedAnalytics,
  onNavigateToReporting
}: DashboardPageProps) {
  return (
    <Dashboard 
      onNavigateToReport={onNavigateToReport}
      onNavigateToAnalytics={onNavigateToAnalytics}
      onNavigateToGoals={onNavigateToGoals}
      onNavigateToNotifications={onNavigateToNotifications}
      onNavigateToAdvancedAnalytics={onNavigateToAdvancedAnalytics}
      onNavigateToReporting={onNavigateToReporting}
    />
  );
}
