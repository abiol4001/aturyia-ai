import DashboardLayout from '@/components/dashboard/DashboardLayout'
import React from 'react'
import { 
  Users,
  Clock,
  Mail,
  MessageCircle
} from 'lucide-react'
import { CampaignBreadcrumb } from './components/CampaignBreadcrumb'
import { CampaignActions } from './components/CampaignActions'
import { createClient } from '@/utils/supabase/server'
import { CampaignDetails } from '@/lib/api/types'

// Helper function to parse comma-separated strings into arrays
const parseCommaSeparated = (str: string | undefined): string[] => {
  if (!str) return []
  return str.split(',').map(item => item.trim()).filter(item => item.length > 0)
}

interface PageProps {
  params: Promise<{ id: string }>
}

// Server-side function to get campaign details
async function getCampaignDetails(campaignId: string): Promise<{ campaign: CampaignDetails | null; error: string | null }> {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return { campaign: null, error: 'User not authenticated' }
    }

    // Get SDR agent ID from user metadata or a default
    const agentId = user.user_metadata?.sdr_agent_id || 'agent_3a7f04bcf6dc67e014f0e527002fac18'
    
    // Get the session for access token
    const { data: { session } } = await supabase.auth.getSession()
    
    // Make API call with server-side fetch
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
    const response = await fetch(`${apiUrl}/users/${user.id}/agents/sdr/${agentId}/campaigns/${campaignId}/details`, {
      headers: {
        'Authorization': `Bearer ${session?.access_token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()
    
    console.log("Single campaign data", data.data)
    return { campaign: data.data, error: null }
  } catch (err) {
    console.error('Error fetching campaign details:', err)
    return { campaign: null, error: 'Failed to load campaign details' }
  }
}

const CampaignDetailsPage = async ({ params }: PageProps) => {
  // Await params before using its properties (Next.js 15+ requirement)
  const { id } = await params
  
  // Fetch campaign data server-side
  const { campaign, error } = await getCampaignDetails(id)

  // Calculate metrics from campaign data
  const leadsCount = campaign?.leads?.length || 0
  const emailsSent = campaign?.leads?.reduce((total, lead) => total + lead.email_logs.length, 0) || 0
  const pendingApprovals = campaign?.leads?.filter(lead => 
    lead.email_logs.some(log => log.status === 'pending')
  ).length || 0
  const leadReplies = campaign?.leads?.filter(lead => 
    lead.email_logs.some(log => log.response_received)
  ).length || 0

  if (error) {
    return (
      <DashboardLayout agentType="sdr">
        <div className="p-6">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Campaign</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!campaign) {
    return (
      <DashboardLayout agentType="sdr">
        <div className="p-6">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Campaign Not Found</h2>
            <p className="text-gray-600">The requested campaign could not be found.</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }
  
  return (
    <DashboardLayout agentType="sdr">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          {/* Breadcrumb - Client Component for navigation */}
          <CampaignBreadcrumb campaignId={id} campaignName={campaign.campaign_name} />
          
              {/* Title and Menu */}
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">{campaign.campaign_name}</h1>
                <CampaignActions 
                  campaignId={id} 
                  campaignName={campaign.campaign_name}
                  campaignData={{
                    productName: campaign.icp?.product_name || '',
                    organization: campaign.icp?.product_org || '',
                    website: campaign.icp?.product_website || '',
                    overview: campaign.icp?.product_overview || '',
                    industries: parseCommaSeparated(campaign.icp?.industry),
                    companySizes: parseCommaSeparated(campaign.icp?.company_size),
                    revenues: parseCommaSeparated(campaign.icp?.revenue),
                    locations: parseCommaSeparated(campaign.icp?.locations),
                    locationReasons: parseCommaSeparated(campaign.icp?.location_reason),
                    growthStages: [
                      ...parseCommaSeparated(campaign.icp?.startup_stage),
                      ...parseCommaSeparated(campaign.icp?.seed_stage),
                      ...parseCommaSeparated(campaign.icp?.growth_stage),
                      ...parseCommaSeparated(campaign.icp?.expansion_stage),
                      ...parseCommaSeparated(campaign.icp?.maturity_stage),
                      ...parseCommaSeparated(campaign.icp?.decline_renewal_stage)
                    ],
                    decisionMakerTitles: parseCommaSeparated(campaign.icp?.decision_maker_titles),
                    decisionMakerResponsibilities: parseCommaSeparated(campaign.icp?.decision_maker_responsibilities),
                    painPoints: parseCommaSeparated(campaign.icp?.pain_points),
                    goals: parseCommaSeparated(campaign.icp?.goals),
                    valuePropositions: parseCommaSeparated(campaign.icp?.value_proposition),
                    proofPoints: parseCommaSeparated(campaign.icp?.proof_points)
                  }}
                />
              </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Leads Generated Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-gray-900 animate-count-up">{leadsCount}</div>
              <div className="text-sm text-gray-600">Leads Generated</div>
            </div>
          </div>

          {/* Pending Approvals Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-gray-900 animate-count-up">{pendingApprovals}</div>
              <div className="text-sm text-gray-600">Pending Approvals</div>
            </div>
          </div>

          {/* Emails Sent Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-gray-900 animate-count-up">{emailsSent}</div>
              <div className="text-sm text-gray-600">Emails Sent</div>
            </div>
          </div>

          {/* Lead Replies Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-gray-900 animate-count-up">{leadReplies}</div>
              <div className="text-sm text-gray-600">Lead Replies</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CampaignDetailsPage