"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Settings, LogOut } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UserMenuProps {
  userEmail: string;
}

// Generate consistent color based on email
function getAvatarColor(email: string): string {
  const colors = [
    'bg-blue-500',
    'bg-green-500', 
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-red-500',
    'bg-yellow-500',
    'bg-teal-500',
    'bg-orange-500',
    'bg-cyan-500',
  ];
  
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
}

// Get first letter of first name from email
function getInitial(email: string): string {
  const name = email.split('@')[0];
  return name.charAt(0).toUpperCase();
}

export default function UserMenu({ userEmail }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  
  const avatarColor = getAvatarColor(userEmail);
  const initial = getInitial(userEmail);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };
//todo: add settings page
  const handleSettings = () => {
    // Navigate to settings page when implemented
    // router.push("/settings");
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          className={`relative h-10 w-10 rounded-full ${avatarColor} hover:none cursor-pointer transition-opacity`}
        >
          <span className="text-white font-semibold text-sm">{initial}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-full ${avatarColor} flex items-center justify-center`}>
              <span className="text-white font-semibold text-sm">{initial}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Account</p>
              <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
            </div>
          </div>
        </div>
        
        <div className="p-2">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-10 px-3"
            onClick={handleSettings}
          >
            <Settings className="h-4 w-4" />
            <span className="text-sm">Account Settings</span>
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-10 px-3 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            <span className="text-sm">Logout</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
