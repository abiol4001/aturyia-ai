"use client";

import React from 'react';
import DashboardPage from '@/components/dashboard/DashboardPage';

const CustomAgentCampaigns = () => {
  const handlePause = () => {
    console.log('Pause custom agent campaign');
  };

  const handleEdit = () => {
    console.log('Edit custom agent campaign');
  };

  const handleMenu = () => {
    console.log('Open custom agent menu');
  };

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
