import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Target, Plus, Calendar, TrendingUp, Award, Clock } from "lucide-react";

interface Goal {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  category: 'sales' | 'calls' | 'appointments' | 'conversion';
  assignedTo: string;
  dueDate: string;
  status: 'active' | 'completed' | 'overdue';
  priority: 'high' | 'medium' | 'low';
}

interface GoalTrackerProps {
  onBack: () => void;
}

export default function GoalTracker({ onBack }: GoalTrackerProps) {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Q1 Sales Target',
      description: 'Achieve quarterly sales target for pharmaceutical products',
      targetValue: 75000,
      currentValue: 65800,
      unit: 'USD',
      category: 'sales',
      assignedTo: 'Lisa Davis',
      dueDate: '2025-03-31',
      status: 'active',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Client Calls Improvement',
      description: 'Increase weekly client interaction frequency',
      targetValue: 40,
      currentValue: 35,
      unit: 'calls',
      category: 'calls',
      assignedTo: 'Michael Johnson',
      dueDate: '2025-02-15',
      status: 'active',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Conversion Rate Boost',
      description: 'Improve appointment-to-sale conversion rate',
      targetValue: 25,
      currentValue: 22,
      unit: '%',
      category: 'conversion',
      assignedTo: 'Robert Wilson',
      dueDate: '2025-02-28',
      status: 'active',
      priority: 'high'
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetValue: '',
    unit: '',
    category: 'sales' as Goal['category'],
    assignedTo: '',
    dueDate: '',
    priority: 'medium' as Goal['priority']
  });

  const handleCreateGoal = () => {
    if (!newGoal.title || !newGoal.targetValue || !newGoal.assignedTo || !newGoal.dueDate) return;

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      targetValue: parseFloat(newGoal.targetValue),
      currentValue: 0,
      unit: newGoal.unit,
      category: newGoal.category,
      assignedTo: newGoal.assignedTo,
      dueDate: newGoal.dueDate,
      status: 'active',
      priority: newGoal.priority
    };

    setGoals([...goals, goal]);
    setNewGoal({
      title: '',
      description: '',
      targetValue: '',
      unit: '',
      category: 'sales',
      assignedTo: '',
      dueDate: '',
      priority: 'medium'
    });
    setIsCreateDialogOpen(false);
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getStatusBadge = (status: Goal['status']) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'overdue':
        return <Badge className="bg-red-500">Overdue</Badge>;
      default:
        return <Badge className="bg-blue-500">Active</Badge>;
    }
  };

  const getPriorityBadge = (priority: Goal['priority']) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-[#FF4F59]">High</Badge>;
      case 'low':
        return <Badge className="bg-gray-500">Low</Badge>;
      default:
        return <Badge className="bg-yellow-500">Medium</Badge>;
    }
  };

  const getCategoryIcon = (category: Goal['category']) => {
    switch (category) {
      case 'sales':
        return <TrendingUp className="w-4 h-4" />;
      case 'calls':
        return <Target className="w-4 h-4" />;
      case 'appointments':
        return <Calendar className="w-4 h-4" />;
      case 'conversion':
        return <Award className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  const formatValue = (value: number, unit: string) => {
    if (unit === 'USD') {
      return `$${value.toLocaleString()}`;
    }
    return `${value}${unit === 'calls' ? '' : unit}`;
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
            <h1 className="text-3xl font-bold text-white">Goal Tracker</h1>
            <p className="text-gray-400">Set targets and monitor progress</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#FF4F59] hover:bg-[#FF4F59]/80">
                <Plus className="w-4 h-4 mr-2" />
                New Goal
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-700 text-white">
              <DialogHeader>
                <DialogTitle>Create New Goal</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Set a new performance target for your team member
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Goal Title</Label>
                  <Input
                    id="title"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                    className="bg-gray-700 border-gray-600"
                    placeholder="Enter goal title"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                    className="bg-gray-700 border-gray-600"
                    placeholder="Describe the goal details"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={newGoal.category} onValueChange={(value: Goal['category']) => setNewGoal({ ...newGoal, category: value })}>
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="calls">Calls</SelectItem>
                        <SelectItem value="appointments">Appointments</SelectItem>
                        <SelectItem value="conversion">Conversion</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={newGoal.priority} onValueChange={(value: Goal['priority']) => setNewGoal({ ...newGoal, priority: value })}>
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="targetValue">Target Value</Label>
                    <Input
                      id="targetValue"
                      type="number"
                      value={newGoal.targetValue}
                      onChange={(e) => setNewGoal({ ...newGoal, targetValue: e.target.value })}
                      className="bg-gray-700 border-gray-600"
                      placeholder="Enter target"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Unit</Label>
                    <Select value={newGoal.unit} onValueChange={(value) => setNewGoal({ ...newGoal, unit: value })}>
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="calls">Calls</SelectItem>
                        <SelectItem value="%">Percentage</SelectItem>
                        <SelectItem value="units">Units</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="assignedTo">Assigned To</Label>
                    <Select value={newGoal.assignedTo} onValueChange={(value) => setNewGoal({ ...newGoal, assignedTo: value })}>
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue placeholder="Select representative" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Michael Johnson">Michael Johnson</SelectItem>
                        <SelectItem value="Lisa Davis">Lisa Davis</SelectItem>
                        <SelectItem value="Robert Wilson">Robert Wilson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={newGoal.dueDate}
                      onChange={(e) => setNewGoal({ ...newGoal, dueDate: e.target.value })}
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsCreateDialogOpen(false)}
                    className="border-gray-600"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCreateGoal}
                    className="bg-[#FF4F59] hover:bg-[#FF4F59]/80"
                  >
                    Create Goal
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Goals Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-[#FF4F59]" />
                Active Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{goals.filter(g => g.status === 'active').length}</div>
              <div className="text-sm text-gray-400">Currently in progress</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-[#FF4F59]" />
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{goals.filter(g => g.status === 'completed').length}</div>
              <div className="text-sm text-gray-400">Successfully achieved</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#FF4F59]" />
                Avg Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {Math.round(goals.reduce((acc, goal) => acc + getProgressPercentage(goal.currentValue, goal.targetValue), 0) / goals.length)}%
              </div>
              <div className="text-sm text-gray-400">Across all goals</div>
            </CardContent>
          </Card>
        </div>

        {/* Goals List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {goals.map((goal) => {
            const progress = getProgressPercentage(goal.currentValue, goal.targetValue);
            const daysLeft = getDaysUntilDue(goal.dueDate);

            return (
              <Card key={goal.id} className="bg-gray-800/50 border-gray-700">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(goal.category)}
                      <CardTitle className="text-white">{goal.title}</CardTitle>
                    </div>
                    <div className="flex gap-2">
                      {getPriorityBadge(goal.priority)}
                      {getStatusBadge(goal.status)}
                    </div>
                  </div>
                  <CardDescription className="text-gray-400">
                    {goal.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white font-medium">{progress.toFixed(1)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-400">
                        {formatValue(goal.currentValue, goal.unit)}
                      </span>
                      <span className="text-gray-400">
                        Target: {formatValue(goal.targetValue, goal.unit)}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-400">Assigned to</div>
                      <div className="text-white font-medium">{goal.assignedTo}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Due in</div>
                      <div className={`font-medium ${daysLeft < 7 ? 'text-red-400' : daysLeft < 14 ? 'text-yellow-400' : 'text-white'}`}>
                        {daysLeft > 0 ? `${daysLeft} days` : `${Math.abs(daysLeft)} days overdue`}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}