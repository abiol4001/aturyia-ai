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
} from "@/components/ui/popover";
import { useChat } from '@/lib/api/hooks/useApi';
import { sdrService } from '@/lib/api/services/sdrService';

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  messages: Array<{
    id: string;
    content: string;
    timestamp: string;
    sender: string;
  }>;
  date: string;
  timestamp: string;
}

const ChatPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Use the chat hook
  const { messages, isLoading, error, sendMessage, clearMessages } = useChat(sdrService);

  const [conversations, setConversations] = useState<Conversation[]>([]);

  // Handle adding new messages to the current conversation
  const addMessageToCurrentConversation = useCallback((message: { id: string; content: string; timestamp: Date; isUser: boolean; threadId?: string }) => {
    if (!selectedConversation) return;
    
    // Create a unique message ID that includes the conversation ID to prevent cross-contamination
    const uniqueMessageId = `${selectedConversation}-${message.id}`;
    
    const conversationMessage = {
      id: uniqueMessageId,
      content: message.content,
      timestamp: message.timestamp.toISOString(),
      sender: message.isUser ? 'User' : 'SDR Agent'
    };
    
    setConversations(prev => prev.map(conv => {
      if (conv.id === selectedConversation) {
        // Check if message already exists to avoid duplicates
        const exists = conv.messages.some(msg => msg.id === uniqueMessageId);
        if (!exists) {
          const updatedMessages = [...conv.messages, conversationMessage];
          // Sort messages by timestamp
          updatedMessages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
          
          return {
            ...conv,
            messages: updatedMessages,
            lastMessage: conversationMessage.content
          };
        }
        return conv;
      }
      return conv;
    }));
  }, [selectedConversation]);

  // Track the last processed message count to only process new messages
  const lastProcessedMessageCount = useRef(0);
  
  // Sync API messages with current conversation only
  useEffect(() => {
    if (selectedConversation && messages.length > 0) {
      // Only process new messages that have been added since the last check
      if (messages.length > lastProcessedMessageCount.current) {
        const newMessages = messages.slice(lastProcessedMessageCount.current);
        
        // Process each new message
        newMessages.forEach(message => {
          if (message && message.timestamp) {
            addMessageToCurrentConversation(message);
          }
        });
        
        // Update the processed count
        lastProcessedMessageCount.current = messages.length;
      }
    }
  }, [messages, selectedConversation, addMessageToCurrentConversation]);

  const handleConversationClick = (conversationId: string) => {
    setSelectedConversation(conversationId);
    // Clear global messages when switching conversations to ensure each chat has independent history
    clearMessages();
    // Reset the processed message count to prevent cross-contamination
    lastProcessedMessageCount.current = 0;
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

    const welcomeMessage = {
      id: `${newChatId}-welcome`,
      content: 'Hi there! How can I assist you today?',
      timestamp: new Date().toISOString(),
      sender: 'SDR Agent'
    };

    const newChat = {
      id: newChatId,
      title: `New Chat ${conversations.length + 1}`,
      lastMessage: 'Hi there! How can I assist you today?',
      messages: [welcomeMessage], // Start with welcome message from SDR agent
      date: dateString,
      timestamp: timeString
    };

    setConversations(prev => [newChat, ...prev]);
    setSelectedConversation(newChatId);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    await sendMessage(inputMessage, selectedFiles);
    setInputMessage('');
    setSelectedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    // Scroll to bottom after sending
    setTimeout(() => scrollToBottom(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    await sendMessage(inputMessage, selectedFiles);
    setInputMessage('');
    setSelectedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
  }, [inputMessage]);

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
                      <div className="text-gray-600 text-xs mt-1 truncate">{conversation.lastMessage}</div>
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
                      <div 
                        className='flex items-center gap-2 cursor-pointer w-full hover:bg-gray-50 p-2 rounded-md'
                        onClick={clearMessages}
                      >
                        <RefreshCcw className='w-3 h-3' />
                        <span>Clear Chat</span>
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
                  // Get messages from the selected conversation only
                  const currentConversation = conversations.find(conv => conv.id === selectedConversation);
                  const conversationMessages = currentConversation?.messages || [];
                  
                  if (conversationMessages.length === 0) {
                    return (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No messages yet. Start the conversation!</p>
                      </div>
                    );
                  }

                  const groupedMessages = groupMessagesByDate(conversationMessages);
                  
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
                        <div key={message.id} className={`flex items-end space-x-1 mb-6 ${message.sender === 'User' ? 'flex-row-reverse gap-x-1' : ''}`}>
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
                            <div className={`rounded-lg px-4 py-3 max-w-md w-fit ${
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
                
                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex items-end space-x-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <span className="font-semibold text-sm text-orange-600">S</span>
                    </div>
                    <div className="flex-1">
                      <div className="rounded-lg px-4 py-3 bg-orange-50 text-gray-800 max-w-md">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error display */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}
                
                {/* Scroll trigger element */}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input Area */}
              <div className="border-t border-gray-200 p-4">
                <form onSubmit={handleSubmit}>
                  <div className="flex items-center space-x-3">
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt,.csv,.xlsx"
                    />
                    <Button 
                      type="button"
                      variant="ghost" 
                      size="sm" 
                      className="p-2"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Paperclip className="w-5 h-5 text-gray-400" />
                    </Button>
                    <div className="flex-1">
                      <Textarea
                        ref={textareaRef}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message here..."
                        className="border-gray-300 resize-none min-h-[50px] max-h-[150px] overflow-y-auto"
                        rows={1}
                        disabled={isLoading}
                      />
                      {selectedFiles.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {selectedFiles.map((file, index) => (
                            <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {file.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <Button
                      type="submit"
                      disabled={!inputMessage.trim() || isLoading}
                      className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </form>
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