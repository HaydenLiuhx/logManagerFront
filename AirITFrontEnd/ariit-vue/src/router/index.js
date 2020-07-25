import Vue from 'vue'
import Router from 'vue-router'
import AdminLog from '@/components/home/adminLog.vue'
import Login from '@/components/Login.vue'
import UserLogin from '@/components/UserLogin.vue'
import Index from '@/components/home/index.vue'
import UserLog from '@/components/home/userLog.vue'
import UserIndex from '@/components/pages/UserIndex.vue'
import AllLogs from '@/components/home/allLogs.vue'
import ManagerLogin from '@/components/ManagerLogin.vue'
import ManagerIndex from '@/components/manager/managerIndex.vue'
import ManagerUser from '@/components/manager/managerUser.vue'
import ManagerUserLog from '@/components/manager/managerUserLog.vue'
import Hometest from '@/components/test/hometest.vue'
import PageOne from '@/components/test/page1.vue'
import PageTwo from '@/components/test/page2.vue'
import PageThree from '@/components/test/page3.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      redirect: '/userLogin'
    },
    {
      path: '/userLogin',
      name: 'Userlogin',
      component: UserLogin
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: Index,
      children: [{
        path: '/allLogs',
        name: 'allLogs',
        component: AllLogs
      }]
    },
    {
      path: '/userLog',
      name: 'userLog',
      //   meta: {
      //     requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      // },
      component: UserLog
    },
    {
      path: '/userIndex',
      name: 'userIndex',
      //   meta: {
      //     requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      // },
      component: UserIndex
    },
    {
      path: '/adminLog',
      name: 'adminLog',
      component: AdminLog
    },
    {
      path: '/hometest',
      name: 'hometest',
      component: Hometest
    },
    {
      path: '/page1',
      name: 'page1',
      component: PageOne,
      children: [{
        path: '/page2',
        name: 'page2',
        component: PageTwo
      },
      {
        path: '/page3',
        name: 'page3',
        component: PageThree
      }]
    },
    {
      path: '/managerLogin',
      name: 'managerLogin',
      component: ManagerLogin
    },
    {
      path: '/managerIndex',
      name: 'managerIndex',
      component: ManagerIndex,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      children: [{
        path: '/managerUser',
        name: 'managerUser',
        component: ManagerUser
      }]
    },
    {
      path: '/managerUserLog',
      name: 'managerUserLog',
      component: ManagerUserLog
    }
  ]
})
