"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Search, Filter, Star, Trash2, MoreVertical, ChevronDown, Clock, Mail, Reply, Forward, InboxIcon, SendHorizonal, MailCheck, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

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

interface Message {
  id: number;
  from: string;
  avatar: string;
  time: string;
  subject: string;
  content: string;
}

const Inbox = () => {
  const [selectedEmail, setSelectedEmail] = useState('dan-spitale');
  const [activeTab, setActiveTab] = useState('inbox');

  const inboxEmails = [
    {
      id: 'dan-spitale',
      sender: 'Dan Spitale',
      email: 'Eleena.Kidangen@business2businesslimited.com',
      subject: '11x.AI Alice Sales Campaign',
      preview: 'Great campaign, and yes, I am very much interested in this. Before the call, let...',
      time: '01:42 PM',
      unread: 1,
      isSelected: true,
      avatar: 'DS'
    },
    // {
    //   id: 'cary-redman',
    //   sender: 'Cary Redman',
    //   email: 'cary@example.com',
    //   subject: 'Campaign Interest',
    //   preview: 'Hello, This looks like a nice campaign. Yes, I am very much interested in this...',
    //   time: '01:42 PM',
    //   unread: 1,
    //   isSelected: false,
    //   avatar: 'CR'
    // }
  ];

  const approvalEmails = [
    {
      id: 'approval-1',
      sender: 'Sarah Johnson',
      email: 'sarah@techcorp.com',
      subject: 'Meeting Request Approval',
      preview: 'Please approve the meeting request for next week. I need your confirmation...',
      time: '02:15 PM',
      unread: 0,
      isSelected: false,
      avatar: 'SJ'
    },
    {
      id: 'approval-2',
      sender: 'Mike Chen',
      email: 'mike@startup.com',
      subject: 'Budget Approval Required',
      preview: 'The quarterly budget needs your approval before we can proceed with...',
      time: '01:30 PM',
      unread: 1,
      isSelected: false,
      avatar: 'MC'
    }
  ];

  const sentEmails = [
    {
      id: 'sent-1',
      sender: 'You',
      email: 'acme@company.com',
      subject: 'Follow-up on Meeting',
      preview: 'Thank you for the great meeting yesterday. As discussed, I will send...',
      time: '11:20 AM',
      unread: 0,
      isSelected: false,
      avatar: 'AS'
    },
    {
      id: 'sent-2',
      sender: 'You',
      email: 'acme@company.com',
      subject: 'Proposal Attached',
      preview: 'Please find the proposal attached. Let me know if you have any questions...',
      time: '10:45 AM',
      unread: 0,
      isSelected: false,
      avatar: 'AS'
    }
  ];

  const emailThread: Record<string, { subject: string; sender: string; email: string; messages: Message[] }> = {
    'dan-spitale': {
      subject: 'Sales Campaign',
      sender: 'Lorem Ipsum',
      email: 'lorem.ipsum@email.com',
      messages: [
        {
          id: 1,
          from: 'Acme SDR',
          avatar: 'AS',
          time: '12:38 PM',
          subject: 'Dan — 20-30 min to cut SDR admin & book 30% more meetings with Alice',
          content: `Hi Dan,

Open To New Opportunities as VP of Sales / Chief Revenue Officer / Chief Commercial Officer

I noticed you're open to new opportunities in sales leadership. I wanted to reach out because I think you'd be interested in what we're doing at 11x.ai.

We've been working on solving some of the biggest challenges in SaaS and enterprise software:

• lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
• Lorem ipsum dolor sit amet


We built Alice, an AI SDR that handles the entire outbound process - from research to personalized outreach to follow-up. Our pilot customers saw ~30% more meetings and 50% less admin.

Would you be available for a 20-30 minute call next week? I can do:
• Tue, Sep 9 at 10:00 AM PT
• Thu, Sep 11 at 11:00 AM PT

Best regards,
Acme SDR Sales
Acme Corporation`
        },
        {
          id: 2,
          from: 'Dan Spitale',
          avatar: 'DS',
          time: '01:42 PM',
          subject: 'Re: Dan - 20-30 min to cut SDR admin & book 30% more meetings with Alice',
          content: `Great campaign, and yes, I am very much interested in this. Before the call, let me know if there is anything I should be prepared for before the call.

Best,`
        }
      ]
    },
    'approval-1': {
      subject: 'Meeting Request Approval',
      sender: 'Sarah Johnson',
      email: 'sarah@techcorp.com',
      messages: [
        {
          id: 1,
          from: 'Sarah Johnson',
          avatar: 'SJ',
          time: '02:15 PM',
          subject: 'Meeting Request Approval - Q4 Planning Session',
          content: `Hi Team,

I need approval for the Q4 planning session meeting request. Here are the details:

Meeting Details:
• Date: October 15th, 2025
• Time: 2:00 PM - 4:00 PM EST
• Attendees: Sales Team, Marketing Team, Product Team
• Location: Conference Room A (or virtual)

Agenda:
• Q4 revenue targets review
• Marketing campaign planning
• Product roadmap discussion
• Resource allocation

Please confirm your availability and let me know if any changes are needed.

Thanks,
Sarah`
        },
        {
          id: 2,
          from: 'You',
          avatar: 'AS',
          time: '02:30 PM',
          subject: 'Re: Meeting Request Approval - Q4 Planning Session',
          content: `Hi Sarah,

Approved! The meeting looks good. I'll send out the calendar invites to all attendees.

Best regards,
Acme SDR`
        }
      ]
    },
    'approval-2': {
      subject: 'Budget Approval Required',
      sender: 'Mike Chen',
      email: 'mike@startup.com',
      messages: [
        {
          id: 1,
          from: 'Mike Chen',
          avatar: 'MC',
          time: '01:30 PM',
          subject: 'Q4 Marketing Budget Approval - $50,000',
          content: `Hi Team,

I need approval for the Q4 marketing budget allocation. Here's the breakdown:

Budget Allocation:
• Digital Marketing: $25,000
• Content Creation: $10,000
• Events & Conferences: $8,000
• Tools & Software: $5,000
• Miscellaneous: $2,000

This budget will help us achieve our Q4 goals of:
• 25% increase in lead generation
• 15% improvement in conversion rates
• 30% growth in brand awareness

Please review and approve by end of week.

Thanks,
Mike`
        }
      ]
    },
    'sent-1': {
      subject: 'Follow-up on Meeting',
      sender: 'You',
      email: 'acme@company.com',
      messages: [
        {
          id: 1,
          from: 'You',
          avatar: 'AS',
          time: '11:20 AM',
          subject: 'Follow-up on Meeting - Next Steps',
          content: `Hi Team,

Thank you for the productive meeting yesterday. Here's a summary of our discussion and next steps:

Key Takeaways:
• Q4 targets are ambitious but achievable
• Marketing budget approved for additional campaigns
• Product roadmap aligned with sales goals
• New hire onboarding process improved

Next Steps:
• Sarah: Finalize marketing campaign details by Friday
• Mike: Prepare budget breakdown for Q1 2026
• John: Schedule follow-up with key prospects
• All: Review and provide feedback on new proposal template

Let me know if you have any questions or need clarification on any points.

Best regards,
Acme SDR`
        },
        {
          id: 2,
          from: 'Sarah Johnson',
          avatar: 'SJ',
          time: '11:45 AM',
          subject: 'Re: Follow-up on Meeting - Next Steps',
          content: `Thanks for the summary! I'll have the marketing campaign details ready by Friday.

Sarah`
        }
      ]
    },
    'sent-2': {
      subject: 'Proposal Attached',
      sender: 'You',
      email: 'acme@company.com',
      messages: [
        {
          id: 1,
          from: 'You',
          avatar: 'AS',
          time: '10:45 AM',
          subject: 'Proposal Attached - Enterprise Solution Package',
          content: `Hi Team,

Please find the attached proposal for our Enterprise Solution Package. This comprehensive proposal includes:

Package Details:
• AI-powered lead generation
• Automated follow-up sequences
• Advanced analytics dashboard
• Dedicated account manager
• 24/7 support

Pricing:
• Setup fee: $5,000
• Monthly subscription: $2,500
• Additional features: Custom pricing

Timeline:
• Implementation: 2-3 weeks
• Training: 1 week
• Go-live: End of month

Please review and let me know if you need any modifications or have questions.

Best regards,
Acme SDR`
        }
      ]
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSelectedEmail(''); // Deselect email when switching tabs
  };

  const renderEmailList = (emails: Email[]) => (
    <div className="flex-1 overflow-y-auto">
      {emails.map((email) => (
        <div
          key={email.id}
          className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
            email.isSelected ? 'bg-gray-50' : ''
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
                <h3 className="font-medium text-gray-900 truncate">{email.sender}</h3>
                <span className="text-xs text-gray-500">{email.time}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{email.preview}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <DashboardLayout agentType="sdr">
      <Tabs defaultValue="inbox" value={activeTab} onValueChange={handleTabChange} className="h-screen flex flex-col bg-gray-50">

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - Email List */}
          <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
            {/* Sticky Header */}
            <div className="sticky top-0 bg-white z-10 px-2 pt-2">
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
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Search leads..." 
                    className="pl-8 border-none outline-none"
                  />
                </div>
                <div className="flex items-center space-x-1.5">
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

              {/* Tab Content for Email Lists */}
              <TabsContent value="inbox" className="flex-1 flex flex-col m-0">
                {renderEmailList(inboxEmails)}
              </TabsContent>
              <TabsContent value="approvals" className="flex-1 flex flex-col m-0">
                {renderEmailList(approvalEmails)}
              </TabsContent>
              <TabsContent value="sent" className="flex-1 flex flex-col m-0">
                {renderEmailList(sentEmails)}
              </TabsContent>
            </div>

          {/* Right Main Content - Email Details */}
          <div className="flex-1 bg-white flex flex-col">
            {selectedEmail && emailThread[selectedEmail] ? (
              <>
                {/* Email Header */}
                <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row md:justify-between">
                  <div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {getInitials(emailThread[selectedEmail].sender)}
                        </span>
                      </div>
                      <div>
                        <h2 className="font-medium text-gray-900">{emailThread[selectedEmail].sender}</h2>
                        <p className="text-sm text-gray-600">{emailThread[selectedEmail].email}</p>
                      </div>
                    </div>
                    <h1 className="text-lg font-semibold text-gray-900 mt-4">
                      {emailThread[selectedEmail].subject}
                    </h1>
                  </div>

                  <div className="flex flex-col gap-3 space-x-4">
                    <div className="">
                      <Button variant="ghost" size="icon">
                        <Star className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">All Channels</span>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                

                {/* Email Thread */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {emailThread[selectedEmail].messages.map((message) => (
                    <div key={message.id} className="border-l-4 border-orange-500 pl-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-xs">
                            {message.avatar}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">{message.from}</span>
                          <span className="text-sm text-gray-500 ml-2">{message.time}</span>
                        </div>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-2">{message.subject}</h3>
                      <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reply Section */}
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" size="sm">
                      <Reply className="h-4 w-4 mr-2" />
                      Reply
                    </Button>
                    <Button variant="outline" size="sm">
                      <Forward className="h-4 w-4 mr-2" />
                      Forward
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Mark as Read
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Mail className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">No email selected</p>
                  <p className="text-sm">Choose an email from the list to view its content</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Tabs>
    </DashboardLayout>
  );
};

export default Inbox;