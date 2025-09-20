"use client";

import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import Sidebar from './Sidebar';
import UserMenu from '../auth/UserMenu';

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
  const supabase = createClient();

  useEffect(() => {
    // Get user info for display purposes only
    // Auth is already handled by AuthGuard
    const getUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (!error && user) {
          setUser(user);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
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
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

    return (
    <div className="h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar agentType={agentType} user={user} />
      
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
          {children}
        </main>
      </div>
    </div>
  );
}
