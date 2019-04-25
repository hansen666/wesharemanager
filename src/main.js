import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VCharts from 'v-charts'
import './plugins/element.js'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'

Vue.use(VueAxios, axios)
Vue.use(VCharts)
Vue.use(preview)
Vue.config.productionTip = false

// 请求拦截（配置发送请求的信息）
axios.interceptors.request.use(
  function(config) {
    // 处理请求之前的配置
    config.headers['token'] = localStorage.getItem('token')
    config.headers['account'] = localStorage.getItem('account')
    return config
  },
  function(error) {
    // 请求失败的处理
    return Promise.reject(error)
  }
)

// 响应拦截（配置请求回来的信息）
axios.interceptors.response.use(
  function(response) {
    // 处理响应数据
    const code = response.data.code
    if (code === -4) {
      localStorage.removeItem('token')
      localStorage.removeItem('account')
      router.push('/login')
    }
    return response
  },
  function(error) {
    // 处理响应失败
    return Promise.reject(error)
  }
)

// Vue.http.interceptors.push((request, next) => {
//   console.log(this) //此处this为请求所在页面的Vue实例
//   // modify request
//   // request.method = 'POST' //在请求之前可以进行一些预处理和配置
//   request.headers.set('account', localStorage.getItem('account') + 1)
//   request.headers.set('token', localStorage.getItem('token'))
//   // continue to next interceptor
//   next(response => {
//     // 在响应之后传给then之前对response进行修改和逻辑判断。对于token时候已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法
//     //const code = response.body.code
//     console.log(response, 'respon')
//     // if (code == -4 || code == -3) {
//     //   localStorage.removeItem('token')
//     //   localStorage.removeItem('account')
//     //   this.$router.push('/login')
//     // }
//     return response
//   })
// })

new Vue({
  router,
  store,
  render: h => h(App),

  created() {
    this.checkLogin()
  },
  watch: {
    $route: 'checkLogin'
  },
  methods: {
    checkLogin() {
      if (!(localStorage.getItem('token') && localStorage.getItem('account'))) {
        this.$router.push('/login')
      }
    }
  }
}).$mount('#app')
