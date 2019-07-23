<template>
  <div>
    <h3 style="text-align: left;margin-bottom: 20px;"><i class="el-icon-setting" style="margin-right: 10px;" />操作历史</h3>

    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="repoName"
        label="仓库名称">
      </el-table-column>
      <el-table-column
        prop="deployTime"
        label="发布时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="deployBeforVersion"
        label="操作之前版本"
        width="180">
      </el-table-column>
      <el-table-column
        prop="deployAfterVersion"
        label="操作之后版本">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="操作用户姓名">
      </el-table-column>
      
      <el-table-column
        prop="type"
        label="操作类型">
      </el-table-column>
      <el-table-column
        prop="reason"
        label="操作原因">
      </el-table-column>
    </el-table>

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

  export default {
    data () {
      return {
        tableData: [{
          repoName: '',
          deployTime: '',
          deployBeforVersion: '',
          deployAfterVersion: '',
          userName: '',
          type: '', //0--更新 1--回退
          reason: '',

          
        }],
        currentPage: 3,
      }
    },
    mounted () {
      this.getDate()
    },
    methods: {
      getDate(){
        Api(requestApi.getActionList, {
          pageNum: 1,
          pageSize: 10
        }, res => {
          this.tableData = res.list
          console.log(this.tableData)
        }, err => {})
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    },
  }
</script>

<style scoped>
.block {
  text-align: right;
  margin-top: 50px;
}
</style>