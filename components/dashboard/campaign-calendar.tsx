"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

interface Campaign {
  id: number;
  name: string;
  schedule: string;
  status: string;
}

interface CampaignEvent {
  date: number;
  campaigns: Campaign[];
}

interface CampaignCalendarProps {
  events?: CampaignEvent[];
  onDateClick?: (date: number, month: number, year: number) => void;
  className?: string;
}

const CampaignCalendar: React.FC<CampaignCalendarProps> = ({
  events = [],
  onDateClick,
  className = ""
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const handleDateClick = (day: number) => {
    if (onDateClick) {
      onDateClick(day, currentDate.getMonth(), currentDate.getFullYear());
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Campaign Calendar</h2>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateMonth('prev')}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-lg font-semibold text-gray-900 min-w-[140px] text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateMonth('next')}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day Headers */}
          {dayNames.map((day) => (
            <div key={day} className="p-2 text-center text-sm font-semibold text-white bg-gray-600">
              {day}
            </div>
          ))}
          
          {/* Calendar Days */}
          {days.map((day, index) => {
            const dayEvents = day ? events.find(event => event.date === day) : null;
            const hasEvents = dayEvents && dayEvents.campaigns.length > 0;
            const eventCount = dayEvents?.campaigns.length || 0;
            const isToday = day === new Date().getDate() && 
                           currentDate.getMonth() === new Date().getMonth() && 
                           currentDate.getFullYear() === new Date().getFullYear();
            
            return (
              <div
                key={index}
                className={`p-2 h-16 border group border-gray-200 flex flex-col items-center justify-start relative ${
                  isToday ? 'bg-gray-100' : 'bg-white'
                } ${!day ? 'bg-gray-50' : 'hover:bg-gray-50 cursor-pointer'}`}
                onClick={() => day && handleDateClick(day)}
              >
                {day && (
                  <>
                    <span className={`text-sm  ${isToday ? 'font-bold text-orange-600' : 'text-gray-900'}`}>
                      {day}
                    </span>
                    {hasEvents && (
                      <div className="absolute bottom-1 right-1">
                        <div className="w-3 h-3 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
                          <span className="text-xs text-white font-bold">{eventCount}</span>
                        </div>
                        
                        {/* Hover Popup */}
                        <div className="absolute bottom-6 right-0 w-80 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                          <div className="p-4 space-y-3">
                            <h3 className="font-semibold text-gray-900 text-sm">Active Campaigns</h3>
                            <div className="space-y-2">
                              {dayEvents?.campaigns.map((campaign) => (
                                <div key={campaign.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                      {campaign.name}
                                    </p>
                                  </div>
                                  <div className="flex items-center text-xs text-gray-500 ml-2">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {campaign.schedule}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          {/* Arrow pointing down */}
                          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CampaignCalendar;
