import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/layout/Layout.vue'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)



export default new Router({
  mode: 'history',
  // scrollBehavior: () => ({ y: 0 }),
  routes: [{
      path: '/',
      name: 'home',
      component: Layout,
      children: [{
          redirect: 'index',
          path: '/index',
          name: 'index',
          component: () => import('@/components/content/tabMain'),
        },
       
      ]
    },
 
    {
      path: '*',
      name: '404',
      component: () => import('@/views/404'),
    }
  ]
})