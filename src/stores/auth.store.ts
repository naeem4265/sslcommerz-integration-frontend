import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { AuthService } from '@/services/api.service'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  // State
  const token = ref<string | null>(localStorage.getItem('token'))
  const refreshToken = ref<string | null>(localStorage.getItem('refreshToken'))
  const user = ref<any>(JSON.parse(localStorage.getItem('user') || 'null'))
  
  // Getters
  const isLoggedIn = computed(() => !!token.value)
  
  // Actions
  async function login(credentials: { email: string; password: string }) {
    try {
      const response = await AuthService.login(credentials)
      console.log('Login response:', response.data)
      
      // Check for accessToken in response
      if (!response.data.accessToken) {
        console.error('No accessToken received in login response')
        throw new Error('Authentication failed - no accessToken received')
      }
      
      setAuthData({
        token: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        user: response.data.user
      })
      
      console.log('Auth data set, token exists:', !!token.value)
      return response
    } catch (error) {
      console.error('Login error in auth store:', error)
      throw error
    }
  }
  
  function setAuthData(authData: { token: string; refreshToken?: string; user?: any }) {
    console.log('Setting auth data with token:', !!authData.token)
    
    if (!authData.token) {
      console.error('Attempted to set auth data with null/undefined token')
      return
    }
    
    token.value = authData.token
    localStorage.setItem('token', authData.token)
    
    if (authData.refreshToken) {
      refreshToken.value = authData.refreshToken
      localStorage.setItem('refreshToken', authData.refreshToken)
    }
    
    if (authData.user) {
      user.value = authData.user
      localStorage.setItem('user', JSON.stringify(authData.user))
    }
  }
  
  async function logout() {
    try {
      if (token.value) {
        await AuthService.logout()
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      clearAuthData()
      router.push('/login')
    }
  }
  
  function clearAuthData() {
    token.value = null
    refreshToken.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
  }
  
  function checkAuth() {
    return !!token.value
  }
  
  return {
    token,
    refreshToken,
    user,
    isLoggedIn,
    login,
    logout,
    setAuthData,
    clearAuthData,
    checkAuth
  }
}) 