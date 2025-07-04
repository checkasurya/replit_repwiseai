export interface KPIData {
  sales: number;
  calls: number;
  appointments: number;
  conversionRate: number;
}

export interface QuickStats {
  activeReports: number;
  avgPerformance: number;
  recommendations: number;
  needsAttention: number;
}

export const getQuickStats = (): QuickStats => ({
  activeReports: 12,
  avgPerformance: 87,
  recommendations: 8,
  needsAttention: 3,
});

export const getKPIThresholds = () => ({
  sales: {
    target: 50000,
    warning: 45000,
    critical: 40000,
  },
  calls: {
    target: 100,
    warning: 80,
    critical: 60,
  },
  appointments: {
    target: 25,
    warning: 20,
    critical: 15,
  },
  conversionRate: {
    target: 0.17,
    warning: 0.15,
    critical: 0.12,
  },
});

export const calculateKPIStatus = (value: number, thresholds: { target: number; warning: number; critical: number }) => {
  if (value >= thresholds.target) return 'positive';
  if (value >= thresholds.warning) return 'warning';
  return 'negative';
};

export const calculateTrend = (current: number, target: number) => {
  const percentage = ((current - target) / target) * 100;
  return {
    percentage: Math.abs(percentage),
    direction: percentage >= 0 ? 'up' : 'down',
    status: percentage >= 0 ? 'positive' : 'negative',
  };
};
