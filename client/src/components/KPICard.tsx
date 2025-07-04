import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { calculateKPIStatus, calculateTrend, getKPIThresholds } from '@/lib/mockData';

interface KPICardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  type: 'sales' | 'calls' | 'appointments' | 'conversionRate';
  format?: 'currency' | 'number' | 'percentage';
}

export default function KPICard({ title, value, icon, type, format = 'number' }: KPICardProps) {
  const thresholds = getKPIThresholds()[type];
  const status = calculateKPIStatus(value, thresholds);
  const trend = calculateTrend(value, thresholds.target);

  const formatValue = (val: number) => {
    switch (format) {
      case 'currency':
        return `$${val.toLocaleString()}`;
      case 'percentage':
        return `${(val * 100).toFixed(1)}%`;
      default:
        return val.toString();
    }
  };

  const getStatusColors = () => {
    switch (status) {
      case 'positive':
        return {
          bg: 'kpi-card-positive',
          text: 'text-green-900',
          accent: 'text-green-600',
          trend: 'text-green-600',
        };
      case 'warning':
        return {
          bg: 'kpi-card-warning',
          text: 'text-yellow-900',
          accent: 'text-yellow-600',
          trend: 'text-yellow-600',
        };
      case 'negative':
        return {
          bg: 'kpi-card-negative',
          text: 'text-red-900',
          accent: 'text-red-600',
          trend: 'text-red-600',
        };
      default:
        return {
          bg: 'kpi-card-neutral',
          text: 'text-blue-900',
          accent: 'text-blue-600',
          trend: 'text-blue-600',
        };
    }
  };

  const colors = getStatusColors();

  const TrendIcon = trend.direction === 'up' ? TrendingUp : trend.direction === 'down' ? TrendingDown : Minus;

  return (
    <Card className={`${colors.bg} p-4 border-0`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className={`text-sm font-medium ${colors.accent}`}>{title}</h3>
        <div className={colors.accent}>
          {icon}
        </div>
      </div>
      <p className={`text-2xl font-bold ${colors.text}`}>
        {formatValue(value)}
      </p>
      <div className="flex items-center mt-2">
        <TrendIcon className={`w-4 h-4 mr-1 ${colors.trend}`} />
        <span className={`text-sm ${colors.trend}`}>
          {trend.direction === 'up' ? '+' : '-'}{trend.percentage.toFixed(1)}% vs target
        </span>
      </div>
    </Card>
  );
}
