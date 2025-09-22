"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import SearchInput from '@/components/ui/search-input';
import { 
  ChevronLeft, 
  MessageSquare, 
  BarChart3,
  Pencil,
  MoreVertical,
  Paperclip,
  Send,
  Save,
  RefreshCcw,
  ChartArea
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const ChatPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [conversations, setConversations] = useState([
    {
      id: '1',
      title: 'Campaign Strategy Discussion',
      lastMessage: 'Let me help you optimize your campaign...',
      messages: [
        {
          id: '1',
          content: 'Hi there! How can I assist you with your SDR campaign today?',
          timestamp: '2025-01-15T09:30:00Z',
          sender: 'SDR Agent'
        },
        {
          id: '2',
          content: 'I need help setting up a new campaign for our product launch.',
          timestamp: '2025-01-15T09:32:00Z',
          sender: 'User'
        },
        {
          id: '3',
          content: 'Great! Let me help you optimize your campaign strategy. What industry are you targeting?',
          timestamp: '2025-01-15T09:33:00Z',
          sender: 'SDR Agent'
        },
        {
          id: '4',
          content: 'We\'re targeting SaaS companies with 50-500 employees.',
          timestamp: '2025-01-15T09:35:00Z',
          sender: 'User'
        },
        {
          id: '5',
          content: 'Perfect! I can help you create targeted messaging for that segment. Let me set up some templates.',
          timestamp: '2025-01-15T09:36:00Z',
          sender: 'SDR Agent'
        }
      ],
      date: 'Jan 15',
      timestamp: '9:36 AM'
    },
    {
      id: '2',
      title: 'Lead Qualification Help',
      lastMessage: 'Here are the best practices for lead scoring...',
      messages: [
        {
          id: '6',
          content: 'Good morning! I need help with lead qualification criteria.',
          timestamp: '2025-01-16T08:15:00Z',
          sender: 'User'
        },
        {
          id: '7',
          content: 'I\'d be happy to help! What specific aspects of lead qualification are you struggling with?',
          timestamp: '2025-01-16T08:16:00Z',
          sender: 'SDR Agent'
        },
        {
          id: '8',
          content: 'We\'re getting too many unqualified leads. How can we improve our targeting?',
          timestamp: '2025-01-16T08:18:00Z',
          sender: 'User'
        },
        {
          id: '9',
          content: 'Here are the best practices for lead scoring: 1) Define your ideal customer profile clearly 2) Use firmographic data 3) Track engagement signals. Would you like me to help you set up a scoring system?',
          timestamp: '2025-01-16T08:20:00Z',
          sender: 'SDR Agent'
        }
      ],
      date: 'Jan 16',
      timestamp: '8:20 AM'
    },
    {
      id: '3',
      title: 'Email Template Review',
      lastMessage: 'Your email templates look great!',
      messages: [
        {
          id: '10',
          content: 'Can you review my email templates for the new campaign?',
          timestamp: '2025-01-17T14:30:00Z',
          sender: 'User'
        },
        {
          id: '11',
          content: 'Absolutely! Please share your templates and I\'ll provide detailed feedback.',
          timestamp: '2025-01-17T14:31:00Z',
          sender: 'SDR Agent'
        },
        {
          id: '12',
          content: 'Here\'s my cold outreach template: "Hi [Name], I noticed your company recently...',
          timestamp: '2025-01-17T14:33:00Z',
          sender: 'User'
        },
        {
          id: '13',
          content: 'Your email templates look great! The personalization is spot-on. I suggest adding a clear call-to-action and keeping the subject line under 50 characters.',
          timestamp: '2025-01-17T14:35:00Z',
          sender: 'SDR Agent'
        },
        {
          id: '14',
          content: 'The personalization is spot-on. I suggest adding a clear call-to-action and keeping the subject line under 50 characters.',
          timestamp: '2025-01-18T14:35:00Z',
          sender: 'SDR Agent'
        },
        {
          id: '15',
          content: 'I suggest adding a clear call-to-action and keeping the subject line under 50 characters.',
          timestamp: '2025-09-21T14:35:00Z',
          sender: 'SDR Agent'
        }
      ],
      date: 'Jan 17',
      timestamp: '2:35 PM'
    }
  ]);

  const handleConversationClick = (conversationId: string) => {
    setSelectedConversation(conversationId);
    // Scroll to bottom when switching conversations
    setTimeout(() => scrollToBottom(), 100);
  };

  // Group messages by date
  const groupMessagesByDate = (messages: { id: string; content: string; timestamp: string; sender: string }[]) => {
    const groups: { [key: string]: { id: string; content: string; timestamp: string; sender: string }[] } = {};
    
    messages.forEach(message => {
      const date = new Date(message.timestamp).toDateString();
      if (!groups[date]) groups[date] = [];
      groups[date].push(message);
    });
    
    return groups;
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle search functionality
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conversation => {
    if (!searchQuery || searchQuery.trim() === '') return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      conversation.title.toLowerCase().includes(searchLower) ||
      conversation.lastMessage.toLowerCase().includes(searchLower)
    );
  });

  const createNewChat = () => {
    const newChatId = Date.now().toString();
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    const dateString = now.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });

    const newChat = {
      id: newChatId,
      title: `New Chat ${conversations.length + 1}`,
      lastMessage: 'Hi there! How can I assist you...',
      messages: [], // Start with empty messages for new chat
      date: dateString,
      timestamp: timeString
    };

    setConversations(prev => [newChat, ...prev]);
    setSelectedConversation(newChatId);
  };

  const handleSendMessage = () => {
    if (message.trim() && selectedConversation) {
      const now = new Date();
      const userMessage = {
        id: Date.now().toString(),
        content: message.trim(),
        timestamp: now.toISOString(),
        sender: 'User'
      };

      // Add user message to the current conversation
      setConversations(prev => prev.map(conv => 
        conv.id === selectedConversation 
          ? {
              ...conv,
              messages: [...(conv.messages || []), userMessage],
              lastMessage: userMessage.content,
              timestamp: now.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
              })
            }
          : conv
      ));

      setMessage('');

      // Scroll to bottom after user message
      setTimeout(() => scrollToBottom(), 100);

      // Simulate agent response after a short delay
      setTimeout(() => {
        const agentResponse = {
          id: (Date.now() + 1).toString(),
          content: "I understand your message. How can I help you further with your SDR campaign?",
          timestamp: new Date().toISOString(),
          sender: 'SDR Agent'
        };

        setConversations(prev => prev.map(conv => 
          conv.id === selectedConversation 
            ? {
                ...conv,
                messages: [...conv.messages, agentResponse],
                lastMessage: agentResponse.content
              }
            : conv
        ));

        // Scroll to bottom after agent response
        setTimeout(() => scrollToBottom(), 100);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto-resize textarea based on content
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  return (
    <DashboardLayout agentType="sdr">
      <div className="h-full flex bg-gray-50">
        {/* Left Sidebar */}
        <div className={`${sidebarCollapsed ? 'w-16' : 'w-80'} bg-gray-100 border-r border-gray-200 transition-all duration-300 flex flex-col`}>
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 hover:bg-gray-200"
              >
                <ChevronLeft className={`w-4 h-4 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
              </Button>
              {!sidebarCollapsed && (
                <Button 
                  onClick={createNewChat}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-lg font-medium"
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  New Chat
                </Button>
              )}
            </div>
          </div>

          {!sidebarCollapsed && (
            <>
              {/* Search Bar */}
              <div className="p-4">
                <SearchInput
                  placeholder="Search conversations..."
                  onSearch={handleSearch}
                  className="w-full"
                />
              </div>

              {/* Recent Conversations */}
              <div className="flex-1 px-4 pb-4 overflow-y-auto">
                <div className="space-y-2">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => handleConversationClick(conversation.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedConversation === conversation.id
                          ? 'bg-white border-orange-200 shadow-sm'
                          : 'bg-white border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-semibold text-gray-900 text-sm">{conversation.title}</div>
                      <div className="text-gray-600 text-xs mt-1">{conversation.lastMessage}</div>
                      <div className="text-gray-400 text-xs mt-2">{conversation.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-white">
          {selectedConversation ? (
            // Conversation View
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between py-2.5 px-4 border-b border-gray-200">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {conversations.find(conv => conv.id === selectedConversation)?.title || 'New Chat'}
                  </h2>
                  <p className="text-sm text-gray-500">Ready to assist</p>
                </div>
              
                <Popover>
                  <PopoverTrigger>
                  <MoreVertical className="w-5 h-5" />
                  </PopoverTrigger>
                  <PopoverContent className='mr-6 text-sm w-fit'>
                    <div className='space-y-2'>
                      <div className='flex items-center gap-2 cursor-pointer w-full hover:bg-gray-50 p-2 rounded-md'>
                        <Save className='w-3 h-3' />
                        <span>Save</span>
                      </div>
                      <div className='flex items-center gap-2 cursor-pointer w-full hover:bg-gray-50 p-2 rounded-md'>
                        <RefreshCcw className='w-3 h-3' />
                        <span>Reset</span>
                      </div>
                      <div className='flex items-center gap-2 cursor-pointer w-full hover:bg-gray-50 p-2 rounded-md'>
                        <ChartArea className='w-3 h-3' />
                        <span>View Results</span>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Chat Messages Area */}
              <div className="flex-1 overflow-y-auto p-4">
                {(() => {
                  const currentConversation = conversations.find(conv => conv.id === selectedConversation);
                  const messages = currentConversation?.messages || [];
                  
                  if (messages.length === 0) {
                    return (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No messages yet. Start the conversation!</p>
                      </div>
                    );
                  }

                  const groupedMessages = groupMessagesByDate(messages);
                  
                  return Object.entries(groupedMessages).map(([date, dayMessages]) => (
                    <div key={date}>
                      {/* Date Separator */}
                      <div className="text-center mb-6">
                        <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                          {(() => {
                            const messageDate = new Date(date);
                            const today = new Date();
                            const yesterday = new Date(today);
                            yesterday.setDate(yesterday.getDate() - 1);
                            
                            const isToday = messageDate.toDateString() === today.toDateString();
                            const isYesterday = messageDate.toDateString() === yesterday.toDateString();
                            
                            if (isToday) {
                              return 'Today';
                            } else if (isYesterday) {
                              return 'Yesterday';
                            } else {
                              return messageDate.toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              });
                            }
                          })()}
                        </span>
                      </div>
                      
                      {/* Messages for this day */}
                      {dayMessages.map((message) => (
                        <div key={message.id} className={`flex items-end space-x-3 mb-6 ${message.sender === 'User' ? 'flex-row-reverse' : ''}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.sender === 'User' 
                              ? 'bg-blue-100' 
                              : 'bg-orange-100'
                          }`}>
                            <span className={`font-semibold text-sm ${
                              message.sender === 'User' 
                                ? 'text-blue-600' 
                                : 'text-orange-600'
                            }`}>
                              {message.sender === 'User' ? 'U' : 'S'}
                            </span>
                          </div>
                          <div className={`flex-1 ${message.sender === 'User' ? 'flex flex-col items-end' : ''}`}>
                            <div className={`flex items-center space-x-2 mb-1 ${message.sender === 'User' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                              <span className="font-semibold text-gray-900 text-sm">{message.sender}</span>
                              <span className="text-gray-400 text-xs">
                                {new Date(message.timestamp).toLocaleTimeString('en-US', { 
                                  hour: 'numeric', 
                                  minute: '2-digit',
                                  hour12: true 
                                })}
                              </span>
                            </div>
                            <div className={`rounded-lg px-4 py-3 max-w-md ${
                              message.sender === 'User' 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-orange-50 text-gray-800'
                            }`}>
                              <p className="text-sm">{message.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ));
                })()}
                
                {/* Scroll trigger element */}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input Area */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="sm" className="p-2">
                    <Paperclip className="w-5 h-5 text-gray-400" />
                  </Button>
                  <div className="flex-1">
                    <Textarea
                      ref={textareaRef}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message here..."
                      className="border-gray-300 resize-none min-h-[50px] max-h-[150px] overflow-y-auto"
                      rows={1}
                    />
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            // Empty State
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-md mx-auto px-6">
                {/* Chat Icon */}
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-10 h-10 text-white" />
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Start a New Chat</h1>

                {/* Description */}
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Click the &quot;New Chat&quot; button to begin chatting with our AI Assistant.
                </p>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <Button 
                    onClick={createNewChat}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-lg font-medium text-base"
                  >
                    <Pencil className="w-5 h-5 mr-2" />
                    New Chat
                  </Button>
                  
                  <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium text-base">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    View Assets
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChatPage;