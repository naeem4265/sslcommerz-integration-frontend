<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1>Welcome to THPI Get Together 2024</h1>
        <p>Join us for an unforgettable reunion of Thakurgaon Polytechnic Institute alumni</p>
        <router-link to="/register" class="cta-button">Register Now</router-link>
      </div>
    </section>

    <section class="info-section">
      <div class="container">
        <h2>About the Event</h2>
        <div class="info-grid">
          <div class="info-card">
            <i class="pi pi-calendar"></i>
            <h3>Date & Time</h3>
            <p>Coming Soon</p>
          </div>
          <div class="info-card">
            <i class="pi pi-map-marker"></i>
            <h3>Location</h3>
            <p>THPI Campus, Thakurgaon</p>
          </div>
          <div class="info-card">
            <i class="pi pi-users"></i>
            <h3>Activities</h3>
            <p>Networking, Cultural Program, and More</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Component logic will go here
</script>

<style scoped>
.home {
  min-height: calc(100vh - 64px);
}

.hero {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
              url('/images/thpi-campus.jpg') center/cover;
  height: 70vh;
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
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.cta-button {
  display: inline-block;
  background-color: #42b983;
  color: white;
  padding: 1rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s;
}

.cta-button:hover {
  background-color: #3aa876;
}

.info-section {
  padding: 4rem 2rem;
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.info-section h2 {
  text-align: center;
  margin-bottom: 3rem;
  color: #2c3e50;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.info-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.info-card i {
  font-size: 2rem;
  color: #42b983;
  margin-bottom: 1rem;
}

.info-card h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.info-card p {
  color: #666;
}
</style> 