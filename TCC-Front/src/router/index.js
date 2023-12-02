import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/idade',
    name: 'idade',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeIdadeVue.vue')
  },
  {
    path: '/cadastros',
    name: 'cadastros',
    component: () => import(/* webpackChunkName: "about" */ '../views/CadastrosView.vue')
  },
  {
    path: '/livros',
    name: 'livros',
    component: () => import(/* webpackChunkName: "about" */ '../views/CadastrosIdadeView.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
