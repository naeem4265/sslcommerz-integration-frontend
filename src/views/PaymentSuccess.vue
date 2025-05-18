<template>
  <div class="payment-result">
    <div class="container">
      <div class="success-message">
        <i class="pi pi-check-circle"></i>
        <h2>Payment Successful!</h2>
        <p>Thank you for registering for the Get Together event.</p>
        <p>We have sent you a confirmation email with the payment details.</p>
        <p v-if="transactionId" class="transaction-info">
          Transaction ID: <span class="tran-id">{{ transactionId }}</span>
        </p>
        <router-link to="/" class="home-btn">Back to Home</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PaymentService } from '@/services/api.service'

const route = useRoute()
const router = useRouter()
const transactionId = ref('')

onMounted(async () => {
  try {
    // Get transaction ID from route query
    transactionId.value = route.query.tran_id as string || ''
    
    if (!transactionId.value) {
      console.error('No transaction ID found')
      return
    }

    // Verify payment status with backend
    await PaymentService.verify(transactionId.value)
  } catch (error) {
    console.error('Payment verification failed:', error)
    router.push('/payment/fail')
  }
})
</script>

<style scoped>
.payment-result {
  padding: 2rem;
  background-color: #f8f9fa;
  min-height: calc(100vh - 64px);
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.success-message {
  text-align: center;
  padding: 2rem;
}

.success-message i {
  font-size: 4rem;
  color: #42b983;
  margin-bottom: 1rem;
}

.success-message h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.success-message p {
  color: #666;
  margin-bottom: 0.5rem;
}

.transaction-info {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #f0faf5;
  border-radius: 4px;
  font-size: 0.9rem;
}

.tran-id {
  font-weight: bold;
  color: #2c3e50;
}

.home-btn {
  display: inline-block;
  background-color: #42b983;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  margin-top: 1rem;
  transition: background-color 0.3s;
}

.home-btn:hover {
  background-color: #3aa876;
}
</style> 