import { useState } from 'react';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import LoginPage from "@/components/LoginPage";
import Header from "@/components/Header";
import DashboardPage from "@/pages/dashboard";
import ReportPage from "@/pages/report";

function App() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState<'dashboard' | 'report'>('dashboard');
  const [currentReportId, setCurrentReportId] = useState<string | null>(null);

  const handleNavigateToReport = (reportId: string) => {
    setCurrentReportId(reportId);
    setCurrentView('report');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setCurrentReportId(null);
  };

  const handleNavigate = (view: string) => {
    if (view === 'dashboard') {
      handleBackToDashboard();
    }
    // Add more navigation logic as needed
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
          <LoginPage />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="min-h-screen bg-gray-50">
          <Header currentView={currentView} onNavigate={handleNavigate} />
          <main>
            {currentView === 'dashboard' && (
              <DashboardPage onNavigateToReport={handleNavigateToReport} />
            )}
            {currentView === 'report' && currentReportId && (
              <ReportPage 
                reportId={currentReportId} 
                onBack={handleBackToDashboard}
              />
            )}
          </main>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
