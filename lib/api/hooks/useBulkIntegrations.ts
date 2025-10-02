/**
 * Integration Hooks - Simple hooks for managing individual integration services
 * One service per request approach - no bulk operations
 */

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sdrService } from '../services/sdrService';
import { IntegrationRequest, IntegrationRequestResponse } from '../types';
import { 
  getActiveServices,
  getServicesByCategory,
  getCategories,
  getServiceCountByCategory,
  getService,
  ServiceCategory
} from '../services/serviceRegistry';
import { getUserId, getOrgId, getSdrAgentId } from '../utils/storage';

/**
 * Hook for requesting single integration
 */
export const useRequestIntegration = () => {
  return useMutation({
    mutationFn: ({ service, request }: { service: string; request: IntegrationRequest }) =>
      sdrService.requestIntegration(service, request),
    onSuccess: (data) => {
      console.log('✅ Integration request successful:', data);
    },
    onError: (error) => {
      console.error('❌ Integration request failed:', error);
    },
  });
};

/**
 * Hook for getting all available services
 */
export const useAllServices = () => {
  return useQuery({
    queryKey: ['all-services'],
    queryFn: () => getActiveServices(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook for getting services by category
 */
export const useServicesByCategory = (category: ServiceCategory) => {
  return useQuery({
    queryKey: ['services-by-category', category],
    queryFn: () => getServicesByCategory(category),
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook for getting all categories
 */
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook for getting service count by category
 */
export const useServiceCountByCategory = () => {
  return useQuery({
    queryKey: ['service-count-by-category'],
    queryFn: () => getServiceCountByCategory(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook for getting service by ID
 */
export const useService = (serviceId: string) => {
  return useQuery({
    queryKey: ['service', serviceId],
    queryFn: () => getService(serviceId),
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook for getting Gmail status (existing)
 */
export const useGmailStatus = () => {
  return useQuery({
    queryKey: ['gmail-status'],
    queryFn: () => sdrService.getGmailStatus(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook for Gmail re-authentication (existing)
 */
export const useGmailReauth = () => {
  return useMutation({
    mutationFn: () => sdrService.getGmailReauth(),
    onSuccess: (data) => {
      console.log('✅ Gmail re-auth URL generated:', data);
    },
    onError: (error) => {
      console.error('❌ Gmail re-auth failed:', error);
    },
  });
};

/**
 * Hook for integration health check (existing)
 */
export const useIntegrationHealth = () => {
  return useQuery({
    queryKey: ['integration-health'],
    queryFn: () => sdrService.getIntegrationHealth(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook for getting service metrics
 */
export const useServiceMetrics = () => {
  const { data: serviceCount } = useServiceCountByCategory();
  
  const metrics = React.useMemo(() => {
    if (!serviceCount) {
      return {
        totalServices: 0,
        categoryBreakdown: {},
        emailServices: 0,
        crmServices: 0,
        analyticsServices: 0
      };
    }

    const totalServices = Object.values(serviceCount).reduce((sum: number, count: number) => sum + count, 0);

    return {
      totalServices,
      categoryBreakdown: serviceCount,
      emailServices: serviceCount.email || 0,
      crmServices: serviceCount.crm || 0,
      analyticsServices: serviceCount.analytics || 0
    };
  }, [serviceCount]);

  return { data: metrics };
};

/**
 * Hook for refreshing all service data
 */
export const useRefreshAllServices = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      // Refresh all service-related queries
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['gmail-status'] }),
        queryClient.invalidateQueries({ queryKey: ['integration-health'] }),
        queryClient.invalidateQueries({ queryKey: ['all-services'] }),
        queryClient.invalidateQueries({ queryKey: ['categories'] }),
        queryClient.invalidateQueries({ queryKey: ['service-count-by-category'] }),
      ]);
    },
    onSuccess: () => {
      console.log('✅ All services refreshed');
    },
    onError: (error) => {
      console.error('❌ Failed to refresh services:', error);
    },
  });
};
