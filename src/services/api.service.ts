/**
 * API Service - Handles all API communication with the backend
 * Uses the centralized API routes for consistent endpoint access
 */

import axios from '@/plugins/axios';
import API_ROUTES from '@/constants/apiRoutes';

/**
 * Authentication Service - Handles login/logout and token management
 */
export const AuthService = {
  /**
   * Log in an admin user
   * @param credentials User login credentials
   * @returns Promise with auth data including token
   */
  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await axios.post(API_ROUTES.AUTH.LOGIN(), credentials);
      
      // Validate the response contains an accessToken
      if (!response.data || !response.data.accessToken) {
        console.error('Login response missing accessToken:', response.data);
        throw new Error('Invalid response from authentication server');
      }
      
      return response;
    } catch (error) {
      console.error('Login API error:', error);
      throw error;
    }
  },

  /**
   * Refresh the authentication token
   * @returns Promise with new token data
   */
  refreshToken: () => {
    return axios.post(API_ROUTES.AUTH.REFRESH_TOKEN());
  },

  /**
   * Log out the current user
   * @returns Promise indicating logout success
   */
  logout: () => {
    return axios.post(API_ROUTES.AUTH.LOGOUT());
  },

  /**
   * Get the current token from storage
   * @returns The stored token or null
   */
  getToken: () => {
    return localStorage.getItem('token');
  },

  /**
   * Save token to local storage
   * @param token The token to save
   */
  saveToken: (token: string) => {
    localStorage.setItem('token', token);
  },

  /**
   * Remove token from storage
   */
  removeToken: () => {
    localStorage.removeItem('token');
  },

  /**
   * Check if user is authenticated
   * @returns Boolean indicating if user is authenticated
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

/**
 * Payment Service - Handles payment operations
 */
export const PaymentService = {
  /**
   * Get all payments with optional filters
   * @param params Optional query parameters (page, limit, sort, etc.)
   * @returns Promise with payment list
   */
  getAll: (params: Record<string, any> = {}) => {
    return axios.get(API_ROUTES.PAYMENTS.LIST, { params });
  },

  /**
   * Get a single payment by ID
   * @param id Payment ID
   * @returns Promise with payment details
   */
  getById: (id: string) => {
    return axios.get(API_ROUTES.PAYMENTS.DETAILS(id));
  },

  /**
   * Initiate a payment
   * @param paymentData Payment initialization data
   * @returns Promise with payment URL and transaction info
   */
  initiate: (paymentData: any) => {
    return axios.post(API_ROUTES.PAYMENTS.INITIATE, paymentData);
  },

  /**
   * Verify a payment
   * @param transactionId The transaction ID to verify
   * @returns Promise with verification result
   */
  verify: (transactionId: string) => {
    return axios.post(API_ROUTES.PAYMENTS.VERIFY, { transactionId });
  }
};

/**
 * Dashboard Service - Handles dashboard data operations
 */
export const DashboardService = {
  /**
   * Get dashboard statistics
   * @returns Promise with stats data
   */
  getStats: () => {
    return axios.get(API_ROUTES.DASHBOARD.STATS);
  },

  /**
   * Get recent registrations
   * @param limit Number of recent items to fetch
   * @returns Promise with recent registration data
   */
  getRecent: (limit = 5) => {
    return axios.get(API_ROUTES.DASHBOARD.RECENT, { params: { limit } });
  },

  /**
   * Get registrations grouped by department
   * @returns Promise with department distribution data
   */
  getDepartments: () => {
    return axios.get(API_ROUTES.DASHBOARD.DEPARTMENTS);
  }
};

/**
 * Registration Service - Handles user registration operations
 */
export const RegistrationService = {
  /**
   * Submit a new registration
   * @param registrationData User registration data
   * @returns Promise with registration result
   */
  submit: (registrationData: any) => {
    return axios.post(API_ROUTES.REGISTRATION.SUBMIT, registrationData);
  },

  /**
   * Verify a registration
   * @param verificationData Verification data
   * @returns Promise with verification result
   */
  verify: (verificationData: any) => {
    return axios.post(API_ROUTES.REGISTRATION.VERIFY, verificationData);
  }
};

// Export all services together
export default {
  auth: AuthService,
  payments: PaymentService,
  dashboard: DashboardService,
  registration: RegistrationService
}; 