import type { KPIData } from './mockData';

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  reason: string;
  type: 'training' | 'mentoring' | 'review';
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'accepted' | 'ignored';
}

const trainingPrograms = [
  {
    title: 'Conversion Skills Training',
    description: 'Advanced training on converting prospects to sales',
    type: 'training' as const,
  },
  {
    title: 'Call Quality Improvement',
    description: 'Workshop on effective communication and call techniques',
    type: 'training' as const,
  },
  {
    title: 'Objection Handling Mastery',
    description: 'Specialized training on overcoming customer objections',
    type: 'training' as const,
  },
  {
    title: 'Peer Mentoring Program',
    description: 'One-on-one mentoring with top performers',
    type: 'mentoring' as const,
  },
  {
    title: 'Performance Review Session',
    description: 'Detailed review of recent performance and strategy',
    type: 'review' as const,
  },
];

export const aiAnalyzer = {
  generateRecommendations(kpiData: KPIData, reportId: string): Recommendation[] {
    const recommendations: Recommendation[] = [];
    
    // Analyze conversion rate
    if (kpiData.conversionRate < 0.15) {
      recommendations.push({
        id: `rec-${reportId}-1`,
        title: 'Conversion Skills Training',
        description: 'Advanced training on converting prospects to sales',
        reason: `Conversion rate of ${(kpiData.conversionRate * 100).toFixed(1)}% is below target (17%)`,
        type: 'training',
        priority: 'high',
        status: 'pending',
      });
    }

    // Analyze call activity vs conversion
    if (kpiData.calls > 100 && kpiData.conversionRate < 0.16) {
      recommendations.push({
        id: `rec-${reportId}-2`,
        title: 'Call Quality Review',
        description: 'Review call recordings and improve communication techniques',
        reason: 'High call volume but low conversion suggests quality issues',
        type: 'review',
        priority: 'high',
        status: 'pending',
      });
    }

    // Peer mentoring for underperformers
    if (kpiData.sales < 45000) {
      recommendations.push({
        id: `rec-${reportId}-3`,
        title: 'Peer Mentoring Program',
        description: 'Match with top performer for knowledge transfer',
        reason: `Sales performance below target ($${kpiData.sales.toLocaleString()} vs $50,000)`,
        type: 'mentoring',
        priority: 'medium',
        status: 'pending',
      });
    }

    // Appointment efficiency
    if (kpiData.appointments < 20) {
      recommendations.push({
        id: `rec-${reportId}-4`,
        title: 'Appointment Setting Workshop',
        description: 'Training on effective appointment scheduling techniques',
        reason: `Low appointment count (${kpiData.appointments} vs target 25)`,
        type: 'training',
        priority: 'medium',
        status: 'pending',
      });
    }

    return recommendations;
  },

  calculatePerformanceScore(kpiData: KPIData): number {
    const thresholds = {
      sales: 50000,
      calls: 100,
      appointments: 25,
      conversionRate: 0.17,
    };

    const salesScore = Math.min(100, (kpiData.sales / thresholds.sales) * 100);
    const callsScore = Math.min(100, (kpiData.calls / thresholds.calls) * 100);
    const appointmentsScore = Math.min(100, (kpiData.appointments / thresholds.appointments) * 100);
    const conversionScore = Math.min(100, (kpiData.conversionRate / thresholds.conversionRate) * 100);

    return Math.round((salesScore + callsScore + appointmentsScore + conversionScore) / 4);
  },
};
