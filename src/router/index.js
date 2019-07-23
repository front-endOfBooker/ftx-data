import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import('@/components/Login') 
const Index = () => import('@/components/Index')

const demo = () => import('@/components/views/demo')

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
      redirect: 'demo',
      children: [
        {
          path: 'demo',
          name: 'demo',
          component: demo
        }
      ]
    }
  ]
})
