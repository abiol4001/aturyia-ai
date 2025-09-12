"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Search, Filter, Mail, Linkedin, Check, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Leads = () => {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const leads = [
    {
      id: '1',
      name: 'Lori Lowrey',
      email: 'llowrey@chcsek.org',
      linkedin: 'http://www.linkedin.com/in/lori-lowre...',
      status: 'PENDING',
      organization: 'Community Health Center of Southeast Kansas',
      lastContact: 'Sep 1, 2025'
    },
    {
      id: '2',
      name: 'Sutapa Ghosh',
      email: 'sutapa@omnira.com',
      linkedin: 'http://www.linkedin.com/in/sutapa-gh...',
      status: 'PENDING',
      organization: 'Omnira Software',
      lastContact: 'Sep 1, 2025'
    },
    {
      id: '3',
      name: 'John Smith',
      email: 'john@techcorp.com',
      linkedin: 'http://www.linkedin.com/in/john-smith...',
      status: 'PENDING',
      organization: 'Tech Corp Solutions',
      lastContact: 'Sep 1, 2025'
    },
    {
      id: '4',
      name: 'Sarah Johnson',
      email: 'sarah@innovate.io',
      linkedin: 'http://www.linkedin.com/in/sarah-john...',
      status: 'PENDING',
      organization: 'Innovate Technologies',
      lastContact: 'Sep 1, 2025'
    },
    {
      id: '5',
      name: 'Mike Chen',
      email: 'mike@startup.com',
      linkedin: 'http://www.linkedin.com/in/mike-chen...',
      status: 'PENDING',
      organization: 'Startup Ventures',
      lastContact: 'Sep 1, 2025'
    },
    {
      id: '6',
      name: 'Emily Davis',
      email: 'emily@enterprise.com',
      linkedin: 'http://www.linkedin.com/in/emily-davis...',
      status: 'PENDING',
      organization: 'Enterprise Solutions',
      lastContact: 'Sep 1, 2025'
    },
    {
      id: '6',
      name: 'Emily Davis',
      email: 'emily@enterprise.com',
      linkedin: 'http://www.linkedin.com/in/emily-davis...',
      status: 'PENDING',
      organization: 'Enterprise Solutions',
      lastContact: 'Sep 1, 2025'
    },
    {
      id: '6',
      name: 'Emily Davis',
      email: 'emily@enterprise.com',
      linkedin: 'http://www.linkedin.com/in/emily-davis...',
      status: 'PENDING',
      organization: 'Enterprise Solutions',
      lastContact: 'Sep 1, 2025'
    }
  ];

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedLeads(leads.map(lead => lead.id));
    } else {
      setSelectedLeads([]);
    }
  };

  const handleSelectLead = (leadId: string, checked: boolean) => {
    if (checked) {
      setSelectedLeads([...selectedLeads, leadId]);
    } else {
      setSelectedLeads(selectedLeads.filter(id => id !== leadId));
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <DashboardLayout agentType="sdr">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Leads (20)</h1>
            <p className="text-sm text-gray-600 mt-1">All leads found by Acme SDR and uploaded by you.</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search by name or email..." 
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader className="bg-orange-500 sticky top-0 z-10">
              <TableRow className="border-orange-500 hover:bg-orange-500">
                <TableHead className="text-white font-medium">
                  <Checkbox 
                    checked={selectAll}
                    onCheckedChange={handleSelectAll}
                    className="border-white data-[state=checked]:bg-white data-[state=checked]:text-orange-500"
                  />
                </TableHead>
                <TableHead className="text-white font-medium">Name</TableHead>
                <TableHead className="text-white font-medium w-24">Status</TableHead>
                <TableHead className="text-white font-medium w-48">Organisation</TableHead>
                <TableHead className="text-white font-medium w-32">Actions</TableHead>
                <TableHead className="text-white font-medium w-32 flex items-center">
                  Last Contact
                  <ChevronDown className="ml-1 h-4 w-4" />
                </TableHead>
              </TableRow>
            </TableHeader>
          </Table>
          
          {/* Scrollable Table Body */}
          <div className="max-h-[450px] overflow-y-auto">
            <Table>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id} className="hover:bg-gray-50">
                    <TableCell>
                      <Checkbox 
                        checked={selectedLeads.includes(lead.id)}
                        onCheckedChange={(checked) => handleSelectLead(lead.id, checked as boolean)}
                      />
                    </TableCell>
                    
                    {/* Name Column */}
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {getInitials(lead.name)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{lead.name}</div>
                          <div className="text-sm text-gray-600">{lead.email}</div>
                          <div className="flex items-center space-x-1 text-xs text-blue-600">
                            <Linkedin className="h-3 w-3" />
                            <span>{lead.linkedin}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    {/* Status Column */}
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {lead.status}
                      </span>
                    </TableCell>

                    {/* Organisation Column */}
                    <TableCell className="text-sm text-gray-900">
                      {lead.organization}
                    </TableCell>

                    {/* Actions Column */}
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Mail className="h-4 w-4 text-gray-600" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Linkedin className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Check className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <X className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>

                    {/* Last Contact Column */}
                    <TableCell className="text-sm text-gray-600">
                      {lead.lastContact}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end space-x-3">
          <Button variant="outline" className="px-6">
            Cancel
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6">
            Submit
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Leads;