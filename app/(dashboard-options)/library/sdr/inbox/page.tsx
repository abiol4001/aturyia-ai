import DashboardLayout from '@/components/dashboard/DashboardLayout'
import DashboardPage from '@/components/dashboard/DashboardPage'
import React from 'react'

const Inbox = () => {
  return (
    <DashboardLayout agentType="sdr">
      <div className="space-y-8">
        Inbox
      </div>
    </DashboardLayout>
  )
}

export default Inbox