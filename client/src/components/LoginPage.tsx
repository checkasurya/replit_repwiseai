import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { UserRound, ArrowLeft, Target, Lock } from 'lucide-react';

interface LoginPageProps {
  onBack?: () => void;
}

export default function LoginPage({ onBack }: LoginPageProps) {
  const [email, setEmail] = useState('admin@healthcorp.com');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (role: 'manager' | 'rep') => {
    setIsLoading(true);
    try {
      const credentials = role === 'manager' 
        ? { email: 'manager@healthcorp.com', password: 'password123' }
        : { email: 'mjohnson@healthcorp.com', password: 'password123' };
      
      await login(credentials.email, credentials.password);
      toast({
        title: 'Login Successful',
        description: `Welcome back! Logged in as ${role === 'manager' ? 'Manager' : 'Healthcare Representative'}`,
      });
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: 'Invalid credentials. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
      });
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: 'Invalid credentials. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Header */}
      <header className="fixed top-0 w-full bg-slate-900/90 backdrop-blur-sm border-b border-slate-700 z-50">
        <div className="container mx-auto px-6 py-4 pt-[10px] pb-[10px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">RepWise</span>
            </div>
            
            <nav className="flex items-center space-x-4">
              {onBack && (
                <Button 
                  variant="ghost" 
                  onClick={onBack}
                  className="text-slate-300 hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              )}
              <Button 
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                Login
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <Card className="w-full max-w-sm bg-slate-800/50 border-slate-700 backdrop-blur-sm mt-[64px] mb-[64px]">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-slate-300 text-sm">Sign in to access your RepWise dashboard</p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Username
              </Label>
              <div className="relative">
                <UserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-orange-500"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-orange-500"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-2"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-4 p-3 bg-slate-700/30 rounded-lg border border-slate-600">
            <div className="text-center">
              <p className="text-sm text-slate-300 mb-2 font-medium">Demo credentials:</p>
              <div className="text-xs text-slate-400 space-y-1">
                <div className="font-mono">admin / admin123</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full bg-slate-900/90 backdrop-blur-sm border-t border-slate-700 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="text-slate-400 text-sm mb-2 md:mb-0">
              Copyright © RepWise 2025. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <div className="text-slate-400 text-sm hover:text-white cursor-pointer transition-colors">Privacy Policy</div>
              <div className="text-slate-400 text-sm hover:text-white cursor-pointer transition-colors">Terms of Service</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
