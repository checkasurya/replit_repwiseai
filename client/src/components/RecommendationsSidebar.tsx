import { useState } from 'react';
import { Lightbulb, Users, TrendingUp, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import type { Recommendation } from '@/lib/aiAnalyzer';

interface RecommendationsSidebarProps {
  recommendations: Recommendation[];
  onAccept: (id: string) => void;
  onIgnore: (id: string) => void;
  onRefresh: () => void;
}

export default function RecommendationsSidebar({ 
  recommendations, 
  onAccept, 
  onIgnore, 
  onRefresh 
}: RecommendationsSidebarProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const pendingRecommendations = recommendations.filter(rec => rec.status === 'pending');

  const getIcon = (type: string) => {
    switch (type) {
      case 'training':
        return <Lightbulb className="w-5 h-5" />;
      case 'mentoring':
        return <Users className="w-5 h-5" />;
      case 'review':
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <Lightbulb className="w-5 h-5" />;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'training':
        return 'text-yellow-600 bg-yellow-100';
      case 'mentoring':
        return 'text-blue-600 bg-blue-100';
      case 'review':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const handleAccept = (id: string, title: string) => {
    onAccept(id);
    toast({
      title: 'Recommendation Accepted',
      description: `"${title}" has been added to the action plan.`,
    });
  };

  const handleIgnore = (id: string, title: string) => {
    onIgnore(id);
    toast({
      title: 'Recommendation Ignored',
      description: `"${title}" has been dismissed.`,
      variant: 'destructive',
    });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onRefresh();
      toast({
        title: 'Recommendations Updated',
        description: 'AI recommendations have been refreshed based on latest data.',
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <Card className="material-shadow sticky top-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">
            AI Recommendations
          </CardTitle>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {pendingRecommendations.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingRecommendations.length === 0 ? (
            <div className="text-center py-6">
              <Lightbulb className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">No new recommendations</p>
              <p className="text-xs text-gray-400 mt-1">
                All suggestions have been reviewed
              </p>
            </div>
          ) : (
            pendingRecommendations.map((recommendation) => (
              <div
                key={recommendation.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition duration-200"
              >
                <div className="flex items-start">
                  <div className={`rounded-lg p-2 mr-3 ${getIconColor(recommendation.type)}`}>
                    {getIcon(recommendation.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900">
                      {recommendation.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {recommendation.reason}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <Badge 
                        variant={recommendation.priority === 'high' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {recommendation.priority} priority
                      </Badge>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleAccept(recommendation.id, recommendation.title)}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1"
                        >
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleIgnore(recommendation.id, recommendation.title)}
                          className="text-gray-700 text-xs px-3 py-1"
                        >
                          Ignore
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <Button
            variant="ghost"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="w-full text-blue-600 hover:text-blue-500"
          >
            <RefreshCw className={`w-4 h-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh Recommendations'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
