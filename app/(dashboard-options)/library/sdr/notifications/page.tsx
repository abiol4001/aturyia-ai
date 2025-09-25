"use client"

import DashboardLayout from '@/components/dashboard/DashboardLayout'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bell, RefreshCw, Check, X, Settings, Loader2 } from 'lucide-react'
import { useNotifications, useUnreadNotificationsCount, useMarkNotificationAsRead, useMarkAllNotificationsAsRead } from '@/lib/api/hooks/useApi'

const Notifications = () => {
  // Fetch notifications and unread count from API
  const { 
    data: notificationsResponse, 
    isLoading: notificationsLoading, 
    error: notificationsError,
    refetch: refetchNotifications
  } = useNotifications({ records: 50 })

  const { 
    data: unreadCountResponse
  } = useUnreadNotificationsCount()

  // Mutations for marking notifications as read
  const markAsRead = useMarkNotificationAsRead()
  const markAllAsRead = useMarkAllNotificationsAsRead()

  const notifications = notificationsResponse?.data || []
  const unreadCount = unreadCountResponse?.data?.unread_count || 0
  const totalCount = notifications.length

  // Helper function to format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return '1d ago'
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  // Handle marking single notification as read
  const handleMarkAsRead = (notificationId: string) => {
    markAsRead.mutate(notificationId)
  }

  // Handle marking all notifications as read
  const handleMarkAllAsRead = () => {
    markAllAsRead.mutate()
  }

  // Handle refresh
  const handleRefresh = () => {
    refetchNotifications()
  }

  return (
    <DashboardLayout agentType="sdr">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{unreadCount}</div>
                <div className="text-sm text-gray-500">UNREAD</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{totalCount}</div>
                <div className="text-sm text-gray-500">TOTAL</div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRefresh}
              disabled={notificationsLoading}
              className="bg-orange-100 text-gray-900 border-orange-200 hover:bg-orange-200"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${notificationsLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleMarkAllAsRead}
              disabled={markAllAsRead.isPending || unreadCount === 0}
              className="bg-orange-100 text-gray-900 border-orange-200 hover:bg-orange-200"
            >
              {markAllAsRead.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Check className="w-4 h-4 mr-2" />
              )}
              Mark all read
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-orange-100 text-gray-900 border-orange-200 hover:bg-orange-200"
            >
              <X className="w-4 h-4 mr-2" />
              Clear all
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {notificationsLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            <span className="ml-2 text-gray-600">Loading notifications...</span>
          </div>
        )}

        {/* Error State */}
        {notificationsError && (
          <div className="text-center py-12">
            <div className="text-red-500 mb-2">Failed to load notifications</div>
            <Button onClick={handleRefresh} variant="outline" size="sm">
              Try Again
            </Button>
          </div>
        )}

        {/* Notifications List */}
        {!notificationsLoading && !notificationsError && (
          <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
            {notifications.map((notification, index: number) => (
              <div 
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                key={String((notification as any).id || (notification as any).notification_id || `notification-${index}`)}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-start space-x-4">
                  {/* Unread Indicator */}
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {!(notification as any).is_read && (
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  )}
                  
                  {/* Notification Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <Badge 
                        variant="secondary" 
                        className="bg-orange-100 text-orange-800 border-orange-200"
                      >
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {String((notification as any).notification_type || 'SYSTEM')}
                      </Badge>
                      <Settings className="w-4 h-4 text-orange-500" />
                    </div>
                    
                    <h3 className="text-sm font-medium text-gray-900 mb-1">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {String((notification as any).title || 'No Title')}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-2">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {String((notification as any).description || 'No description available')}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant="outline" 
                        className="bg-gray-100 text-gray-700 border-gray-300"
                      >
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {String((notification as any).priority || 'MEDIUM')}
                      </Badge>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                          {formatTimestamp(String((notification as any).created_at || new Date().toISOString()))}
                        </span>
                        <button 
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          onClick={() => handleMarkAsRead(String((notification as any).id || (notification as any).notification_id))}
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          disabled={markAsRead.isPending || Boolean((notification as any).is_read)}
                          className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State (if no notifications) */}
        {!notificationsLoading && !notificationsError && notifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-500">You&apos;re all caught up! New notifications will appear here.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default Notifications