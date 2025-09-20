/**
 * LocalStorage utility functions for managing user, agent, and configuration data
 */

// User management
export const getUserId = (): string => {
  if (typeof window !== 'undefined') {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      console.warn('User ID not found in localStorage. Make sure user is authenticated.');
      throw new Error('User not authenticated');
    }
    return userId;
  }
  throw new Error('User not authenticated - localStorage not available');
};

export const setUserId = (userId: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user_id', userId);
  }
};

// Organization management
export const getOrgId = (): string => {
  if (typeof window !== 'undefined') {
    const orgId = localStorage.getItem('org_id');
    if (!orgId) {
      console.warn('Organization ID not found in localStorage. Using default.');
      return 'org_000'; // Default org ID for development
    }
    return orgId;
  }
  return 'org_000'; // Default org ID for development
};

export const setOrgId = (orgId: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('org_id', orgId);
  }
};

// Clear user data
export const clearUserData = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user_id');
    localStorage.removeItem('org_id');
  }
};

// SDR Agent management
export const getSdrAgentId = (): string => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('sdr_agent_id') || 'agent_3a7f04bcf6dc67e014f0e527002fac18';
  }
  return 'agent_3a7f04bcf6dc67e014f0e527002fac18';
};

export const setSdrAgentId = (agentId: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('sdr_agent_id', agentId);
  }
};


// Session management
export const getSessionId = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('session_id');
  }
  return null;
};

export const setSessionId = (sessionId: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('session_id', sessionId);
  }
};

// Access token management
// Removed unused access token functions - not used in the application

// Removed generic storage utilities - not used in the application

// Clear all SDR-related storage
export const clearSdrStorage = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('sdr_agent_id');
    localStorage.removeItem('session_id');
  }
};

// Clear all user-related storage
// Removed clearUserStorage - not used in the application
