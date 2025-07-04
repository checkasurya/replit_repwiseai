import { useState } from 'react';
import { Plus, Users, TrendingUp, Lightbulb, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ReportsTable from './ReportsTable';
import { getQuickStats } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

interface DashboardProps {
  onNavigateToReport: (reportId: string) => void;
}

export default function Dashboard({ onNavigateToReport }: DashboardProps) {
  const { toast } = useToast();
  const stats = getQuickStats();

  // Mock data for ongoing reports
  const ongoingReports = [
    {
      id: 'RPT-1001',
      reporteeName: 'Michael Johnson',
      dateStarted: '2025-01-15',
      status: 'Ongoing',
      performance: 68,
    },
    {
      id: 'RPT-1002',
      reporteeName: 'Lisa Davis',
      dateStarted: '2025-01-18',
      status: 'Ongoing',
      performance: 92,
    },
    {
      id: 'RPT-1003',
      reporteeName: 'Robert Wilson',
      dateStarted: '2025-01-20',
      status: 'Ongoing',
      performance: 75,
    },
  ];

  // Mock data for latest reports summary
  const latestReports = [
    {
      id: 'RPT-1001',
      reporteeName: 'Michael Johnson',
      dateStarted: '2025-01-15',
      lastReportDate: '2025-01-15',
      status: 'Ongoing',
      summary: 'Needs improvement in conversion rates. Strong call activity.',
      performanceTrend: 'declining' as const,
    },
    {
      id: 'RPT-1002',
      reporteeName: 'Lisa Davis',
      dateStarted: '2025-01-18',
      lastReportDate: '2025-01-18',
      status: 'Ongoing',
      summary: 'Excellent performance across all metrics. Top performer this month.',
      performanceTrend: 'improving' as const,
    },
  ];

  const handleCreateNewReport = () => {
    toast({
      title: 'Feature Coming Soon',
      description: 'New report creation will be available in the next update.',
    });
  };

  const quickStatsCards = [
    {
      title: 'Active Reports',
      value: stats.activeReports,
      icon: <Users className="w-5 h-5" />,
      bg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Avg Performance',
      value: `${stats.avgPerformance}%`,
      icon: <TrendingUp className="w-5 h-5" />,
      bg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      title: 'AI Recommendations',
      value: stats.recommendations,
      icon: <Lightbulb className="w-5 h-5" />,
      bg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
    },
    {
      title: 'Needs Attention',
      value: stats.needsAttention,
      icon: <AlertTriangle className="w-5 h-5" />,
      bg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Dashboard Header */}
      <div className="mb-8">
        <h2 className="text-h1 text-[var(--gp-content-primary)]">Performance Dashboard</h2>
        <p className="text-body-l text-[var(--gp-content-secondary)] mt-1">
          Manage your team's coaching reports and track performance metrics
        </p>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStatsCards.map((stat, index) => (
          <Card key={index} className="gp-elevation-1 bg-[var(--gp-surface-raised)] border-[var(--gp-border-subtle)] gp-motion-fast hover:gp-elevation-2">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className={`bg-[var(--gp-brand-accent)] rounded-lg p-3`}>
                  <div className="text-[var(--gp-surface-base)]">
                    {stat.icon}
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-body-s font-medium text-[var(--gp-content-secondary)]">{stat.title}</p>
                  <p className="text-h2 text-[var(--gp-content-primary)]">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ongoing Coaching Reports Table */}
      <div className="mb-8">
        <ReportsTable
          reports={ongoingReports}
          title="Ongoing Coaching Reports"
          onReportClick={onNavigateToReport}
        />
      </div>

      {/* Latest Reports Summary */}
      <div className="mb-8">
        <ReportsTable
          reports={latestReports}
          title="Latest Reports Summary"
          description="Most recent coaching report for each team member"
          onReportClick={onNavigateToReport}
          showSummary={true}
        />
      </div>

      {/* Floating Action Button */}
      <Button
        onClick={handleCreateNewReport}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[var(--gp-brand-accent)] hover:bg-[var(--gp-brand-accent)] text-[var(--gp-surface-base)] gp-elevation-2 hover:gp-elevation-2 gp-motion-fast p-0 gp-focus-ring"
        aria-label="Create new coaching report"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
}
