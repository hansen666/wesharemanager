import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: { name: 'home' }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          // 当 /home/userManager 匹配成功，
          // UserManager 会被渲染在 Home.vue 的 <router-view> 中
          path: 'userManager',
          alias: '',
          component: () => import('./components/UserManager.vue')
        },
        {
          // 当 /home/userManager 匹配成功，
          // UserManager 会被渲染在 Home.vue 的 <router-view> 中
          path: 'userDetail',
          component: () => import('./components/userManager/UserDetail.vue')
        },
        {
          path: 'goodsManager',
          component: () => import('./components/GoodsManager.vue')
        },
        {
          path: 'transactionManager',
          component: () => import('./components/TransactionManager.vue')
        },
        {
          path: 'customerFeedBack',
          component: () => import('./components/CustomerFeedBack.vue')
        },
        {
          path: 'blackList',
          component: () => import('./components/BlackList.vue')
        },
        {
          path: 'dataStatistics/userStatictics',
          component: () =>
            import('./components/dataStatistics/UserStatistics.vue')
        },
        {
          path: 'dataStatistics/goodsStatictics',
          component: () =>
            import('./components/dataStatistics/GoodsStatistics.vue')
        },
        {
          path: 'dataStatistics/transactionStatictics',
          component: () =>
            import('./components/dataStatistics/TransactionStatistics.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    }
  ]
})
