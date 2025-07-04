import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Area, AreaChart, ComposedChart
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Users, Target, Calendar, Download, 
  Filter, RefreshCw, ArrowLeft, BarChart3, PieChart as PieChartIcon,
  Activity, Clock, DollarSign, Phone, UserCheck, Award
} from 'lucide-react';

interface AdvancedAnalyticsProps {
  onBack: () => void;
}

export default function AdvancedAnalytics({ onBack }: AdvancedAnalyticsProps) {
  const [timeRange, setTimeRange] = useState('3months');
  const [selectedMetric, setSelectedMetric] = useState('sales');
  const [viewType, setViewType] = useState('overview');

  // Mock comprehensive analytics data
  const performanceMetrics = {
    totalSales: 1250000,
    totalCalls: 4850,
    totalAppointments: 1820,
    avgConversionRate: 28.5,
    teamSize: 12,
    activeReports: 45
  };

  const monthlyTrends = [
    { month: 'Jan', sales: 185000, calls: 720, appointments: 280, conversion: 24.5, target: 200000 },
    { month: 'Feb', sales: 195000, calls: 780, appointments: 295, conversion: 26.8, target: 200000 },
    { month: 'Mar', sales: 220000, calls: 850, appointments: 320, conversion: 29.2, target: 200000 },
    { month: 'Apr', sales: 215000, calls: 820, appointments: 310, conversion: 27.9, target: 200000 },
    { month: 'May', sales: 235000, calls: 890, appointments: 340, conversion: 30.1, target: 200000 },
    { month: 'Jun', sales: 200000, calls: 790, appointments: 275, conversion: 25.7, target: 200000 }
  ];

  const representativePerformance = [
    { name: 'Mike Johnson', sales: 145000, calls: 580, appointments: 220, conversion: 32.5, rank: 1 },
    { name: 'Emily Chen', sales: 138000, calls: 560, appointments: 210, conversion: 31.8, rank: 2 },
    { name: 'David Wilson', sales: 132000, calls: 540, appointments: 195, conversion: 29.9, rank: 3 },
    { name: 'Sarah Davis', sales: 128000, calls: 520, appointments: 185, conversion: 28.2, rank: 4 },
    { name: 'Alex Brown', sales: 125000, calls: 510, appointments: 180, conversion: 27.6, rank: 5 }
  ];

  const productCategoryData = [
    { name: 'Cardiovascular', value: 35, sales: 437500, color: '#0048d1' },
    { name: 'Diabetes', value: 28, sales: 350000, color: '#1049e3' },
    { name: 'Oncology', value: 22, sales: 275000, color: '#3b82f6' },
    { name: 'Respiratory', value: 15, sales: 187500, color: '#60a5fa' }
  ];

  const territoryPerformance = [
    { territory: 'North Region', sales: 320000, quota: 300000, achievement: 106.7 },
    { territory: 'South Region', sales: 285000, quota: 280000, achievement: 101.8 },
    { territory: 'East Region', sales: 265000, quota: 270000, achievement: 98.1 },
    { territory: 'West Region', sales: 380000, quota: 350000, achievement: 108.6 }
  ];

  const weeklyActivityData = [
    { week: 'Week 1', calls: 280, emails: 150, meetings: 45, followUps: 85 },
    { week: 'Week 2', calls: 320, emails: 180, meetings: 52, followUps: 95 },
    { week: 'Week 3', calls: 295, emails: 165, meetings: 48, followUps: 78 },
    { week: 'Week 4', calls: 310, emails: 175, meetings: 55, followUps: 88 }
  ];

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'sales': return <DollarSign className="w-4 h-4" />;
      case 'calls': return <Phone className="w-4 h-4" />;
      case 'appointments': return <Calendar className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="p-6 bg-[var(--gp-surface-base)] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-h1 text-[var(--gp-content-primary)]">Advanced Analytics</h1>
            <p className="text-body-s text-[var(--gp-content-secondary)]">
              Comprehensive performance insights and reporting
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
        <Card className="material-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body-xs text-[var(--gp-content-secondary)] uppercase tracking-wide">Total Sales</p>
                <p className="text-h3 text-[var(--gp-content-primary)] mt-1">{formatCurrency(performanceMetrics.totalSales)}</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="flex items-center mt-3">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-body-xs text-green-600">+12.5% vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="material-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body-xs text-[var(--gp-content-secondary)] uppercase tracking-wide">Total Calls</p>
                <p className="text-h3 text-[var(--gp-content-primary)] mt-1">{performanceMetrics.totalCalls.toLocaleString()}</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="flex items-center mt-3">
              <TrendingUp className="w-4 h-4 text-blue-500 mr-1" />
              <span className="text-body-xs text-blue-600">+8.3% vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="material-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body-xs text-[var(--gp-content-secondary)] uppercase tracking-wide">Appointments</p>
                <p className="text-h3 text-[var(--gp-content-primary)] mt-1">{performanceMetrics.totalAppointments.toLocaleString()}</p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
                <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="flex items-center mt-3">
              <TrendingUp className="w-4 h-4 text-purple-500 mr-1" />
              <span className="text-body-xs text-purple-600">+15.7% vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="material-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body-xs text-[var(--gp-content-secondary)] uppercase tracking-wide">Conversion Rate</p>
                <p className="text-h3 text-[var(--gp-content-primary)] mt-1">{performanceMetrics.avgConversionRate}%</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
                <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="flex items-center mt-3">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-body-xs text-green-600">+3.2% vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="material-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body-xs text-[var(--gp-content-secondary)] uppercase tracking-wide">Team Size</p>
                <p className="text-h3 text-[var(--gp-content-primary)] mt-1">{performanceMetrics.teamSize}</p>
              </div>
              <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-lg">
                <Users className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <div className="flex items-center mt-3">
              <span className="text-body-xs text-[var(--gp-content-secondary)]">Active members</span>
            </div>
          </CardContent>
        </Card>

        <Card className="material-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body-xs text-[var(--gp-content-secondary)] uppercase tracking-wide">Active Reports</p>
                <p className="text-h3 text-[var(--gp-content-primary)] mt-1">{performanceMetrics.activeReports}</p>
              </div>
              <div className="bg-red-100 dark:bg-red-900 p-2 rounded-lg">
                <Activity className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <div className="flex items-center mt-3">
              <Clock className="w-4 h-4 text-[var(--gp-content-secondary)] mr-1" />
              <span className="text-body-xs text-[var(--gp-content-secondary)]">In progress</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs value={viewType} onValueChange={setViewType} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="territories">Territories</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Trends Chart */}
            <Card className="material-shadow">
              <CardHeader>
                <CardTitle className="tracking-tight text-lg font-semibold text-[var(--gp-content-primary)]">
                  Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis yAxisId="left" stroke="#6b7280" />
                    <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="sales" fill="#0048d1" name="Sales ($)" />
                    <Line yAxisId="right" type="monotone" dataKey="conversion" stroke="#ef4444" strokeWidth={3} name="Conversion %" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Product Category Distribution */}
            <Card className="material-shadow">
              <CardHeader>
                <CardTitle className="tracking-tight text-lg font-semibold text-[var(--gp-content-primary)]">
                  Product Category Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={productCategoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={(entry) => `${entry.name}: ${entry.value}%`}
                    >
                      {productCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Market Share']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card className="material-shadow">
            <CardHeader>
              <CardTitle className="tracking-tight text-lg font-semibold text-[var(--gp-content-primary)]">
                Representative Performance Ranking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {representativePerformance.map((rep, index) => (
                  <div key={rep.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-[var(--gp-brand-accent)] text-white rounded-full text-sm font-bold">
                        {rep.rank}
                      </div>
                      <div>
                        <h4 className="font-semibold text-[var(--gp-content-primary)]">{rep.name}</h4>
                        <p className="text-sm text-[var(--gp-content-secondary)]">Healthcare Representative</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-6 text-center">
                      <div>
                        <p className="text-sm font-medium text-[var(--gp-content-primary)]">{formatCurrency(rep.sales)}</p>
                        <p className="text-xs text-[var(--gp-content-secondary)]">Sales</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--gp-content-primary)]">{rep.calls}</p>
                        <p className="text-xs text-[var(--gp-content-secondary)]">Calls</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--gp-content-primary)]">{rep.appointments}</p>
                        <p className="text-xs text-[var(--gp-content-secondary)]">Appointments</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--gp-content-primary)]">{rep.conversion}%</p>
                        <p className="text-xs text-[var(--gp-content-secondary)]">Conversion</p>
                      </div>
                    </div>
                    {rep.rank <= 3 && (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        <Award className="w-3 h-3 mr-1" />
                        Top Performer
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Territories Tab */}
        <TabsContent value="territories" className="space-y-6">
          <Card className="material-shadow">
            <CardHeader>
              <CardTitle className="tracking-tight text-lg font-semibold text-[var(--gp-content-primary)]">
                Territory Performance vs Quota
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={territoryPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="territory" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                    formatter={(value, name) => [
                      name === 'sales' || name === 'quota' ? formatCurrency(value as number) : value,
                      name === 'sales' ? 'Actual Sales' : name === 'quota' ? 'Quota' : name
                    ]}
                  />
                  <Legend />
                  <Bar dataKey="quota" fill="#e5e7eb" name="Quota" />
                  <Bar dataKey="sales" fill="#0048d1" name="Actual Sales" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {productCategoryData.map((category) => (
              <Card key={category.name} className="material-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-[var(--gp-content-primary)]">{category.name}</h3>
                    <Badge style={{ backgroundColor: category.color, color: 'white' }}>
                      {category.value}% Market Share
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[var(--gp-content-secondary)]">Revenue</span>
                      <span className="font-medium text-[var(--gp-content-primary)]">{formatCurrency(category.sales)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full" 
                        style={{ 
                          width: `${category.value}%`, 
                          backgroundColor: category.color 
                        }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <Card className="material-shadow">
            <CardHeader>
              <CardTitle className="tracking-tight text-lg font-semibold text-[var(--gp-content-primary)]">
                Weekly Activity Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={weeklyActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="week" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="calls" stackId="1" stroke="#0048d1" fill="#0048d1" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="emails" stackId="1" stroke="#1049e3" fill="#1049e3" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="meetings" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="followUps" stackId="1" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}