<template>
  <div class="payment-result">
    <div class="container">
      <div class="success-message">
        <i class="pi pi-check-circle"></i>
        <h2>Payment Successful!</h2>
        <p>Thank you for registering for the THPI Get Together event.</p>
        <p>We have sent you a confirmation email with the payment details.</p>
        <router-link to="/" class="home-btn">Back to Home</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

onMounted(async () => {
  try {
    // Verify payment status with backend
    await axios.post('your_backend_api/verify-payment', {
      tran_id: route.query.tran_id
    })
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