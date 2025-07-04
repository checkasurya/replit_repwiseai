import { useState, useEffect } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import KPICard from './KPICard';
import FeedbackEditor from './FeedbackEditor';
import RecommendationsSidebar from './RecommendationsSidebar';
import { aiAnalyzer } from '@/lib/aiAnalyzer';
import { useToast } from '@/hooks/use-toast';
import type { KPIData } from '@/lib/mockData';
import type { Recommendation } from '@/lib/aiAnalyzer';

interface ReportDetailProps {
  reportId: string;
  onBack: () => void;
}

interface ReportData {
  id: string;
  reporteeName: string;
  dateStarted: string;
  status: 'ongoing' | 'completed';
  kpiData: KPIData;
}

export default function ReportDetail({ reportId, onBack }: ReportDetailProps) {
  const { toast } = useToast();
  const [report, setReport] = useState<ReportData | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock report data - in a real app, this would come from an API
  useEffect(() => {
    const loadReport = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockReports: Record<string, ReportData> = {
        'RPT-1001': {
          id: 'RPT-1001',
          reporteeName: 'Michael Johnson',
          dateStarted: '2025-01-15',
          status: 'ongoing',
          kpiData: {
            sales: 45200,
            calls: 127,
            appointments: 24,
            conversionRate: 0.12,
          },
        },
        'RPT-1002': {
          id: 'RPT-1002',
          reporteeName: 'Lisa Davis',
          dateStarted: '2025-01-18',
          status: 'ongoing',
          kpiData: {
            sales: 68500,
            calls: 95,
            appointments: 32,
            conversionRate: 0.22,
          },
        },
        'RPT-1003': {
          id: 'RPT-1003',
          reporteeName: 'Robert Wilson',
          dateStarted: '2025-01-20',
          status: 'ongoing',
          kpiData: {
            sales: 52100,
            calls: 110,
            appointments: 28,
            conversionRate: 0.16,
          },
        },
      };

      const reportData = mockReports[reportId];
      if (reportData) {
        setReport(reportData);
        const aiRecommendations = aiAnalyzer.generateRecommendations(reportData.kpiData, reportId);
        setRecommendations(aiRecommendations);
      }
      
      setIsLoading(false);
    };

    loadReport();
  }, [reportId]);

  const handleStatusChange = (newStatus: string) => {
    if (report) {
      setReport({ ...report, status: newStatus as 'ongoing' | 'completed' });
      toast({
        title: 'Status Updated',
        description: `Report status changed to ${newStatus}`,
      });
    }
  };

  const handleSaveDraft = () => {
    toast({
      title: 'Draft Saved',
      description: 'Your changes have been saved successfully.',
    });
  };

  const handleAcceptRecommendation = (id: string) => {
    setRecommendations(prev =>
      prev.map(rec => rec.id === id ? { ...rec, status: 'accepted' } : rec)
    );
  };

  const handleIgnoreRecommendation = (id: string) => {
    setRecommendations(prev =>
      prev.map(rec => rec.id === id ? { ...rec, status: 'ignored' } : rec)
    );
  };

  const handleRefreshRecommendations = () => {
    if (report) {
      const newRecommendations = aiAnalyzer.generateRecommendations(report.kpiData, reportId);
      setRecommendations(newRecommendations);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Report Not Found</h2>
          <p className="text-gray-600 mb-6">The requested report could not be found.</p>
          <Button onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Navigation */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-blue-600 hover:text-blue-500 p-0"
          aria-label="Back to dashboard"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      {/* Report Header */}
      <Card className="material-shadow mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {report.reporteeName} - Coaching Report
              </h1>
              <p className="text-gray-600 mt-1">
                Report ID: {report.id} | Started: {new Date(report.dateStarted).toLocaleDateString()}
              </p>
            </div>
            <div className="mt-4 lg:mt-0 flex items-center space-x-3">
              <Select value={report.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleSaveDraft} className="bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-8">
          {/* KPI Metrics Panel */}
          <Card className="material-shadow">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Performance Metrics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard
                  title="Sales Revenue"
                  value={report.kpiData.sales}
                  icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" /></svg>}
                  type="sales"
                  format="currency"
                />
                <KPICard
                  title="Total Calls"
                  value={report.kpiData.calls}
                  icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
                  type="calls"
                />
                <KPICard
                  title="Appointments"
                  value={report.kpiData.appointments}
                  icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                  type="appointments"
                />
                <KPICard
                  title="Conversion Rate"
                  value={report.kpiData.conversionRate}
                  icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                  type="conversionRate"
                  format="percentage"
                />
              </div>
            </CardContent>
          </Card>

          {/* Manager Feedback Section */}
          <FeedbackEditor
            reportId={report.id}
            initialFeedback="Michael has shown strong activity levels with high call volume this period. However, there are concerning trends in conversion rates that need immediate attention.\n\nKey observations:\n• Call quality may be impacting conversion effectiveness\n• Needs focused training on objection handling\n• Strong rapport building skills to leverage\n\nRecommended actions:\n1. Shadow top performer for 2 days\n2. Complete 'Advanced Objection Handling' training\n3. Weekly check-ins for next month"
          />
        </div>

        {/* AI Recommendations Sidebar */}
        <div className="lg:col-span-1">
          <RecommendationsSidebar
            recommendations={recommendations}
            onAccept={handleAcceptRecommendation}
            onIgnore={handleIgnoreRecommendation}
            onRefresh={handleRefreshRecommendations}
          />
        </div>
      </div>
    </div>
  );
}
