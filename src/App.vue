<template>
  <div class="app">
    <header class="header">
      <nav class="nav-container">
        <router-link to="/" class="logo">THPI Get Together</router-link>
        <div class="nav-links">
          <router-link to="/register" class="register-btn">Register Now</router-link>
        </div>
      </nav>
    </header>

    <router-view />
  </div>
</template>

<script setup lang="ts">
// Component logic will go here
</script>

<style>
.app {
  min-height: 100vh;
}

.header {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.register-btn {
  background-color: #42b983;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s;
}

.register-btn:hover {
  background-color: #3aa876;
}
</style> 