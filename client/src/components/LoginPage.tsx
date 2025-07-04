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
    <div className="min-h-screen bg-gradient-to-br from-[var(--gp-surface-base)] to-[var(--gp-surface-sunken)] flex items-center justify-center p-4">
      <Card className="w-full max-w-md gp-elevation-2 gp-modal">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="bg-[var(--gp-brand-accent)] text-[var(--gp-surface-base)] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <UserRound className="w-8 h-8" />
            </div>
            <h1 className="text-h1 text-[var(--gp-content-primary)]">RepWise(AI)</h1>
            <p className="text-body-l text-[var(--gp-content-secondary)] mt-2">Healthcare Performance Management</p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="block text-body-s font-medium text-[var(--gp-content-secondary)] mb-2">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full gp-focus-ring bg-[var(--gp-surface-raised)] border-[var(--gp-border-subtle)] text-[var(--gp-content-primary)]"
                required
                aria-describedby="email-help"
              />
              <p id="email-help" className="sr-only">Enter your work email address</p>
            </div>

            <div>
              <Label htmlFor="password" className="block text-body-s font-medium text-[var(--gp-content-secondary)] mb-2">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full gp-focus-ring bg-[var(--gp-surface-raised)] border-[var(--gp-border-subtle)] text-[var(--gp-content-primary)]"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember-me" className="border-[var(--gp-border-subtle)] data-[state=checked]:bg-[var(--gp-brand-accent)]" />
                <Label htmlFor="remember-me" className="text-body-s text-[var(--gp-content-secondary)]">
                  Remember me
                </Label>
              </div>
              <a href="#" className="text-body-s text-[var(--gp-brand-accent)] hover:text-[var(--gp-brand-accent)] gp-motion-fast">
                Forgot password?
              </a>
            </div>

            <div className="space-y-3">
              <Button
                type="button"
                onClick={() => handleLogin('manager')}
                disabled={isLoading}
                className="w-full gp-btn-primary gp-focus-ring"
                aria-label="Login as Manager"
              >
                {isLoading ? 'Logging in...' : 'Login as Manager'}
              </Button>
              <Button
                type="button"
                onClick={() => handleLogin('rep')}
                disabled={isLoading}
                className="w-full gp-btn-secondary gp-focus-ring"
                aria-label="Login as Healthcare Representative"
              >
                {isLoading ? 'Logging in...' : 'Login as Healthcare Rep'}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-body-s text-[var(--gp-content-tertiary)]">
              Demo Credentials: manager@healthcorp.com / password123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
