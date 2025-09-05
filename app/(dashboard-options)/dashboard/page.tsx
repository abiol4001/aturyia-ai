import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

// Server-side auth check
async function checkAuth() {
  const supabase = await createClient();
  
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error || !session?.user) {
    redirect('/login');
  }
  
  return session.user;
}

const Dashboard = async () => {
  // This will redirect if not authenticated
  const user = await checkAuth();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground mt-2">
        Welcome back, {user.email}!
      </p>
      
    </div>
  );
};

export default Dashboard;