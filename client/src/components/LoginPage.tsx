import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { UserRound } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('manager@healthcorp.com');
  const [password, setPassword] = useState('password123');
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
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center p-4">
      <Card className="w-full max-w-md material-shadow-lg">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <UserRound className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">RepWise(AI)</h1>
            <p className="text-gray-600 mt-2">Healthcare Performance Management</p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full"
                required
                aria-describedby="email-help"
              />
              <p id="email-help" className="sr-only">Enter your work email address</p>
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember-me" />
                <Label htmlFor="remember-me" className="text-sm text-gray-700">
                  Remember me
                </Label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>

            <div className="space-y-3">
              <Button
                type="button"
                onClick={() => handleLogin('manager')}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                aria-label="Login as Manager"
              >
                {isLoading ? 'Logging in...' : 'Login as Manager'}
              </Button>
              <Button
                type="button"
                onClick={() => handleLogin('rep')}
                disabled={isLoading}
                variant="secondary"
                className="w-full bg-gray-600 hover:bg-gray-700 text-white"
                aria-label="Login as Healthcare Representative"
              >
                {isLoading ? 'Logging in...' : 'Login as Healthcare Rep'}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Demo Credentials: manager@healthcorp.com / password123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
