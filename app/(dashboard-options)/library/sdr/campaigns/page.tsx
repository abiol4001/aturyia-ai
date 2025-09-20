"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Pause, Play, Plus, RefreshCcw, Target, Mail, Clock, Zap, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import CampaignCalendar from '@/components/dashboard/campaign-calendar';
import SearchInput from '@/components/ui/search-input';
import { useCampaigns } from '@/lib/api/hooks/useApi';
import { CampaignFilters } from '@/lib/api/types';
import { useRouter } from 'next/navigation';


const Campaigns = () => {
  const [filters, setFilters] = useState<CampaignFilters>({});
  

  // Fetch campaigns and stats from API
  const { 
    data: campaignsResponse, 
    isLoading: campaignsLoading, 
    error: campaignsError,
    refetch: refetchCampaigns 
  } = useCampaigns(filters);

  // TODO: Enable when stats endpoint is available
  // const { 
  //   data: statsResponse, 
  //   isLoading: statsLoading
  // } = useCampaignStats();

  const campaigns = campaignsResponse?.data || [];
  const isEmpty = campaigns.length === 0 && !campaignsLoading;
  const router = useRouter();

  // Debug logging
  console.log('🔍 Campaigns API Response:', campaignsResponse);
  console.log('📊 Campaigns Data:', campaigns);

  // Transform API campaign data into calendar events format
  interface CampaignEvent {
    date: number;
    campaigns: Array<{
      id: number;
      name: string;
      schedule: string;
      status: string;
    }>;
  }

  const campaignEvents: CampaignEvent[] = campaigns.reduce((acc: CampaignEvent[], campaign) => {
    // Use created_at date for calendar positioning
    const startDate = new Date(campaign.created_at);
    const date = startDate.getDate();
    
    
    // Find existing entry for this date or create new one
    let dateEntry = acc.find(entry => entry.date === date);
    if (!dateEntry) {
      dateEntry = { 
        date, 
        campaigns: [] 
      };
      acc.push(dateEntry);
    }
    
    // Add campaign to the date entry (convert string id to number for calendar compatibility)
    dateEntry.campaigns.push({
      id: parseInt(campaign.id.substring(0, 8), 16) || Math.floor(Math.random() * 10000), // Convert hex string to number
      name: campaign.name,
      schedule: `${campaign.schedules?.START || '09:00'} - ${campaign.schedules?.END || '17:00'}`,
      status: 'READY'
    });
    
    return acc;
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'READY':
        return 'bg-green-100 text-green-800';
      case 'RUNNING':
        return 'bg-blue-100 text-blue-800';
      case 'PAUSED':
        return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDateClick = (date: number, month: number, year: number) => {
    console.log(`Clicked on ${date}/${month + 1}/${year}`);
    // Add your date click logic here
  };

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, search: query }));
  };

  const handleCreateCampaign = () => {
    console.log('Creating new campaign...');
    // Add campaign creation logic here
  };

  // Empty State Component
  const EmptyState = () => (
    <div className="flex items-center justify-center min-h-[600px]">
      <div className="text-center max-w-md mx-auto">
        {/* Logo/Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Target className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Title and Subtitle */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Welcome to Campaign Management!
          </h1>
          <p className="text-lg text-gray-600">
            You&apos;re just one step away from launching your first outreach campaign.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-gray-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Target your ideal customers</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-gray-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Automate your outreach</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="w-6 h-6 text-gray-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Track your results</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mb-6">
          <Button 
            onClick={() => router.push('/library/sdr/campaigns/create')}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Your First Campaign
          </Button>
        </div>

        {/* Help Text */}
        <p className="text-sm text-gray-500 italic">
          Don&apos;t worry, we&apos;ll guide you through the setup process!
        </p>
      </div>
    </div>
  );

  // Show loading state while fetching initial data
  if (campaignsLoading && campaigns.length === 0) {
    return (
      <DashboardLayout agentType="sdr">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <RefreshCcw className="w-8 h-8 animate-spin mx-auto mb-4 text-orange-500" />
            <p className="text-gray-600">Loading campaigns...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Show error state if there's an error and no cached data
  if (campaignsError && campaigns.length === 0) {
    return (
      <DashboardLayout agentType="sdr">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to Load Campaigns</h3>
            <p className="text-gray-600 mb-4">There was an error loading your campaigns.</p>
            <Button 
              onClick={() => refetchCampaigns()}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout agentType="sdr">
      {isEmpty ? (
        <EmptyState />
      ) : (
      <div className="h-full overflow-y-auto pb-8">
        <div className='flex items-center justify-between mb-6'>
          <div className=''>
            <div className='flex items-center gap-1'>
              <Target className="text-3xl font-bold text-red-400 mb-2" />
              <h1 className="text-xl font-bold text-gray-900 mb-2">Campaign Management</h1>
            </div>
            <p className='text-sm'>Manage and monitor your outreach campaigns</p>
          </div>
          <div>
              <Button 
                variant="outline" 
                className='mr-2'
                onClick={() => refetchCampaigns()}
                disabled={campaignsLoading}
              >
                <RefreshCcw className={`mr-2 h-4 w-4 ${campaignsLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
                <Button className='bg-red-400 hover:bg-red-500 text-white' onClick={() => router.push('/library/sdr/campaigns/create')}>
              <Plus className='h-4 w-4' />
              Create Campagin
            </Button>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='flex gap-x-2 rounded-lg border shadow-sm p-2'>
            <div className='bg-red-400 rounded-lg p-1 flex items-center justify-center'>
              <Target className="text-6xl font-bold text-white" />
            </div>
            <div>
                <p className="text-sm font-semibold">
                  {campaigns.length}
                </p>
                <p className="text-xs">Total Campaigns</p>
            </div>
          </div>
          <div className='flex gap-x-2 rounded-lg border shadow-sm p-2'>
            <div className='bg-red-400 rounded-lg p-1 flex items-center justify-center'>
              <Play className="text-6xl font-bold text-white" />
            </div>
            <div>
                <p className="text-sm font-semibold">
                  {campaigns.length}
                </p>
                <p className="text-xs">Active Campaigns</p>
            </div>
          </div>
          <div className='flex gap-x-2 rounded-lg border shadow-sm p-2'>
            <div className='bg-red-400 rounded-lg p-1 flex items-center justify-center'>
              <Pause className="text-6xl font-bold text-white" />
            </div>
            <div>
                <p className="text-sm font-semibold">
                  0
                </p>
                <p className="text-xs">Paused Campaigns</p>
            </div>
          </div>
        </div>

        {/* Campaign Table */}
        <div className="bg-white rounded-lg border border-gray-200 mb-8">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Campaigns</h2>
              <div className="flex items-center space-x-4">
                <SearchInput
                  placeholder="Search by name or email..."
                  onSearch={handleSearch}
                  className="w-64"
                />
              </div>
            </div>
          </div>

          <Table>
            <TableHeader className='px-2'>
              <TableRow>
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Services</TableHead>
                <TableHead className="font-semibold">Schedule</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                {/* <TableHead className="w-12"></TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
                {campaignsLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8">
                      <div className="flex items-center justify-center">
                        <RefreshCcw className="w-4 h-4 animate-spin mr-2" />
                        Loading campaigns...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : campaignsError ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-red-600">
                      Error loading campaigns. Please try again.
                    </TableCell>
                  </TableRow>
                ) : (
                  campaigns.map((campaign) => (
                <TableRow key={campaign.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{campaign.name}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(campaign.created_at).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {campaign.integrations?.apps && campaign.integrations.apps.length > 0 ? (
                        campaign.integrations.apps.map((app, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <Mail className="h-3 w-3 mr-2 text-orange-500" />
                            {app}
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail className="h-3 w-3 mr-2 text-gray-400" />
                          No integrations
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-3 w-3 mr-2 text-orange-500" />
                      {campaign.schedules?.START} - {campaign.schedules?.END}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor('READY')}>
                      READY
                    </Badge>
                  </TableCell>
                </TableRow>
                  ))
                )}
            </TableBody>
          </Table>
        </div>

        {/* Campaign Calendar */}
          {campaignEvents.length > 0 && (
        <CampaignCalendar 
          events={campaignEvents}
          onDateClick={handleDateClick}
        />
          )}
      </div>
      )}
    </DashboardLayout>
  );
};

export default Campaigns;