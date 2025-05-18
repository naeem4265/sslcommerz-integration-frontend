/**
 * API Routes - Centralized configuration for all API endpoints
 * Used across the application to maintain consistency and enable easy updates
 */

// Base API URL - can be changed based on environment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';

// API versions
const V1 = '/api/v1';

// Auth endpoints
const AUTH = {
  LOGIN: (params?: any) => `${V1}/admin/auth/login`,
  REFRESH_TOKEN: (params?: any) => `${V1}/admin/auth/refresh`,
  LOGOUT: (params?: any) => `${V1}/admin/auth/logout`,
};

// Payment endpoints
const PAYMENTS = {
  LIST: `${V1}/registration`,
  DETAILS: (id: string) => `${V1}/admin/payments/${id}`,
  UPDATE: (id: string) => `${V1}/admin/payments/${id}`,
  INITIATE: `${V1}/payment/initiate`,
  VERIFY: `${V1}/payment/verify`,
};

// Dashboard endpoints
const DASHBOARD = {
  STATS: `${V1}/admin/dashboard/stats`,
  RECENT: `${V1}/admin/dashboard/recent`,
  DEPARTMENTS: `${V1}/admin/dashboard/departments`,
};

// Registration endpoints
const REGISTRATION = {
  SUBMIT: `${V1}/registration`,
  VERIFY: `${V1}/registration/verify`,
};

// Export all routes
export const API_ROUTES = {
  BASE_URL: API_BASE_URL,
  AUTH,
  PAYMENTS,
  DASHBOARD,
  REGISTRATION,
};

// Default export for easier imports
export default API_ROUTES; 