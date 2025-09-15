"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Pause, Play, Plus, RefreshCcw, Target, MoreVertical, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import CampaignCalendar from '@/components/dashboard/campaign-calendar';
import SearchInput from '@/components/ui/search-input';


const Campaigns = () => {

  // Campaign data
  const campaigns = [
    {
      id: 1,
      name: "East Midlands Chamber memberships",
      date: "Sep 12, 2025",
      services: ["Email via Gmail", "Calendar via Gmail"],
      schedule: "09:00 - 17:00",
      status: "READY"
    },
    {
      id: 2,
      name: "Tesco clothing line",
      date: "Sep 12, 2025",
      services: ["Email via Gmail", "Calendar via Gmail"],
      schedule: "09:00 - 17:00",
      status: "READY"
    },
    {
      id: 3,
      name: "11x.AI Alice Sales Campaign",
      date: "Sep 11, 2025",
      services: ["Email via Gmail", "Calendar via Gmail"],
      schedule: "09:00 - 17:00",
      status: "READY"
    },
    {
      id: 4,
      name: "M&S Clothing Campaign",
      date: "Sep 11, 2025",
      services: ["Email via Gmail", "Calendar via Gmail"],
      schedule: "09:00 - 17:00",
      status: "READY"
    }
  ];

  // Calendar data with detailed campaign events
  const campaignEvents = [
    { 
      date: 11, 
      campaigns: [
        { id: 3, name: "11x.AI Alice Sales Campaign", schedule: "09:00 - 17:00", status: "READY" },
        { id: 4, name: "M&S Clothing Campaign", schedule: "09:00 - 17:00", status: "READY" }
      ]
    },
    { 
      date: 12, 
      campaigns: [
        { id: 1, name: "East Midlands Chamber memberships", schedule: "09:00 - 17:00", status: "READY" },
        { id: 2, name: "Tesco clothing line", schedule: "09:00 - 17:00", status: "READY" }
      ]
    },
    { 
      date: 15, 
      campaigns: [
        { id: 1, name: "East Midlands Chamber memberships", schedule: "09:00 - 17:00", status: "READY" },
        { id: 2, name: "Tesco clothing line", schedule: "09:00 - 17:00", status: "READY" },
        { id: 3, name: "Alice Sales Campaign", schedule: "09:00 - 17:00", status: "READY" },
        { id: 4, name: "M&S Clothing Campaign", schedule: "09:00 - 17:00", status: "READY" }
      ]
    },
    { 
      date: 18, 
      campaigns: [
        { id: 5, name: "TechCorp Outreach", schedule: "10:00 - 16:00", status: "RUNNING" },
        { id: 6, name: "Startup Accelerator", schedule: "09:30 - 17:30", status: "READY" }
      ]
    },
    { 
      date: 20, 
      campaigns: [
        { id: 7, name: "Enterprise Solutions", schedule: "08:00 - 18:00", status: "READY" },
        { id: 8, name: "SMB Growth Campaign", schedule: "09:00 - 17:00", status: "PAUSED" }
      ]
    },
    { 
      date: 24, 
      campaigns: [
        { id: 9, name: "Q4 Revenue Push", schedule: "09:00 - 17:00", status: "READY" },
        { id: 10, name: "Client Retention", schedule: "10:00 - 16:00", status: "READY" }
      ]
    },
    { 
      date: 27, 
      campaigns: [
        { id: 11, name: "New Market Expansion", schedule: "09:00 - 17:00", status: "READY" },
        { id: 12, name: "Partnership Outreach", schedule: "09:30 - 17:30", status: "READY" }
      ]
    }
  ];

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
    console.log('Searching for:', query);
    // Add your search logic here
    // You can filter campaigns, make API calls, etc.
  };

  return (
    <DashboardLayout agentType="sdr">

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
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{campaign.name}</div>
                      <div className="text-sm text-gray-500">{campaign.date}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {campaign.services.map((service, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <Mail className="h-3 w-3 mr-2 text-orange-500" />
                          {service}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-3 w-3 mr-2 text-orange-500" />
                      {campaign.schedule}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  {/* <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Campaign Calendar */}
        <CampaignCalendar 
          events={campaignEvents}
          onDateClick={handleDateClick}
        />
      </div>
    </DashboardLayout>
  );
};

export default Campaigns;