<template>
  <div class="app">
    <header class="header">
      <div class="nav-container">
        <router-link to="/" class="logo">
          <i class="pi pi-users mr-2"></i>
          Event Registration
        </router-link>
        <div class="nav-links">
          <PButton 
            label="Admin" 
            icon="pi pi-lock" 
            class="p-button-text" 
            @click="router.push('/login')"
          />
        </div>
      </div>
    </header>

    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import PButton from 'primevue/button';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style>
@import 'primevue/resources/themes/lara-light-blue/theme.css';
@import 'primevue/resources/primevue.min.css';
@import 'primeicons/primeicons.css';

.app {
  min-height: 100vh;
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.header {
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  text-decoration: none;
}

.logo i {
  margin-right: 0.5rem;
}

.nav-links {
  display: flex;
  gap: 1rem;
  align-items: center;
}

main {
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.mr-2 {
  margin-right: 0.5rem;
}
</style> 