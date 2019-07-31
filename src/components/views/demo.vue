<template>
  <div class="demo">
    <!-- <el-table
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
    </el-table> -->

    <el-input
      type="textarea"
      :rows="2"
      placeholder="请输入内容"
      v-model="text">
    </el-input>
    <el-button @click="submitText">提交</el-button>
    <el-button @click="getText">获取</el-button>

    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.id"
      @close="handleClose(index)"
      closable>
      {{tag.name}}
    </el-tag>
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
        text: '',
        tags: []
      }
    },
    mounted () {
      this.getText()
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
      },
      submitText() {
        axios.post('http://localhost:3000/add', qs.stringify({
          name: this.text,
          id: this.createId(this.tags)
        })).then(res => {
          if (res.data.code == 200) {
            this.text = ''
            this.getText()
          }
        })
      },
      getText(){
        axios.get('http://localhost:3000/').then(res => {
          this.tags = res.data
          console.log(this.tags)
        })
      },
      handleClose(index){
        console.log(index)
        axios.post('http://localhost:3000/delete', qs.stringify({
          index,
        })).then(res => {
          if (res.data.code == 200) {
            this.getText()
          }
        })
      },
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
      
    }
  }
</script>

<style lang="scss" scoped>
$demo-color1: red;
@import '../../assets/css/demo.scss';
</style>