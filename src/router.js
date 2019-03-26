import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/index',
      name: 'index',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () => import('./views/Index.vue')
    },
    {
      path: '/',
      name: 'index',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () => import('./views/Index.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        requireAuth: false,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () => import('./views/Login.vue')
    },
    {
      path: '/group',
      name: 'group',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () => import('./views/group/Group.vue')
    },
    {
      path: '/rules',
      name: 'rules',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () => import('./views/group/Rules.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () => import('./views/group/Admin.vue')
    },
    {
      path: '/mates',
      name: 'mates',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () => import('./views/mates/Mates.vue')
    },
    {
      path: '/mates/store',
      name: 'addMate',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () => import('./views/mates/Store.vue')
    },
    {
      path: '/sms',
      name: 'sms',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () => import('./views/sms/Sms.vue')
    },
    {
      path: '/sms/smslog',
      name: 'smslog',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () => import('./views/sms/Smslog.vue')
    },
    // {
    //   path: '/sms/store',
    //   name: 'addTemplate',
    //   meta: {
    //     requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    //   },
    //   component: () => import('./views/sms/Store.vue')
    // },
    {
      path: '/boxs',
      name: 'boxs',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () => import('./views/boxs/Boxs.vue')
    },
    // {
    //   path: '/boxs/store',
    //   name: 'store',
    //   meta: {
    //     requireAuth: false,  // 添加该字段，表示进入这个路由是需要登录的
    //   },
    //   component: () => import('./views/boxs/Store.vue')
    // },
    {
      path: '/finance/lists',
      name: 'lists',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () => import('./views/finance/Lists.vue')
    },
    {
      path: '/finance/counts',
      name: 'counts',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () => import('./views/finance/Counts.vue')
    },
    {
      path: '/agents',
      name: 'agents',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () => import('./views/agents/Agents.vue')
    },
    {
      path: '/agents/store',
      name: 'store',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () => import('./views/agents/Store.vue')
    },
    {
      path: '/users',
      name: 'users',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () => import('./views/users/Users.vue')
    },
    {
      path: '/users/userList',
      name: 'pays',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () => import('./views/users/UserList.vue')
    },
    {
      path: '/details',
      name: 'details',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () => import('./views/mates/Details.vue')
    },
    {
      path: '/basicInfo',
      name: 'basicInfo',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () => import('./views/BasicInfo.vue')
    }
  ]
})
