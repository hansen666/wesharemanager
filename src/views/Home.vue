<template>
  <div class="home">
    <div class="header">
      <img
        src="../static/weShare.png"
        class="logo"
      />
      <label
        style="display:inline"
        class="title"
      >校园供需小助手</label>
      <div class="account">Hi,{{account}}</div>
      <label
        class="logout"
        @click="logout"
      >退出登录</label>
    </div>
    <div class="body">
      <Nav class="nav"></Nav>
      <router-view class="content"></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'
import { mapState } from 'vuex'

export default {
  name: 'home',
  computed: {
    account() {
      return localStorage.getItem('account')
    },
    ...mapState([
      'localhost'
    ])
  },
  methods: {
    logout() {
      this.$http.get(`${this.localhost}/admin/logout`)
        .then(result => {
          localStorage.removeItem('token')
          localStorage.removeItem('account')
          this.$router.push('/login')
        }, error => {
          console.log('退出登录失败', error)
        })
    }
  },
  components: {
    Nav
  }
}
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
}
.header {
  display: flex;
  height: 80px;
  width: 100%;
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
}
.header .logo {
  width: 120px;
  height: 80px;
  margin-left: 40px;
}
.header .title {
  flex: 1;
  font-size: 30px;
  font-weight: bold;
  margin-top: 10px;
}
.header .account {
  font-size: 20px;
  margin-top: 50px;
}
.header .logout {
  font-size: 15px;
  margin-top: 50px;
  margin-left: 30px;
}
.header .logout:hover {
  color: red;
}
.body {
  width: 100%;
  height: 500px;
  display: flex;
  margin-top: 20px;
}
.body .nav {
  margin-left: 40px;
  width: 120px;
  height: 100%;
  padding-right: 20px;
}
.body .content {
  flex: 1;
  margin: 0 40px;
}
</style>
