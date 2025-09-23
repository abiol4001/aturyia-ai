import DashboardLayout from '@/components/dashboard/DashboardLayout'
import React from 'react'
import { RefreshCcw, Target, Users, Mail, Calendar, TrendingUp, ArrowUpRight, Clock, BarChart3, LineChart, List, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const AnalyticsPage = () => {
  return (
    <DashboardLayout agentType="sdr">
      <div className="space-y-6 bg-gray-50 h-full overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-1">Track your campaign performance and engagement metrics</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <RefreshCcw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Top Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Campaigns */}
          <Card className="bg-white border border-gray-200">
            <CardContent className="px-6 py-2">
              <div className="">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-orange-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Total Campaigns</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900 mt-1">0</p>
                  <p className="text-sm text-orange-600 mt-1">0 active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Leads */}
          <Card className="bg-white border border-gray-200">
            <CardContent className="px-6 py-2">
              <div className="">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Total Leads</p>
                  
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900 mt-1">0</p>
                  <p className="text-sm text-orange-600 mt-1">0.0% conversion</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emails Sent */}
          <Card className="bg-white border border-gray-200">
            <CardContent className="px-6 py-2">
              <div className="">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-orange-600" />
                  </div>
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Emails Sent</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900 mt-1">0</p>
                  <p className="text-sm text-orange-600 mt-1">0.0% response rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Meetings */}
          <Card className="bg-white border border-gray-200">
            <CardContent className="px-6 py-2">
              <div className="">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-orange-600" />
                  </div>
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Meetings</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900 mt-1">0</p>
                  <p className="text-sm text-orange-600 mt-1">0.0% accepted</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance and Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Campaign Performance */}
          <Card className="bg-white border border-gray-200 lg:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">Campaign Performance</CardTitle>
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowUpRight className="w-4 h-4 text-orange-600" />
              </Button>
            </CardHeader>
            <CardContent className="p-6 border-t">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-center">No campaign data available yet</p>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border border-gray-200 lg:col-span-2 bg-gray-50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
                <span className="text-sm text-gray-500">LAST 30 DAYS</span>
              </div>
            </CardHeader>
            <CardContent className="p-6 border-t">
              <div className="space-y-4">
                {/* Emails Sent */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-gray-900 font-medium">Emails Sent</span>
                  </div>
                  <span className="text-lg font-semibold text-gray-900">0</span>
                </div>

                {/* Meetings Scheduled */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-gray-900 font-medium">Meetings Scheduled</span>
                  </div>
                  <span className="text-lg font-semibold text-gray-900">0</span>
                </div>

                {/* Leads Generated */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-gray-900 font-medium">Leads Generated</span>
                  </div>
                  <span className="text-lg font-semibold text-gray-900">0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Charts Section */}
        <div className="space-y-6">
          {/* Top Three Panels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Lead Status Distribution */}
            <Card className="bg-white border border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold text-gray-900">Lead Status Distribution</CardTitle>
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-orange-600" />
                </div>
              </CardHeader>
              <CardContent className="p-6 border-t">
                <div className="flex items-center justify-center h-48">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">No data available</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email Performance */}
            <Card className="bg-white border border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold text-gray-900">Email Performance</CardTitle>
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-orange-600" />
                </div>
              </CardHeader>
              <CardContent className="p-6 border-t">
                <div className="flex items-center justify-center h-48">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">No data available</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Campaign Overview */}
            <Card className="bg-white border border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold text-gray-900">Campaign Overview</CardTitle>
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-orange-600" />
                </div>
              </CardHeader>
              <CardContent className="p-6 border-t">
                <div className="flex items-center justify-center h-48">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">No data available</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Trends Chart */}
          <Card className="bg-white border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold text-gray-900">Monthly Trends</CardTitle>
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <LineChart className="w-4 h-4 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent className="p-6 border-t">
              <div className="space-y-4">
                {/* Chart Title */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900">Monthly Trends</h3>
                </div>
                
                {/* Legend */}
                <div className="flex justify-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-3 bg-blue-500 rounded-sm"></div>
                    <span className="text-sm text-gray-600">Emails Sent</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-3 bg-green-500 rounded-sm"></div>
                    <span className="text-sm text-gray-600">Responses</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-3 bg-purple-500 rounded-sm"></div>
                    <span className="text-sm text-gray-600">Meetings</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-3 bg-orange-500 rounded-sm"></div>
                    <span className="text-sm text-gray-600">Leads</span>
                  </div>
                </div>

                {/* Chart Area */}
                <div className="relative h-64 bg-gray-50 rounded-lg border border-gray-200">
                  {/* Y-axis */}
                  <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between py-4">
                    <span className="text-xs text-gray-500 text-right">1.0</span>
                    <span className="text-xs text-gray-500 text-right">0.8</span>
                    <span className="text-xs text-gray-500 text-right">0.6</span>
                    <span className="text-xs text-gray-500 text-right">0.4</span>
                    <span className="text-xs text-gray-500 text-right">0.2</span>
                    <span className="text-xs text-gray-500 text-right">0</span>
                  </div>
                  
                  {/* Y-axis label */}
                  <div className="absolute left-2 top-1/2 transform -rotate-90 -translate-y-1/2">
                    <span className="text-xs text-gray-500 font-medium">Count</span>
                  </div>
                  
                  {/* Grid lines */}
                  <div className="absolute left-12 right-0 top-0 bottom-0">
                    <div className="h-full flex flex-col justify-between">
                      <div className="border-t border-gray-200"></div>
                      <div className="border-t border-gray-200"></div>
                      <div className="border-t border-gray-200"></div>
                      <div className="border-t border-gray-200"></div>
                      <div className="border-t border-gray-200"></div>
                      <div className="border-t border-gray-200"></div>
                    </div>
                  </div>
                  
                  {/* Chart content area - empty for now */}
                  <div className="absolute left-12 right-0 top-0 bottom-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <LineChart className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500">No trend data available</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Empty State Section */}
        <div className="space-y-6">
          {/* Top Two Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Campaign Details */}
            <Card className="bg-white border border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold text-gray-900">Campaign Details</CardTitle>
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <List className="w-4 h-4 text-orange-600" />
                </div>
              </CardHeader>
              <CardContent className="p-6 border-t">
                <div className="flex items-center justify-center h-48">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">No campaign data available</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Organizations */}
            <Card className="bg-white border border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold text-gray-900">Top Organizations</CardTitle>
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-orange-600" />
                </div>
              </CardHeader>
              <CardContent className="p-6 border-t">
                <div className="flex items-center justify-center h-48">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Building2 className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">No organization data available</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Empty State */}
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <BarChart3 className="w-10 h-10 text-gray-400" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Analytics Data Available</h2>
            
            <p className="text-gray-600 text-center max-w-md mb-8 leading-relaxed">
              Start creating campaigns and generating leads to see your analytics dashboard populate with insights.
            </p>
            
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg">
              <RefreshCcw className="w-4 h-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default AnalyticsPage