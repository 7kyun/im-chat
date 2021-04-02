import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import cookie from 'js-cookie'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Chat',
    component: () => import('../views/Chat.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  next()
})

export default router