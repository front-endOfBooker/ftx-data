<template>
  <div>
    <h3 style="text-align: left;margin-bottom: 20px;"><i class="el-icon-setting" style="margin-right: 10px;" />用户管理</h3>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data () {
      return {
        
      }
    },
    mounted () {
      axios.get('/static/demo.json').then(res => {
        console.log("this's demo.json: " + res)
      })
    }
  }
</script>

<style scoped>

</style>