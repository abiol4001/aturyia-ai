"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { 
  Megaphone, 
  Users, 
  Inbox, 
  MessageCircle, 
  BarChart3, 
  Link as LinkIcon, 
  BookOpen, 
  Bell, 
  Settings 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface SidebarProps {
  agentType?: 'sdr' | 'custom';
  user?: User | null;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  section: 'outbound' | 'management';
}

const navItems: NavItem[] = [
  // Outbound Section
  { name: 'Campaigns', href: '/library/sdr/campaigns', icon: Megaphone, section: 'outbound' },
  { name: 'Leads', href: '/library/sdr/leads', icon: Users, section: 'outbound' },
  { name: 'Inbox', href: '/library/sdr/inbox', icon: Inbox, section: 'outbound' },
  
  // Management Section
  { name: 'Chat', href: '/library/sdr/chat', icon: MessageCircle, section: 'management' },
  { name: 'Analytics', href: '/library/sdr/analytics', icon: BarChart3, section: 'management' },
  { name: 'Integrations', href: '/library/sdr/integrations', icon: LinkIcon, section: 'management' },
  { name: 'Knowledge Base', href: '/library/sdr/knowledge', icon: BookOpen, section: 'management' },
  { name: 'Notifications', href: '/library/sdr/notifications', icon: Bell, section: 'management' },
  { name: 'Settings', href: '/library/sdr/settings', icon: Settings, section: 'management' },
];

export default function Sidebar({ agentType = 'sdr', user }: SidebarProps) {
  const pathname = usePathname();

  // Filter navigation items based on agent type
  const basePath = agentType === 'custom' ? '/library/custom' : '/library/sdr';
  const filteredNavItems = navItems.map(item => ({
    ...item,
    href: item.href.replace('/library/sdr', basePath)
  }));

  const outboundItems = filteredNavItems.filter(item => item.section === 'outbound');
  const managementItems = filteredNavItems.filter(item => item.section === 'management');

  return (
    <div className="w-60 flexshrink-0 bg-white border-r border-gray-200 h-[100vh] flex flex-col">
      {/* Logo */}
      <div className="p-5 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Image src="/assets/logo.png" alt="Aturiya AI" width={32} height={32} /> 
          <span className="text-xl font-bold text-gray-900">Aturiya AI</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-8">
        {/* Outbound Section */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Outbound
          </h3>
          <nav className="space-y-1">
            {outboundItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-amber-50 text-amber-700 border-l-4 border-amber-500"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Management Section */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Management
          </h3>
          <nav className="space-y-1">
            {managementItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-amber-50 text-amber-700 border-l-4 border-amber-500"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
