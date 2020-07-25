<template>
<div>
<el-page-header @back="goBack" title="back"></el-page-header>

    <el-table
    :data="logfile"
    style="width: 100%">
    
    <el-table-column
      label="Task"
      prop="logInfo"
      :width="800">
    </el-table-column>

     <el-table-column

      label="Time"
      prop="logTime">
      <template slot-scope="scope">{{scope.row.logTime | formatDate}}</template>

    </el-table-column>
     <el-table-column
      label="Username"
      prop="user.name">
    </el-table-column>
    

    <el-table-column
      align="right">
     
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import '@/assets/css/style.css';
import axios from 'axios';
import {formatDate} from '@/components/common/date.js'

  export default {
     data() {
      return {
        logfile:[],
        newlog: [],
        //content: logfile.user.name+"的页面"
      }
    },
    created() {
        this.logfile = this.$route.query.info
    },
    filters: {
        formatDate (time) {
            let date = new Date(time)
            return formatDate(date,'hh:mm yyyy-MM-dd')
        }
    },
    methods: {
      handleEdit(index, row) {
        this.$prompt("请修改日志", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
       
      })
        .then(({ value }) => {
          
          this.$message({
            type: "success",

            message: "本次修改: " + value
          });
          axios
            .get(
              `http://47.104.86.90:8082/manager/fixLog?logInfo=${value}&logId=${row.id}`,
              {
                headers: {
                  token: sessionStorage.getItem("token")
                }
              }
            )
            .then(response => {
              this.newLog = response.data;
            });
        })
        console.log(index, row);
      },
//       dateFormat:function(time) {
//     var date=new Date(time);
//     var year=date.getFullYear();
//     /* 在日期格式中，月份是从0开始的，因此要加0
//      * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
//      * */
//     var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
//     var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
//     var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
//     var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
//     var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
//     // 拼接
//     return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
// },

     

      goBack() {
          this.$router.go(-1)
        console.log('go back');
      },
      handleDelete(index, row) {
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          axios
            .get(
              `http://47.104.86.90:8082/manager/DeleteLog?logId=${row.id}`,
              {
                headers: {
                  token: sessionStorage.getItem("token")
                }
              }
            )
            .then(response => {
              
            }); 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
                   
        });
        console.log(index, row);
      }
    },
    
  } 
</script>