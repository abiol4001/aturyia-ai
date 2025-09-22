import { api } from '../client';
import { 
  ApiResponse, 
  SDRConfigurationData, 
  SDRLaunchData, 
  SDRProfileData, 
  SDRStatusData,
  Campaign,
  CampaignFilters,
  CampaignStats,
  Lead,
  LeadFilters,
  LeadStats,
  MailLog,
  MailLogFilters,
  MailLogStats,
  KnowledgeBaseFile,
  CampaignDetails,
  LeadApprovalRequest
} from '../types';
import {
  getUserId,
  getOrgId,
  setSdrAgentId,
  getSdrAgentId,
  setSessionId
} from '../utils/storage';


export const sdrService = {
  /**
   * Configure SDR Agent
   * POST /users/{user_id}/sdr/configure
   */
  configureAgent: async (orgId?: string): Promise<ApiResponse<SDRConfigurationData>> => {
    const userId = getUserId();
    const org = orgId || getOrgId();
    const url = `/users/${userId}/sdr/configure`;

    try {
      const response = await api.post<ApiResponse<SDRConfigurationData>>(url, {
        org_id: org
      });
      
      // Log the complete response data from backend
      console.log('🔍 configureAgent API Response:', response);
      
      // Store agent ID if available
      if (response.data?.agent_id) {
        console.log('✅ Agent ID found:', response.data.agent_id);
        setSdrAgentId(response.data.agent_id);
      } else {
        console.log('⚠️ No agent_id in response, using fallback');
      }

      // Log session data for debugging
      if (response.data?.session) {
        console.log('📊 Session data:', response.data.session);
      }

      return response;
    } catch (error) {
      console.error('Error configuring SDR agent:', error);
      throw error;
    }
  },

  /**
   * Setup SDR Agent Profile
   * POST /users/{user_id}/agents/sdr/{agent_id}/profile
   */
  setupProfile: async (profileData: SDRProfileData): Promise<ApiResponse<unknown>> => {
    const userId = getUserId();
    const agentId = getSdrAgentId();
    const url = `/users/${userId}/agents/sdr/${agentId}/profile`;
    
    console.log('🔍 setupProfile API Details:', {
      userId,
      agentId,
      url,
      profileData: {
        name: profileData.name,
        organization: profileData.organization,
        department: profileData.department,
        sector: profileData.sector,
        hasAvatar: !!profileData.avatar
      }
    });

    // Validate required fields
    if (!profileData.name?.trim()) {
      throw new Error('Name is required for agent profile');
    }

    // Create FormData for multipart/form-data submission
    const formData = new FormData();
    formData.append('name', profileData.name.trim());
    
    if (profileData.tagline?.trim()) {
      formData.append('tagline', profileData.tagline.trim());
    }
    
    if (profileData.organization?.trim()) {
      formData.append('organization', profileData.organization.trim());
    }
    
    if (profileData.department?.trim()) {
      formData.append('department', profileData.department.trim());
    }
    
    if (profileData.activities?.trim()) {
      formData.append('activities', profileData.activities.trim());
      formData.append('description', profileData.activities.trim());
    }
    
    formData.append('sector', profileData.sector || 'sales');

    // Handle avatar file upload
    if (profileData.avatar && profileData.avatar instanceof File) {
      formData.append('avatar', profileData.avatar);
    }

    try {
      const response = await api.post<ApiResponse<unknown>>(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Log the complete response data from backend
      console.log('🔍 setupProfile API Response:', response);

      // Don't mark as configured yet - wait for knowledge base step completion

      return response;
    } catch (error) {
      console.error('Error setting up SDR agent profile:', error);
      throw error;
    }
  },

  /**
   * Launch SDR Agent
   * POST /users/{user_id}/sdr/launch
   */
  launchAgent: async (orgId?: string): Promise<ApiResponse<SDRLaunchData>> => {
    const userId = getUserId();
    const org = orgId || getOrgId();
    const url = `/users/${userId}/sdr/launch`;

    try {
      const response = await api.post<ApiResponse<SDRLaunchData>>(url, {
        org_id: org
      });
      
      // Store session ID
      if (response.data?.session) {
        setSessionId(response.data.session.id);
      }

      return response;
    } catch (error) {
      console.error('Error launching SDR agent:', error);
      throw error;
    }
  },

  /**
   * Get SDR Agent Status
   * POST /users/{user_id}/sdr/status
   */
  getStatus: async (orgId?: string): Promise<ApiResponse<SDRStatusData>> => {
    const userId = getUserId();
    const org = orgId || getOrgId();
    const url = `/users/${userId}/sdr/status`;

    try {
      const response = await api.post<ApiResponse<SDRStatusData>>(url, {
        org_id: org
      });
      return response;
    } catch (error) {
      console.error('Error getting SDR agent status:', error);
      throw error;
    }
  },

  /**
   * Upload Knowledge Base Documents
   * POST /users/{user_id}/agents/sdr/{agent_id}/knowledgebase
   */
  /**
   * Upload knowledge base files
   * POST /users/{user_id}/agents/sdr/{agent_id}/knowledgebase
   */
  uploadKnowledgeBase: async (files: File[]): Promise<ApiResponse<unknown>> => {
    const userId = getUserId();
    const agentId = getSdrAgentId();
    const url = `/users/${userId}/agents/sdr/${agentId}/knowledgebase`;

    const formData = new FormData();
    
    // Add each file to FormData with correct parameter name
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await api.post<ApiResponse<unknown>>(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('🔍 uploadKnowledgeBase API Response:', response);
      return response;
    } catch (error) {
      console.error('Error uploading knowledge base documents:', error);
      throw error;
    }
  },


  /**
   * Get current agent ID
   */
  getAgentId: (): string => {
    return getSdrAgentId();
  },

  /**
   * Get current user ID
   */
  getUserId: (): string => {
    return getUserId();
  },

  /**
   * Get current org ID
   */
  getOrgId: (): string => {
    return getOrgId();
  },

  // Campaign Management Methods
  
  /**
   * Get all campaigns for the SDR agent
   * GET /users/{user_id}/agents/sdr/{agent_id}/campaigns
   */
  getCampaigns: async (filters?: CampaignFilters): Promise<ApiResponse<Campaign[]>> => {
    const userId = getUserId();
    const agentId = getSdrAgentId();
    const url = `/users/${userId}/agents/sdr/${agentId}/campaigns`;

    try {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, value.toString());
          }
        });
      }

      const response = await api.get<ApiResponse<Campaign[]>>(`${url}?${params.toString()}`);
      console.log('🔍 getCampaigns API Response:', response);
      return response;
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      throw error;
    }
  },

  /**
   * Get campaign statistics
   * GET /users/{user_id}/agents/sdr/{agent_id}/campaigns/stats
   */
  getCampaignStats: async (): Promise<ApiResponse<CampaignStats>> => {
    const userId = getUserId();
    const agentId = getSdrAgentId();
    const url = `/users/${userId}/agents/sdr/${agentId}/campaigns/stats`;

    try {
      const response = await api.get<ApiResponse<CampaignStats>>(url);
      console.log('🔍 getCampaignStats API Response:', response);
      return response;
    } catch (error) {
      console.error('Error fetching campaign stats:', error);
      throw error;
    }
  },

  /**
   * Get a single campaign by ID
   * GET /users/{user_id}/agents/sdr/{agent_id}/campaigns/{campaign_id}
   */
  getCampaign: async (campaignId: string): Promise<ApiResponse<Campaign>> => {
    const userId = getUserId();
    const agentId = getSdrAgentId();
    const url = `/users/${userId}/agents/sdr/${agentId}/campaigns/${campaignId}`;

    try {
      const response = await api.get<ApiResponse<Campaign>>(url);
      console.log('🔍 getCampaign API Response:', response);
      return response;
    } catch (error) {
      console.error('Error fetching campaign:', error);
      throw error;
    }
  },

  // Lead Management Methods
  
  /**
   * Get all leads for the SDR agent
   * GET /users/{user_id}/agents/sdr/{agent_id}/leads
   */
  getLeads: async (filters?: LeadFilters): Promise<ApiResponse<Lead[]>> => {
    const userId = getUserId();
    const agentId = getSdrAgentId();
    const url = `/users/${userId}/agents/sdr/${agentId}/leads`;

    try {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
              value.forEach(item => params.append(key, item.toString()));
            } else {
              params.append(key, value.toString());
            }
          }
        });
      }

      const response = await api.get<ApiResponse<Lead[]>>(`${url}?${params.toString()}`);
      console.log('🔍 getLeads API Response:', response);
      return response;
    } catch (error) {
      console.error('Error fetching leads:', error);
      throw error;
    }
  },

  /**
   * Get lead statistics
   * GET /users/{user_id}/agents/sdr/{agent_id}/leads/stats
   */
  getLeadStats: async (): Promise<ApiResponse<LeadStats>> => {
    const userId = getUserId();
    const agentId = getSdrAgentId();
    const url = `/users/${userId}/agents/sdr/${agentId}/leads/stats`;

    try {
      const response = await api.get<ApiResponse<LeadStats>>(url);
      console.log('🔍 getLeadStats API Response:', response);
      return response;
    } catch (error) {
      console.error('Error fetching lead stats:', error);
      throw error;
    }
  },

  /**
   * Get a single lead by ID
   * GET /users/{user_id}/agents/sdr/{agent_id}/leads/{lead_id}
   */
  getLead: async (leadId: string): Promise<ApiResponse<Lead>> => {
    const userId = getUserId();
    const agentId = getSdrAgentId();
    const url = `/users/${userId}/agents/sdr/${agentId}/leads/${leadId}`;

    try {
      const response = await api.get<ApiResponse<Lead>>(url);
      console.log('🔍 getLead API Response:', response);
      return response;
    } catch (error) {
      console.error('Error fetching lead:', error);
      throw error;
    }
  },

  /**
   * Update lead status
   * PUT /users/{user_id}/agents/sdr/{agent_id}/leads/{lead_id}
   */
  updateLead: async (leadId: string, updates: Partial<Lead>): Promise<ApiResponse<Lead>> => {
    const userId = getUserId();
    const agentId = getSdrAgentId();
    const url = `/users/${userId}/agents/sdr/${agentId}/leads/${leadId}`;

    try {
      const response = await api.put<ApiResponse<Lead>>(url, updates);
      console.log('🔍 updateLead API Response:', response);
      return response;
    } catch (error) {
      console.error('Error updating lead:', error);
      throw error;
    }
  },

  // Mail Log Management Methods
  
  /**
   * Get all mail logs for the SDR agent
   * GET /users/{user_id}/agents/sdr/{agent_id}/mail-logs
   */
  getMailLogs: async (filters?: MailLogFilters): Promise<ApiResponse<MailLog[]>> => {
    const userId = getUserId();
    const agentId = getSdrAgentId();
    const url = `/users/${userId}/agents/sdr/${agentId}/mail-logs`;

    try {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
              value.forEach(item => params.append(key, item.toString()));
            } else {
              params.append(key, value.toString());
            }
          }
        });
      }

      const response = await api.get<ApiResponse<MailLog[]>>(`${url}?${params.toString()}`);
      console.log('🔍 getMailLogs API Response:', response);
      return response;
    } catch (error) {
      console.error('Error fetching mail logs:', error);
      throw error;
    }
  },

  /**
   * Get mail log statistics
   * GET /users/{user_id}/agents/sdr/{agent_id}/mail-logs/stats
   */
  getMailLogStats: async (): Promise<ApiResponse<MailLogStats>> => {
    const userId = getUserId();
    const agentId = getSdrAgentId();
    const url = `/users/${userId}/agents/sdr/${agentId}/mail-logs/stats`;

    try {
      const response = await api.get<ApiResponse<MailLogStats>>(url);
      console.log('🔍 getMailLogStats API Response:', response);
      return response;
    } catch (error) {
      console.error('Error fetching mail log stats:', error);
      throw error;
    }
  },

  /**
   * Get a single mail log by ID
   * GET /users/{user_id}/agents/sdr/{agent_id}/mail-logs/{mail_log_id}
   */
  getMailLog: async (mailLogId: string): Promise<ApiResponse<MailLog>> => {
    const userId = getUserId();
    const agentId = getSdrAgentId();
    const url = `/users/${userId}/agents/sdr/${agentId}/mail-logs/${mailLogId}`;

    try {
      const response = await api.get<ApiResponse<MailLog>>(url);
      console.log('🔍 getMailLog API Response:', response);
      return response;
    } catch (error) {
      console.error('Error fetching mail log:', error);
      throw error;
    }
  },

  /**
   * Get mail thread by thread ID
   * GET /users/{user_id}/agents/sdr/{agent_id}/mail-logs/threads/{thread_id}
   */
  getMailThread: async (threadId: string): Promise<ApiResponse<MailLog[]>> => {
    const userId = getUserId();
    const agentId = getSdrAgentId();
    const url = `/users/${userId}/agents/sdr/${agentId}/mail-logs/threads/${threadId}`;

    try {
      const response = await api.get<ApiResponse<MailLog[]>>(url);
      console.log('🔍 getMailThread API Response:', response);
      return response;
    } catch (error) {
      console.error('Error fetching mail thread:', error);
      throw error;
    }
  },

  /**
   * Approve email leads
   * POST /users/{user_id}/agents/sdr/{agent_id}/email-leads
   */
  approveEmailLeads: async (emailIds: string[]): Promise<ApiResponse<{ message: string; approved_count: number }>> => {
    const userId = getUserId();
    const agentId = getSdrAgentId();
    const url = `/users/${userId}/agents/sdr/${agentId}/email-leads`;

    try {
      // Convert email IDs to objects with log_id field
      const mailLogs = emailIds.map(id => ({ log_id: id }));
      
      const response = await api.post<ApiResponse<{ message: string; approved_count: number }>>(url, { 
        user_id: userId,
        mail_logs: mailLogs
      });
      console.log('🔍 approveEmailLeads API Response:', response);
      return response;
    } catch (error) {
      console.error('Error approving email leads:', error);
      throw error;
    }
  },

  /**
   * Reject email leads
   * DELETE /users/{user_id}/agents/sdr/{agent_id}/email-leads
   */
  rejectEmailLeads: async (emailIds: string[]): Promise<ApiResponse<{ message: string; rejected_count: number }>> => {
    const userId = getUserId();
    const agentId = getSdrAgentId();
    const url = `/users/${userId}/agents/sdr/${agentId}/email-leads`;

    try {
      // Convert email IDs to objects with log_id field
      const mailLogs = emailIds.map(id => ({ log_id: id }));
      
      const response = await api.delete<ApiResponse<{ message: string; rejected_count: number }>>(url, { 
        data: { 
          user_id: userId,
          mail_logs: mailLogs
        } 
      });
      console.log('🔍 rejectEmailLeads API Response:', response);
      return response;
    } catch (error) {
      console.error('Error rejecting email leads:', error);
      throw error;
    }
  },

  /**
   * Submit ICP (Ideal Customer Profile)
   * POST /users/{user_id}/agents/sdr/{agent_id}/campaigns/{campaign_id}/icp
   */
  submitICP: async (campaignId: string, icpData: unknown): Promise<ApiResponse<{ message: string; icp_id: string }>> => {
    const userId = getUserId();
    const agentId = getSdrAgentId();
    const url = `/users/${userId}/agents/sdr/${agentId}/campaigns/${campaignId}/icp`;

    try {
      const response = await api.post<ApiResponse<{ message: string; icp_id: string }>>(url, icpData);
      console.log('🔍 submitICP API Response:', response);
      return response;
    } catch (error) {
      console.error('Error submitting ICP:', error);
      throw error;
    }
  },

  /**
   * Get knowledge base files
   * GET /users/{user_id}/agents/sdr/{agent_id}/knowledgebase/files
   */
  getKnowledgeBaseFiles: async (): Promise<ApiResponse<KnowledgeBaseFile[]>> => {
    const userId = getUserId();
    const agentId = getSdrAgentId();
    const url = `/users/${userId}/agents/sdr/${agentId}/knowledgebase/files`;

    try {
      const response = await api.get<ApiResponse<KnowledgeBaseFile[]>>(url);
      console.log('🔍 getKnowledgeBaseFiles API Response:', response);
      return response;
    } catch (error) {
      console.error('Error fetching knowledge base files:', error);
      throw error;
    }
  },

  /**
   * Get campaign details
   * GET /users/{user_id}/agents/sdr/{agent_id}/campaigns/{campaign_id}/details
   */
  getCampaignDetails: async (campaignId: string): Promise<ApiResponse<CampaignDetails>> => {
    const userId = getUserId();
    const agentId = getSdrAgentId();
    const url = `/users/${userId}/agents/sdr/${agentId}/campaigns/${campaignId}/details`;

    try {
      const response = await api.get<ApiResponse<CampaignDetails>>(url);
      console.log('🔍 getCampaignDetails API Response:', response);
      return response;
    } catch (error) {
      console.error('Error fetching campaign details:', error);
      throw error;
    }
  },

  /**
   * Approve leads
   * POST /users/{user_id}/agents/sdr/{agent_id}/approve-leads
   */
  approveLeads: async (leads: Lead[]): Promise<ApiResponse<unknown>> => {
    const userId = getUserId();
    const agentId = getSdrAgentId();
    const url = `/users/${userId}/agents/sdr/${agentId}/approve-leads`;

    // Transform leads to the required format
    const leadsData = leads.map(lead => ({
      lead_id: lead.lead_id,
      agent_id: lead.agent_id,
      campaign_id: lead.campaign_id,
      campaign_name: lead.campaign_name,
      name: lead.name,
      email: lead.email,
      phone: lead.phone || '',
      organization: lead.organization,
      designation: lead.designation,
      linkedin_url: lead.linkedin_url || '',
      website: lead.website || '',
      contact_method: ['email'], // Default contact method
      status: lead.status,
      task_id: lead.task_id,
      task_status: lead.task_status
    }));

    const requestBody: LeadApprovalRequest = {
      user_id: userId,
      leads: leadsData
    };

    try {
      const response = await api.post<ApiResponse<unknown>>(url, requestBody);
      console.log('🔍 approveLeads API Response:', response);
      return response;
    } catch (error) {
      console.error('Error approving leads:', error);
      throw error;
    }
  }
};
