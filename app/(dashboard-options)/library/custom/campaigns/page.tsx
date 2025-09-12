"use client";

import React from 'react';
import DashboardPage from '@/components/dashboard/DashboardPage';

const CustomAgentCampaigns = () => {

  return (
    <DashboardPage
      agentType="custom"
      campaignName="Custom AI Marketing Campaign"
      campaignId="custom-12345"
      status="running"
    >
      <div>Custom</div>
    </DashboardPage>
  );
};

export default CustomAgentCampaigns;
