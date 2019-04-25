import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    localhost: 'http://localhost/apis',
    remote: 'https://www.compusshare.cn',
    remote_static: 'https://www.compusshare.cn/weshare'
  },
  mutations: {},
  actions: {}
})
