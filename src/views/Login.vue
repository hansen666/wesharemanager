<template>
  <div
    class="container"
    id="container"
    @keyup.enter="submitForm('form')"
  >
    <el-form
      :rules="rules"
      ref="form"
      label-width="80px"
      :model="form"
      class="my-form"
    >
      <el-form-item
        label="用户名"
        prop="account"
      >
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('form')"
          class="submit"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      form: {
        account: '',
        password: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: mapState([
    'localhost'
  ]),
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post(`${this.localhost}/admin/login`, {
            account: this.form.account,
            password: this.form.password
          }).then(result => {
            const code = result.data.code
            if (code === -1) {
              alert(result.data.msg)
            }
            else {
              if (code === 1) {
                alert(result.data.msg)
              }
              localStorage.setItem('token', result.data.data.token)
              localStorage.setItem('account', this.form.account)
              this.$router.push('/home')
            }
          }, error => {
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 150px;
  display: flex;
  justify-content: center;
  width: 100%;
}
.my-form {
  width: 400px;
}
.submit {
  width: 100%;
}
</style>
