"use client";

import React, { useState, useCallback } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Filter, Trash2, Clock, InboxIcon, SendHorizonal, MailCheck, ChevronLeft, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import EmailDetails from '@/components/dashboard/email-details';
import { useMailLogs, useApproveEmailLeads, useRejectEmailLeads } from '@/lib/api/hooks/useApi';
import { MailLogFilters, MailLog } from '@/lib/api/types';
import SearchInput from '@/components/ui/search-input';

interface Email {
  id: string;
  sender: string;
  email: string;
  subject: string;
  preview: string;
  time: string;
  unread: number;
  isSelected: boolean;
  avatar: string;
}


const Inbox = () => {
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('inbox');
  const [filters] = useState<MailLogFilters>({});
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch mail logs and stats from API
  const { 
    data: mailLogsResponse, 
    isLoading: mailLogsLoading, 
    error: mailLogsError,
    refetch: refetchMailLogs 
  } = useMailLogs(filters);

  // Email approval hooks
  const approveEmailLeads = useApproveEmailLeads();
  const rejectEmailLeads = useRejectEmailLeads();

  // TODO: Enable when stats endpoint is available
  // const { 
  //   data: statsResponse
  // } = useMailLogStats();

  const allMailLogs = mailLogsResponse?.data || [];
  
  // Client-side filtering for search
  const filteredMailLogs = allMailLogs.filter(mailLog => {
    if (!searchQuery || searchQuery.trim() === '') return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      (mailLog.lead_name && mailLog.lead_name.toLowerCase().includes(searchLower)) ||
      (mailLog.lead_email && mailLog.lead_email.toLowerCase().includes(searchLower)) ||
      (mailLog.mail_subject && mailLog.mail_subject.toLowerCase().includes(searchLower)) ||
      (mailLog.campaign_name && mailLog.campaign_name.toLowerCase().includes(searchLower))
    );
  });
  
  const mailLogs = filteredMailLogs;
  const stats = null; // Disabled until stats endpoint is available

  // Debug logging
  console.log('🔍 Mail Logs API Response:', mailLogsResponse);
  console.log('📧 Mail Logs Data:', mailLogs);
  console.log('📈 Mail Stats:', stats);

  // Transform API data into email format
  const transformMailLogToEmail = (mailLog: MailLog): Email => {
    try {
      const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
      };

      const senderName = mailLog.direction === 'incoming' 
        ? (mailLog.lead_name || 'Unknown')
        : 'You';

      // Get the appropriate content based on direction
      const content = mailLog.direction === 'incoming' 
        ? (mailLog.lead_mail_content || mailLog.user_mail_content)
        : mailLog.agent_mail_content;

      // Strip HTML tags for preview
      const stripHtml = (html: string | null) => {
        if (!html) return '';
        return html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
      };

      const previewContent = content ? stripHtml(content) : 'No preview available';
      const preview = previewContent.length > 100 ? previewContent.substring(0, 100) + '...' : previewContent;

      return {
        id: mailLog.log_id || 'unknown-id',
        sender: senderName,
        email: mailLog.direction === 'incoming' 
          ? mailLog.lead_email 
          : mailLog.agent_email || 'agent@company.com',
        subject: mailLog.mail_subject || 'No Subject',
        preview: preview || 'No preview available',
        time: mailLog.created_at ? 
          new Date(mailLog.created_at).toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          }) : 
          'Unknown time',
        unread: mailLog.status === 'pending' ? 1 : 0,
        isSelected: selectedEmail === mailLog.log_id,
        avatar: mailLog.direction === 'incoming' ? getInitials(senderName) : 'AS'
      };
    } catch (error) {
      console.error('Error transforming mail log:', error, mailLog);
      // Return a fallback email object
      return {
        id: mailLog.log_id || 'error-id',
        sender: 'Unknown',
        email: 'unknown@email.com',
        subject: 'Error loading email',
        preview: 'There was an error loading this email',
        time: 'Unknown time',
      unread: 0,
      isSelected: false,
        avatar: '?'
      };
    }
  };

  // Filter emails based on active tab
  const getFilteredEmails = () => {
    const emails = mailLogs.map(transformMailLogToEmail);
    
    switch (activeTab) {
      case 'inbox':
        // Inbox shows incoming emails (from leads)
        return emails.filter(email => 
          email.sender !== 'You'
        );
      case 'approval':
        // Approvals show outgoing emails with pending status
        return emails.filter(email => 
          email.sender === 'You'
        );
      case 'sent':
        // Sent shows completed/delivered emails
        return emails.filter(email => 
          email.sender === 'You' && email.unread === 0
        );
      default:
        return emails;
    }
  };

  const inboxEmails = getFilteredEmails();
  const approvalEmails = mailLogs
    .filter(log => log.direction === 'outgoing' && log.status === 'pending')
    .map(transformMailLogToEmail);
  const sentEmails = mailLogs
    .filter(log => log.direction === 'outgoing' && log.status !== 'pending')
    .map(transformMailLogToEmail);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    // Client-side filtering, no need to update API filters
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedEmail(null);
  };

  const handleApproveEmail = async (emailId: string) => {
    try {
      await approveEmailLeads.mutateAsync([emailId]);
      console.log('Email approved successfully');
    } catch (error) {
      console.error('Error approving email:', error);
    }
  };

  const handleRejectEmail = async (emailId: string) => {
    try {
      await rejectEmailLeads.mutateAsync([emailId]);
      console.log('Email rejected successfully');
    } catch (error) {
      console.error('Error rejecting email:', error);
    }
  };

  // Removed handleBulkApprove function as it's not being used

  // Generate email thread data from API response
  const getEmailThread = (emailId: string) => {
    const mailLog = mailLogs.find(log => log.log_id === emailId);
    if (!mailLog) return null;

    const getInitials = (name: string) => {
      return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const senderName = mailLog.direction === 'incoming' 
      ? (mailLog.lead_name || 'Unknown')
      : 'You';

    // Strip HTML tags for display
    const stripHtml = (html: string | null) => {
      if (!html) return '';
      return html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    };

    // If there's a thread_id, get all messages in the thread
    let threadMessages = [];
    if (mailLog.thread_id) {
      const threadLogs = mailLogs.filter(log => log.thread_id === mailLog.thread_id);
      threadMessages = threadLogs.map((log, index) => {
        const logSenderName = log.direction === 'incoming' 
          ? (log.lead_name || 'Unknown')
          : 'You';
        
        const logContent = log.direction === 'incoming' 
          ? (log.lead_mail_content || log.user_mail_content)
          : log.agent_mail_content;

        return {
          id: index + 1,
          from: logSenderName,
          avatar: getInitials(logSenderName),
          time: log.created_at ? 
            new Date(log.created_at).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            }) : 
            'Unknown time',
          subject: log.mail_subject || 'No Subject',
          content: logContent ? stripHtml(logContent) : 'No content available'
        };
      });
    } else {
      // Single message thread
      const content = mailLog.direction === 'incoming' 
        ? (mailLog.lead_mail_content || mailLog.user_mail_content)
        : mailLog.agent_mail_content;

      threadMessages = [{
          id: 1,
        from: senderName,
        avatar: getInitials(senderName),
        time: mailLog.created_at ? 
          new Date(mailLog.created_at).toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          }) : 
          'Unknown time',
        subject: mailLog.mail_subject || 'No Subject',
        content: content ? stripHtml(content) : 'No content available'
      }];
    }

    return {
      subject: mailLog.mail_subject || 'No Subject',
      sender: senderName,
      email: mailLog.direction === 'incoming' 
        ? mailLog.lead_email 
        : mailLog.agent_email || 'agent@company.com',
      messages: threadMessages
    };
  };



  const renderEmailList = (emails: Email[]) => (
    <div className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)]">
      {mailLogsLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <RefreshCcw className="w-6 h-6 animate-spin mx-auto mb-2 text-orange-500" />
            <p className="text-sm text-gray-600">Loading emails...</p>
          </div>
        </div>
      ) : mailLogsError ? (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <InboxIcon className="w-6 h-6 text-red-500" />
            </div>
            <p className="text-sm text-red-600">Error loading emails</p>
          </div>
        </div>
      ) : emails.length === 0 ? (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <InboxIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No emails found</p>
          </div>
        </div>
      ) : (
        <div className="space-y-0">
      {emails.map((email) => (
        <div
          key={email.id}
          className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-amber-50 ${
            selectedEmail === email.id ? 'bg-gray-100' : ''
          }`}
          onClick={() => setSelectedEmail(email.id)}
        >
          <div className="flex items-start space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {email.avatar}
                </span>
              </div>
              {email.unread > 0 && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{email.unread}</span>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                <h3 className="font-medium text-gray-900 truncate">{email.sender}</h3>
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                        {mailLogs.find(log => log.log_id === email.id)?.service || 'Email'}
                      </span>
                    </div>
                <span className="text-xs text-gray-500">{email.time}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{email.preview}</p>
            </div>
          </div>
        </div>
      ))}
        </div>
      )}
    </div>
  );

  return (
    <DashboardLayout agentType="sdr">
      <Tabs defaultValue="inbox" value={activeTab} onValueChange={handleTabChange} className="h-screen flex flex-col bg-gray-50">

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - Email List */}
          <div className="w-96 bg-white border-r border-gray-200 flex flex-col h-full">
            {/* Sticky Header */}
            <div className="sticky top-0 bg-white z-10 px-2 pt-2 flex-shrink-0">
              <TabsList className="bg-gray-100 w-full">
                <TabsTrigger value="inbox" className="data-[state=active]:bg-white data-[state=active]:text-orange-500">
                  <InboxIcon className="h-4 w-4" />
                  Inbox
                </TabsTrigger>
                <TabsTrigger value="approvals" className="data-[state=active]:bg-white data-[state=active]:text-orange-500">
                  <MailCheck className="h-4 w-4" />
                  Approvals
                </TabsTrigger>
                <TabsTrigger value="sent" className="data-[state=active]:bg-white data-[state=active]:text-orange-500">
                  <SendHorizonal className="h-4 w-4" />
                  Sent
                </TabsTrigger>
              </TabsList>

              {/* Search and Filters */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <SearchInput
                  placeholder="Search emails..."
                  onSearch={handleSearch}
                  className="flex-1"
                  defaultValue={searchQuery}
                />
                <div className="flex items-center space-x-1.5">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={() => refetchMailLogs()}
                    disabled={mailLogsLoading}
                  >
                    <RefreshCcw className={`h-3 w-3 ${mailLogsLoading ? 'animate-spin' : ''}`} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Filter className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Clock className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <ChevronLeft className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Scrollable Email List Container */}
            <div className="flex-1 overflow-hidden">
              <TabsContent value="inbox" className="h-full m-0">
                {renderEmailList(inboxEmails)}
              </TabsContent>
              <TabsContent value="approvals" className="h-full m-0">
                {renderEmailList(approvalEmails)}
              </TabsContent>
              <TabsContent value="sent" className="h-full m-0">
                {renderEmailList(sentEmails)}
              </TabsContent>
            </div>
            </div>

          {/* Right Main Content - Email Details */}
          <EmailDetails
            selectedEmail={selectedEmail}
            emailThread={selectedEmail && getEmailThread(selectedEmail) ? { [selectedEmail]: getEmailThread(selectedEmail)! } : {}}
            variant={activeTab as 'inbox' | 'approvals' | 'sent'}
            onReply={() => console.log('Reply clicked')}
            onForward={() => console.log('Forward clicked')}
            onMarkAsRead={() => console.log('Mark as read clicked')}
            onStar={() => console.log('Star clicked')}
            onDelete={() => console.log('Delete clicked')}
            onMore={() => console.log('More clicked')}
            onApprove={() => selectedEmail && handleApproveEmail(selectedEmail)}
            onReject={() => selectedEmail && handleRejectEmail(selectedEmail)}
            onEdit={() => console.log('Edit clicked')}
            onMail={() => console.log('Mail clicked')}
          />
        </div>
      </Tabs>
    </DashboardLayout>
  );
};

export default Inbox;