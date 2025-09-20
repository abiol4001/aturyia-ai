"use client";

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { SDRProfileData, AgentConfig } from '@/lib/api/types';

// SDR Agent State Interface
export interface SDRState {
  // Agent configuration
  agentConfig: AgentConfig | null;
  isConfigured: boolean;
  isLaunched: boolean;
  
  // Agent profile
  profile: SDRProfileData | null;
  
  // Agent status
  status: {
    isActive: boolean;
    isPaused: boolean;
    isError: boolean;
    lastActivity: string | null;
    metrics: {
      emailsSent: number;
      leadsContacted: number;
      responsesReceived: number;
      conversionRate: number;
    } | null;
  };
  
  // Workflow state
  workflow: {
    isConfiguring: boolean;
    isSettingUpProfile: boolean;
    isLaunching: boolean;
    currentStep: 'configure' | 'profile' | 'launch' | 'active' | 'error';
    error: string | null;
  };
  
  // Session data
  session: {
    id: string | null;
    userId: string | null;
    orgId: string | null;
    agentId: string | null;
  };
}

// SDR Actions Interface
export interface SDRActions {
  // Agent configuration actions
  setAgentConfig: (config: AgentConfig | null) => void;
  updateAgentConfig: (updates: Partial<AgentConfig>) => void;
  setConfigured: (configured: boolean) => void;
  setLaunched: (launched: boolean) => void;
  
  // Profile actions
  setProfile: (profile: SDRProfileData | null) => void;
  updateProfile: (updates: Partial<SDRProfileData>) => void;
  clearProfile: () => void;
  
  // Status actions
  updateStatus: (status: Partial<SDRState['status']>) => void;
  setActive: (active: boolean) => void;
  setPaused: (paused: boolean) => void;
  setStatusError: (error: boolean) => void;
  updateMetrics: (metrics: Partial<SDRState['status']['metrics']>) => void;
  
  // Workflow actions
  setWorkflowState: (workflow: Partial<SDRState['workflow']>) => void;
  setCurrentStep: (step: SDRState['workflow']['currentStep']) => void;
  setWorkflowError: (error: string | null) => void;
  resetWorkflow: () => void;
  
  // Session actions
  setSession: (session: Partial<SDRState['session']>) => void;
  clearSession: () => void;
  
  // Reset all SDR state
  resetSDRState: () => void;
}

// Initial state
const initialState: SDRState = {
  agentConfig: null,
  isConfigured: false,
  isLaunched: false,
  profile: null,
  status: {
    isActive: false,
    isPaused: false,
    isError: false,
    lastActivity: null,
    metrics: null,
  },
  workflow: {
    isConfiguring: false,
    isSettingUpProfile: false,
    isLaunching: false,
    currentStep: 'configure',
    error: null,
  },
  session: {
    id: null,
    userId: null,
    orgId: null,
    agentId: null,
  },
};

// Create the SDR store
export const useSdrStore = create<SDRState & SDRActions>()(
  persist(
    (set) => ({
      ...initialState,
      
      // Agent configuration actions
      setAgentConfig: (config) => set((state) => ({
        ...state,
        agentConfig: config,
        isConfigured: config?.configured || false,
        isLaunched: config?.launched || false,
        session: {
          ...state.session,
          agentId: config?.agentId || null,
          userId: config?.userId || null,
          orgId: config?.orgId || null,
        },
      })),
      
      updateAgentConfig: (updates) => set((state) => {
        if (!state.agentConfig) return state;
        
        const updatedConfig = { ...state.agentConfig, ...updates };
        return {
          ...state,
          agentConfig: updatedConfig,
          isConfigured: updates.configured !== undefined ? updates.configured : state.isConfigured,
          isLaunched: updates.launched !== undefined ? updates.launched : state.isLaunched,
        };
      }),
      
      setConfigured: (configured) => set((state) => ({
        ...state,
        isConfigured: configured,
        agentConfig: state.agentConfig ? { ...state.agentConfig, configured } : null,
      })),
      
      setLaunched: (launched) => set((state) => ({
        ...state,
        isLaunched: launched,
        agentConfig: state.agentConfig ? { ...state.agentConfig, launched } : null,
      })),
      
      // Profile actions
      setProfile: (profile) => set((state) => ({
        ...state,
        profile,
        agentConfig: state.agentConfig ? { 
          ...state.agentConfig, 
          profile: profile || undefined 
        } : null,
      })),
      
      updateProfile: (updates) => set((state) => {
        if (!state.profile) return state;
        
        const updatedProfile = { ...state.profile, ...updates };
        return {
          ...state,
          profile: updatedProfile,
          agentConfig: state.agentConfig ? { 
            ...state.agentConfig, 
            profile: updatedProfile 
          } : null,
        };
      }),
      
      clearProfile: () => set((state) => ({
        ...state,
        profile: null,
        agentConfig: state.agentConfig ? { 
          ...state.agentConfig, 
          profile: undefined 
        } : null,
      })),
      
      // Status actions
      updateStatus: (status) => set((state) => ({
        ...state,
        status: { ...state.status, ...status },
      })),
      
      setActive: (active) => set((state) => ({
        ...state,
        status: {
          ...state.status,
          isActive: active,
          isPaused: active ? false : state.status.isPaused,
          isError: active ? false : state.status.isError,
        },
      })),
      
      setPaused: (paused) => set((state) => ({
        ...state,
        status: {
          ...state.status,
          isPaused: paused,
          isActive: paused ? false : state.status.isActive,
        },
      })),
      
      setStatusError: (error) => set((state) => ({
        ...state,
        status: {
          ...state.status,
          isError: error,
          isActive: error ? false : state.status.isActive,
          isPaused: error ? false : state.status.isPaused,
        },
      })),
      
      updateMetrics: (metrics) => set((state) => ({
        ...state,
        status: {
          ...state.status,
          metrics: state.status.metrics ? { ...state.status.metrics, ...metrics } : {
            emailsSent: 0,
            leadsContacted: 0,
            responsesReceived: 0,
            conversionRate: 0,
            ...metrics,
          },
        },
      })),
      
      // Workflow actions
      setWorkflowState: (workflow) => set((state) => ({
        ...state,
        workflow: { ...state.workflow, ...workflow },
      })),
      
      setCurrentStep: (step) => set((state) => ({
        ...state,
        workflow: { ...state.workflow, currentStep: step },
      })),
      
      setWorkflowError: (error) => set((state) => ({
        ...state,
        workflow: {
          ...state.workflow,
          error,
          currentStep: error ? 'error' : state.workflow.currentStep,
        },
      })),
      
      resetWorkflow: () => set((state) => ({
        ...state,
        workflow: initialState.workflow,
      })),
      
      // Session actions
      setSession: (session) => set((state) => ({
        ...state,
        session: { ...state.session, ...session },
      })),
      
      clearSession: () => set((state) => ({
        ...state,
        session: initialState.session,
      })),
      
      // Reset all SDR state
      resetSDRState: () => set(() => ({
        ...initialState,
      })),
    }),
    {
      name: 'sdr-agent-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        agentConfig: state.agentConfig,
        isConfigured: state.isConfigured,
        isLaunched: state.isLaunched,
        profile: state.profile,
        session: state.session,
      }),
    }
  )
);

// Individual selectors to avoid infinite loops
export const useSdrAgentConfig = () => {
  const agentConfig = useSdrStore((state) => state.agentConfig);
  const isConfigured = useSdrStore((state) => state.isConfigured);
  const isLaunched = useSdrStore((state) => state.isLaunched);
  const setAgentConfig = useSdrStore((state) => state.setAgentConfig);
  const updateAgentConfig = useSdrStore((state) => state.updateAgentConfig);
  const setConfigured = useSdrStore((state) => state.setConfigured);
  const setLaunched = useSdrStore((state) => state.setLaunched);

  return {
    agentConfig,
    isConfigured,
    isLaunched,
    setAgentConfig,
    updateAgentConfig,
    setConfigured,
    setLaunched,
  };
};

export const useSdrProfile = () => {
  const profile = useSdrStore((state) => state.profile);
  const setProfile = useSdrStore((state) => state.setProfile);
  const updateProfile = useSdrStore((state) => state.updateProfile);
  const clearProfile = useSdrStore((state) => state.clearProfile);

  return {
    profile,
    setProfile,
    updateProfile,
    clearProfile,
  };
};

// Removed unused store hooks - not used in the application
