<template>
    <el-table
    :data="logInfo"
    style="width: 100%">
    <el-table-column
      label="Task"
      prop="logInfo"
      :width="1300">
    </el-table-column>
     <el-table-column
      label="Time"
      prop="logTime">
      <template slot-scope="scope">{{scope.row.logTime | formatDate}}</template>
    </el-table-column>
     
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        
      </template>
      <template slot-scope="scope">
        <!-- <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button> -->
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import '@/assets/css/style.css';
import axios from 'axios';
import {formatDate} from '@/components/common/date.js'
  export default {
     data() {
      return {
        
        logInfo:[],
        
      }
    },
    created() {
        this.userName = this.$route.query.loginName
        axios.get(`http://47.104.86.90:8082/user/showUserLog?userLoginName=${this.userName}`,{
        headers:{
          token: sessionStorage.getItem("token")
        }
      })
      .then(response=>{
        this.logInfo = response.data;
      })
    },
     filters: {
        formatDate (time) {
            let date = new Date(time)
            return formatDate(date,'hh:mm yyyy-MM-dd')
        }
     }
    // methods: {
    //   handleEdit(index, row) {
        
    //     console.log(index, row);
    //   },
    //   handleDelete(index, row) {
    //     console.log(index, row);
    //   }
    // },
    
  } 
</script>