"use client"

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import UserMenu from '@/components/auth/UserMenu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Search, Settings, Mail, BarChart2, CalendarClock, Megaphone, Headphones, FileSearch, ArrowRightCircle, Target } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AgentProfileModal from '@/components/AgentProfileModal';

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session?.user) {
        router.push('/login');
        return;
      }
      
      setUser(session.user);
    };

    checkAuth();
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Agent Library</h1>
        </div>
        <UserMenu userEmail={user.email || ''} />
      </div>


      <div className='border-[0.5px] rounded-lg p-4 pb-24 mt-8'>
        <Tabs defaultValue="prebuilt" className="w-full custom-tabs">
          {/* Top controls */}
          <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <TabsList className="flex space-x-4 items-center justify-center w-fit h-fit">
              <TabsTrigger value="prebuilt" className="w-[100px] h-full">
                <div className="p-4 rounded-xl flex items-center justify-center gap-x-1 w-fit mx-auto">
                  <Target className="h-4 w-4" />
                  <div className="flex items-center justify-center">
                    <p className="text-xs">Prebuilt</p>
                  </div>
                </div>
              </TabsTrigger>
              <TabsTrigger value="custom" className="w-[100px] px-6">
                <div className="p-4 rounded-xl flex items-center justify-center gap-x-1 w-[100px] mx-auto">
                  <Settings className="h-4 w-4" />
                  <div className="flex items-center justify-center">
                    <p className="text-xs">Custom</p>
                  </div>
                </div>
              </TabsTrigger>
            </TabsList>
            <div className="w-full md:w-[420px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search agents..." className="pl-9 h-10" />
              </div>
            </div>
          </div>

          <TabsContent value="prebuilt">
            {/* Featured SDR Agent */}
            <Card className="mt-4 border-orange-200/70 shadow-sm w-full flex flex-col gap-y-3 md:flex-row justify-between">
              <div className="p-4 md:p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="h-9 w-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                    <ArrowRightCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold leading-tight">SDR Agent</h3>
                    <p className="text-sm text-muted-foreground">Outbound sales automation for pipeline generation</p>
                  </div>
                </div>

                <div className="flex flex-col gap-y-3 mb-6">
                  <div className="flex items-start gap-2 text-sm">
                    <Mail className="h-4 w-4 mt-0.5 text-orange-500" />
                    <div>
                      <p className="text-muted-foreground">Multichannel outreach: Email, LinkedIn</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <BarChart2 className="h-4 w-4 mt-0.5 text-orange-500" />
                    <div>
                      <p className="text-muted-foreground">Intelligent sequencing and analytics</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <CalendarClock className="h-4 w-4 mt-0.5 text-orange-500" />
                    <div>
                      <p className="text-muted-foreground">Meeting scheduling</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 justify-start p-4 md:p-6">
                <Button 
                className="bg-amber-500 hover:bg-orange-600 text-white h-9 px-6 w-24"
                onClick={()=> router.push('/library/sdr/campaigns')}
                >
                  Launch
                </Button>
                <Button 
                  variant="outline" 
                  className="h-9 px-6 w-32"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </Button>
              </div>
            </Card>

            {/* Coming soon */}
            <div className="mt-8">
              <h4 className="text-sm font-medium text-muted-foreground">Coming Soon</h4>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-md bg-orange-50 text-orange-600 flex items-center justify-center">
                      <Megaphone className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium leading-tight">Marketing Agent</p>
                      <p className="text-xs text-muted-foreground">Coming soon</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-md bg-orange-50 text-orange-600 flex items-center justify-center">
                      <Headphones className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium leading-tight">Customer Support Agent</p>
                      <p className="text-xs text-muted-foreground">Coming soon</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-md bg-orange-50 text-orange-600 flex items-center justify-center">
                      <FileSearch className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium leading-tight">Research Specialist Agent</p>
                      <p className="text-xs text-muted-foreground">Coming soon</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="custom">
            <div className="mt-4">
              <Card className="p-6 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center">
                    <Settings className="h-8 w-8 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Custom Agents</h3>
                    <p className="text-muted-foreground text-sm mt-2">
                      Build tailored AI agents for your specific business needs
                    </p>
                  </div>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                    Create Custom Agent
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Agent Profile Modal */}
      <AgentProfileModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Dashboard;