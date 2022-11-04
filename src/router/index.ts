import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import ToDoList from '../pages/ToDoList.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: ToDoList
  },
  {
    path: '/create-todo',
    component: () => import('../pages/CreateToDo.vue')
  },
  {
    path: '/edit-todo/:id',
    component: () => import('../pages/EditToDo.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
