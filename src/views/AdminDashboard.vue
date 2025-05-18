<template>
  <div class="admin-dashboard">
    <div class="dashboard-header">
      <h1>Admin Dashboard</h1>
      <button @click="logout" class="logout-btn">Logout</button>
    </div>
    
    <div class="payment-stats">
      <div class="stat-card">
        <h3>Total Registrations</h3>
        <div class="stat-value">{{ payments.length }}</div>
      </div>
      <div class="stat-card">
        <h3>Total Revenue</h3>
        <div class="stat-value">{{ totalRevenue }} BDT</div>
      </div>
    </div>
    
    <div class="dashboard-content">
      <h2>Payment Records</h2>
      
      <div class="filter-controls">
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search by name, email or transaction ID"
            class="search-input"
          />
        </div>
      </div>
      
      <div v-if="isLoading" class="loading">
        <p>Loading payment data...</p>
      </div>
      
      <div v-else-if="error" class="error-container">
        <p>{{ error }}</p>
        <button @click="fetchPayments" class="retry-btn">Retry</button>
      </div>
      
      <div v-else-if="filteredPayments.length === 0" class="no-data">
        <p>No payment records found</p>
      </div>
      
      <div v-else class="payment-table-container">
        <table class="payment-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Batch</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="payment in filteredPayments" :key="payment.id">
              <td>{{ payment.name }}</td>
              <td>{{ payment.email }}</td>
              <td>{{ payment.phone }}</td>
              <td>{{ payment.department }}</td>
              <td>{{ payment.batch }}</td>
              <td>{{ payment.transactionId }}</td>
              <td>{{ payment.amount }} BDT</td>
              <td>{{ formatDate(payment.createdAt) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/plugins/axios'

interface Payment {
  id: string
  name: string
  email: string
  phone: string
  department: string
  batch: string
  transactionId: string
  amount: number
  createdAt: string
}

const router = useRouter()
const payments = ref<Payment[]>([])
const isLoading = ref(true)
const error = ref('')
const searchQuery = ref('')

// Computed property for filtered payments
const filteredPayments = computed(() => {
  if (!searchQuery.value) return payments.value
  
  const query = searchQuery.value.toLowerCase()
  return payments.value.filter(payment => 
    payment.name.toLowerCase().includes(query) ||
    payment.email.toLowerCase().includes(query) ||
    payment.transactionId.toLowerCase().includes(query)
  )
})

// Computed property for total revenue
const totalRevenue = computed(() => {
  return payments.value.reduce((total, payment) => total + payment.amount, 0)
})

// Fetch payments from API
const fetchPayments = async () => {
  isLoading.value = true
  error.value = ''
  
  try {
    // Get the token from localStorage
    const token = localStorage.getItem('token')
    
    if (!token) {
      router.push('/login')
      return
    }
    
    // Configure authorization header
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    
    const response = await axios.get('/api/payments', config)
    payments.value = response.data
  } catch (err: any) {
    console.error('Failed to fetch payments:', err)
    error.value = err.response?.data?.message || 'Failed to load payment data'
    
    // If unauthorized, redirect to login
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      router.push('/login')
    }
  } finally {
    isLoading.value = false
  }
}

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Logout function
const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

// Load data when component mounts
onMounted(() => {
  fetchPayments()
})
</script>

<style scoped>
.admin-dashboard {
  padding: 2rem;
  background-color: #f8f9fa;
  min-height: calc(100vh - 64px);
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  margin: 0;
  color: #2c3e50;
}

.logout-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #c82333;
}

.payment-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-card h3 {
  margin-top: 0;
  color: #6c757d;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 2rem;
  color: #2c3e50;
  font-weight: bold;
}

.dashboard-content {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dashboard-content h2 {
  margin-top: 0;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.filter-controls {
  margin-bottom: 1.5rem;
}

.search-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.loading, .error-container, .no-data {
  padding: 2rem;
  text-align: center;
  color: #6c757d;
}

.error-container {
  color: #dc3545;
}

.retry-btn {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  cursor: pointer;
}

.payment-table-container {
  overflow-x: auto;
}

.payment-table {
  width: 100%;
  border-collapse: collapse;
}

.payment-table th, .payment-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.payment-table th {
  background-color: #f8f9fa;
  color: #2c3e50;
  font-weight: 600;
}

.payment-table tr:hover {
  background-color: #f8f9fa;
}
</style> 