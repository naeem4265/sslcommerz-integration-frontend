<template>
  <div class="payment-result">
    <div class="container">
      <div class="fail-message">
        <i class="pi pi-times-circle"></i>
        <h2>Payment Failed</h2>
        <p>Sorry, your payment could not be processed.</p>
        <p v-if="errorMessage" class="error-details">{{ errorMessage }}</p>
        <p>Please try again or contact support if the problem persists.</p>
        <div class="action-buttons">
          <router-link to="/register" class="retry-btn">Try Again</router-link>
          <router-link to="/" class="home-btn">Back to Home</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const errorMessage = ref('')

onMounted(() => {
  // Get error message if available
  errorMessage.value = route.query.error_message as string || ''
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

.fail-message {
  text-align: center;
  padding: 2rem;
}

.fail-message i {
  font-size: 4rem;
  color: #dc3545;
  margin-bottom: 1rem;
}

.fail-message h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.fail-message p {
  color: #666;
  margin-bottom: 0.5rem;
}

.error-details {
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  background-color: #fff8f8;
  border-left: 3px solid #dc3545;
  text-align: left;
  color: #842029;
}

.action-buttons {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.retry-btn, .home-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.retry-btn {
  background-color: #42b983;
  color: white;
}

.retry-btn:hover {
  background-color: #3aa876;
}

.home-btn {
  background-color: #6c757d;
  color: white;
}

.home-btn:hover {
  background-color: #5a6268;
}
</style> 