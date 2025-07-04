import Dashboard from '@/components/Dashboard';

interface DashboardPageProps {
  onNavigateToReport: (reportId: string) => void;
}

export default function DashboardPage({ onNavigateToReport }: DashboardPageProps) {
  return <Dashboard onNavigateToReport={onNavigateToReport} />;
}
