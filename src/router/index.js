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
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
  },
  {
    path:'/back',
    name:'Back', 
    component: () => import(/* webpackChunkName: "back" */ '../views/Back.vue'),
    meta: { requiresAuth: true },
    redirect: {
      name:"Dashboard",
    },

  },
  {
    path:'/dashboard',
    name:'Dashboard', 
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    meta: { requiresAuth: true, userComplete: true }
  },
  {
    path:'/dashboard/entreprise',
    name:'Entreprise', 
    component: () => import(/* webpackChunkName: "monEntreprise" */ '../views/MonEntreprise.vue'),
    meta: { requiresAuth: true, userComplete: true }
  },

  {
    path:'/dashboard/taches',
    name:'Taches', 
    component: () => import(/* webpackChunkName: "taches" */ '../views/Task.vue'),
    meta: { requiresAuth: true, userComplete: true }
  },
  {
    path:'/dashboard/messages',
    name:'Messages', 
    component: () => import(/* webpackChunkName: "messages" */ '../views/Messagerie.vue'),
    meta: { requiresAuth: true, userComplete: true }
  },
  {
    path:'/login',
    name:'Login', 
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path:'/stepper',
    name:'Stepper', 
    component: () => import(/* webpackChunkName: "stepper" */ '../views/Stepper.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
