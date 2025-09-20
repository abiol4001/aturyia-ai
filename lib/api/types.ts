// Common API response types
export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

// Removed PaginatedResponse - not used in the application

export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
  status: number;
}

// Removed User type - using Supabase User type instead

// Common filter types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// SDR Agent Configuration Types
export interface SDRConfigurationData {
  agent_id: string;
  session: {
    id: string;
    user_id: string;
    org_id: string;
    agent_id: string;
    configured: boolean;
    launched: boolean;
    created_at: string;
    updated_at: string;
  };
}

export interface SDRLaunchData {
  session: {
    id: string;
    user_id: string;
    org_id: string;
    agent_id: string;
    configured: boolean;
    launched: boolean;
    created_at: string;
    updated_at: string;
  };
}

export interface SDRProfileData {
  name: string;
  tagline?: string;
  organization: string;
  department: string;
  activities: string;
  sector: string;
  avatar?: File;
}

export interface AgentConfig {
  agentId: string | null;
  userId: string | null;
  orgId: string | null;
  configured: boolean;
  launched: boolean;
  sessionId?: string | null;
}

export interface SDRStatusData {
  isActive: boolean;
  isPaused: boolean;
  isError: boolean;
  lastActivity: string | null;
  metrics: {
    totalEmails: number;
    sentEmails: number;
    repliedEmails: number;
    openRate: number;
    replyRate: number;
  } | null;
}

// Campaign Types
export interface Campaign {
  id: string;
  user_id: string;
  agent_id: string;
  name: string;
  icp_summary: string;
  created_at: string;
  integrations: {
    emails: Array<{
      SERVICE: string;
      ACCOUNT_ID: string[];
    }>;
    phones: Array<{
      SERVICE: string;
      ACCOUNT_ID: string[];
      NUMBER: string;
    }>;
    calendars: Array<{
      SERVICE: string;
      ACCOUNT_ID: string[];
    }>;
    apps: string[];
    accounts: string[];
  };
  schedules: {
    START: string;
    END: string;
    DAYS: string[];
  };
}

export interface CampaignFilters extends PaginationParams {
  status?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface CampaignStats {
  totalCampaigns: number;
  activeCampaigns: number;
  pausedCampaigns: number;
  completedCampaigns: number;
  totalEmailsSent: number;
  totalMeetingsBooked: number;
  averageOpenRate: number;
  averageReplyRate: number;
}

// Lead Types
export interface Lead {
  lead_id: string;
  agent_id: string;
  campaign_id: string;
  task_id: string;
  task_status: 'approved' | 'pending' | 'rejected';
  campaign_name: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  designation: string;
  linkedin_url: string;
  website: string | null;
  status: 'approved' | 'pending' | 'rejected';
  type: 'old' | 'new';
  created_at: string;
}

export interface LeadFilters extends PaginationParams {
  status?: 'approved' | 'pending' | 'rejected';
  search?: string;
  campaign_id?: string;
  task_status?: 'approved' | 'pending' | 'rejected';
  type?: 'old' | 'new';
  date_from?: string;
  date_to?: string;
}

export interface LeadStats {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  qualifiedLeads: number;
  convertedLeads: number;
  conversionRate: number;
  averageResponseTime: number;
}

// Mail Log Types
export interface MailLog {
  log_id: string;
  campaign_id: string;
  campaign_name: string;
  task_id: string;
  lead_id: string;
  lead_name: string;
  lead_email: string;
  mail_subject: string;
  agent_email: string;
  agent_mail_content: string | null;
  lead_mail_content: string | null;
  user_mail_content: string | null;
  files: unknown | null;
  status: 'pending' | 'sent' | 'delivered' | 'opened' | 'replied' | 'bounced' | 'failed';
  response_received: boolean;
  thread_id: string | null;
  message_id: string | null;
  direction: 'incoming' | 'outgoing';
  service: string;
  created_at: string;
  user_name: string | null;
  google_event_id: string | null;
  google_event_link: string | null;
  scheduled_start_time: string | null;
  scheduled_end_time: string | null;
  timezone: string | null;
  meeting_duration_minutes: number | null;
  is_recurring: boolean | null;
  recurring_pattern: string | null;
  meeting_response_status: string | null;
  response_timestamp: string | null;
}

export interface MailLogFilters extends PaginationParams {
  status?: string;
  direction?: 'incoming' | 'outgoing';
  search?: string;
  campaign_id?: string;
  lead_id?: string;
  date_from?: string;
  date_to?: string;
  thread_id?: string;
}

export interface MailLogStats {
  totalEmails: number;
  sentEmails: number;
  receivedEmails: number;
  openedEmails: number;
  repliedEmails: number;
  bounceRate: number;
  openRate: number;
  replyRate: number;
  averageResponseTime: number;
}