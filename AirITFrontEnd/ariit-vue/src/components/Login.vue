<template>

<body id="poster">
  <el-form class="login-container" label-position="left" label-width="0px">
    <h3 class="login_title">Enterprise Managemenent System</h3>
    <el-form-item>
      <el-input type="text" v-model="username" auto-complete="off" placeholder="Username"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input
        type="password"
        v-model="password"
        auto-complete="off"
        placeholder="Password"
      ></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button
        type="primary"
        style="width: 100%;background: #505458;border: none"
        v-on:click="login"
      >Login</el-button>
    </el-form-item>
  </el-form>
</body>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      
      username: '',
      password: '',
      
      token:""
    }
  },
  methods: {
    login (event) {
      // let self = this;
      
      event.preventDefault()
      let formData = new FormData()
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      formData.append('username', this.username)
      formData.append('password', this.password)
      this.$axios
        .post('http://47.104.86.90:8082/admin/login', formData, config)

        .then(response => {
          if (response.data) {
            sessionStorage.setItem('token', response.data.token)
            sessionStorage.setItem('admin','admin');
            sessionStorage.setItem('adminName',response.data.admin.username)
            this.$router.push({ path: "/index" });
          } else {
            alert('Error')
          }
        })
        .catch(failResponse => {})
    }
  }
}
</script>
<style>
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

/* background */
#poster {
  background: url("../assets/998287.jpg") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
body {
  margin: 0px;
}
</style>
