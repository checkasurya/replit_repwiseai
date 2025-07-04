import { useState, useEffect } from 'react';
import { authService } from '@/lib/auth';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'manager' | 'rep';
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      setUser(response.user);
      // Force a page reload to ensure clean state after login
      window.location.reload();
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    // Force a page reload to ensure clean state after logout
    window.location.reload();
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
  };
};
