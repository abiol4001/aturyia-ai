import DashboardLayout from '@/components/dashboard/DashboardLayout'
import DashboardPage from '@/components/dashboard/DashboardPage'
import React from 'react'

const Leads = () => {
  return (
    <DashboardLayout agentType="sdr">
      <div className="space-y-8">
        Leads
      </div>
    </DashboardLayout>
  )
}

export default Leads