"use client";

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SearchInput from '@/components/ui/search-input';
import { Settings, BarChart3, Users, TrendingUp, Database, MessageSquare } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  iconColor: string;
  isActive: boolean;
  hasEmailField: boolean;
  emailValue?: string;
  showEmailField?: boolean;
}

const IntegrationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Integrations');
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: '1',
      name: 'Google Analytics',
      description: 'Track website traffic and user behavior',
      category: 'Marketing',
      icon: <BarChart3 className="h-5 w-5" />,
      iconColor: 'bg-blue-500',
      isActive: true,
      hasEmailField: true,
      emailValue: '',
      showEmailField: false
    },
    {
      id: '2',
      name: 'PowerBI',
      description: 'Business analytics and data visualization',
      category: 'Finance',
      icon: <Database className="h-5 w-5" />,
      iconColor: 'bg-yellow-500',
      isActive: true,
      hasEmailField: true,
      emailValue: '',
      showEmailField: false
    },
    {
      id: '3',
      name: 'HubSpot',
      description: 'CRM platform for marketing and sales',
      category: 'Sales',
      icon: <MessageSquare className="h-5 w-5" />,
      iconColor: 'bg-orange-400',
      isActive: true,
      hasEmailField: true,
      emailValue: '',
      showEmailField: false
    },
    {
      id: '4',
      name: 'Gmail',
      description: 'Email integration for communication',
      category: 'Sales',
      icon: <MessageSquare className="h-5 w-5" />,
      iconColor: 'bg-orange-400',
      isActive: true,
      hasEmailField: true,
      emailValue: '',
      showEmailField: false
    }
  ]);

  const categories = [
    'All Integrations',
    'Email',
    'CRM',
    'Social Media',
    'Marketing',
    'Sales Tools',
    'Productivity',
    'Finance'
  ];

  const handleToggleIntegration = (id: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === id 
        ? { ...integration, isActive: !integration.isActive }
        : integration
    ));
  };

  const handleEmailChange = (id: string, value: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === id 
        ? { ...integration, emailValue: value }
        : integration
    ));
  };

  const handleSave = (id: string) => {
    // Handle save logic here
    console.log('Saving integration:', id);
  };

  const handleCancel = (id: string) => {
    // Hide email field when cancel is clicked
    setIntegrations(prev => prev.map(integration => 
      integration.id === id 
        ? { ...integration, showEmailField: false }
        : integration
    ));
  };

  const handleConfigure = (id: string) => {
    // Show email field when configure is clicked
    setIntegrations(prev => prev.map(integration => 
      integration.id === id 
        ? { ...integration, showEmailField: true }
        : integration
    ));
  };

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All Integrations' || integration.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const activeIntegrations = integrations.filter(integration => integration.isActive).length;
  const totalIntegrations = integrations.length;
  const utilization = Math.round((activeIntegrations / totalIntegrations) * 100);

  return (
    <DashboardLayout agentType="sdr">
      <div className="px-6 py-4 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
            <p className="text-gray-600 mt-2">Connect with your favorite apps and services</p>
          </div>
          <SearchInput
            placeholder="Search integrations..."
            onSearch={setSearchQuery}
            className="w-full md:w-80"
          />
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap gap-4 border-b border-gray-200 pb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-1 text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-3 flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{activeIntegrations}</div>
              <div className="text-sm text-gray-600">Active Integrations</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-3 flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{totalIntegrations}</div>
              <div className="text-sm text-gray-600">Total Integrations</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-3 flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{utilization}%</div>
              <div className="text-sm text-gray-600">Utilization</div>
            </div>
          </div>
        </div>

        {/* Integration Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map((integration) => (
            <div key={integration.id} className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${integration.iconColor} rounded-lg flex items-center justify-center`}>
                    <span className="text-white">{integration.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                    <p className="text-sm text-gray-600">{integration.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleIntegration(integration.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                    integration.isActive ? 'bg-orange-500' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      integration.isActive ? 'translate-x-4' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Email Field */}
              {integration.showEmailField && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Enter email address:</label>
                  <Input
                    placeholder="Enter email address"
                    value={integration.emailValue || ''}
                    onChange={(e) => handleEmailChange(integration.id, e.target.value)}
                    className="w-full"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleSave(integration.id)}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleCancel(integration.id)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                  {integration.category}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-orange-500 border-orange-500 hover:bg-orange-50"
                  onClick={() => handleConfigure(integration.id)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredIntegrations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Settings className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No integrations found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default IntegrationsPage;