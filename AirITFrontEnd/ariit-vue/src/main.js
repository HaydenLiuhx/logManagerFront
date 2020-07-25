// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/style.css'
import store from './vuex/store.js'
import echarts from 'echarts'

// 设置反向代理，前段请求发送到'http://localhost:8443/api'
var axios = require('axios')
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
// 启动时禁止Vue提示
Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.use(store)
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (sessionStorage.admin) {
      next()
    }
    else if (sessionStorage.manager) {
      next()
    }
    else {
      next({
        path: '/userLogin',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
}
)
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router,
  components: { App },
  template: '<App/>'
})
