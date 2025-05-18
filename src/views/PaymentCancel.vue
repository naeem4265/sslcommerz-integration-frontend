<template>
  <div class="payment-result">
    <div class="container">
      <div class="cancel-message">
        <i class="pi pi-info-circle"></i>
        <h2>Payment Cancelled</h2>
        <p>You have cancelled the payment process.</p>
        <p>Your registration is not complete until payment is made.</p>
        <div class="action-buttons">
          <router-link to="/register" class="retry-btn">Try Again</router-link>
          <router-link to="/" class="home-btn">Back to Home</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

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

.cancel-message {
  text-align: center;
  padding: 2rem;
}

.cancel-message i {
  font-size: 4rem;
  color: #ffc107;
  margin-bottom: 1rem;
}

.cancel-message h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.cancel-message p {
  color: #666;
  margin-bottom: 0.5rem;
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