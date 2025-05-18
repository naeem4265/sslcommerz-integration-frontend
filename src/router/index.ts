import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import PaymentSuccess from '../views/PaymentSuccess.vue'
import PaymentFail from '../views/PaymentFail.vue'
import PaymentCancel from '../views/PaymentCancel.vue'
import LoginView from '../views/LoginView.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import { useAuthStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/payment/success',
      name: 'payment-success',
      component: PaymentSuccess
    },
    {
      path: '/payment/fail',
      name: 'payment-fail',
      component: PaymentFail
    },
    {
      path: '/payment/cancel',
      name: 'payment-cancel',
      component: PaymentCancel
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminDashboard,
      meta: { requiresAuth: true }
    }
  ]
})

// Navigation guard for protected routes
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // This needs to be dynamic because we can't use the store at module scope
    // (it would cause circular dependencies)
    const authStore = useAuthStore()
    if (!authStore.isLoggedIn) {
      next({ name: 'login', query: { redirect: to.fullPath } })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router 