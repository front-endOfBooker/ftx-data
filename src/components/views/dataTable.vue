<template>
  <div class="demo">
    <el-row>
      <el-col :span="4">
        <div class="block">
          <el-date-picker
            v-model="searchMonth"
            type="month"
            size="mini"
            @change="startSearch"
            placeholder="选择月">
          </el-date-picker>
        </div>
      </el-col>

      <el-col :span="2" :offset="18">
        <el-button style="margin-bottom: 10px;" type="primary" size="mini" @click="playerVisible = true">添加</el-button>
      </el-col>
    </el-row>

    <el-table
      :data="tableData"
      style="width: 100%"
      :default-sort = "{prop: 'score', order: 'descending'}"
      >
      <el-table-column
        type="expand"
        width="80">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="">
              <p v-for="(item, index) in props.row.data" :key="index*Math.random()">
                {{ item.time }}&nbsp;&nbsp; {{ item.score }}p {{ item.rebound }}reb {{ item.assist }}ass {{ item.steal }}stl {{ item.block }}blk
              </p>
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
        label="team">
      </el-table-column>
      <el-table-column
        label="sessions"
        :formatter="formatterSession">
      </el-table-column>
      <el-table-column label="average">
        <el-table-column
          label="score"
          prop="data"
          sortable
          :formatter="formatterScore">
        </el-table-column>
        <el-table-column
          label="rebound"
          prop="data"
          sortable
          :formatter="formatterRebound">
        </el-table-column>
        <el-table-column
          label="assist"
          prop="data"
          sortable
          :formatter="formatterAssist">
        </el-table-column>
        <el-table-column
          label="steal"
          prop="data"
          sortable
          :formatter="formatterSteal">
        </el-table-column>
        <el-table-column
          label="block"
          prop="data"
          sortable
          :formatter="formatterBlock">
        </el-table-column>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="mini">add</el-button>
          <el-button @click="deleteClick(scope.row)" type="text" size="mini">delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="add player" :visible.sync="playerVisible">
      <el-form :inline="true" :model="playData" class="demo-form-inline">
        <el-form-item label="name">
          <el-input v-model="playData.name" placeholder="name"></el-input>
        </el-form-item>
        <el-form-item label="team">
          <el-input v-model="playData.team" placeholder="team"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="add gameData" :visible.sync="gameVisible">
      <el-form :inline="true" :model="gameData" class="demo-form-inline">
        <el-form-item label="time">
          <el-date-picker
            v-model="gameData.time"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="score">
          <el-input v-model="gameData.score" placeholder="score"></el-input>
        </el-form-item>
        <el-form-item label="rebound">
          <el-input v-model="gameData.rebound" placeholder="rebound"></el-input>
        </el-form-item>
        <el-form-item label="assist">
          <el-input v-model="gameData.assist" placeholder="assist"></el-input>
        </el-form-item>
        <el-form-item label="steal">
          <el-input v-model="gameData.steal" placeholder="steal"></el-input>
        </el-form-item>
        <el-form-item label="block">
          <el-input v-model="gameData.block" placeholder="block"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onGameSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
  import {Api} from '../../api/Api'
  import axios from 'axios'
  const qs = require('qs')
  export default {
    data () {
      return {
        tableData: [],
        tags: [],
        playerVisible: false,
        gameVisible: false,
        playData: { name: '', team: '' },
        gameData: { time: '', score: '', rebound: '', assist: '', steal: '', block: '' },

        searchMonth: '',
      }
    },
    mounted () {
      this.getText()
    },
    methods: {
      formatterScore(row, column) {
        if (row.data) {
          let averageScore = 0
          for (let i = 0; i < row.data.length; i++) {
            averageScore += Number(row.data[i].score)
          }
          averageScore = averageScore/row.data.length
          return averageScore.toFixed(2);
        }
        return ''
      },
      formatterRebound(row, column) {
        if (row.data) {
          let averageRebound = 0
          for (let i = 0; i < row.data.length; i++) {
            averageRebound += Number(row.data[i].rebound)
          }
          averageRebound = averageRebound/row.data.length
          return averageRebound.toFixed(2);
        }
        return ''
      },
      formatterAssist(row, column) {
        if (row.data) {
          let averageAssist = 0
          for (let i = 0; i < row.data.length; i++) {
            averageAssist += Number(row.data[i].assist)
          }
          averageAssist = averageAssist/row.data.length
          return averageAssist.toFixed(2);
        }
        return ''
      },
      formatterSteal(row, column) {
        if (row.data) {
          let averageSteal = 0
          for (let i = 0; i < row.data.length; i++) {
            averageSteal += Number(row.data[i].steal)
          }
          averageSteal = averageSteal/row.data.length
          return averageSteal.toFixed(2);
        }
        return ''
      },
      formatterBlock(row, column) {
        if (row.data) {
          let averageBlock = 0
          for (let i = 0; i < row.data.length; i++) {
            averageBlock += Number(row.data[i].block)
          }
          averageBlock = averageBlock/row.data.length
          return averageBlock.toFixed(2);
        }
        return ''
      },
      formatterSession(row, column) {
        if (row.data) {
          return row.data.length
        }
        return 0
      },
      getText(){
        axios.get('http://localhost:3000/').then(res => {
          this.tableData = res.data
          this.tableData.forEach((item, index) => {
            if (item.data) {
              this.tableData[index].data = (this.tableData[index].data instanceof Array) ? this.tableData[index].data : [this.tableData[index].data]
            }
          })
        })
      },
      deleteClick(row) {
        console.log(row.id)
        axios.post('http://localhost:3000/delete', qs.stringify({
          id: row.id
        })).then(res => {
          if (res.data.code == 200) {
            this.getText()
          }
        })
      },
      // handleClose(index){
      //   axios.post('http://localhost:3000/delete', qs.stringify({
      //     index,
      //   })).then(res => {
      //     if (res.data.code == 200) {
      //       this.getText()
      //     }
      //   })
      // },
      createId (list) {
        let id = Math.ceil(Math.random()*100)
        if (checkId(id, list)) {
          return id
        } else {
          return createId(list)
        }

        function checkId (id, list) {
          for (let i = 0; i < list.length; i++) {
            if (id === list[i].id) {
              return false
            }
          }
          return true
        }
      },
      onSubmit () {
        // console.log(this.playData)
        let params = {
          name: this.playData.name,
          team: this.playData.team,
          id: this.createId(this.tableData)
        }
        axios.post('http://localhost:3000/add', qs.stringify(params)).then(res => {
          if (res.data.code == 200) {
            this.getText()
          }
        })
        this.playerVisible = false
        this.playData.name = ''
        this.playData.team = ''
      },
      handleClick(row){
        // console.log(row)
        this.gameVisible = true
        this.operateId = row.id
      },
      onGameSubmit(){
        // console.log(this.gameData)
        let date = new Date(this.gameData.time)
        this.gameData.time = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
        axios.post('http://localhost:3000/addGame', qs.stringify({
          id: this.operateId,
          data: JSON.stringify(this.gameData)
        })).then(res => {
          this.gameVisible = false
          this.gameData.score = ''
          this.gameData.rebound = ''
          this.gameData.assist = ''
          this.gameData.steal = ''
          this.gameData.block = ''
          this.gameData.time = ''
          this.getText()
        })
      },
      startSearch(e){
        console.log(e)
        let month = new Date(e).getFullYear() + '/' + (new Date(e).getMonth() + 1)
        console.log(month)
        axios.get(`http://localhost:3000/data?date=${month}`).then(res => {
          this.tableData = res.data
          this.tableData.forEach((item, index) => {
            if (item.data) {
              this.tableData[index].data = (this.tableData[index].data instanceof Array) ? this.tableData[index].data : [this.tableData[index].data]
            }
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
$demo-color1: red;
@import '../../assets/css/demo.scss';
</style>