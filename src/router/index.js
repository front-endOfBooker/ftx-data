import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import('@/components/Login') 
const Index = () => import('@/components/Index')

const dataTable = () => import('@/components/views/dataTable')
const dataShow = () => import('@/components/views/dataShow')
const chart = () => import('@/components/views/chart')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: 'dataTable',
      children: [
        {
          path: 'dataTable',
          name: 'dataTable',
          component: dataTable
        },
        {
          path: 'dataShow',
          name: 'dataShow',
          component: dataShow
        },
        {
            path: 'chart',
            name: 'chart',
            component: chart
          }
      ]
    }
  ]
})
