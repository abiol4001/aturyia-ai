"use client";

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SearchInput from '@/components/ui/search-input';
import { Settings, BarChart3, Users, TrendingUp } from 'lucide-react';
import { useGmailStatus } from '@/lib/api/hooks/useApi';
import { 
  useRequestIntegration, 
  useServiceCountByCategory,
  useServiceMetrics,
  useRefreshAllServices
} from '@/lib/api/hooks/useIntegrations';
import { IntegrationRequest } from '@/lib/api/types';
import { getUserId, getOrgId, getSdrAgentId } from '@/lib/api/utils/storage';
import { 
  getAllIntegrations, 
  getAllCategories
} from '@/lib/api/services/serviceRegistry';

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
  service?: string; // Add service field for API mapping
}

const IntegrationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Integrations');
  
  // Integration request hooks
  const requestIntegration = useRequestIntegration();
  
  // Service management hooks
  const { data: serviceCount } = useServiceCountByCategory();
  const { data: metrics } = useServiceMetrics();
  const { mutateAsync: refreshAllServices, isPending: refreshPending } = useRefreshAllServices();
  
  // Gmail specific hooks (existing)
  const { data: gmailStatus } = useGmailStatus();
  
  // Get integrations from service registry
  const [integrations, setIntegrations] = useState<Integration[]>(() => {
    return getAllIntegrations();
  });

  // Get categories from service registry
  const allCategories = getAllCategories();

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

  const handleSave = async (id: string) => {
    try {
      const integration = integrations.find(int => int.id === id);
      if (!integration || !integration.emailValue || !integration.service) {
        console.error('Integration, email value, or service not found');
        return;
      }

      // Create integration request payload
      const request: IntegrationRequest = {
        org_id: getOrgId(),
        requester_id: getUserId(),
        agent_id: getSdrAgentId(),
        service: integration.service,
        items: [integration.emailValue],
        scopes: integration.service === 'gmail' ? ['gmail.readonly', 'gmail.send'] : ['read', 'write']
      };

      console.log('🚀 Requesting integration:', request);
      
      await requestIntegration.mutateAsync({ service: integration.service, request });
      
      // Hide email field after successful request
      setIntegrations(prev => prev.map(int => 
        int.id === id 
          ? { ...int, showEmailField: false, emailValue: '' }
          : int
      ));
      
      console.log('✅ Integration request sent successfully');
    } catch (error) {
      console.error('❌ Integration request failed:', error);
    }
  };

  const handleToggleEmailField = (id: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === id 
        ? { ...integration, showEmailField: !integration.showEmailField }
        : integration
    ));
  };

  const handleRefreshAll = async () => {
    try {
      await refreshAllServices();
      console.log('✅ All services refreshed');
    } catch (error) {
      console.error('❌ Failed to refresh services:', error);
    }
  };

  // Filter integrations based on search and category
  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All Integrations' || integration.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="h-full overflow-y-auto pb-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">Integrations</h1>
            <p className="text-sm text-gray-600">Connect your favorite tools and services</p>
          </div>
          <Button 
            onClick={handleRefreshAll}
            disabled={refreshPending}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <Settings className="w-4 h-4" />
            {refreshPending ? 'Refreshing...' : 'Refresh All'}
          </Button>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex gap-x-2 rounded-lg border shadow-sm p-2">
            <div className="bg-blue-500 rounded-lg p-1 flex items-center justify-center">
              <BarChart3 className="text-6xl font-bold text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold">
                {gmailStatus?.data?.data?.status === 'connected' ? 1 : 0}
              </p>
              <p className="text-xs">Active Integrations</p>
            </div>
          </div>
          
          <div className="flex gap-x-2 rounded-lg border shadow-sm p-2">
            <div className="bg-green-500 rounded-lg p-1 flex items-center justify-center">
              <Users className="text-6xl font-bold text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold">
                {metrics?.totalServices || 0}
              </p>
              <p className="text-xs">Total Integrations</p>
            </div>
          </div>
          
          <div className="flex gap-x-2 rounded-lg border shadow-sm p-2">
            <div className="bg-purple-500 rounded-lg p-1 flex items-center justify-center">
              <TrendingUp className="text-6xl font-bold text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold">75%</p>
              <p className="text-xs">Utilization</p>
            </div>
          </div>
        </div>

        {/* Search and Category Filter */}
        <div className="bg-white rounded-lg border border-gray-200 mb-8 max-w-6xl">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Available Integrations</h2>
              <div className="flex items-center space-x-4">
                <SearchInput
                  placeholder="Search integrations..."
                  onSearch={setSearchQuery}
                  className="w-64"
                />
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex flex-wrap gap-2 overflow-x-auto">
              {allCategories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className="whitespace-nowrap text-xs"
                >
                  {category}
                  {serviceCount && (
                    <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      {category === 'All Integrations' 
                        ? Object.values(serviceCount).reduce((sum, count) => sum + count, 0)
                        : serviceCount[category.toLowerCase() as keyof typeof serviceCount] || 0
                      }
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map((integration) => (
            <div key={integration.id} className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${integration.iconColor}`}>
                    <span className="text-white text-lg">{integration.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                    <p className="text-sm text-gray-600">{integration.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleIntegration(integration.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      integration.isActive ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        integration.isActive ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                  {integration.category}
                </span>
              </div>

              {integration.hasEmailField && (
                <div className="space-y-2">
                  {integration.showEmailField ? (
                    <div className="space-y-2">
                      <Input
                        type="email"
                        placeholder="Enter email address"
                        value={integration.emailValue || ''}
                        onChange={(e) => handleEmailChange(integration.id, e.target.value)}
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleSave(integration.id)}
                          disabled={!integration.emailValue}
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleToggleEmailField(integration.id)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleEmailField(integration.id)}
                      className="w-full"
                    >
                      Configure
                    </Button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default IntegrationsPage;
