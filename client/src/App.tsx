import { useState, useEffect } from 'react';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import LandingPage from "@/components/LandingPage";
import LoginPage from "@/components/LoginPage";
import Header from "@/components/Header";
import DashboardPage from "@/pages/dashboard";
import ReportPage from "@/pages/report";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import GoalTracker from "@/components/GoalTracker";
import NotificationCenter from "@/components/NotificationCenter";
import AdvancedAnalytics from "@/components/AdvancedAnalytics";
import ReportingDashboard from "@/components/ReportingDashboard";

function App() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'dashboard' | 'report' | 'analytics' | 'goals' | 'notifications' | 'advanced-analytics' | 'reporting'>('landing');
  const [currentReportId, setCurrentReportId] = useState<string | null>(null);

  // Reset view state when user authentication status changes
  useEffect(() => {
    if (!isAuthenticated) {
      // User logged out - reset to landing page
      setCurrentView('landing');
      setCurrentReportId(null);
    } else if (isAuthenticated && user) {
      // User logged in - ensure they land on dashboard
      setCurrentView('dashboard');
      setCurrentReportId(null);
    }
  }, [isAuthenticated, user]);

  const handleNavigateToReport = (reportId: string) => {
    setCurrentReportId(reportId);
    setCurrentView('report');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setCurrentReportId(null);
  };

  const handleNavigateToAnalytics = () => {
    setCurrentView('analytics');
  };

  const handleNavigateToGoals = () => {
    setCurrentView('goals');
  };

  const handleNavigateToNotifications = () => {
    setCurrentView('notifications');
  };

  const handleNavigateToAdvancedAnalytics = () => {
    setCurrentView('advanced-analytics');
  };

  const handleNavigateToReporting = () => {
    setCurrentView('reporting');
  };

  const handleNavigateToLogin = () => {
    setCurrentView('login');
  };

  const handleNavigateToLanding = () => {
    setCurrentView('landing');
  };

  const handleNavigate = (view: string) => {
    if (view === 'dashboard') {
      handleBackToDashboard();
    } else if (view === 'analytics') {
      handleNavigateToAnalytics();
    } else if (view === 'goals') {
      handleNavigateToGoals();
    } else if (view === 'notifications') {
      handleNavigateToNotifications();
    } else if (view === 'advanced-analytics') {
      handleNavigateToAdvancedAnalytics();
    } else if (view === 'reporting') {
      handleNavigateToReporting();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          {currentView === 'landing' && (
            <LandingPage onNavigateToLogin={handleNavigateToLogin} />
          )}
          {currentView === 'login' && (
            <LoginPage onBack={handleNavigateToLanding} />
          )}
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="min-h-screen bg-[var(--gp-surface-base)]">
          <Header currentView={currentView} onNavigate={handleNavigate} />
          <main>
            {currentView === 'dashboard' && (
              <DashboardPage 
                onNavigateToReport={handleNavigateToReport}
                onNavigateToAnalytics={handleNavigateToAnalytics}
                onNavigateToGoals={handleNavigateToGoals}
                onNavigateToNotifications={handleNavigateToNotifications}
                onNavigateToAdvancedAnalytics={handleNavigateToAdvancedAnalytics}
                onNavigateToReporting={handleNavigateToReporting}
              />
            )}
            {currentView === 'report' && currentReportId && (
              <ReportPage 
                reportId={currentReportId} 
                onBack={handleBackToDashboard}
              />
            )}
            {currentView === 'analytics' && (
              <AnalyticsDashboard onBack={handleBackToDashboard} />
            )}
            {currentView === 'goals' && (
              <GoalTracker onBack={handleBackToDashboard} />
            )}
            {currentView === 'notifications' && (
              <NotificationCenter onBack={handleBackToDashboard} />
            )}
            {currentView === 'advanced-analytics' && (
              <AdvancedAnalytics onBack={handleBackToDashboard} />
            )}
            {currentView === 'reporting' && (
              <ReportingDashboard onBack={handleBackToDashboard} />
            )}
          </main>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
