<template>
    <div>
        <el-container>
  <el-aside width="200px">
      <el-menu
      router
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/managerUser">
          <i class="el-icon-location"></i>
          <span slot="title">Show all user</span>
      </el-menu-item>
      <!-- <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
     
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">导航三</span>
      </el-menu-item> -->
    </el-menu>
  </el-aside>
  <el-container>
    <el-header>Username: {{managerName}}</el-header>
    <el-main>
        <router-view/>
    </el-main>
  </el-container>
</el-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
           managerName: sessionStorage.managerName
        }
    },
     methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style>
style>
  .el-header, .el-footer {
    background-color: #FFFFFF;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #FFFFFF;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
</style>