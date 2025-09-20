import { QueryClient } from '@tanstack/react-query';

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Time in milliseconds that data remains fresh
      staleTime: 5 * 60 * 1000, // 5 minutes
      
      // Time in milliseconds that unused/inactive cache data remains in memory
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      
      // Retry failed requests
      retry: (failureCount, error: unknown) => {
        // Don't retry on 4xx errors (client errors)
        if (error && typeof error === 'object' && 'response' in error && 
            error.response && typeof error.response === 'object' && 'status' in error.response &&
            typeof error.response.status === 'number' && 
            error.response.status >= 400 && error.response.status < 500) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      
      // Retry delay with exponential backoff
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Refetch on window focus
      refetchOnWindowFocus: false,
      
      // Refetch on reconnect
      refetchOnReconnect: true,
      
      // Refetch on mount
      refetchOnMount: true,
    },
    mutations: {
      // Retry failed mutations
      retry: (failureCount, error: unknown) => {
        // Don't retry on 4xx errors
        if (error && typeof error === 'object' && 'response' in error && 
            error.response && typeof error.response === 'object' && 'status' in error.response &&
            typeof error.response.status === 'number' && 
            error.response.status >= 400 && error.response.status < 500) {
          return false;
        }
        // Retry up to 2 times for mutations
        return failureCount < 2;
      },
      
      // Retry delay for mutations
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    },
  },
});

// Query key factory for consistent key generation
export const queryKeys = {
  // SDR Agent related keys
  sdr: {
    all: ['sdr'] as const,
    status: (orgId?: string) => [...queryKeys.sdr.all, 'status', orgId] as const,
    config: () => [...queryKeys.sdr.all, 'config'] as const,
    profile: () => [...queryKeys.sdr.all, 'profile'] as const,
  },
  
  // User related keys
  users: {
    all: ['users'] as const,
    profile: () => [...queryKeys.users.all, 'profile'] as const,
  },
} as const;

export default queryClient;