<template>
    <div>
      
      <el-container>
  <el-aside width="200px">
    
     <el-menu router 
     default-active="1-4-1" 
     class="el-menu-vertical-demo" >
  <el-submenu index="1">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">导航一</span>
    </template>
      <el-menu-item index="1-1">选项1</el-menu-item>
      <el-menu-item index="1-2">选项2</el-menu-item>
  </el-submenu>
  <el-menu-item index="/page2">
    <i class="el-icon-menu"></i>
    <span slot="title">PageTWO</span>
  </el-menu-item>
  <el-menu-item index="/page3">
    <i class="el-icon-document"></i>
    <span slot="title">PageTHREE</span>
  </el-menu-item>
  <el-submenu index="4">
      <template slot="title">
    <i class="el-icon-setting"></i>
    <span slot="title">导航四</span>
      </template>
    <el-menu-item index="1-1">选项1</el-menu-item>
      <el-menu-item index="1-2">选项2</el-menu-item>
  </el-submenu>
</el-menu>
  </el-aside>
  <el-container>
    <el-header>{{message}}</el-header>
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
            message: 'this is first page',
            
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

<style scoped>

</style>>
  
