import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, Users, Target, Award, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

interface AnalyticsProps {
  onBack: () => void;
}

// Sample analytics data - in production this would come from the API
const performanceTrends = [
  { month: 'Jan', sales: 245000, calls: 1200, appointments: 280, conversion: 0.18 },
  { month: 'Feb', sales: 268000, calls: 1350, appointments: 320, conversion: 0.19 },
  { month: 'Mar', sales: 285000, calls: 1420, appointments: 340, conversion: 0.21 },
  { month: 'Apr', sales: 272000, calls: 1380, appointments: 315, conversion: 0.20 },
  { month: 'May', sales: 295000, calls: 1450, appointments: 365, conversion: 0.22 },
  { month: 'Jun', sales: 315000, calls: 1520, appointments: 385, conversion: 0.24 },
];

const teamPerformance = [
  { name: 'Michael Johnson', sales: 45200, quota: 50000, performance: 90.4 },
  { name: 'Lisa Davis', sales: 68500, quota: 65000, performance: 105.4 },
  { name: 'Robert Wilson', sales: 52100, quota: 55000, performance: 94.7 },
];

const trainingCategories = [
  { name: 'Product Knowledge', value: 35, color: '#FF4F59' },
  { name: 'Sales Techniques', value: 28, color: '#2563eb' },
  { name: 'Customer Relations', value: 22, color: '#10b981' },
  { name: 'Compliance', value: 15, color: '#f59e0b' },
];

const COLORS = ['#FF4F59', '#2563eb', '#10b981', '#f59e0b'];

export default function AnalyticsDashboard({ onBack }: AnalyticsProps) {
  const formatCurrency = (value: number) => `$${(value / 1000).toFixed(0)}k`;
  const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`;

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (current < previous) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const getPerformanceBadge = (performance: number) => {
    if (performance >= 100) return <Badge className="bg-green-500">Exceeding</Badge>;
    if (performance >= 90) return <Badge className="bg-yellow-500">On Track</Badge>;
    return <Badge className="bg-red-500">Below Target</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={onBack}
              className="text-gray-400 hover:text-white mb-4 flex items-center gap-2"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-white">Team Analytics</h1>
            <p className="text-gray-400">Performance insights and trend analysis</p>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-[#FF4F59]" />
                Active Reps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">3</div>
              <div className="flex items-center gap-2 text-sm text-green-400">
                {getTrendIcon(3, 3)}
                <span>No change</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-[#FF4F59]" />
                Avg Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">96.8%</div>
              <div className="flex items-center gap-2 text-sm text-green-400">
                {getTrendIcon(96.8, 92.1)}
                <span>+4.7% vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-[#FF4F59]" />
                Top Performer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-white">Lisa Davis</div>
              <div className="text-sm text-green-400">105.4% of quota</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#FF4F59]" />
                Needs Attention
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-white">0 Reps</div>
              <div className="text-sm text-green-400">All performing well</div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
            <TabsTrigger value="trends" className="data-[state=active]:bg-[#FF4F59]">
              Performance Trends
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-[#FF4F59]">
              Team Performance
            </TabsTrigger>
            <TabsTrigger value="training" className="data-[state=active]:bg-[#FF4F59]">
              Training Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sales Trend */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Sales Performance</CardTitle>
                  <CardDescription className="text-gray-400">
                    Monthly sales trends across the team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis tickFormatter={formatCurrency} stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                        formatter={(value) => [formatCurrency(Number(value)), 'Sales']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="sales" 
                        stroke="#FF4F59" 
                        strokeWidth={3}
                        dot={{ fill: '#FF4F59', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Conversion Rate Trend */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Conversion Rate</CardTitle>
                  <CardDescription className="text-gray-400">
                    Monthly conversion rate improvements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis tickFormatter={formatPercentage} stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                        formatter={(value) => [formatPercentage(Number(value)), 'Conversion']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="conversion" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Team Performance Chart */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Individual Performance</CardTitle>
                  <CardDescription className="text-gray-400">
                    Current quota achievement by team member
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={teamPerformance}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                        formatter={(value, name) => [
                          name === 'performance' ? `${value}%` : formatCurrency(Number(value)), 
                          name === 'performance' ? 'Performance' : name === 'sales' ? 'Sales' : 'Quota'
                        ]}
                      />
                      <Bar dataKey="performance" fill="#FF4F59" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Team Performance Table */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Performance Summary</CardTitle>
                  <CardDescription className="text-gray-400">
                    Detailed breakdown by representative
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamPerformance.map((rep, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
                        <div>
                          <div className="font-medium text-white">{rep.name}</div>
                          <div className="text-sm text-gray-400">
                            {formatCurrency(rep.sales)} / {formatCurrency(rep.quota)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-white">{rep.performance}%</div>
                          {getPerformanceBadge(rep.performance)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="training" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Training Needs Distribution */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Training Focus Areas</CardTitle>
                  <CardDescription className="text-gray-400">
                    Distribution of identified training needs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={trainingCategories}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {trainingCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Training Recommendations */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Active Recommendations</CardTitle>
                  <CardDescription className="text-gray-400">
                    Current training suggestions for the team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-900/50 rounded-lg border-l-4 border-[#FF4F59]">
                      <div className="font-medium text-white">Advanced Objection Handling</div>
                      <div className="text-sm text-gray-400 mt-1">
                        Recommended for Michael Johnson - Focus on closing techniques
                      </div>
                      <Badge className="mt-2 bg-red-500">High Priority</Badge>
                    </div>
                    <div className="p-4 bg-gray-900/50 rounded-lg border-l-4 border-blue-500">
                      <div className="font-medium text-white">Product Update Training</div>
                      <div className="text-sm text-gray-400 mt-1">
                        Team-wide session on new product features and benefits
                      </div>
                      <Badge className="mt-2 bg-blue-500">Medium Priority</Badge>
                    </div>
                    <div className="p-4 bg-gray-900/50 rounded-lg border-l-4 border-green-500">
                      <div className="font-medium text-white">Customer Relationship Management</div>
                      <div className="text-sm text-gray-400 mt-1">
                        Advanced CRM techniques for Robert Wilson
                      </div>
                      <Badge className="mt-2 bg-green-500">Low Priority</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}