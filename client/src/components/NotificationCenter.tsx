import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Check, X, AlertTriangle, TrendingUp, Calendar, User, Target } from "lucide-react";

interface Notification {
  id: string;
  type: 'performance' | 'goal' | 'training' | 'system' | 'deadline';
  title: string;
  message: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  read: boolean;
  actionRequired?: boolean;
  relatedUser?: string;
}

interface NotificationCenterProps {
  onBack: () => void;
}

export default function NotificationCenter({ onBack }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'performance',
      title: 'Performance Alert',
      message: 'Michael Johnson\'s sales are 15% below target this month. Consider scheduling a coaching session.',
      timestamp: '2025-01-04T10:30:00Z',
      priority: 'high',
      read: false,
      actionRequired: true,
      relatedUser: 'Michael Johnson'
    },
    {
      id: '2',
      type: 'goal',
      title: 'Goal Achievement',
      message: 'Lisa Davis has exceeded her Q1 sales target by 8%. Great work!',
      timestamp: '2025-01-04T09:15:00Z',
      priority: 'medium',
      read: false,
      actionRequired: false,
      relatedUser: 'Lisa Davis'
    },
    {
      id: '3',
      type: 'training',
      title: 'Training Recommendation',
      message: 'AI suggests advanced objection handling training for Robert Wilson based on recent call analysis.',
      timestamp: '2025-01-04T08:45:00Z',
      priority: 'medium',
      read: true,
      actionRequired: true,
      relatedUser: 'Robert Wilson'
    },
    {
      id: '4',
      type: 'deadline',
      title: 'Report Due Soon',
      message: 'Q1 performance review reports are due in 3 days. 2 of 3 reports are pending completion.',
      timestamp: '2025-01-03T16:20:00Z',
      priority: 'high',
      read: false,
      actionRequired: true
    },
    {
      id: '5',
      type: 'system',
      title: 'System Update',
      message: 'RepWise(AI) has been updated with new analytics features. Check out the enhanced reporting dashboard.',
      timestamp: '2025-01-03T14:00:00Z',
      priority: 'low',
      read: true,
      actionRequired: false
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'performance':
        return <TrendingUp className="w-4 h-4" />;
      case 'goal':
        return <Target className="w-4 h-4" />;
      case 'training':
        return <User className="w-4 h-4" />;
      case 'deadline':
        return <Calendar className="w-4 h-4" />;
      case 'system':
        return <Bell className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'low':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      default:
        return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) {
      return 'Just now';
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const highPriorityCount = notifications.filter(n => n.priority === 'high' && !n.read).length;
  const actionRequiredCount = notifications.filter(n => n.actionRequired && !n.read).length;

  const filterByType = (type: string) => {
    if (type === 'all') return notifications;
    if (type === 'unread') return notifications.filter(n => !n.read);
    if (type === 'action') return notifications.filter(n => n.actionRequired);
    return notifications.filter(n => n.type === type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={onBack}
              className="text-gray-400 hover:text-white mb-4 flex items-center gap-2"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Bell className="w-8 h-8 text-[#FF4F59]" />
              Notification Center
            </h1>
            <p className="text-gray-400">Stay updated on team performance and system alerts</p>
          </div>
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              onClick={markAllAsRead}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Mark All Read
            </Button>
          )}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-[#FF4F59]" />
                <div>
                  <div className="text-2xl font-bold text-white">{notifications.length}</div>
                  <div className="text-sm text-gray-400">Total</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">{unreadCount}</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{unreadCount}</div>
                  <div className="text-sm text-gray-400">Unread</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{highPriorityCount}</div>
                  <div className="text-sm text-gray-400">High Priority</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{actionRequiredCount}</div>
                  <div className="text-sm text-gray-400">Action Required</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notification Filters */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-gray-800/50">
            <TabsTrigger value="all" className="data-[state=active]:bg-[#FF4F59]">
              All ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread" className="data-[state=active]:bg-[#FF4F59]">
              Unread ({unreadCount})
            </TabsTrigger>
            <TabsTrigger value="action" className="data-[state=active]:bg-[#FF4F59]">
              Action Required ({actionRequiredCount})
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-[#FF4F59]">
              Performance
            </TabsTrigger>
            <TabsTrigger value="system" className="data-[state=active]:bg-[#FF4F59]">
              System
            </TabsTrigger>
          </TabsList>

          {['all', 'unread', 'action', 'performance', 'system'].map((filter) => (
            <TabsContent key={filter} value={filter} className="space-y-4">
              {filterByType(filter).length === 0 ? (
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-8 text-center">
                    <Bell className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">No notifications in this category</p>
                  </CardContent>
                </Card>
              ) : (
                filterByType(filter).map((notification) => (
                  <Card 
                    key={notification.id} 
                    className={`bg-gray-800/50 border-gray-700 ${
                      !notification.read ? 'border-l-4 border-l-[#FF4F59]' : ''
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${getPriorityColor(notification.priority)}`}>
                            {getTypeIcon(notification.type)}
                          </div>
                          <div>
                            <CardTitle className="text-white text-lg">
                              {notification.title}
                              {!notification.read && (
                                <span className="ml-2 w-2 h-2 bg-[#FF4F59] rounded-full inline-block"></span>
                              )}
                            </CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={`${getPriorityColor(notification.priority)} text-xs`}>
                                {notification.priority.toUpperCase()}
                              </Badge>
                              {notification.actionRequired && (
                                <Badge className="bg-orange-500 text-xs">Action Required</Badge>
                              )}
                              {notification.relatedUser && (
                                <Badge variant="outline" className="text-xs border-gray-600">
                                  {notification.relatedUser}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-400">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          <div className="flex gap-1">
                            {!notification.read && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => markAsRead(notification.id)}
                                className="w-8 h-8 p-0 hover:bg-gray-700"
                              >
                                <Check className="w-4 h-4 text-green-400" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => dismissNotification(notification.id)}
                              className="w-8 h-8 p-0 hover:bg-gray-700"
                            >
                              <X className="w-4 h-4 text-red-400" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">{notification.message}</p>
                      {notification.actionRequired && (
                        <div className="mt-4 flex gap-2">
                          <Button 
                            size="sm" 
                            className="bg-[#FF4F59] hover:bg-[#FF4F59]/80"
                          >
                            Take Action
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-gray-600"
                          >
                            View Details
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}