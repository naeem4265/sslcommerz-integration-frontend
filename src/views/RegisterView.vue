<template>
  <div class="register">
    <div class="container">
      <h1>Registration Form</h1>
      
      <div v-if="currentStep === 'form'" class="registration-form">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              required
              class="form-control"
            />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              class="form-control"
            />
          </div>

          <div class="form-group">
            <label for="phone">Phone Number</label>
            <input
              id="phone"
              v-model="formData.phone"
              type="tel"
              required
              class="form-control"
            />
          </div>

          <div class="form-group">
            <label for="batch">Batch Year</label>
            <input
              id="batch"
              v-model="formData.batch"
              type="number"
              required
              class="form-control"
            />
          </div>

          <div class="form-group">
            <label for="department">Department</label>
            <select
              id="department"
              v-model="formData.department"
              required
              class="form-control"
            >
              <option value="">Select Department</option>
              <option value="computer">Computer</option>
              <option value="civil">Civil</option>
              <option value="electrical">Electrical</option>
              <option value="mechanical">Mechanical</option>
            </select>
          </div>

          <button type="submit" class="submit-btn">Proceed to Payment</button>
        </form>
      </div>

      <div v-if="currentStep === 'payment'" class="payment-section">
        <h2>Payment Details</h2>
        <div class="payment-amount">
          <p>Registration Fee: 1000 BDT</p>
        </div>

        <div class="payment-action">
          <p class="payment-info">Click below to proceed to the secure payment gateway</p>
          <button 
            @click="processPayment" 
            class="submit-btn" 
            :disabled="isProcessing"
          >
            {{ isProcessing ? 'Processing...' : 'Pay Now' }}
          </button>
        </div>
      </div>

      <div v-if="currentStep === 'confirmation'" class="confirmation-section">
        <div class="success-message">
          <i class="pi pi-check-circle"></i>
          <h2>Registration Successful!</h2>
          <p>Thank you for registering for the THPI Get Together event.</p>
          <p>We will send you a confirmation email with further details.</p>
          <router-link to="/" class="home-btn">Back to Home</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import axios from '@/plugins/axios'

const currentStep = ref('form')
const isProcessing = ref(false)

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  batch: '',
  department: ''
})

const handleSubmit = () => {
  // Validate form data
  if (!formData.name || !formData.email || !formData.phone || !formData.batch || !formData.department) {
    alert('Please fill in all fields')
    return
  }
  currentStep.value = 'payment'
}

const processPayment = async () => {
  isProcessing.value = true
  try {
    // Generate a unique transaction ID
    const transactionId = 'cd645e2c-1678-4603-b5ca-12326d1e0681'

    // Prepare payment data
    const paymentData = {
      registrationId: transactionId,
      amount: 1000,
    }

    // Call your backend API to initiate payment
    const response = await axios.post('/api/v1/payment/initiate', {
      ...paymentData,
      registration: formData
    })

    // Redirect to SSLCommerz payment gateway
    if (response.data.paymentUrl !== undefined) {
      window.location.href = response.data.paymentUrl
    } else {
      throw new Error('Payment initialization failed')
    }
  } catch (error) {
    alert('Payment initialization failed. Please try again.')
    console.error('Payment error:', error)
  }
  isProcessing.value = false
}
</script>

<style scoped>
.register {
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

h1, h2, h3 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
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

.submit-btn {
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

.submit-btn:hover {
  background-color: #3aa876;
}

.submit-btn:disabled {
  background-color: #a8d5c2;
  cursor: not-allowed;
}

.payment-amount {
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.payment-action {
  margin-top: 2rem;
  text-align: center;
}

.payment-info {
  color: #666;
  margin-bottom: 1rem;
}

.confirmation-section {
  text-align: center;
}

.success-message {
  padding: 2rem;
}

.success-message i {
  font-size: 4rem;
  color: #42b983;
  margin-bottom: 1rem;
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