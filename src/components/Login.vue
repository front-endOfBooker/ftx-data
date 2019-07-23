<template>
  <div class="login">
    <div class="login-box">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model.number="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          pass: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'change' }
          ],
          pass: [
            { required: true, message: '请输入密码', trigger: 'change' }
          ],
          
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.ruleForm.name == 'admin' && this.ruleForm.pass == '123456') {
              localStorage.setItem('Flag', 'isLogin')
              this.$router.push({
                name: 'Index'
              })
            } else {
              this.$message({
                message: '密码或账户错误',
                type: 'danger'
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  background: url('../../static/lognBack.jpg') no-repeat;
  padding-top: 300px;
  box-sizing: border-box;
}
.login > .login-box {
  margin: 0 auto;
  width: 30%;
}
</style>