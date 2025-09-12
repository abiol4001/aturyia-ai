"use client";

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface RedirectIfAuthenticatedProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function RedirectIfAuthenticated({ 
  children, 
  fallback 
}: RedirectIfAuthenticatedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get current session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth check error:', error);
          // If there's an error, allow access to auth pages
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        if (session?.user) {
          // User is authenticated, redirect to dashboard
          router.push('/library');
          return;
        }

        // User is not authenticated, allow access to auth pages
        setIsAuthenticated(false);
      } catch (error) {
        console.error('Unexpected auth error:', error);
        // On error, allow access to auth pages
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // User just signed in, redirect to dashboard
          router.push('/library');
        } else if (event === 'SIGNED_OUT') {
          // User signed out, allow access to auth pages
          setIsAuthenticated(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router, supabase.auth]);

  if (isLoading) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="text-muted-foreground">Checking authentication...</p>
          </div>
        </div>
      )
    );
  }

  // If authenticated, don't render children (will redirect)
  if (isAuthenticated) {
    return null;
  }

  // If not authenticated, render auth pages
  return <>{children}</>;
}
