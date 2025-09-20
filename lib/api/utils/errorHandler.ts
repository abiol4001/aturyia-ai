import { AxiosError } from 'axios';

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: any;
}

export class ApiErrorHandler {
  static handle(error: unknown): ApiError {
    if (error instanceof AxiosError) {
      return this.handleAxiosError(error);
    }
    
    if (error instanceof Error) {
      return {
        message: error.message,
        code: 'UNKNOWN_ERROR',
        status: 500,
      };
    }
    
    return {
      message: 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR',
      status: 500,
    };
  }
  
  private static handleAxiosError(error: AxiosError): ApiError {
    const { response, request, message } = error;
    
    if (response) {
      // Server responded with error status
      const { status, data } = response;
      
      return {
        message: data?.message || this.getDefaultMessage(status),
        code: data?.code || `HTTP_${status}`,
        status,
        details: data?.details,
      };
    }
    
    if (request) {
      // Request was made but no response received
      return {
        message: 'Network error - please check your connection',
        code: 'NETWORK_ERROR',
        status: 0,
      };
    }
    
    // Something else happened
    return {
      message: message || 'Request setup error',
      code: 'REQUEST_ERROR',
      status: 0,
    };
  }
  
  private static getDefaultMessage(status: number): string {
    switch (status) {
      case 400:
        return 'Bad request - please check your input';
      case 401:
        return 'Unauthorized - please log in again';
      case 403:
        return 'Forbidden - you do not have permission';
      case 404:
        return 'Not found - the requested resource was not found';
      case 409:
        return 'Conflict - the resource already exists';
      case 422:
        return 'Validation error - please check your input';
      case 429:
        return 'Too many requests - please try again later';
      case 500:
        return 'Internal server error - please try again later';
      case 502:
        return 'Bad gateway - service temporarily unavailable';
      case 503:
        return 'Service unavailable - please try again later';
      case 504:
        return 'Gateway timeout - please try again later';
      default:
        return `Error ${status} - something went wrong`;
    }
  }
}

// Utility function to check if error is retryable
export const isRetryableError = (error: ApiError): boolean => {
  if (!error.status) return false;
  
  // Retry on network errors and 5xx server errors
  return error.status >= 500 || error.status === 0;
};

// Utility function to get user-friendly error message
export const getErrorMessage = (error: unknown): string => {
  const apiError = ApiErrorHandler.handle(error);
  return apiError.message;
};

// Utility function to check if error is authentication related
export const isAuthError = (error: ApiError): boolean => {
  return error.status === 401 || error.code === 'UNAUTHORIZED';
};

// Utility function to check if error is validation related
export const isValidationError = (error: ApiError): boolean => {
  return error.status === 422 || error.code === 'VALIDATION_ERROR';
};

// Utility function to check if error is network related
export const isNetworkError = (error: ApiError): boolean => {
  return error.code === 'NETWORK_ERROR' || error.status === 0;
};