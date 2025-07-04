import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, Download, Filter, Calendar as CalendarIcon, Search, 
  ArrowLeft, Users, TrendingUp, Clock, Target, Share2,
  Eye, Edit, Trash2, Plus, AlertCircle, CheckCircle
} from 'lucide-react';
import { format } from 'date-fns';

interface ReportingDashboardProps {
  onBack: () => void;
}

export default function ReportingDashboard({ onBack }: ReportingDashboardProps) {
  const [selectedTab, setSelectedTab] = useState('reports');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('');

  // Mock report data
  const availableReports = [
    {
      id: 'RPT001',
      name: 'Monthly Performance Summary',
      description: 'Comprehensive monthly performance metrics across all representatives',
      type: 'performance',
      frequency: 'Monthly',
      lastGenerated: '2025-01-03',
      status: 'completed',
      size: '2.3 MB',
      recipients: ['sarah.johnson@healthcorp.com', 'management@healthcorp.com'],
      author: 'System Generated'
    },
    {
      id: 'RPT002',
      name: 'Territory Analysis Report',
      description: 'Regional performance breakdown and territory comparison',
      type: 'territory',
      frequency: 'Quarterly',
      lastGenerated: '2025-01-01',
      status: 'completed',
      size: '1.8 MB',
      recipients: ['regional.managers@healthcorp.com'],
      author: 'Sarah Johnson'
    },
    {
      id: 'RPT003',
      name: 'Product Category Deep Dive',
      description: 'Detailed analysis of product category performance and trends',
      type: 'product',
      frequency: 'Weekly',
      lastGenerated: '2025-01-04',
      status: 'processing',
      size: '3.1 MB',
      recipients: ['product.team@healthcorp.com'],
      author: 'Mike Chen'
    },
    {
      id: 'RPT004',
      name: 'Sales Pipeline Analysis',
      description: 'Current pipeline status and forecasting metrics',
      type: 'pipeline',
      frequency: 'Bi-weekly',
      lastGenerated: '2024-12-28',
      status: 'scheduled',
      size: '1.5 MB',
      recipients: ['sales.team@healthcorp.com'],
      author: 'Emily Davis'
    },
    {
      id: 'RPT005',
      name: 'Training Effectiveness Report',
      description: 'Analysis of training programs and their impact on performance',
      type: 'training',
      frequency: 'Monthly',
      lastGenerated: '2024-12-30',
      status: 'failed',
      size: '0.9 MB',
      recipients: ['hr@healthcorp.com'],
      author: 'David Wilson'
    }
  ];

  const reportTemplates = [
    {
      id: 'TPL001',
      name: 'Performance Overview',
      description: 'Standard monthly performance metrics',
      category: 'Performance',
      fields: ['Sales', 'Calls', 'Appointments', 'Conversion Rate'],
      estimatedTime: '5 minutes'
    },
    {
      id: 'TPL002',
      name: 'Territory Comparison',
      description: 'Compare performance across different territories',
      category: 'Geographic',
      fields: ['Territory', 'Sales', 'Quota Attainment', 'Rep Count'],
      estimatedTime: '8 minutes'
    },
    {
      id: 'TPL003',
      name: 'Product Analysis',
      description: 'Deep dive into product category performance',
      category: 'Product',
      fields: ['Product Category', 'Revenue', 'Volume', 'Growth Rate'],
      estimatedTime: '12 minutes'
    },
    {
      id: 'TPL004',
      name: 'Custom KPI Dashboard',
      description: 'Build your own custom KPI report',
      category: 'Custom',
      fields: ['Customizable Fields'],
      estimatedTime: '15 minutes'
    }
  ];

  const scheduledReports = [
    {
      id: 'SCH001',
      name: 'Weekly Team Performance',
      schedule: 'Every Monday at 9:00 AM',
      recipients: 3,
      nextRun: '2025-01-06',
      status: 'active'
    },
    {
      id: 'SCH002',
      name: 'Monthly Executive Summary',
      schedule: 'First day of each month at 8:00 AM',
      recipients: 5,
      nextRun: '2025-02-01',
      status: 'active'
    },
    {
      id: 'SCH003',
      name: 'Quarterly Territory Review',
      schedule: 'Every quarter on the 1st at 10:00 AM',
      recipients: 8,
      nextRun: '2025-04-01',
      status: 'paused'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800"><Clock className="w-3 h-3 mr-1" />Processing</Badge>;
      case 'scheduled':
        return <Badge className="bg-yellow-100 text-yellow-800"><CalendarIcon className="w-3 h-3 mr-1" />Scheduled</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800"><AlertCircle className="w-3 h-3 mr-1" />Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredReports = availableReports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 bg-[var(--gp-surface-base)] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-h1 text-[var(--gp-content-primary)]">Reporting Dashboard</h1>
            <p className="text-body-s text-[var(--gp-content-secondary)]">
              Generate, schedule, and manage comprehensive reports
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button className="bg-[var(--gp-brand-accent)] hover:bg-[var(--gp-brand-accent)]/90">
            <Plus className="w-4 h-4 mr-2" />
            Create Report
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-40">
            <CalendarIcon className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
            <SelectItem value="1year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="reports">All Reports</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* All Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          {filteredReports.map((report) => (
            <Card key={report.id} className="material-shadow hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <FileText className="w-5 h-5 text-[var(--gp-brand-accent)]" />
                      <h3 className="font-semibold text-[var(--gp-content-primary)]">{report.name}</h3>
                      {getStatusBadge(report.status)}
                    </div>
                    <p className="text-body-s text-[var(--gp-content-secondary)] mb-3">{report.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <Label className="text-[var(--gp-content-secondary)]">Type</Label>
                        <p className="font-medium text-[var(--gp-content-primary)] capitalize">{report.type}</p>
                      </div>
                      <div>
                        <Label className="text-[var(--gp-content-secondary)]">Frequency</Label>
                        <p className="font-medium text-[var(--gp-content-primary)]">{report.frequency}</p>
                      </div>
                      <div>
                        <Label className="text-[var(--gp-content-secondary)]">Last Generated</Label>
                        <p className="font-medium text-[var(--gp-content-primary)]">{report.lastGenerated}</p>
                      </div>
                      <div>
                        <Label className="text-[var(--gp-content-secondary)]">Size</Label>
                        <p className="font-medium text-[var(--gp-content-primary)]">{report.size}</p>
                      </div>
                    </div>

                    <div className="mt-3">
                      <Label className="text-[var(--gp-content-secondary)]">Recipients</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {report.recipients.map((recipient, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {recipient}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-6">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reportTemplates.map((template) => (
              <Card key={template.id} className="material-shadow hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-[var(--gp-content-primary)] mb-2">{template.name}</h3>
                      <p className="text-body-s text-[var(--gp-content-secondary)] mb-3">{template.description}</p>
                      <Badge variant="outline">{template.category}</Badge>
                    </div>
                    <Clock className="w-5 h-5 text-[var(--gp-content-secondary)]" />
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <Label className="text-[var(--gp-content-secondary)]">Included Fields</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {template.fields.map((field, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {field}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[var(--gp-content-secondary)]">
                        Est. Generation Time: {template.estimatedTime}
                      </span>
                      <Button size="sm" className="bg-[var(--gp-brand-accent)] hover:bg-[var(--gp-brand-accent)]/90">
                        Use Template
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Scheduled Reports Tab */}
        <TabsContent value="scheduled" className="space-y-4">
          {scheduledReports.map((scheduled) => (
            <Card key={scheduled.id} className="material-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CalendarIcon className="w-5 h-5 text-[var(--gp-brand-accent)]" />
                      <h3 className="font-semibold text-[var(--gp-content-primary)]">{scheduled.name}</h3>
                      <Badge className={scheduled.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {scheduled.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <Label className="text-[var(--gp-content-secondary)]">Schedule</Label>
                        <p className="font-medium text-[var(--gp-content-primary)]">{scheduled.schedule}</p>
                      </div>
                      <div>
                        <Label className="text-[var(--gp-content-secondary)]">Recipients</Label>
                        <p className="font-medium text-[var(--gp-content-primary)]">{scheduled.recipients} people</p>
                      </div>
                      <div>
                        <Label className="text-[var(--gp-content-secondary)]">Next Run</Label>
                        <p className="font-medium text-[var(--gp-content-primary)]">{scheduled.nextRun}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-6">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    {scheduled.status === 'active' ? (
                      <Button variant="outline" size="sm">
                        Pause
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="text-green-600">
                        Resume
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="material-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-body-xs text-[var(--gp-content-secondary)] uppercase tracking-wide">Total Reports</p>
                    <p className="text-h3 text-[var(--gp-content-primary)] mt-1">127</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-500" />
                </div>
                <div className="flex items-center mt-3">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-body-xs text-green-600">+12 this month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="material-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-body-xs text-[var(--gp-content-secondary)] uppercase tracking-wide">Active Schedules</p>
                    <p className="text-h3 text-[var(--gp-content-primary)] mt-1">23</p>
                  </div>
                  <CalendarIcon className="w-8 h-8 text-purple-500" />
                </div>
                <div className="flex items-center mt-3">
                  <Clock className="w-4 h-4 text-[var(--gp-content-secondary)] mr-1" />
                  <span className="text-body-xs text-[var(--gp-content-secondary)]">5 running today</span>
                </div>
              </CardContent>
            </Card>

            <Card className="material-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-body-xs text-[var(--gp-content-secondary)] uppercase tracking-wide">Total Downloads</p>
                    <p className="text-h3 text-[var(--gp-content-primary)] mt-1">1,842</p>
                  </div>
                  <Download className="w-8 h-8 text-green-500" />
                </div>
                <div className="flex items-center mt-3">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-body-xs text-green-600">+125 this week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="material-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-body-xs text-[var(--gp-content-secondary)] uppercase tracking-wide">Avg Generation Time</p>
                    <p className="text-h3 text-[var(--gp-content-primary)] mt-1">4.2m</p>
                  </div>
                  <Target className="w-8 h-8 text-orange-500" />
                </div>
                <div className="flex items-center mt-3">
                  <span className="text-body-xs text-[var(--gp-content-secondary)]">Within target range</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="material-shadow">
            <CardHeader>
              <CardTitle className="tracking-tight text-lg font-semibold text-[var(--gp-content-primary)]">
                Most Popular Report Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: 'Performance Reports', count: 45, percentage: 35 },
                  { type: 'Territory Analysis', count: 32, percentage: 25 },
                  { type: 'Product Reports', count: 28, percentage: 22 },
                  { type: 'Training Reports', count: 22, percentage: 18 }
                ].map((item) => (
                  <div key={item.type} className="flex items-center justify-between">
                    <span className="font-medium text-[var(--gp-content-primary)]">{item.type}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-[var(--gp-brand-accent)] h-2 rounded-full" 
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-[var(--gp-content-secondary)] w-12">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}