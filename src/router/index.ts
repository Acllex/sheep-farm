import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/excel-list',
      name: 'excelList',
      component: ()=>import('../views/ExcelList.vue')
    }
  ]
})
router.beforeEach((to, from)=>{
  if (!localStorage.getItem('counter')&&to.path!=='/')return {path: '/'};
})
export default router
