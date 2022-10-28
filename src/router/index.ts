import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import ToDoList from '../pages/ToDoList.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  }, 
  {
    path: '/home',
    component: ToDoList
  },
  {
    path: '/home/detail/:id',
    component: () => import('../pages/ItemDetail.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
