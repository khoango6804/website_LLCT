'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'instructor' | 'student';
  fallbackPath?: string;
}

export default function ProtectedRoute({ 
  children, 
  requiredRole, 
  fallbackPath = '/login' 
}: ProtectedRouteProps) {
  const { isAuthenticated, hasRole, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(fallbackPath);
        return;
      }

      if (requiredRole && !hasRole(requiredRole)) {
        // Redirect based on user's actual role
        const userRole = hasRole('admin') ? 'admin' : 
                        hasRole('instructor') ? 'instructor' : 'student';
        
        switch (userRole) {
          case 'admin':
            router.push('/admin');
            break;
          case 'instructor':
            router.push('/instructor');
            break;
          default:
            router.push('/');
            break;
        }
        return;
      }
    }
  }, [isAuthenticated, hasRole, requiredRole, isLoading, router, fallbackPath]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't render children if not authenticated or doesn't have required role
  if (!isAuthenticated || (requiredRole && !hasRole(requiredRole))) {
    return null;
  }

  return <>{children}</>;
}
