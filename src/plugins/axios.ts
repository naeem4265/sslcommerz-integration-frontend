import axios from 'axios'
import API_ROUTES from '@/constants/apiRoutes'
import { useAuthStore } from '@/stores/auth.store'

// Interface for queue promises
interface QueuePromise {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}

// Store for tracking refresh token requests
let isRefreshing = false
let failedQueue: QueuePromise[] = []

// Process the queue of failed requests
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  
  failedQueue = []
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor for adding auth token
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from store if possible, fall back to localStorage
    let token;
    try {
      // Need to use a function to get the store to avoid circular dependency issues
      const authStore = useAuthStore();
      token = authStore.token;
    } catch (e) {
      // Fallback to localStorage if store isn't available
      token = localStorage.getItem('token');
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Adding auth token to request:', config.url);
    } else {
      console.warn('No auth token available for request:', config.url);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling token expiry
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    
    // If error is 401 and we haven't already tried to refresh the token
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If we're already refreshing, add this request to the queue
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(token => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`
            return axiosInstance(originalRequest)
          })
          .catch(err => {
            return Promise.reject(err)
          })
      }
      
      originalRequest._retry = true
      isRefreshing = true
      
      try {
        // Try to refresh the token
        const refreshTokenUrl = API_ROUTES.AUTH.REFRESH_TOKEN()
        const refreshToken = localStorage.getItem('refreshToken')
        
        const response = await axios.post(refreshTokenUrl, 
          { refreshToken }, 
          {
            headers: { 'Content-Type': 'application/json' }
          }
        )
        
        // If refresh successful, update token
        if (response.data.accessToken) {
          const newToken = response.data.accessToken
          localStorage.setItem('token', newToken)
          
          // Also update refresh token if provided
          if (response.data.refreshToken) {
            localStorage.setItem('refreshToken', response.data.refreshToken)
          }
          
          // Update authorization header for original request
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`
          
          // Process any queued requests with the new token
          processQueue(null, newToken)
          
          // Return the original request with new token
          return axiosInstance(originalRequest)
        }
      } catch (refreshError) {
        // If refresh fails, clear auth data
        try {
          // We need to get the auth store dynamically to avoid circular dependency
          const authStore = useAuthStore()
          authStore.clearAuthData()
        } catch (e) {
          // Fallback if store can't be accessed
          localStorage.removeItem('token')
          localStorage.removeItem('refreshToken')
        }
        
        processQueue(refreshError, null)
        
        // Redirect to login page
        if (window.location.pathname !== '/login') {
          window.location.href = '/login'
        }
      } finally {
        isRefreshing = false
      }
    }
    
    // For other errors just reject the promise
    return Promise.reject(error)
  }
)

export default axiosInstance 