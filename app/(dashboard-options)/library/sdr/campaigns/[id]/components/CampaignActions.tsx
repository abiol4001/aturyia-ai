'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { MoreVertical, Edit } from 'lucide-react'
import EditCampaignModal from './EditCampaignModal'

interface CampaignActionsProps {
  campaignId: string
  campaignName: string
  campaignData?: {
    productName?: string
    organization?: string
    website?: string
    overview?: string
    industries?: string[]
    companySizes?: string[]
    revenues?: string[]
    locations?: string[]
    locationReasons?: string[]
    growthStages?: string[]
    decisionMakerTitles?: string[]
    decisionMakerResponsibilities?: string[]
    painPoints?: string[]
    goals?: string[]
    valuePropositions?: string[]
    proofPoints?: string[]
  }
}

export const CampaignActions = ({ campaignId, campaignName, campaignData }: CampaignActionsProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleEditCampaign = () => {
    setIsEditModalOpen(true)
  }

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="p-2">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-2" align="end">
          <div className="space-y-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={handleEditCampaign}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Campaign
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <EditCampaignModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        campaignId={campaignId}
        campaignName={campaignName}
        initialData={campaignData}
      />
    </>
  )
}
