// Export all stores
export { 
  useUIStore
  // Removed unused UI store hooks - not used in the application
} from './useUIStore';

export { 
  useSdrStore, 
  useSdrAgentConfig, 
  useSdrProfile
  // Removed unused SDR store hooks - not used in the application
} from './useSdrStore';

// Export API hooks
export {
  useCampaigns,
  useCampaignStats,
  useCampaign,
  useLeads,
  useLeadStats,
  useLead,
  useUpdateLead,
  useMailLogs,
  useMailLogStats,
  useMailLog,
  useMailThread,
  useApproveEmailLeads,
  useRejectEmailLeads,
  useSubmitICP,
  useSdrAgentConfig as useSdrAgentConfigApi,
  useSdrAgentWorkflow,
  useSdrAgentStatus
} from '../api/hooks/useApi';

// Store types for external use
export type { UIState, UIActions } from './useUIStore';
export type { SDRState, SDRActions } from './useSdrStore';
