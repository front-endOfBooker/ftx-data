<template>
  <div>
    <h3 style="text-align: left;margin-bottom: 20px;"><i class="el-icon-setting" style="margin-right: 10px;" />用户提醒</h3>

    <el-form :model="reminderForm" :rules="rules" ref="reminderForm" label-width="150px" class="demo-reminderForm" :validate-on-rule-change="false">

      <!-- <el-col :span="13">
        <el-form-item class="w60" label="用户或组织" prop="userId">
          <el-select v-model="reminderForm.userId" placeholder="请选择用户或组织" style="width: 100%;" size="small">
            <el-option v-for="user in userList" :key="user.id" :label="user.name" :value="user.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col> -->

      <el-col :span="13" style="text-algin: left">
        <el-form-item class="w60" label="是否开启用户提醒" prop="value1">
          <el-switch
            v-model="reminderForm.value1"
            active-text=""
            inactive-text="">
          </el-switch>
        </el-form-item>
      </el-col>
      
      <el-col :span="13" style="margin-top: 50px;">
        <el-form-item class="w60">
          <el-button size="mini" type="primary" @click="submitForm('reminderForm')">保存设置</el-button>
          <el-button size="mini" @click="resetForm('reminderForm')">恢复默认</el-button>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        reminderForm: {
          value1: false
        },
        rules: {

        },
        
      }
    }
  }
</script>

<style scoped>

</style>