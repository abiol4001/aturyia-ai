/**
 * Service Registry - Central configuration for all integration services
 * Refactored to work with existing implementation while supporting 10+ services
 */

export type ServiceCategory = 'email' | 'crm' | 'calendar' | 'communication' | 'analytics' | 'automation' | 'marketing' | 'sales' | 'finance' | 'productivity';

export interface ServiceConfig {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  icon: string;
  iconColor: string;
  service: string; // API service identifier
  scopes: string[];
  requiresEmail: boolean;
  hasStatusEndpoint: boolean;
  hasHealthEndpoint: boolean;
  hasReauthEndpoint: boolean;
  isActive: boolean;
}

/**
 * Central Service Registry
 * Add new services here to automatically enable them in the system
 */
export const SERVICE_REGISTRY: Record<string, ServiceConfig> = {
  // EMAIL SERVICES
  gmail: {
    id: 'gmail',
    name: 'Gmail',
    description: 'Email integration for communication',
    category: 'email',
    icon: '📧',
    iconColor: 'bg-red-500',
    service: 'gmail',
    scopes: ['gmail.readonly', 'gmail.send'],
    requiresEmail: true,
    hasStatusEndpoint: true,
    hasHealthEndpoint: true,
    hasReauthEndpoint: true,
    isActive: true
  },
  
  outlook: {
    id: 'outlook',
    name: 'Outlook',
    description: 'Microsoft Outlook email integration',
    category: 'email',
    icon: '📨',
    iconColor: 'bg-blue-500',
    service: 'outlook',
    scopes: ['Mail.Read', 'Mail.Send'],
    requiresEmail: true,
    hasStatusEndpoint: true,
    hasHealthEndpoint: true,
    hasReauthEndpoint: true,
    isActive: true
  },

  // CRM SERVICES
  hubspot: {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'CRM platform for marketing and sales',
    category: 'crm',
    icon: '🎯',
    iconColor: 'bg-orange-400',
    service: 'hubspot',
    scopes: ['contacts', 'deals', 'companies'],
    requiresEmail: true,
    hasStatusEndpoint: true,
    hasHealthEndpoint: true,
    hasReauthEndpoint: true,
    isActive: true
  },

  salesforce: {
    id: 'salesforce',
    name: 'Salesforce',
    description: 'Customer relationship management platform',
    category: 'crm',
    icon: '☁️',
    iconColor: 'bg-blue-600',
    service: 'salesforce',
    scopes: ['api', 'refresh_token'],
    requiresEmail: false,
    hasStatusEndpoint: true,
    hasHealthEndpoint: true,
    hasReauthEndpoint: true,
    isActive: true
  },

  // CALENDAR SERVICES
  google_calendar: {
    id: 'google_calendar',
    name: 'Google Calendar',
    description: 'Schedule meetings and manage calendar events',
    category: 'calendar',
    icon: '📅',
    iconColor: 'bg-green-500',
    service: 'google-calendar',
    scopes: ['calendar.readonly', 'calendar.events'],
    requiresEmail: true,
    hasStatusEndpoint: true,
    hasHealthEndpoint: true,
    hasReauthEndpoint: true,
    isActive: true
  },

  calendly: {
    id: 'calendly',
    name: 'Calendly',
    description: 'Automated scheduling and meeting management',
    category: 'calendar',
    icon: '⏰',
    iconColor: 'bg-purple-500',
    service: 'calendly',
    scopes: ['read', 'write'],
    requiresEmail: true,
    hasStatusEndpoint: true,
    hasHealthEndpoint: true,
    hasReauthEndpoint: true,
    isActive: true
  },

  // COMMUNICATION SERVICES
  teams: {
    id: 'teams',
    name: 'Microsoft Teams',
    description: 'Team collaboration and communication',
    category: 'communication',
    icon: '👥',
    iconColor: 'bg-indigo-500',
    service: 'teams',
    scopes: ['Chat.Read', 'ChatMessage.Send'],
    requiresEmail: true,
    hasStatusEndpoint: true,
    hasHealthEndpoint: true,
    hasReauthEndpoint: true,
    isActive: true
  },

  twilio: {
    id: 'twilio',
    name: 'Twilio',
    description: 'SMS and voice communication platform',
    category: 'communication',
    icon: '📱',
    iconColor: 'bg-red-600',
    service: 'twilio',
    scopes: ['sms', 'voice'],
    requiresEmail: false,
    hasStatusEndpoint: true,
    hasHealthEndpoint: true,
    hasReauthEndpoint: true,
    isActive: true
  },

  // ANALYTICS SERVICES
  google_analytics: {
    id: 'google_analytics',
    name: 'Google Analytics',
    description: 'Track website traffic and user behavior',
    category: 'analytics',
    icon: '📊',
    iconColor: 'bg-blue-500',
    service: 'google-analytics',
    scopes: ['analytics.readonly'],
    requiresEmail: true,
    hasStatusEndpoint: true,
    hasHealthEndpoint: true,
    hasReauthEndpoint: true,
    isActive: true
  },

  powerbi: {
    id: 'powerbi',
    name: 'PowerBI',
    description: 'Business analytics and data visualization',
    category: 'analytics',
    icon: '📈',
    iconColor: 'bg-yellow-500',
    service: 'powerbi',
    scopes: ['Report.Read.All'],
    requiresEmail: true,
    hasStatusEndpoint: true,
    hasHealthEndpoint: true,
    hasReauthEndpoint: true,
    isActive: true
  },

  // AUTOMATION SERVICES
  zapier: {
    id: 'zapier',
    name: 'Zapier',
    description: 'Automate workflows between apps and services',
    category: 'automation',
    icon: '⚡',
    iconColor: 'bg-orange-600',
    service: 'zapier',
    scopes: ['zapier:read', 'zapier:write'],
    requiresEmail: false,
    hasStatusEndpoint: true,
    hasHealthEndpoint: true,
    hasReauthEndpoint: true,
    isActive: true
  },

  // MARKETING SERVICES
  mailchimp: {
    id: 'mailchimp',
    name: 'Mailchimp',
    description: 'Email marketing and automation platform',
    category: 'marketing',
    icon: '📬',
    iconColor: 'bg-yellow-400',
    service: 'mailchimp',
    scopes: ['campaigns', 'lists'],
    requiresEmail: true,
    hasStatusEndpoint: true,
    hasHealthEndpoint: true,
    hasReauthEndpoint: true,
    isActive: true
  },

  // SALES SERVICES
  pipedrive: {
    id: 'pipedrive',
    name: 'Pipedrive',
    description: 'Sales pipeline management',
    category: 'sales',
    icon: '🔗',
    iconColor: 'bg-green-600',
    service: 'pipedrive',
    scopes: ['deals', 'contacts'],
    requiresEmail: true,
    hasStatusEndpoint: true,
    hasHealthEndpoint: true,
    hasReauthEndpoint: true,
    isActive: true
  },

  // FINANCE SERVICES
  quickbooks: {
    id: 'quickbooks',
    name: 'QuickBooks',
    description: 'Accounting and financial management',
    category: 'finance',
    icon: '💰',
    iconColor: 'bg-blue-700',
    service: 'quickbooks',
    scopes: ['accounting'],
    requiresEmail: true,
    hasStatusEndpoint: true,
    hasHealthEndpoint: true,
    hasReauthEndpoint: true,
    isActive: true
  },

  // PRODUCTIVITY SERVICES
  slack: {
    id: 'slack',
    name: 'Slack',
    description: 'Team communication and collaboration',
    category: 'productivity',
    icon: '💬',
    iconColor: 'bg-purple-600',
    service: 'slack',
    scopes: ['chat:write', 'channels:read'],
    requiresEmail: true,
    hasStatusEndpoint: true,
    hasHealthEndpoint: true,
    hasReauthEndpoint: true,
    isActive: true
  }
};

/**
 * Functional service management utilities
 */

/**
 * Get all services by category
 */
export const getServicesByCategory = (category: ServiceCategory): ServiceConfig[] => {
  return Object.values(SERVICE_REGISTRY).filter(service => service.category === category);
};

/**
 * Get all active services
 */
export const getActiveServices = (): ServiceConfig[] => {
  return Object.values(SERVICE_REGISTRY).filter(service => service.isActive);
};

/**
 * Get service by ID
 */
export const getService = (serviceId: string): ServiceConfig | undefined => {
  return SERVICE_REGISTRY[serviceId];
};

/**
 * Get all categories
 */
export const getCategories = (): ServiceCategory[] => {
  const categories = new Set<ServiceCategory>();
  Object.values(SERVICE_REGISTRY).forEach(service => {
    categories.add(service.category);
  });
  return Array.from(categories);
};

/**
 * Get services by OAuth provider
 */
export const getServicesByProvider = (provider: string): ServiceConfig[] => {
  return Object.values(SERVICE_REGISTRY).filter(service => 
    service.service.toLowerCase().includes(provider.toLowerCase())
  );
};

/**
 * Check if service exists
 */
export const hasService = (serviceId: string): boolean => {
  return serviceId in SERVICE_REGISTRY;
};

/**
 * Get service count by category
 */
export const getServiceCountByCategory = (): Record<ServiceCategory, number> => {
  const counts: Record<ServiceCategory, number> = {
    email: 0,
    crm: 0,
    calendar: 0,
    communication: 0,
    analytics: 0,
    automation: 0,
    marketing: 0,
    sales: 0,
    finance: 0,
    productivity: 0
  };

  Object.values(SERVICE_REGISTRY).forEach(service => {
    counts[service.category]++;
  });

  return counts;
};


/**
 * Convert service config to integration format for existing UI
 */
export const convertServiceToIntegration = (service: ServiceConfig) => ({
  id: service.id,
  name: service.name,
  description: service.description,
  category: service.category,
  icon: service.icon,
  iconColor: service.iconColor,
  isActive: false,
  hasEmailField: service.requiresEmail,
  emailValue: '',
  showEmailField: false,
  service: service.service
});

/**
 * Get all integrations from service registry
 */
export const getAllIntegrations = () => {
  return Object.values(SERVICE_REGISTRY).map(convertServiceToIntegration);
};

/**
 * Get integrations by category
 */
export const getIntegrationsByCategory = (category: ServiceCategory) => {
  return getServicesByCategory(category).map(convertServiceToIntegration);
};

/**
 * Get all categories for the existing UI
 */
export const getAllCategories = () => {
  return ['All Integrations', ...getCategories()];
};
