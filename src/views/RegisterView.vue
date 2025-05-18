<template>
  <div class="register-page">
    <PCard class="register-card">
      <template #title>
        <div class="card-title">
          <i class="pi pi-user-plus" v-if="currentStep === 'form'"></i>
          <i class="pi pi-credit-card" v-if="currentStep === 'payment'"></i>
          <i class="pi pi-check-circle" v-if="currentStep === 'confirmation'"></i>
          {{ getStepTitle }}
        </div>
      </template>
      
      <template #content>
        <!-- Registration Form Step -->
        <div v-if="currentStep === 'form'" class="registration-form">
          <form @submit.prevent="handleSubmit">
            <div class="p-field">
              <label for="name">Full Name</label>
              <PInputText
                id="name"
                v-model="formData.name"
                type="text"
                required
                class="p-inputtext-lg"
                placeholder="Enter your full name"
              />
            </div>

            <div class="p-field">
              <label for="email">Email</label>
              <PInputText
                id="email"
                v-model="formData.email"
                type="email"
                required
                class="p-inputtext-lg"
                placeholder="Enter your email address"
              />
            </div>

            <div class="p-field">
              <label for="phone">Phone Number</label>
              <PInputText
                id="phone"
                v-model="formData.phone"
                type="tel"
                required
                class="p-inputtext-lg"
                placeholder="Enter your phone number"
              />
            </div>

            <div class="p-field">
              <label for="batch">Batch Year</label>
              <PInputText
                id="batch"
                v-model="formData.batch"
                type="number"
                required
                class="p-inputtext-lg"
                placeholder="Enter your batch year"
              />
            </div>

            <div class="p-field">
              <label for="department">Department</label>
              <PDropdown
                id="department"
                v-model="formData.department"
                :options="departments"
                optionLabel="name"
                optionValue="code"
                placeholder="Select your department"
                class="p-inputtext-lg"
              />
            </div>

            <PButton 
              type="submit" 
              label="Proceed to Payment" 
              icon="pi pi-arrow-right" 
              class="p-button-lg p-mt-3"
            />
          </form>
        </div>

        <!-- Payment Step -->
        <div v-if="currentStep === 'payment'" class="payment-section">
          <div class="payment-amount">
            <div class="amount-card">
              <h3>Registration Fee</h3>
              <div class="amount-value">1,000 BDT</div>
            </div>
          </div>

          <PMessage severity="info" class="payment-info">
            <span>You will be redirected to a secure payment gateway to complete your transaction.</span>
          </PMessage>
          
          <div class="payment-action">
            <PButton 
              label="Pay Now" 
              icon="pi pi-credit-card" 
              @click="processPayment" 
              :loading="isProcessing"
              loadingIcon="pi pi-spinner pi-spin"
              class="p-button-lg p-button-success"
            />
          </div>
        </div>

        <!-- Confirmation Step -->
        <div v-if="currentStep === 'confirmation'" class="confirmation-section">
          <div class="success-message">
            <i class="pi pi-check-circle"></i>
            <h2>Registration Successful!</h2>
            <p>Thank you for registering for the event.</p>
            <p>We will send you a confirmation email with further details.</p>
            <PButton 
              label="Back to Home" 
              icon="pi pi-home" 
              @click="router.push('/')" 
              class="p-button-lg p-mt-3"
            />
          </div>
        </div>
      </template>

      <template #footer>
        <div class="step-indicator" v-if="currentStep !== 'confirmation'">
          <div 
            class="step" 
            :class="{ active: currentStep === 'form' }"
          >
            1. Registration
          </div>
          <div class="step-connector"></div>
          <div 
            class="step" 
            :class="{ active: currentStep === 'payment' }"
          >
            2. Payment
          </div>
        </div>
      </template>
    </PCard>
    
    <PToast position="top-right" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { PaymentService } from '@/services/api.service'

const router = useRouter()
const currentStep = ref('form')
const isProcessing = ref(false)
const toast = useToast()

const departments = [
  { name: 'Computer Science', code: 'computer' },
  { name: 'Civil Engineering', code: 'civil' },
  { name: 'Electrical Engineering', code: 'electrical' },
  { name: 'Mechanical Engineering', code: 'mechanical' }
]

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  batch: '',
  department: null
})

// Computed property for step title
const getStepTitle = computed(() => {
  switch (currentStep.value) {
    case 'form': return 'Registration Form'
    case 'payment': return 'Payment Details'
    case 'confirmation': return 'Registration Complete'
    default: return 'Registration'
  }
})

const handleSubmit = () => {
  // Validate form data
  if (!formData.name || !formData.email || !formData.phone || !formData.batch || !formData.department) {
    toast.add({
      severity: 'error',
      summary: 'Validation Error',
      detail: 'Please fill in all required fields',
      life: 3000
    })
    return
  }
  
  // Move to payment step
  currentStep.value = 'payment'
  
  // Scroll to top
  window.scrollTo(0, 0)
}

const processPayment = async () => {
  isProcessing.value = true
  try {
    // Generate a unique transaction ID
    const transactionId = 'register-' + Date.now()

    // Prepare payment data
    const paymentData = {
      registrationId: transactionId,
      amount: 1000,
    }

    // Call backend API to initiate payment
    const response = await PaymentService.initiate({
      ...paymentData,
      registration: formData
    })

    // Redirect to payment gateway
    if (response.data.paymentUrl !== undefined) {
      window.location.href = response.data.paymentUrl
    } else {
      throw new Error('Payment initialization failed')
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Payment Failed',
      detail: 'Failed to initialize payment. Please try again.',
      life: 5000
    })
    console.error('Payment error:', error)
  }
  isProcessing.value = false
}
</script>

<style scoped>
.register-page {
  padding: 2rem;
  background-color: var(--surface-ground);
  min-height: calc(100vh - 76px);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.register-card {
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
}

.card-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-weight: 500;
}

.p-field {
  margin-bottom: 2rem;
}

.p-field label {
  display: block;
  margin-bottom: 0.75rem;
  font-weight: 500;
  font-size: 1.1rem;
}

.p-inputtext-lg, .p-button-lg {
  width: 100%;
  font-size: 1.1rem;
}

.payment-amount {
  margin-bottom: 2rem;
}

.amount-card {
  background-color: var(--surface-hover);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
}

.amount-card h3 {
  margin: 0 0 0.5rem 0;
  color: var(--text-color-secondary);
  font-size: 1rem;
}

.amount-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-color);
}

.payment-info {
  margin: 1.5rem 0;
}

.payment-action {
  margin-top: 2rem;
  text-align: center;
}

.confirmation-section {
  text-align: center;
}

.success-message i {
  font-size: 4rem;
  color: var(--green-500);
  margin-bottom: 1rem;
}

.success-message h2 {
  margin-bottom: 1rem;
}

.success-message p {
  margin-bottom: 0.5rem;
  color: var(--text-color-secondary);
}

.step-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.step {
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  background-color: var(--surface-hover);
  color: var(--text-color-secondary);
  font-size: 0.875rem;
}

.step.active {
  background-color: var(--primary-color);
  color: var(--primary-color-text);
}

.step-connector {
  width: 3rem;
  height: 2px;
  background-color: var(--surface-hover);
  margin: 0 0.5rem;
}
</style> 