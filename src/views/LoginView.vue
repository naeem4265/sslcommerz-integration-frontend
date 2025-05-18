<template>
  <div class="login-page">
    <div class="login-container">
      <h1>Admin Login</h1>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="form-control"
            placeholder="admin@example.com"
          />
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="form-control"
            placeholder="••••••••"
          />
        </div>
        
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        
        <button type="submit" class="login-btn" :disabled="isLoading">
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from '@/plugins/axios'

const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  try {
    errorMessage.value = ''
    isLoading.value = true
    
    const response = await axios.post('/api/auth/login', {
      email: email.value,
      password: password.value
    })
    
    // Store the token
    const token = response.data.token
    localStorage.setItem('token', token)
    
    // Redirect to admin dashboard or the original target
    const redirectPath = route.query.redirect as string || '/admin'
    router.push(redirectPath)
  } catch (error: any) {
    console.error('Login failed:', error)
    errorMessage.value = error.response?.data?.message || 'Invalid email or password'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-page {
  padding: 2rem;
  background-color: #f8f9fa;
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-container {
  max-width: 400px;
  width: 100%;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.error-message {
  color: #dc3545;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: #f8d7da;
  border-radius: 4px;
  text-align: center;
}

.login-btn {
  background-color: #42b983;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #3aa876;
}

.login-btn:disabled {
  background-color: #a8d5c2;
  cursor: not-allowed;
}
</style> 