<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1>Welcome to Alumni Get Together 2024</h1>
        <p>Join us for an unforgettable reunion with your classmates and friends</p>
        <PButton 
          label="Register Now" 
          icon="pi pi-user-plus" 
          class="p-button-lg p-button-rounded" 
          @click="router.push('/register')"
        />
      </div>
    </section>

    <!-- Event Info Section -->
    <section class="info-section">
      <div class="container">
        <div class="section-header">
        <h2>About the Event</h2>
          <div class="section-header-underline"></div>
        </div>
        
        <div class="event-cards">
          <PCard class="event-card">
            <template #header>
              <div class="card-icon">
            <i class="pi pi-calendar"></i>
          </div>
            </template>
            <template #title>Date & Time</template>
            <template #content>
              <p>May 15, 2024</p>
              <p>10:00 AM - 5:00 PM</p>
            </template>
          </PCard>

          <PCard class="event-card">
            <template #header>
              <div class="card-icon">
            <i class="pi pi-map-marker"></i>
          </div>
            </template>
            <template #title>Location</template>
            <template #content>
              <p>Campus Auditorium</p>
              <p>123 University Avenue</p>
            </template>
          </PCard>

          <PCard class="event-card">
            <template #header>
              <div class="card-icon">
            <i class="pi pi-users"></i>
          </div>
            </template>
            <template #title>Activities</template>
            <template #content>
              <p>Networking</p>
              <p>Cultural Program</p>
              <p>Alumni Awards</p>
            </template>
          </PCard>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="cta-section">
      <div class="container">
        <h2>Don't Miss This Opportunity</h2>
        <p>Register today to secure your spot at the reunion event of the year</p>
        <PButton 
          label="Register Now" 
          icon="pi pi-user-plus" 
          class="p-button-lg" 
          @click="router.push('/register')"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped>
.home-page {
  min-height: calc(100vh - 76px);
}

.hero-section {
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
              url('/images/campus.jpg') center/cover;
  height: 80vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
}

.hero-content {
  max-width: 800px;
  padding: 2rem;
}

.hero-content h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-content p {
  font-size: clamp(1rem, 2vw, 1.25rem);
  margin-bottom: 2rem;
  opacity: 0.9;
}

.container {
  max-width: 100%;
  width: 100%;
  padding: 0 2rem;
  margin: 0 auto;
}

.info-section {
  padding: 5rem 0;
  background-color: var(--surface-ground);
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.section-header-underline {
  height: 3px;
  width: 80px;
  background-color: var(--primary-color);
  margin: 0 auto;
}

.event-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
}

.event-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  background-color: var(--primary-color);
}

.card-icon i {
  font-size: 2rem;
  color: white;
}

.p-card-title {
  text-align: center;
  font-weight: 600;
}

.p-card-content {
  text-align: center;
}

.p-card-content p {
  margin: 0.5rem 0;
  color: var(--text-color-secondary);
}

.cta-section {
  background-color: var(--primary-color);
  color: white;
  padding: 4rem 0;
  text-align: center;
}

.cta-section h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.cta-section p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 768px) {
  .hero-section {
    height: 70vh;
}

  .info-section, .cta-section {
    padding: 3rem 1.5rem;
  }
}
</style> 