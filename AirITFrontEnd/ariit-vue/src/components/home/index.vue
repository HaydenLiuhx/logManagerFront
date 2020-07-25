<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>导航
          </template>
          <el-menu-item-group>
            <template slot="title">Navigate</template>
            <el-menu-item index="1-1">Home</el-menu-item>
            <el-menu-item index="1-2" @click="dialogFormVisible = true">Add New User</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main>
      <el-table :data="users" style="width: 100%">
        <el-table-column label="UserID" prop="id"></el-table-column>
        <el-table-column label="Name" prop="name"></el-table-column>
        <!-- <el-table-column label="Email" prop="email"></el-table-column>
        <el-table-column label="Balance" prop="balance"></el-table-column>-->
        <el-table-column align="right">
          <template slot="header" slot-scope="scope"></template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Logfile</el-button>
            <!-- <el-button
          size="mini"
          type="danger"
            @click="handleDelete(scope.$index, scope.row)">Edit</el-button>-->
            <el-button size="mini" type="danger" @click="open(scope.$index, scope.row)">Add</el-button>
            <!-- <h3>{{time | formatDate}}</h3> -->

            <el-dialog title="New User" :visible.sync="dialogFormVisible" align="left">
              <el-form :model="form">
                <el-form-item label="User LoginName" :label-width="formLabelWidth">
                  <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="User LoginPassword" :label-width="formLabelWidth">
                  <el-input v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="NickName" :label-width="formLabelWidth">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="E-mail" :label-width="formLabelWidth">
                  <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Phone" :label-width="formLabelWidth">
                  <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Balance" :label-width="formLabelWidth">
                  <el-input v-model="form.balance" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="ManagerId" :label-width="formLabelWidth">
                  <el-input v-model="form.managerId" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>


               

                
                <el-button type="primary" @click="submit">Affirm</el-button>
              </div>
            
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import "@/assets/css/style.css";
import axios from "axios";
export default {
  data() {
    return {
      users: [],
      time: Date.parse(new Date()),
      newLog: [],
      newuser: [],
      dialogFormVisible: false,
      dialogVisible: false,
      form: {
        username: "",
        password: "",
        name: "",
        email: "",
        phone: "",
        balance: "",
        managerId: ""
      },
      formLabelWidth: "145px"
      //value: ""
    };
  },

  created() {
    axios
      .get("http://47.104.86.90:8082/admin/showAllUser", {
        headers: {
          token: sessionStorage.getItem("token")
        }
      })
      .then(response => {
        this.users = response.data;
      });
  },
  methods: {
    handleEdit(index, row, event) {
      axios
        .get(`http://47.104.86.90:8082/admin/showUserLog?userId=${index + 1}`, {
          headers: {
            token: sessionStorage.getItem("token")
          }
        })
        .then(response => {
          //this.loginfo = response.data
          this.$router.push({
            path: "/adminLog",
            query: { info: response.data }
          });
        });
    },
    submit(event) {
      event.preventDefault();
      // let formData = new FormData()
      // formData.append('userBalance',this.form.balance)
      // formData.append('userEmail',this.form.email)
      // formData.append('userName',this.form.name)
      // formData.append('userPassword',this.form.password)
      // formData.append('userPhone',this.form.phone)
      // formData.append('userLoginName',this.form.username)
      axios
        .get(
          `http://47.104.86.90:8082/admin/AddUser?userBalance=${this.form.balance}&userEmail=${this.form.email}&userName=${this.form.name}&userPassword=${this.form.password}&userPhone=${this.form.phone}&userLoginName=${this.form.username}&userManager=${this.form.managerId}`,
          {
            headers: {
              token: sessionStorage.getItem("token")
            }
          }
        )
        .then(response => {
          this.newuser = response.data;
        });
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    
    open(index, row, event) {
      this.$prompt("请添加日志", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
        //inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        //inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        this.$message({
          type: "success",

          message: "本次修改: " + value
        });
        axios
          .get(
            `http://47.104.86.90:8082/admin/AddUserLog?logInfo=${value}&userId=${this.users[index].id}`,
            {
              headers: {
                token: sessionStorage.getItem("token")
              }
            }
          )
          .then(response => {
            this.newLog = response.data;
          });
      });
    }
    // handleDelete(index, row) {
    //   console.log(index, row);
    // },

    // .catch((err) => {
    //   console.log(err)
    //   this.$message({
    //     type: "info",
    //     message: "取消输入"
    //   });
    // });
  }
};
</script>

