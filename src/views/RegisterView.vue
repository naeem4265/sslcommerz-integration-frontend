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
        <!-- Form Step -->
        <div v-if="currentStep === 'form'" class="registration-form">
          <form @submit.prevent="handleSubmit">
            <div class="p-field">
              <label for="fullName">Full Name</label>
              <PInputText id="fullName" v-model="formData.fullName" required class="p-inputtext-lg" />
            </div>

            <div class="p-field">
              <label for="email">Email</label>
              <PInputText id="email" v-model="formData.email" type="email" required class="p-inputtext-lg" />
            </div>

            <div class="p-field">
              <label for="phone">Phone</label>
              <PInputText id="phone" v-model="formData.phone" type="tel" required class="p-inputtext-lg" />
            </div>

            <div class="p-field">
              <label for="batch">Batch</label>
              <PInputText id="batch" v-model="formData.batch" type="number" required class="p-inputtext-lg" />
            </div>

            <div class="p-field">
              <label for="numberOfPerson">Number of Person</label>
              <PInputText id="numberOfPerson" v-model.number="formData.numberOfPerson" type="number" required class="p-inputtext-lg" />
            </div>

            <div class="p-field">
              <label for="paymentAmount">Payment Amount (BDT)</label>
              <PInputText id="paymentAmount" :value="paymentAmount" disabled class="p-inputtext-lg" />
            </div>

            <div class="p-field">
              <label for="department">Department</label>
              <PDropdown id="department" v-model="formData.department" :options="departments" optionLabel="name" optionValue="code" placeholder="Select department" class="p-inputtext-lg" />
            </div>

            <div class="p-field">
              <label for="currentOrganization">Current Organization</label>
              <PInputText id="currentOrganization" v-model="formData.currentOrganization" class="p-inputtext-lg" />
            </div>

            <div class="p-field">
              <label for="designation">Designation</label>
              <PInputText id="designation" v-model="formData.designation" class="p-inputtext-lg" />
            </div>

            <div class="p-field">
              <label for="address">Address</label>
              <PInputText id="address" v-model="formData.address" class="p-inputtext-lg" />
            </div>

            <PButton type="submit" label="Proceed to Payment" icon="pi pi-arrow-right" class="p-button-lg p-mt-3" />
          </form>
        </div>

        <!-- Payment Step -->
        <div v-if="currentStep === 'payment'" class="payment-section">
          <div class="payment-amount">
            <div class="amount-card">
              <h3>Total Payment</h3>
              <div class="amount-value">{{ paymentAmount }} BDT</div>
            </div>
          </div>

          <PMessage severity="info" class="payment-info">
            You will be redirected to a secure payment gateway to complete your transaction.
          </PMessage>

          <div class="payment-action">
            <PButton label="Pay Now" icon="pi pi-credit-card" @click="processPayment" :loading="isProcessing" loadingIcon="pi pi-spinner pi-spin" class="p-button-lg p-button-success" />
          </div>
        </div>

        <!-- Confirmation -->
        <div v-if="currentStep === 'confirmation'" class="confirmation-section">
          <div class="success-message">
            <i class="pi pi-check-circle"></i>
            <h2>Registration Successful!</h2>
            <p>We will email you the confirmation shortly.</p>
            <PButton label="Back to Home" icon="pi pi-home" @click="router.push('/')" class="p-button-lg p-mt-3" />
          </div>
        </div>
      </template>

      <template #footer>
        <div class="step-indicator" v-if="currentStep !== 'confirmation'">
          <div class="step" :class="{ active: currentStep === 'form' }">1. Registration</div>
          <div class="step-connector"></div>
          <div class="step" :class="{ active: currentStep === 'payment' }">2. Payment</div>
        </div>
      </template>
    </PCard>
    <PToast position="top-right" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { PaymentService, RegistrationService } from '@/services/api.service'

const router = useRouter()
const toast = useToast()
const currentStep = ref('form')
const isProcessing = ref(false)

const departments = [
  { name: 'Computer Science', code: 'cs' },
  { name: 'Electrical Engineering', code: 'ee' },
  { name: 'Mechanical Engineering', code: 'me' },
  { name: 'Civil Engineering', code: 'ce' },
]

const formData = reactive({
  fullName: '',
  email: '',
  phone: '',
  batch: '',
  numberOfPerson: 1,
  department: null,
  currentOrganization: '',
  designation: '',
  address: ''
})

const paymentAmount = computed(() => {
  const perPerson = 1000
  return formData.numberOfPerson > 0 ? formData.numberOfPerson * perPerson : 0
})

const getStepTitle = computed(() => {
  switch (currentStep.value) {
    case 'form': return 'Registration Form'
    case 'payment': return 'Payment Details'
    case 'confirmation': return 'Registration Complete'
    default: return ''
  }
})

const handleSubmit = async () => {
  const missingFields: string[] = []

  if (!formData.fullName) missingFields.push('Full Name')
  if (!formData.email) missingFields.push('Email')
  if (!formData.phone) missingFields.push('Phone')
  if (!formData.batch) missingFields.push('Batch')
  if (!formData.numberOfPerson || formData.numberOfPerson <= 0) missingFields.push('Number of Person')
  if (!formData.department) missingFields.push('Department')

  if (missingFields.length > 0) {
    toast.add({
      severity: 'error',
      summary: 'Validation Error',
      detail: `Missing: ${missingFields.join(', ')}`,
      life: 4000
    })
    return
  }

  currentStep.value = 'payment'
}


const processPayment = async () => {
  isProcessing.value = true

  try {
    // 1. Submit registration data
    const registrationResponse = await RegistrationService.submit(formData)

    if (!registrationResponse?.data?.id) {
      throw new Error('Failed to receive registration ID.')
    }

    const registrationId = registrationResponse.data.id

    // 2. Initiate payment with registration ID and calculated amount
    const response = await PaymentService.initiate({
      registrationId,
      amount: paymentAmount.value
    })

    if (response.data.paymentUrl) {
      window.location.href = response.data.paymentUrl
    } else {
      throw new Error('Payment initialization failed')
    }
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Payment Error',
      detail: err.message || 'Something went wrong',
      life: 5000
    })
  } finally {
    isProcessing.value = false
  }
}

</script>

<style scoped>
.register-page {
  padding: 2rem;
  min-height: calc(100vh - 76px);
  background-color: var(--surface-ground);
  display: flex;
  justify-content: center;
  align-items: start;
}

.register-card {
  width: 100%;
  max-width: 960px;
}

.card-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-weight: 600;
  font-size: 1.2rem;
}

.p-field {
  margin-bottom: 1.5rem;
}

.p-inputtext-lg, .p-button-lg {
  width: 100%;
  font-size: 1.05rem;
}

.payment-amount {
  margin-bottom: 2rem;
}

.amount-card {
  padding: 1.5rem;
  background-color: var(--surface-hover);
  border-radius: 10px;
  text-align: center;
}

.amount-value {
  font-size: 2rem;
  font-weight: bold;
  color: var(--primary-color);
}

.payment-info {
  margin-top: 1rem;
}

.step-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

.step {
  padding: 0.5rem 1.25rem;
  background-color: var(--surface-hover);
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-color-secondary);
}

.step.active {
  background-color: var(--primary-color);
  color: #fff;
}

.step-connector {
  width: 3rem;
  height: 2px;
  background-color: var(--surface-border);
  margin: 0 0.5rem;
}

.confirmation-section {
  text-align: center;
  margin-top: 2rem;
}

.success-message i {
  font-size: 3.5rem;
  color: var(--green-500);
  margin-bottom: 1rem;
}

.success-message h2 {
  margin-bottom: 0.75rem;
}
</style>
