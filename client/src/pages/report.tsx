import ReportDetail from '@/components/ReportDetail';

interface ReportPageProps {
  reportId: string;
  onBack: () => void;
}

export default function ReportPage({ reportId, onBack }: ReportPageProps) {
  return <ReportDetail reportId={reportId} onBack={onBack} />;
}
