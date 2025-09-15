"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, Trash2, MoreVertical, ChevronDown, Reply, Forward, Mail, X, Check, Edit, Clock } from 'lucide-react';

interface Message {
  id: number;
  from: string;
  avatar: string;
  time: string;
  subject: string;
  content: string;
}

interface EmailThread {
  subject: string;
  sender: string;
  email: string;
  messages: Message[];
}

type EmailVariant = 'inbox' | 'approvals' | 'sent';

interface EmailDetailsProps {
  selectedEmail: string | null;
  emailThread: Record<string, EmailThread>;
  variant?: EmailVariant;
  // Action callbacks
  onReply?: () => void;
  onForward?: () => void;
  onMarkAsRead?: () => void;
  onStar?: () => void;
  onDelete?: () => void;
  onMore?: () => void;
  // Approval-specific callbacks
  onApprove?: () => void;
  onReject?: () => void;
  onEdit?: () => void;
  onMail?: () => void;
  // Sent-specific callbacks
  onResend?: () => void;
  onSchedule?: () => void;
  // Custom styling
  headerActions?: React.ReactNode;
  footerActions?: React.ReactNode;
}

export default function EmailDetails({
  selectedEmail,
  emailThread,
  variant = 'inbox',
  onReply,
  onForward,
  onMarkAsRead,
  onStar,
  onDelete,
  onMore,
  onApprove,
  onReject,
  onEdit,
  onMail,
  onResend,
  onSchedule,
  headerActions,
  footerActions
}: EmailDetailsProps) {
  // Extract initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!selectedEmail || !emailThread[selectedEmail]) {
    return (
      <div className="flex-1 bg-white flex flex-col">
        <div className="flex-1 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <Mail className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">No email selected</p>
            <p className="text-sm">Choose an email from the list to view its content</p>
          </div>
        </div>
      </div>
    );
  }

  const currentEmail = emailThread[selectedEmail];

  // Render variant-specific header actions
  const renderHeaderActions = () => {
    if (headerActions) return headerActions;
    
    switch (variant) {
      case 'approvals':
        return (
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={onEdit}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onMail}>
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        );
      case 'sent':
        return (
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={onStar}>
              <Star className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onMore}>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        );
      default: // inbox
        return (
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={onStar}>
              <Star className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onMore}>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        );
    }
  };

  // Render variant-specific footer actions
  const renderFooterActions = () => {
    if (footerActions) return footerActions;
    
    switch (variant) {
      case 'approvals':
        return (
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={onReject}
              className="flex items-center space-x-2 px-6 py-2 text-gray-700 border-gray-300 hover:bg-red-50 hover:border-red-300 hover:text-red-700"
            >
              <X className="h-4 w-4" />
              <span>Reject</span>
            </Button>
            <Button
              onClick={onApprove}
              className="flex items-center space-x-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Check className="h-4 w-4" />
              <span>Approve</span>
            </Button>
          </div>
        );
      case 'sent':
        return (
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={onResend}>
              <Mail className="h-4 w-4 mr-2" />
              Resend
            </Button>
            <Button variant="outline" size="sm" onClick={onSchedule}>
              <Clock className="h-4 w-4 mr-2" />
              Schedule
            </Button>
            <Button variant="outline" size="sm" onClick={onForward}>
              <Forward className="h-4 w-4 mr-2" />
              Forward
            </Button>
          </div>
        );
      default: // inbox
        return (
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={onReply}>
              <Reply className="h-4 w-4 mr-2" />
              Reply
            </Button>
            <Button variant="outline" size="sm" onClick={onForward}>
              <Forward className="h-4 w-4 mr-2" />
              Forward
            </Button>
            <Button variant="outline" size="sm" onClick={onMarkAsRead}>
              <Mail className="h-4 w-4 mr-2" />
              Mark as Read
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 bg-white relative" style={{ maxHeight: 'calc(100vh - 80px)' }}>
      {/* Email Header */}
      <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row md:justify-between">
        <div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {getInitials(currentEmail.sender)}
              </span>
            </div>
            <div>
              <h2 className="font-medium text-gray-900">{currentEmail.sender}</h2>
              <p className="text-sm text-gray-600">{currentEmail.email}</p>
            </div>
          </div>
          <h1 className="text-lg font-semibold text-gray-900 mt-4">
            {currentEmail.subject}
          </h1>
        </div>

        <div className="flex flex-col gap-3 space-x-4">
          {renderHeaderActions()}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">All Channels</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Email Thread - Scrollable Content */}
      <div 
        className="overflow-y-auto p-6 space-y-6"
        style={{ 
          maxHeight: 'calc(100vh - 300px)',
          minHeight: '200px'
        }}
      >
        {currentEmail.messages.map((message) => (
          <div key={message.id} className="border-l-4 border-orange-500 pl-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-xs">
                  {getInitials(message.from)}
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

      {/* Footer Actions - Fixed at bottom */}
      <div className="absolute bottom-5 left-0 right-0 px-6 py-3 border-t border-gray-200 bg-gray-50">
        {renderFooterActions()}
      </div>
    </div>
  );
}
