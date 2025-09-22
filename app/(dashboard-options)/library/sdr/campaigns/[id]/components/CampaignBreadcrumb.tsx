'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

interface CampaignBreadcrumbProps {
  campaignId: string
  campaignName: string
}

export const CampaignBreadcrumb = ({ campaignId, campaignName }: CampaignBreadcrumbProps) => {
  const router = useRouter()

  const handleBack = () => {
    router.push('/library/sdr/campaigns')
  }

  return (
    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
      <div className='flex items-center gap-2 cursor-pointer hover:text-gray-700' onClick={handleBack}>
        <ArrowLeft className="w-4 h-4" />
        <span>Campaigns</span>
      </div>
      <span>/</span>
      <span className="text-gray-900">{campaignName}</span>
    </div>
  )
}
