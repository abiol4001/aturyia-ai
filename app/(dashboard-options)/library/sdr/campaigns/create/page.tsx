"use client";

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import CreateCampaignForm from '@/components/CreateCampaignForm';

const CreateCampaign = () => {
  return (
    <DashboardLayout agentType="sdr">
      <CreateCampaignForm />
    </DashboardLayout>
  );
};

export default CreateCampaign;