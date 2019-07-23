<template>
  <div class="demo">
    <el-table
      :data="tableData"
      style="width: 100%"
      :default-sort = "{prop: 'date', order: 'descending'}"
      >
      <el-table-column
        type="expand"
        width="180">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="">
              <p v-for="(item, index) in props.row.data" :key="index*Math.random()">{{ item.score }}p {{ item.rebound }}reb {{ item.assist }}ass</p>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="name">
      </el-table-column>
      <el-table-column
        prop="team"
        label="team"
        width="180">
      </el-table-column>
      <el-table-column
        prop="data"
        label="average"
        sortable
        :formatter="formatter">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {Api} from '../../api/Api'
  export default {
    data () {
      return {
        tableData: []
      }
    },
    mounted () {
      // axios.get('/static/demo.json').then(res => {
      //   console.log("this's demo.json: " + res)
      // })
      Api('demo.json', res => {
        console.log(res)
        this.tableData = res
      }, err => {})
    },
    methods: {
      formatter(row, column) {
        console.log(row)
        let averageScore = 0
        for (let i = 0; i < row.data.length; i++) {
          averageScore += row.data[i].score
        }
        averageScore = averageScore/row.data.length
        return averageScore;
      }
    }
  }
</script>

<style lang="scss" scoped>
$demo-color1: red;
@import '../../assets/css/demo.scss';
</style>