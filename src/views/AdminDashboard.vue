<template>
  <div class="admin-dashboard">
    <div class="dashboard-header">
      <h1>Admin Dashboard</h1>
      <div class="header-buttons">
        <button @click="logout" class="logout-btn">
          <i class="pi pi-sign-out"></i>
          Logout
        </button>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card total-registrations">
        <div class="stat-icon">
          <i class="pi pi-users"></i>
        </div>
        <div class="stat-content">
          <h3>Total Registrations</h3>
          <div class="stat-value">{{ payments.length }}</div>
        </div>
      </div>

      <div class="stat-card total-revenue">
        <div class="stat-icon">
          <i class="pi pi-dollar"></i>
        </div>
        <div class="stat-content">
          <h3>Total Revenue</h3>
          <div class="stat-value">{{ totalRevenue }} BDT</div>
        </div>
      </div>

      <div class="stat-card completion-rate">
        <div class="stat-icon">
          <i class="pi pi-check-circle"></i>
        </div>
        <div class="stat-content">
          <h3>Completion Rate</h3>
          <div class="stat-value">100%</div>
          <div class="stat-description">All payments complete</div>
        </div>
      </div>
    </div>

    <div class="dashboard-content">
      <div class="dashboard-toolbar">
        <h2>Registration Records</h2>
        <div class="toolbar-actions">
          <div class="search-box">
            <i class="pi pi-search"></i>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search by name, email or ID"
              class="search-input"
            />
          </div>
        </div>
      </div>

      <div v-if="isLoading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>Loading registration data...</p>
      </div>

      <div v-else-if="error" class="error-container">
        <i class="pi pi-exclamation-triangle"></i>
        <p>{{ error }}</p>
        <button @click="fetchPayments" class="retry-btn">
          <i class="pi pi-refresh"></i>
          Retry
        </button>
      </div>

      <div v-else-if="paginatedPayments.length === 0" class="no-data">
        <i class="pi pi-inbox"></i>
        <p>No registration records found</p>
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
              <th>Payment ID</th>
              <th>Amount</th>
              <th>Registration Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="payment in paginatedPayments" :key="payment.id">
              <td>{{ payment.fullName }}</td>
              <td>{{ payment.email }}</td>
              <td>{{ payment.phone }}</td>
              <td>{{ payment.department }}</td>
              <td>{{ payment.batch }}</td>
              <td>{{ payment.paymentTransactionId || payment.id }}</td>
              <td>{{ payment.paymentAmount || 0 }} BDT</td>
              <td>{{ formatDate(payment.createdAt) }}</td>
              <td class="actions-cell">
                <button class="action-icon view-btn" title="View Details">
                  <i class="pi pi-eye"></i>
                </button>
                <button class="action-icon email-btn" title="Send Email">
                  <i class="pi pi-envelope"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="pagination-controls">
          <div class="page-info">
            Showing {{ startIndex + 1 }}-{{ endIndex }} of {{ filteredPayments.length }} entries
          </div>
          <div class="page-buttons">
            <button @click="prevPage" :disabled="currentPage === 1" class="page-btn">
              <i class="pi pi-chevron-left"></i>
            </button>
            <span class="page-indicator">Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="page-btn">
              <i class="pi pi-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import API_ROUTES from '@/constants/apiRoutes'
import { useAuthStore } from '@/stores'

const router = useRouter()
const authStore = useAuthStore()
const payments = ref<any[]>([])
const isLoading = ref(true)
isLoading.value = true
const error = ref('')
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

const totalRevenue = computed(() => {
  return payments.value.reduce((sum, p) => sum + (p.paymentAmount || 0), 0)
})

const filteredPayments = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return payments.value.filter(p =>
    p.fullName?.toLowerCase().includes(query) ||
    p.email?.toLowerCase().includes(query) ||
    p.id?.toLowerCase().includes(query)
  )
})

const totalPages = computed(() =>
  Math.ceil(filteredPayments.value.length / itemsPerPage.value)
)

const startIndex = computed(() =>
  (currentPage.value - 1) * itemsPerPage.value
)

const endIndex = computed(() =>
  Math.min(startIndex.value + itemsPerPage.value, filteredPayments.value.length)
)

const paginatedPayments = computed(() =>
  filteredPayments.value.slice(startIndex.value, endIndex.value)
)

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

const fetchPayments = async () => {
  isLoading.value = true
  error.value = ''

  try {
    const token = authStore.token
    const headers = token ? { Authorization: `Bearer ${token}` } : {}
    const response = await axios.get(API_ROUTES.PAYMENTS.LIST, { headers })
    payments.value = response.data?.data || []
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load data'
    if (err.response?.status === 401) {
      authStore.clearAuthData()
      router.push('/login')
    }
  } finally {
    isLoading.value = false
  }
}

const logout = async () => {
  await authStore.logout()
}

onMounted(() => {
  if (!authStore.isLoggedIn) {
    router.push('/login')
    return
  }
  fetchPayments()
})
</script>

<style scoped>
.admin-dashboard {
  padding: 2rem;
  background-color: #f0f2f5;
  min-height: 100vh;
}
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
.logout-btn {
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}
.stats-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}
.stat-card {
  flex: 1 1 300px;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
}
.stat-icon {
  font-size: 2rem;
  margin-right: 1rem;
}
.stat-content h3 {
  margin: 0;
  font-size: 1rem;
}
.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
}
.stat-description {
  font-size: 0.85rem;
  color: #666;
}
.dashboard-content {
  background: white;
  padding: 1rem;
  border-radius: 8px;
}
.dashboard-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.search-input {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.payment-table {
  width: 100%;
  border-collapse: collapse;
}
.payment-table th,
.payment-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #e0e0e0;
  text-align: left;
}
.payment-table-container {
  overflow-x: auto;
}
.actions-cell {
  display: flex;
  gap: 0.5rem;
}
.action-icon {
  background: none;
  border: none;
  cursor: pointer;
}
.pagination-controls {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.loading-container,
.no-data,
.error-container {
  text-align: center;
  padding: 2rem;
}
</style>
