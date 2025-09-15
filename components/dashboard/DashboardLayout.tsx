"use client";

import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import Sidebar from './Sidebar';
import UserMenu from '../auth/UserMenu';
import Loader from '../common/Loader';

interface DashboardLayoutProps {
  children: React.ReactNode;
  agentType?: 'sdr' | 'custom';
  showHeader?: boolean;
  headerActions?: React.ReactNode;
}

export default function DashboardLayout({ 
  children, 
  agentType = 'sdr',
  showHeader = true,
  headerActions
}: DashboardLayoutProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
          console.error('Error fetching user:', error);
        } else {
          setUser(user);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

    return (
    <div className="h-screen bg-gray-50 flex">
      {/* Sidebar */}
      {user && <Sidebar agentType={agentType} user={user} />}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        {showHeader && (
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {headerActions}
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bell className="h-5 w-5" />
                </button>
                
                {/* User Menu */}
                <UserMenu userEmail={user?.email || ''} />
              </div>
            </div>
          </header>
        )}
        
        {/* Page Content */}
        <main className="flex-1 p-6 overflow-hidden relative">
          {isLoading ? (
            <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
              <div className="flex flex-col items-center space-y-4">
                <div className="h-8 w-8 animate-spin text-amber-500">
                  <svg className="w-full h-full" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </div>
                <p className="text-muted-foreground text-base">
                  Loading dashboard...
                </p>
              </div>
            </div>
          ) : !user ? (
            <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
              <div className="flex flex-col items-center space-y-4">
                <div className="h-8 w-8 animate-spin text-amber-500">
                  <svg className="w-full h-full" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </div>
                <p className="text-muted-foreground text-base">
                  Please log in to access the dashboard...
                </p>
              </div>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
}
