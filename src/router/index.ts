import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import PaymentSuccess from '../views/PaymentSuccess.vue'
import PaymentFail from '../views/PaymentFail.vue'

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
      component: PaymentFail
    }
  ]
})

export default router 