"use client";

import React from 'react';
import DashboardLayout from './DashboardLayout';
import CampaignHeader from './CampaignHeader';
import MetricsCards from './MetricsCards';

interface DashboardPageProps {
  agentType: 'sdr' | 'custom';
  campaignName: string;
  campaignId: string;
  status: 'running' | 'paused' | 'stopped';
 
  children?: React.ReactNode;
}

export default function DashboardPage({
  agentType,
  campaignName,
  campaignId,
  status,
  children,
}: DashboardPageProps) {
  return (
    <DashboardLayout agentType={agentType}>
      <div className="space-y-8">
        {/* Custom Content */}
        {children}
      </div>
    </DashboardLayout>
  );
}
