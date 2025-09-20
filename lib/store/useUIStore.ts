"use client";

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// UI State Interface
export interface UIState {
  // Theme
  theme: 'light' | 'dark' | 'system';
  
  // Sidebar
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  
  // Modals
  modals: {
    agentProfile: boolean;
    settings: boolean;
    notifications: boolean;
  };
  
  // Notifications
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    timestamp: number;
    read: boolean;
  }>;
  
  // Loading states
  loading: {
    global: boolean;
    sidebar: boolean;
    modals: boolean;
  };
  
  // User preferences
  preferences: {
    language: string;
    timezone: string;
    dateFormat: string;
    itemsPerPage: number;
    autoRefresh: boolean;
    refreshInterval: number;
  };
}

// UI Actions Interface
export interface UIActions {
  // Theme actions
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleTheme: () => void;
  
  // Sidebar actions
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebarCollapsed: () => void;
  
  // Modal actions
  openModal: (modal: keyof UIState['modals']) => void;
  closeModal: (modal: keyof UIState['modals']) => void;
  closeAllModals: () => void;
  
  // Notification actions
  addNotification: (notification: Omit<UIState['notifications'][0], 'id' | 'timestamp' | 'read'>) => void;
  removeNotification: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearAllNotifications: () => void;
  
  // Loading actions
  setLoading: (key: keyof UIState['loading'], loading: boolean) => void;
  setGlobalLoading: (loading: boolean) => void;
  
  // Preferences actions
  updatePreferences: (preferences: Partial<UIState['preferences']>) => void;
  resetPreferences: () => void;
  
  // Reset all state
  resetUIState: () => void;
}

// Initial state
const initialState: UIState = {
  theme: 'system',
  sidebarOpen: true,
  sidebarCollapsed: false,
  modals: {
    agentProfile: false,
    settings: false,
    notifications: false,
  },
  notifications: [],
  loading: {
    global: false,
    sidebar: false,
    modals: false,
  },
  preferences: {
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    itemsPerPage: 10,
    autoRefresh: true,
    refreshInterval: 30000, // 30 seconds
  },
};

// Create the UI store
export const useUIStore = create<UIState & UIActions>()(
  persist(
    (set) => ({
      ...initialState,
      
      // Theme actions
      setTheme: (theme) => set({ theme }),
      
      toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light'
      })),
      
      // Sidebar actions
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      
      toggleSidebar: () => set((state) => ({
        sidebarOpen: !state.sidebarOpen
      })),
      
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      
      toggleSidebarCollapsed: () => set((state) => ({
        sidebarCollapsed: !state.sidebarCollapsed
      })),
      
      // Modal actions
      openModal: (modal) => set((state) => ({
        modals: {
          ...state.modals,
          [modal]: true
        }
      })),
      
      closeModal: (modal) => set((state) => ({
        modals: {
          ...state.modals,
          [modal]: false
        }
      })),
      
      closeAllModals: () => set(() => ({
        modals: {
          agentProfile: false,
          settings: false,
          notifications: false,
        }
      })),
      
      // Notification actions
      addNotification: (notification) => set((state) => {
        const newNotification = {
          ...notification,
          id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          timestamp: Date.now(),
          read: false,
        };
        
        const updatedNotifications = [newNotification, ...state.notifications];
        
        // Keep only last 50 notifications
        return {
          notifications: updatedNotifications.slice(0, 50)
        };
      }),
      
      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      })),
      
      markNotificationAsRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => 
          n.id === id ? { ...n, read: true } : n
        )
      })),
      
      markAllNotificationsAsRead: () => set((state) => ({
        notifications: state.notifications.map(n => ({ ...n, read: true }))
      })),
      
      clearAllNotifications: () => set(() => ({ notifications: [] })),
      
      // Loading actions
      setLoading: (key, loading) => set((state) => ({
        loading: {
          ...state.loading,
          [key]: loading
        }
      })),
      
      setGlobalLoading: (loading) => set((state) => ({
        loading: {
          ...state.loading,
          global: loading
        }
      })),
      
      // Preferences actions
      updatePreferences: (preferences) => set((state) => ({
        preferences: { ...state.preferences, ...preferences }
      })),
      
      resetPreferences: () => set({ preferences: initialState.preferences }),
      
      // Reset all state
      resetUIState: () => set(() => initialState),
    }),
    {
      name: 'app-ui-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
        sidebarCollapsed: state.sidebarCollapsed,
        preferences: state.preferences,
      }),
    }
  )
);

