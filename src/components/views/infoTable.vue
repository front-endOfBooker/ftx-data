<template>
  <div>
    <h3 style="text-align: left;margin-bottom: 20px;"><i class="el-icon-setting" style="margin-right: 10px;" />代码发布信息</h3>
    <el-table :data="tableData">
      <el-table-column prop="repoName" label="仓库名称">
      </el-table-column>
      <el-table-column prop="username" label="用户或组织">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>预发布环境: {{ scope.row.username }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{scope.row.username}}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="仓库类型" width="80">
      </el-table-column>
      <el-table-column prop="gitUrl" label="仓库git地址" width="200">
      </el-table-column>

      <el-table-column label="当前版本">
        <el-table-column prop="testVersion" label="测试版本">
        </el-table-column>
        <el-table-column prop="alphaVersion" label="预发布版本">
        </el-table-column>
        <el-table-column prop="releaseVersion" label="正式版本">
        </el-table-column>
      </el-table-column>

      <el-table-column label="最新版本">
        <el-table-column prop="currentTestVersion" label="测试版本">
        </el-table-column>
        <el-table-column prop="currentAlphaVersion" label="预发布版本">
        </el-table-column>
        <el-table-column prop="currentReleaseVersion" label="正式版本">
        </el-table-column>
      </el-table-column>

      <el-table-column label="操作" width="230">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="reNew(scope.$index, scope.row)">更新</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="rollBack(scope.$index, scope.row)">回滚</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteGit(scope.$index, scope.row)">删除</el-button> 
        </template>
      </el-table-column>

    </el-table>


    <el-dialog
      :title="operateType == 1 ? '请选择更新版本' : '请选择回退版本'"
      :visible.sync="dialogVisible"
      width="30%">
      <template>
        <el-radio-group v-model="radio">
          <el-radio-button :disabled="radio1" :label="1">测试版本</el-radio-button>
          <el-radio-button :disabled="radio2" :label="2">预发布版本</el-radio-button>
          <el-radio-button :disabled="radio3" :label="3">正式版本</el-radio-button>
        </el-radio-group>
        <h5 v-if="nowVersion" style="text-align: left; margin: 20px 0 0 10px; font-weight: 500; font-size: 14px;">当前版本号：{{nowVersion}}</h5>
        <h5 v-if="currentVersion" style="text-align: left; margin: 5px 0 0 10px; font-weight: 500; font-size: 14px;">最新版本号：{{currentVersion}}</h5>
        <el-divider content-position="left">请选择{{operateType == 1 ? '更新' : '回退'}}版本号</el-divider>
        <el-radio-group v-model="detailRadio" class="radio-box">
          <el-radio class="sub-radio" :disabled="false" :label="1">2.0.3_fyj_beta</el-radio>
          <el-radio class="sub-radio" :disabled="false" :label="2">2.0.2_fyj_beta</el-radio>
          <el-radio class="sub-radio" :disabled="false" :label="3">2.0.1_fyj_beta</el-radio>
          <el-radio class="sub-radio" :disabled="false" :label="4">2.0.1_fyj_beta</el-radio>
          <el-radio class="sub-radio" :disabled="false" :label="5">2.0.1_fyj_beta</el-radio>
        </el-radio-group>
        <el-input
          type="textarea"
          :rows="2"
          :placeholder="operateType == 1 ? '请输入更新原因' : '请输入回退原因'"
          style="margin: 10px 0"
          v-model="operateReason">
        </el-input>
      </template>

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="selectRadio">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title=""
      :showClose="false"
      :visible.sync="cmdVisible"
      customClass='CMD'
      width="30%">
      <div slot="title">
        <!-- <div style="bcakground: rgba(0,0,0,0);margin-bottom: 10px;">
          <el-radio-group v-model="radio" size="mini">
            <el-radio-button :disabled="false" :label="1">进行中1</el-radio-button>
            <el-radio-button :disabled="false" :label="2">进行中2</el-radio-button>
            <el-radio-button :disabled="false" :label="3">进行中3</el-radio-button>
          </el-radio-group>
        </div> -->
        <div class="CMD-title">
          <span class="fl CMD-title-content">cmd</span>
          <i class="fr el-icon-close CMD-title-close" @click="cmdVisible = false"></i>
        </div>
      </div>
      <template>
        <div style="height: 300px; color: #fff;" ref="cmdP">
          <p v-for="(item, index) in testText" :key="index">{{item}}</p>
        </div>
      </template>

      <span slot="footer" class="dialog-footer">
        <!-- <el-button size="mini" @click="cmdVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="cmdVisible = false">确 定</el-button> -->
      </span>
    </el-dialog>

    <div id="message">
      <el-tooltip class="item" effect="dark" content="1条进行中的操作" placement="top">
        <i class="el-icon-message-solid" @click="cmdVisible = true"></i>
      </el-tooltip>
    </div>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        :pager-count="5"
        layout="total, prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {Api} from '../../api/Api'
  import * as requestApi from '../../api/requestApi'

  import axios from 'axios'
  const qs = require('qs');

  export default {
    data() {
      const item = {
        repoName: '',
        username: '',
        type: '',
        gitUrl: '',
        testVersion: '',
        alphaVersion: '',
        releaseVersion: '',
        currentTestVersion: '',
        currentAlphaVersion: '',
        currentReleaseVersion: ''
      };
      return {
        tableData: [],
        currentPage: 3,

        dialogVisible: false,
        operateType: 1, //操作类型 1--更新 2--回退
        radio: '', //操作的版本
        radio1: true, //测试版本是否可操作
        radio2: true, //预发布版本是否可操作
        radio3: true, //正式版本是否可操作

        detailRadio: '',
        cmdVisible: false,
        testText: [],

        processing: false, //是否正在更新/回退中

        nowItem: {}, //当前操作的版本
        nowVersion: '', //当前版本号
        currentVersion: '', //最新版本号

        operateReason: ''
      }
    },
    watch: {
      radio(val){
        console.log(val)
        console.log(this.nowItem)
        switch(val){
          case 1: 
          this.nowVersion = this.nowItem.testVersion
          this.currentVersion = this.nowItem.currentTestVersion
          break;
          case 2: 
          this.nowVersion = this.nowItem.alphaVersion
          this.currentVersion = this.nowItem.currentAlphaVersion
          break;
          case 3: 
          this.nowVersion = this.nowItem.releaseVersion
          this.currentVersion = this.nowItem.currentReleaseVersion
          break;
        }
      }
    },
    mounted () {
      this.getDate();
    },
    methods: {
      getDate() {
        Api(requestApi.getRepoList, {}, res => {
          this.tableData = res.map(item => {
            return this.formatTableData(item)
          })
          console.log(this.tableData)
        }, err => {})
      },
      openWebSock() {
        let that = this
        let url = 'ws://47.111.9.22:8082/websocket/20'
        var ws = new WebSocket(url);
        ws.onopen = function () {
          console.log('ws onopen');
          // ws.send('cid');
          that.test().then(res => {
            ws.close()
            that.processing = false
          })
        };
        ws.onmessage = function (e) {
          console.log('ws onmessage');
          that.processing = true
          that.testText.push(e.data)
          that.$refs.cmdP.parentNode.scrollTop = that.$refs.cmdP.parentNode.scrollHeight // 保持cmd显示最新内容
          
        };
        ws.onclose = function (e) {
          console.log('ws onclose')
          that.testText.length = 0
        }
      },
      test() {
        return new Promise((resolve, reject) => {
          axios.post('http://47.111.9.22:8082/deploy/test.do', qs.stringify({cid: 20})).then(res => {
            resolve('done')
          }).catch(err => {})
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      reNew(index, row) {
        this.resetModel()
        this.nowItem = row
        this.operateType = 1
        this.radio1 = this.compareVersion(row.testVersion, row.currentTestVersion) == 2 ? false : true
        this.radio2 = this.compareVersion(row.alphaVersion, row.currentAlphaVersion) == 2 ? false : true
        this.radio3 = this.compareVersion(row.releaseVersion, row.currentReleaseVersion) == 2 ? false : true
        this.dialogVisible = true
      },
      rollBack(index, row) {
        this.resetModel()
        this.nowItem = row
        this.operateType = 2
        this.radio1 = this.compareVersion(row.testVersion, row.currentTestVersion) == 1 ? false : true
        this.radio2 = this.compareVersion(row.alphaVersion, row.currentAlphaVersion) == 1 ? false : true
        this.radio3 = this.compareVersion(row.releaseVersion, row.currentReleaseVersion) == 1 ? false : true
        this.dialogVisible = true
      },
      resetModel(){
        this.nowVersion = ''
        this.currentVersion = ''
        this.radio = ''
      },
      formatTableData(item){
        let newItem = item
        switch(item.type) {
          case 1: newItem.type = 'web'
          break;
          case 2: newItem.type = 'server'
          break;
          case 3: newItem.type = 'h5'
          break;
          case 4: newItem.type = 'APP'
          break;
          case 5: newItem.type = 'PC'
          break;
        }
        newItem.testVersion = item.testVersion ? item.testVersion : '0.0.0',
        newItem.alphaVersion = item.alphaVersion ? item.alphaVersion : '0.0.0',
        newItem.releaseVersion = item.releaseVersion ? item.releaseVersion : '0.0.0',
        newItem.currentTestVersion = item.currentTestVersion ? item.currentTestVersion : '0.0.0',
        newItem.currentAlphaVersion = item.currentAlphaVersion ? item.currentAlphaVersion : '0.0.0',
        newItem.currentReleaseVersion = item.currentReleaseVersion ? item.currentReleaseVersion : '0.0.0'
        return newItem
      },
      compareVersion(now, current) {
        let nowList = now.split('.')
        let currentList = current.split('.')
        const cal = function (a, b) {
          return a == b ? 0 : ( a > b ? 1 : 2)
        }

        if (cal(nowList[0], currentList[0])) {
          return cal(nowList[0], currentList[0])
        } else {
          if (cal(nowList[1], currentList[1])) {
            return cal(nowList[1], currentList[1])
          } else {
            return cal(nowList[2], currentList[2])
          }
        }
      },
      selectRadio() {
        this.dialogVisible = false
        console.log(this.radio)
        setTimeout(() => {
          this.radio = ''
        }, 500)
        if (this.processing) {
          this.$message({
            message: '有正在进行中的任务尚未完成，请稍后再试！',
            type: 'warning'
          })
        } else {
          if (this.operateType == 1) {
            // 更新
            // this.$confirm('确认删除?', '提示', {
            //   confirmButtonText: '确定',
            //   cancelButtonText: '取消',
            //   type: 'warning'
            // }).then(() => {
             
            // }).catch(() => {});
          } else {
            // 回滚
          }
          // this.cmdVisible = true
          // setTimeout(() => {
          //   this.openWebSock()
          // }, 100)
        }
      },
      deleteGit(index, row){
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Api(requestApi.removeRepo, {id: row.id}, res => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            setTimeout(() => {
              this.getDate()
            }, 500)
          }, err => {})
        }).catch(() => {});
      },
    }
  }
</script>

<style lang="scss">
.CMD {
  background-color: rgba(0,0,0,0);
}
.CMD .el-dialog__body {
  background-color: #000!important;
}
.CMD .el-dialog {
  box-shadow: unset;
}
.CMD .el-dialog__header,
.CMD .el-dialog__footer {
  padding: 0;
}
.CMD .el-dialog__body {
  padding: 20px;
  text-align: left;
  overflow-y: scroll;
  overflow-x: hidden;
  word-break: break-all;
}
.CMD .CMD-title {
  background: #fefefe; 
  height: 25px;
}
.CMD-title .CMD-title-content {
  height: 25px; 
  line-height: 25px;
  padding-left: 10px;
}
.CMD-title .CMD-title-close {
  width: 30px; 
  height: 25px; 
  line-height: 25px;
}
</style>

<style lang="scss" scoped>
.block {
  text-align: right;
  margin-top: 50px;
}
.radio-box {
  text-align: left;
  width: 100%;
  // padding-left: 30px;
}
.sub-radio {
  display: block;
  height: 30px; 
  line-height: 30px;
}
#message {
  width: 60px;
  height: 60px;
  line-height: 70px;
  border-radius: 50%;
  position: fixed;
  bottom: 50px;
  right: 50px;
  background:#3eafff;
  box-shadow:0px 0px 8px 0px rgba(0,0,0,0.25);
  cursor: pointer;
}
#message > i {
  font-size: 30px;
  color: #fff;
}

/* .cmd-dialog  */
</style>