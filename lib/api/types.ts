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

// Knowledge Base Types
export interface KnowledgeBaseFile {
  filename: string;
  url: string;
  size: number;
  modified_at: string;
}

// Campaign Details Types
export interface CampaignDetails {
  campaign_id: string;
  campaign_name: string;
  emails: string;
  phones: string;
  calendars: string;
  schedules: string;
  created_at: string;
  leads: CampaignLead[];
  icp: CampaignICP;
}

export interface CampaignLead {
  lead: {
    lead_id: string;
    name: string;
    email: string;
    phone: string;
    organization: string;
    designation: string;
    linkedin_url: string;
    website: string;
    status: string;
  };
  email_logs: EmailLog[];
}

export interface EmailLog {
  log_id: string;
  campaign_id: string;
  campaign_name: string;
  task_id: string;
  lead_id: string;
  lead_name: string;
  lead_email: string;
  mail_subject: string;
  agent_email: string;
  agent_mail_content: string;
  lead_mail_content: string;
  user_mail_content: string;
  files: string[];
  status: string;
  response_received: boolean;
  thread_id: string;
  message_id: string;
  direction: string;
  service: string;
  created_at: string;
  user_name: string;
  google_event_id: string;
  google_event_link: string;
  scheduled_start_time: string;
  scheduled_end_time: string;
  timezone: string;
  meeting_duration_minutes: number;
  is_recurring: boolean;
  recurring_pattern: string;
  meeting_response_status: string;
  response_timestamp: string;
}

export interface CampaignICP {
  industry: string;
  company_size: string;
  revenue: string;
  locations: string;
  location_reason: string;
  startup_stage: string;
  seed_stage: string;
  growth_stage: string;
  expansion_stage: string;
  maturity_stage: string;
  decline_renewal_stage: string;
  decision_maker_titles: string;
  decision_maker_responsibilities: string;
  product_name: string;
  product_org: string;
  product_website: string;
  product_overview: string;
  pain_points: string;
  goals: string;
  value_proposition: string;
  proof_points: string;
}

// Lead Approval Types
export interface LeadApprovalRequest {
  user_id: string;
  leads: LeadApprovalData[];
}

export interface LeadApprovalData {
  lead_id: string;
  agent_id: string;
  campaign_id: string;
  campaign_name: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  designation: string;
  linkedin_url: string;
  website: string;
  contact_method: string[];
  status: string;
  task_id: string;
  task_status: string;
}

// Notification Types
export interface Notification {
  id: string;
  notification_type: string;
  title: string;
  description: string;
  priority: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
  campaign_id?: string;
  campaign_name?: string;
  lead_id?: string;
  lead_name?: string;
  task_id?: string;
  task_status?: string;
}

// Analytics Types
export interface CampaignAnalytics {
  campaign_id: string;
  campaign_name: string;
  created_at: string;
  total_leads: number;
  leads_by_status: Record<string, number>;
  total_emails_sent: number;
  emails_with_responses: number;
  response_rate: number;
  total_meetings_scheduled: number;
  meetings_by_response: Record<string, number>;
  meeting_acceptance_rate: number;
}

export interface EmailAnalytics {
  total_emails_sent: number;
  emails_with_responses: number;
  overall_response_rate: number;
  emails_by_campaign: Record<string, number>;
  response_rate_by_campaign: Record<string, number>;
  emails_by_month: Record<string, number>;
  responses_by_month: Record<string, number>;
}

export interface MeetingAnalytics {
  total_meetings_scheduled: number;
  meetings_by_response_status: Record<string, number>;
  meeting_acceptance_rate: number;
  meetings_by_campaign: Record<string, number>;
  meetings_by_month: Record<string, number>;
  average_meeting_duration: number;
}

export interface LeadAnalytics {
  total_leads: number;
  leads_by_status: Record<string, number>;
  leads_by_campaign: Record<string, number>;
  leads_by_organization: Record<string, number>;
  leads_by_month: Record<string, number>;
  conversion_rate: number;
}

export interface PerformanceMetrics {
  total_campaigns: number;
  active_campaigns: number;
  total_revenue_potential: number;
  average_response_time: number;
  top_performing_campaigns: {
    campaign_id: string;
    campaign_name: string;
    leads_count: number;
    emails_count: number;
    meetings_count: number;
    performance_score: number;
  }[];
  recent_activity: {
    type: string;
    count: number;
    period: string;
  }[];
}

export interface ChartsData {
  campaign_performance: {
    campaign_name: string;
    leads: number;
    emails: number;
    meetings: number;
    response_rate: number;
  }[];
  email_response_rates: unknown[];
  meeting_response_status: unknown[];
  lead_status_distribution: unknown[];
  monthly_trends: {
    emails: Record<string, number>;
    responses: Record<string, number>;
    meetings: Record<string, number>;
    leads: Record<string, number>;
  };
  top_organizations: unknown[];
}

export interface AnalyticsData {
  campaign_analytics: CampaignAnalytics[];
  email_analytics: EmailAnalytics;
  meeting_analytics: MeetingAnalytics;
  lead_analytics: LeadAnalytics;
  performance_metrics: PerformanceMetrics;
  charts_data: ChartsData;
}