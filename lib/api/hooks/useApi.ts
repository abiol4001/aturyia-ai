"use client";

import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sdrService } from '../services/sdrService';
import { 
  SDRProfileData,
  AgentConfig,
  CampaignFilters,
  LeadFilters,
  Lead,
  MailLogFilters
} from '../types';

/**
 * Hook for managing SDR agent configuration
 */
export const useSdrAgentConfig = () => {
  const [agentConfig, setAgentConfig] = useState<AgentConfig | null>(null);
  const [isConfigured, setIsConfigured] = useState(false);
  const [isLaunched, setIsLaunched] = useState(false);

  // Initialize state from API (to be implemented)
  useEffect(() => {
    // TODO: Fetch agent configuration from API after authentication
    const agentId = sdrService.getAgentId();
    const userId = sdrService.getUserId();
    const orgId = sdrService.getOrgId();

    setAgentConfig({
      agentId,
      userId,
      orgId,
      configured: false, // Will be fetched from API
      launched: false,   // Will be fetched from API
    });
    setIsConfigured(false); // Will be fetched from API
    setIsLaunched(false);   // Will be fetched from API
  }, []);

  const updateConfig = useCallback((config: Partial<AgentConfig>) => {
    setAgentConfig(prev => prev ? { ...prev, ...config } : null);
    if (config.configured !== undefined) {
      setIsConfigured(config.configured);
    }
    if (config.launched !== undefined) {
      setIsLaunched(config.launched);
    }
  }, []);

  return {
    agentConfig,
    isConfigured,
    isLaunched,
    updateConfig,
  };
};

/**
 * Hook for SDR agent configuration workflow
 */
export const useSdrAgentWorkflow = () => {
  const queryClient = useQueryClient();
  const { agentConfig, updateConfig } = useSdrAgentConfig();

  // Configure agent mutation
  const configureMutation = useMutation({
    mutationFn: (orgId?: string) => sdrService.configureAgent(orgId),
    onSuccess: (data) => {
      if (data.data) {
        updateConfig({
          agentId: data.data.agent_id,
          configured: data.data.session?.configured || false,
          sessionId: data.data.session?.id,
        });
      }
    },
    onError: (error) => {
      console.error('Failed to configure SDR agent:', error);
    },
  });

  // Setup profile mutation
  const setupProfileMutation = useMutation({
    mutationFn: (profileData: SDRProfileData) => sdrService.setupProfile(profileData),
    onSuccess: () => {
      updateConfig({ configured: true });
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['sdr', 'status'] });
    },
    onError: (error) => {
      console.error('Failed to setup SDR agent profile:', error);
    },
  });

  // Launch agent mutation
  const launchMutation = useMutation({
    mutationFn: (orgId?: string) => sdrService.launchAgent(orgId),
    onSuccess: (data) => {
      if (data.data?.session) {
        updateConfig({
          launched: data.data.session.launched,
          sessionId: data.data.session.id,
        });
      }
    },
    onError: (error) => {
      console.error('Failed to launch SDR agent:', error);
    },
  });

  return {
    agentConfig,
    configureAgent: configureMutation.mutate,
    setupProfile: setupProfileMutation.mutate,
    launchAgent: launchMutation.mutate,
    isConfiguring: configureMutation.isPending,
    isSettingUpProfile: setupProfileMutation.isPending,
    isLaunching: launchMutation.isPending,
    configureError: configureMutation.error,
    setupProfileError: setupProfileMutation.error,
    launchError: launchMutation.error,
  };
};

/**
 * Hook for SDR agent status monitoring
 */
export const useSdrAgentStatus = (orgId?: string) => {
  return useQuery({
    queryKey: ['sdr', 'status', orgId],
    queryFn: () => sdrService.getStatus(orgId),
    enabled: !!orgId,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

/**
 * Hook for managing campaigns
 */
export const useCampaigns = (filters?: CampaignFilters) => {
  return useQuery({
    queryKey: ['campaigns', filters],
    queryFn: () => sdrService.getCampaigns(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook for campaign statistics
 */
export const useCampaignStats = () => {
  return useQuery({
    queryKey: ['campaigns', 'stats'],
    queryFn: () => sdrService.getCampaignStats(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook for a single campaign
 */
export const useCampaign = (campaignId: string) => {
  return useQuery({
    queryKey: ['campaigns', campaignId],
    queryFn: () => sdrService.getCampaign(campaignId),
    enabled: !!campaignId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook for managing leads
 */
export const useLeads = (filters?: LeadFilters) => {
  return useQuery({
    queryKey: ['leads', filters],
    queryFn: () => sdrService.getLeads(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook for lead statistics
 */
export const useLeadStats = () => {
  return useQuery({
    queryKey: ['leads', 'stats'],
    queryFn: () => sdrService.getLeadStats(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook for a single lead
 */
export const useLead = (leadId: string) => {
  return useQuery({
    queryKey: ['leads', leadId],
    queryFn: () => sdrService.getLead(leadId),
    enabled: !!leadId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook for updating lead status
 */
export const useUpdateLead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ leadId, updates }: { leadId: string; updates: Partial<Lead> }) => 
      sdrService.updateLead(leadId, updates),
    onSuccess: (data, variables) => {
      // Invalidate and refetch leads
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      // Update specific lead in cache
      queryClient.setQueryData(['leads', variables.leadId], data);
    },
  });
};

/**
 * Hook for managing mail logs (inbox)
 */
export const useMailLogs = (filters?: MailLogFilters) => {
  return useQuery({
    queryKey: ['mail-logs', filters],
    queryFn: () => sdrService.getMailLogs(filters),
    staleTime: 1 * 60 * 1000, // 1 minute (inbox data changes frequently)
    refetchOnWindowFocus: true,
  });
};

/**
 * Hook for mail log statistics
 */
export const useMailLogStats = () => {
  return useQuery({
    queryKey: ['mail-logs', 'stats'],
    queryFn: () => sdrService.getMailLogStats(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook for a single mail log
 */
export const useMailLog = (mailLogId: string) => {
  return useQuery({
    queryKey: ['mail-logs', mailLogId],
    queryFn: () => sdrService.getMailLog(mailLogId),
    enabled: !!mailLogId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook for mail thread
 */
export const useMailThread = (threadId: string) => {
  return useQuery({
    queryKey: ['mail-logs', 'thread', threadId],
    queryFn: () => sdrService.getMailThread(threadId),
    enabled: !!threadId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Hook for approving email leads
 */
export const useApproveEmailLeads = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (emailIds: string[]) => sdrService.approveEmailLeads(emailIds),
    onSuccess: () => {
      // Invalidate and refetch mail logs
      queryClient.invalidateQueries({ queryKey: ['mail-logs'] });
    },
  });
};

/**
 * Hook for rejecting email leads
 */
export const useRejectEmailLeads = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (emailIds: string[]) => sdrService.rejectEmailLeads(emailIds),
    onSuccess: () => {
      // Invalidate and refetch mail logs
      queryClient.invalidateQueries({ queryKey: ['mail-logs'] });
    },
  });
};

export const useSubmitICP = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ campaignId, icpData }: { campaignId: string; icpData: unknown }) => 
      sdrService.submitICP(campaignId, icpData),
    onSuccess: () => {
      // Invalidate and refetch campaigns
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });
};

// Note: SDR hooks are defined above in this file