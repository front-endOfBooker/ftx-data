<template>
  <div>
    <h3 style="text-align: left;margin-bottom: 20px;"><i class="el-icon-setting" style="margin-right: 10px;" />添加仓库</h3> 
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" :validate-on-rule-change="false">

      <el-col :span="13">
        <el-form-item class="w60" label="用户或组织" prop="userId">
          <el-select v-model="ruleForm.userId" placeholder="请选择用户或组织" style="width: 100%;" size="small">
            <el-option v-for="user in userList" :key="user.id" :label="user.name" :value="user.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="13">
        <el-form-item class="w60" label="仓库名称" prop="repoName">
          <el-input v-model="ruleForm.repoName" size="small"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="13">
        <el-form-item class="w60" label="仓库类型" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择仓库类型" style="width: 100%;" size="small" @change="changeExtendType">
            <el-option v-for="type in typeList" :key="type.name" :label="type.name" :value="type.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <!-- 仓库类型为APP时的子类型 -->
      <el-col :span="13" v-if="ruleForm.type == 4">
        <el-form-item class="w60" label="仓库子类型" prop="extendType">
          <el-select v-model="ruleForm.extendType" placeholder="请选择仓库子类型" style="width: 100%;" size="small">
            <el-option v-for="type in appExtendType" :key="type.name" :label="type.name" :value="type.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <!-- 仓库类型为server时的子类型 -->
      <el-col :span="13" v-if="ruleForm.type == 2">
        <el-form-item class="w60" label="仓库子类型" prop="extendType">
          <el-select v-model="ruleForm.extendType" placeholder="请选择仓库子类型" style="width: 100%;" size="small">
            <el-option v-for="type in serverExtendType" :key="type.name" :label="type.name" :value="type.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="13">
        <el-form-item class="w60" label="仓库git地址" prop="gitUrl">
          <el-input v-model="ruleForm.gitUrl" size="small"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="13">
        <el-divider class="w60" content-position="left">发布路径</el-divider>
      </el-col>
      <el-col :span="13">
        <el-form-item class="w60" label="测试环境" prop="testDeployPath">
          <el-input v-model="ruleForm.testDeployPath" size="small"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="13">
        <el-form-item class="w60" label="预发布环境" prop="alphaDeployPath">
          <el-input v-model="ruleForm.alphaDeployPath" size="small"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="13">
        <el-form-item class="w60" label="正式环境" prop="releaseDeployPath">
          <el-input v-model="ruleForm.releaseDeployPath" size="small"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="13" style="margin-top: 50px;">
        <el-form-item class="w60">
          <el-button size="medium" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button size="medium" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>

<script>
  import {Api} from '../../api/Api'
  import * as requestApi from '../../api/requestApi'
  
  export default {
    data() {
      return {
        ruleForm: {
          userId: '',
          repoName: '',
          type: '',
          gitUrl: '',
          testDeployPath: '',
          alphaDeployPath: '',
          releaseDeployPath: '',

          extendType: ''
        },
        rules: {
          userId: [
            { required: true, message: '请选择用户或组织', trigger: 'change' }
          ],
          repoName: [
            { required: true, message: '请输入仓库名称', trigger: 'change' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
          ],
          type: [
            {required: true, message: '请选择仓库类型', trigger: 'change'}
          ],
          gitUrl: [
            { required: true, message: '请输入仓库git地址', trigger: 'change' }
          ],
          testDeployPath: [
            { required: true, message: '请输入测试环境发布路径', trigger: 'change' }
          ],
          alphaDeployPath: [
            { required: true, message: '请输入预发布环境发布路径', trigger: 'change' }
          ],
          releaseDeployPath: [
            { required: true, message: '请输入正式环境发布路径', trigger: 'change' }
          ]
        },
        userList: [],
        typeList: [
          { name: 'web', id: 1},
          { name: 'server', id: 2},
          { name: 'h5', id: 3},
          { name: 'APP', id: 4},
          { name: 'PC', id: 5},
        ],
        appExtendType: [
          { name: 'IOS', id: 1},
          { name: 'Android', id: 2},
        ],
        serverExtendType: [
          { name: 'PHP', id: 1},
          { name: 'Java', id: 2},
        ]
      }
    },
    mounted () {
      this.getUser()
    },
    methods: {
      getUser() {
        Api(requestApi.getGitUser, {}, res => {
          this.userList = res
        }, err => {})

      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = this.ruleForm
            params.username = this.findName(this.ruleForm.userId)
            console.log(params)
            Api(requestApi.addRepo, params, res => {
              this.$message({
                message: '创建成功',
                type: 'success'
              });
              setTimeout(() => {
                this.resetForm('ruleForm')
              }, 500)
            }, err => {
              console.log(err)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      findName(id){
        let name = ''
        for (let i = 0; i < this.userList.length; i++) {
          if (this.userList[i].id == id) {
            name = this.userList[i].name
            break
          }
        }
        return name
      },
      changeExtendType(e){
        console.log(e)
        console.log(this.ruleForm.extendType)
        if (e == 2 || e == 4) {
          this.rules.extendType = [
            { required: true, message: '请选择仓库子类型', trigger: 'change' }
          ]
        } else {
          this.rules.extendType = []
        }
      }
    }
  }
</script>

<style scoped>

</style>