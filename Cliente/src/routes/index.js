import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)


const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/personal',
      name: 'Personal',
      component: () => import('../views/CatalogoPersonal.vue')
    },
    {
      path: '/tickets',
      name: 'Tickets',
      component: () => import('../views/CatalogoTickets.vue')
    },
    {
      path: '/categorias-tickets',
      name: 'Categorias',
      component: () => import('../views/CategoriasTickets.vue')
    },
    {
      path: '/editarPersonal/:id',
      name: 'EditarPersonal',
      component: () => import('../views/EditarPersonal.vue')
    },
    {
      path: '/editarEstatus/:id',
      name: 'EditarEstatus',
      component: () => import('../views/EditarEstatus.vue')
    },
  ]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })

export default router