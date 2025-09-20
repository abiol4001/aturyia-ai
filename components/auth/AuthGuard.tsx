"use client";

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loader from '@/components/common/Loader';
import { setUserId, setOrgId, clearUserData } from '@/lib/api/utils/storage';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function AuthGuard({ children, fallback }: AuthGuardProps) {
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
          router.push('/login');
          return;
        }

        if (!session?.user) {
          router.push('/login');
          return;
        }

        // User is authenticated - store user ID and org ID
        setUserId(session.user.id);
        setOrgId('org_000'); // Default org ID for development
        
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Unexpected auth error:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          // Clear user data when signing out
          clearUserData();
          router.push('/login');
        } else if (event === 'SIGNED_IN' && session) {
          // Store user ID and org ID when user signs in
          setUserId(session.user.id);
          setOrgId('org_000'); // Default org ID for development
          setIsAuthenticated(true);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router, supabase.auth]);

  if (isLoading) {
    return fallback || <Loader message="Loading..." />;
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return <>{children}</>;
}
