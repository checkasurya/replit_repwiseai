import { useState, useMemo } from 'react';
import { ArrowUpDown, Eye, MoreHorizontal, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Report {
  id: string;
  reporteeName: string;
  dateStarted: string;
  status: string;
  performance?: number;
  summary?: string;
  lastReportDate?: string;
  performanceTrend?: 'improving' | 'declining' | 'stable';
}

interface ReportsTableProps {
  reports: Report[];
  title: string;
  description?: string;
  onReportClick: (reportId: string) => void;
  showSummary?: boolean;
}

type SortKey = 'reporteeName' | 'dateStarted' | 'performance';
type SortDirection = 'asc' | 'desc';

export default function ReportsTable({ 
  reports, 
  title, 
  description, 
  onReportClick, 
  showSummary = false 
}: ReportsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('dateStarted');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const filteredAndSortedReports = useMemo(() => {
    const filtered = reports.filter(report =>
      report.reporteeName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortKey) {
        case 'reporteeName':
          aValue = a.reporteeName;
          bValue = b.reporteeName;
          break;
        case 'dateStarted':
          aValue = new Date(a.dateStarted).getTime();
          bValue = new Date(b.dateStarted).getTime();
          break;
        case 'performance':
          aValue = a.performance || 0;
          bValue = b.performance || 0;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [reports, searchTerm, sortKey, sortDirection]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getPerformanceColor = (performance?: number) => {
    if (!performance) return 'text-gray-500';
    if (performance >= 85) return 'text-green-600';
    if (performance >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrendBars = (trend?: string) => {
    const colors = {
      improving: 'bg-green-500',
      declining: 'bg-red-500',
      stable: 'bg-yellow-500',
    };

    return (
      <div className="flex space-x-1 mr-2">
        <div className={`w-2 h-6 rounded ${colors[trend as keyof typeof colors] || 'bg-gray-300'}`}></div>
        <div className={`w-2 h-6 rounded ${colors[trend as keyof typeof colors] || 'bg-gray-300'}`}></div>
        <div className={`w-2 h-6 rounded ${colors[trend as keyof typeof colors] || 'bg-gray-300'}`}></div>
      </div>
    );
  };

  return (
    <Card className="gp-elevation-1 bg-[var(--gp-surface-raised)] border-[var(--gp-border-subtle)]">
      <CardHeader className="border-b border-[var(--gp-border-subtle)]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-h2 text-[var(--gp-content-primary)]">{title}</CardTitle>
            {description && (
              <p className="text-body-l text-[var(--gp-content-secondary)] mt-1">{description}</p>
            )}
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-4 flex items-center space-x-3">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64 bg-[var(--gp-surface-base)] border-[var(--gp-border-subtle)] text-[var(--gp-content-primary)] gp-focus-ring"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg className="h-4 w-4 text-[var(--gp-content-tertiary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gp-btn-secondary gp-focus-ring">
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
              </svg>
              Filter
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('reporteeName')}
                    className="h-auto p-0 font-medium text-h3 text-[var(--gp-content-tertiary)] uppercase tracking-wider hover:bg-[var(--gp-surface-base)] gp-focus-ring"
                  >
                    Reportee
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('dateStarted')}
                    className="h-auto p-0 font-medium text-h3 text-[var(--gp-content-tertiary)] uppercase tracking-wider hover:bg-[var(--gp-surface-base)] gp-focus-ring"
                  >
                    {showSummary ? 'Last Report' : 'Date Started'}
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                {showSummary ? (
                  <>
                    <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Summary
                    </TableHead>
                    <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Performance Trend
                    </TableHead>
                  </>
                ) : (
                  <>
                    <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => handleSort('performance')}
                        className="h-auto p-0 font-medium text-xs text-gray-500 uppercase tracking-wider hover:bg-gray-100"
                      >
                        Performance
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </TableHead>
                  </>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedReports.map((report) => (
                <TableRow
                  key={report.id}
                  className="hover:bg-[var(--gp-surface-sunken)] cursor-pointer gp-motion-fast border-b border-[var(--gp-border-subtle)]"
                  onClick={() => onReportClick(report.id)}
                >
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="w-8 h-8 mr-3">
                        <AvatarFallback className="bg-[var(--gp-brand-accent)] text-[var(--gp-surface-base)] text-sm font-medium">
                          {getInitials(report.reporteeName)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-body-l font-medium text-[var(--gp-content-primary)]">
                        {report.reporteeName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-body-l text-[var(--gp-content-secondary)]">
                    {new Date(showSummary ? report.lastReportDate || report.dateStarted : report.dateStarted).toLocaleDateString()}
                  </TableCell>
                  {showSummary ? (
                    <>
                      <TableCell>
                        <p className="text-sm text-gray-900">{report.summary}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getTrendBars(report.performanceTrend)}
                          <span className={`text-sm font-medium capitalize ${
                            report.performanceTrend === 'improving' ? 'text-green-600' :
                            report.performanceTrend === 'declining' ? 'text-red-600' :
                            'text-yellow-600'
                          }`}>
                            {report.performanceTrend}
                          </span>
                        </div>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          <Clock className="w-3 h-3 mr-1" />
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className={`text-sm font-medium ${getPerformanceColor(report.performance)}`}>
                            {report.performance ? `${report.performance}%` : 'N/A'}
                          </span>
                          {report.performance && (
                            <div className="ml-1">
                              {report.performance >= 85 ? (
                                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                                </svg>
                              ) : report.performance >= 70 ? (
                                <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              ) : (
                                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                                </svg>
                              )}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onReportClick(report.id);
                            }}
                            aria-label={`View report for ${report.reporteeName}`}
                          >
                            <Eye className="w-4 h-4 text-blue-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            aria-label={`More options for ${report.reporteeName}`}
                          >
                            <MoreHorizontal className="w-4 h-4 text-gray-400" />
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
