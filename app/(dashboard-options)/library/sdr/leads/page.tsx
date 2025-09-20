"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Search, Filter, Mail, Linkedin, Check, X, ChevronDown, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useLeads } from '@/lib/api/hooks/useApi';
import { LeadFilters } from '@/lib/api/types';

const Leads = () => {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [filters] = useState<LeadFilters>({});
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch leads and stats from API
  const { 
    data: leadsResponse, 
    isLoading: leadsLoading, 
    error: leadsError,
    refetch: refetchLeads 
  } = useLeads(filters);

  // TODO: Enable when lead stats endpoint is available
  // const { 
  //   data: statsResponse, 
  //   isLoading: statsLoading
  // } = useLeadStats();

  const allLeads = leadsResponse?.data || [];
  
  // Client-side filtering for search
  const filteredLeads = allLeads.filter(lead => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      lead.name.toLowerCase().includes(searchLower) ||
      lead.email.toLowerCase().includes(searchLower) ||
      lead.organization.toLowerCase().includes(searchLower) ||
      lead.designation.toLowerCase().includes(searchLower) ||
      lead.campaign_name.toLowerCase().includes(searchLower)
    );
  });
  
  const leads = filteredLeads;
  const isEmpty = leads.length === 0 && !leadsLoading;

  // Debug logging
  console.log('🔍 Leads API Response:', leadsResponse);
  console.log('📊 Leads Data:', leads);

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedLeads(leads.map(lead => lead.lead_id));
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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Client-side filtering, no need to update API filters
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout agentType="sdr">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Leads ({leadsLoading ? '...' : leads.length})
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {leadsLoading ? 'Loading leads...' : 
                searchQuery ? 
                  `Showing ${leads.length} of ${allLeads.length} leads` : 
                  'All leads found by your SDR agent and uploaded by you.'
              }
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search by name or email..." 
                className="pl-10 pr-10 w-64"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearch('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => refetchLeads()}
              disabled={leadsLoading}
            >
              <RefreshCcw className={`h-4 w-4 ${leadsLoading ? 'animate-spin' : ''}`} />
            </Button>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="max-h-[500px] overflow-y-auto">
            <Table>
              <TableHeader className="bg-orange-500 sticky top-0 z-10">
                <TableRow className="border-orange-500 hover:bg-orange-500">
                  <TableHead className="text-white font-medium w-12">
                    <Checkbox 
                      checked={selectAll}
                      onCheckedChange={handleSelectAll}
                      className="border-white data-[state=checked]:bg-white data-[state=checked]:text-orange-500"
                    />
                  </TableHead>
                  <TableHead className="text-white font-medium">Name & Contact</TableHead>
                  <TableHead className="text-white font-medium w-24">Status</TableHead>
                  <TableHead className="text-white font-medium w-48">Organisation</TableHead>
                  <TableHead className="text-white font-medium w-32 flex items-center">
                    Last Contact
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </TableHead>
                  <TableHead className="text-white font-medium w-32">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leadsLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex items-center justify-center">
                        <RefreshCcw className="w-4 h-4 animate-spin mr-2" />
                        Loading leads...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : leadsError ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-red-600">
                      Error loading leads. Please try again.
                    </TableCell>
                  </TableRow>
                ) : isEmpty ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No leads found. Start by creating your first campaign!
                    </TableCell>
                  </TableRow>
                ) : (
                  leads.map((lead) => (
                    <TableRow key={lead.lead_id} className="hover:bg-gray-50">
                      <TableCell className="w-12">
                        <Checkbox 
                          checked={selectedLeads.includes(lead.lead_id)}
                          onCheckedChange={(checked) => handleSelectLead(lead.lead_id, checked as boolean)}
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
                            <div className="text-sm text-gray-600 flex items-center gap-x-1">
                              <Mail className="h-4 w-4 " />
                              {lead.email}
                            </div>
                            <div className="text-sm text-gray-600 flex items-center gap-x-1">
                              <Linkedin className="h-4 w-4 " />
                              <span className='mt-1'>{lead.linkedin_url}</span>
                            </div>
                            {lead.phone && (
                              <div className="text-xs text-gray-500">{lead.phone}</div>
                            )}
                          </div>
                        </div>
                      </TableCell>

                      {/* Status Column */}
                      <TableCell className="w-24">
                        <span className={`uppercase inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                      </TableCell>

                      {/* Organisation Column */}
                      <TableCell className="w-48 text-sm text-gray-900">
                        <div>
                          <div className="font-medium">{lead.organization}</div>
                          <div className="text-xs text-gray-500">{lead.campaign_name}</div>
                        </div>
                      </TableCell>

                      {/* Last Contact Column */}
                      <TableCell className="w-32 text-sm text-gray-600">
                        {new Date(lead.created_at).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </TableCell>

                      {/* Actions Column */}
                      <TableCell className="w-32">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Mail className="h-4 w-4 text-gray-600" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => window.open(lead.linkedin_url, '_blank')}
                          >
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
                    </TableRow>
                  ))
                )}
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