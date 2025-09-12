"use client";

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Pause, Play, Plus, RefreshCcw, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';


const Campaigns = () => {

  return (
    <DashboardLayout agentType="sdr">

      <div>
        <div className='flex items-center justify-between mb-6'>
          <div className=''>
            <div className='flex items-center gap-1'>
              <Target className="text-3xl font-bold text-red-400 mb-2" />
              <h1 className="text-xl font-bold text-gray-900 mb-2">Campaign Management</h1>
            </div>
            <p className='text-sm'>Manage and monitor your outreach campaigns</p>
          </div>
          <div>
            <Button variant="outline" className='mr-2'>
              <RefreshCcw className='mr-2 h-4 w-4' />
              Refresh
            </Button>
            <Button className='bg-red-400 hover:bg-red-500 text-white'>
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
              <p className=" text-sm font-semibold">2</p>
              <p className=" text-xs">Total Campaigns</p>
            </div>
          </div>
          <div className='flex gap-x-2 rounded-lg border shadow-sm p-2'>
            <div className='bg-red-400 rounded-lg p-1 flex items-center justify-center'>
              <Play className="text-6xl font-bold text-white" />
            </div>
            <div>
              <p className=" text-sm font-semibold">2</p>
              <p className=" text-xs">Active Campaigns</p>
            </div>
          </div>
          <div className='flex gap-x-2 rounded-lg border shadow-sm p-2'>
            <div className='bg-red-400 rounded-lg p-1 flex items-center justify-center'>
              <Pause className="text-6xl font-bold text-white" />
            </div>
            <div>
              <p className=" text-sm font-semibold">2</p>
              <p className=" text-xs">Paused Campaigns</p>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-8">
        {/* Campaign Header */}
        {/* <CampaignHeader
            campaignName="11x.AI Alice Sales Campaign"
            campaignId="7914b1njdafi57rggar3ai4k5v9y7vbo"
            status="running"
            onPause={handlePause}
            onEdit={handleEdit}
            onMenu={handleMenu}
          /> */}

        {/* Metrics Cards */}
        {/* <MetricsCards
            metrics={{
              leadsGenerated: 10,
              pendingApprovals: 0,
              emailsSent: 2,
              leadReplies: 2
            }}
          /> */}

        {/* Additional Content Area */}
        {/* <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Campaign Details</h2>
            <p className="text-gray-600">
              This is where additional campaign information and controls would be displayed.
              The dashboard is fully reusable and can be adapted for different agent types.
            </p>
          </div> */}
      </div>
    </DashboardLayout>
  );
};

export default Campaigns;