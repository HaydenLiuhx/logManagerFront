<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="Userid"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Username"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>email: {{ scope.row.email }}</p>
          <p>phone: {{ scope.row.phone }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Logfile</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="open(scope.$index, scope.row)">Add</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import "@/assets/css/style.css";
import axios from "axios";
export default {
    methods: {
      handleEdit(index, row, event) {
          console.log(row.id)
      axios
        .get(`http://47.104.86.90:8082/manager/showUserLog?userId=${row.id}`, {
          headers: {
            token: sessionStorage.getItem("token")
          }
        })
        .then(response => {
          //this.loginfo = response.data
          this.$router.push({
            path: "/managerUserLog",
            query: { info: response.data }
          });
        })
    },
      open(index, row, event) {
      this.$prompt("请添加日志", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
        //inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        //inputErrorMessage: '邮箱格式不正确'
      })
        .then(({ value }) => {
          
          this.$message({
            type: "success",
            
            message: "本次修改: " + value
          });
          axios
            .get(
              `http://47.104.86.90:8082/manager/AddUserLog?logInfo=${value}&userId=${row.id}`,
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

    },
    },
    data() {
        return {
            tableData: [],
            managerName: sessionStorage.managerName
        }
    },
    created() {
        axios
      .get(`http://47.104.86.90:8082/manager/showUser?managerName=${this.managerName}`, {
        headers: {
          token: sessionStorage.getItem("token")
        }
      })
      .then(response => {
        this.tableData = response.data;
      });
    },
    

}
</script>