<template>
  <div>
    <div id="main"></div>
  </div>
</template>

<script>
const echarts = require("echarts");
import axios from "axios";
export default {
  data() {
    return {};
  },
  mounted() {
    const myChart = echarts.init(document.getElementById("main"));
    this.getDate();
    myChart.setOption({
      title: {
        text: "ECharts"
      },
      dataset: {
        source: [
          ["data", "booker", "fox", "melo"],
          ["score", 43.3, 85.8, 93.7],
          ["rebound", 83.1, 73.4, 55.1],
          ["assist", 86.4, 65.2, 82.5],
          ["steal", 72.4, 53.9, 39.1],
          ["block", 1, 2, 1]
        ]
      },
      tooltip: {},
      xAxis: {
        type: "category"
      },
      yAxis: {},
      series: [
        { type: "bar", name: "demo1" },
        { type: "bar", name: "demo2" },
        { type: "bar", name: "demo3" }
      ]
    });
  },
  methods: {
    initData() {
      let nowMonth = new Date().getMonth() + 1;
      let monthList = [];
      switch (nowMonth) {
        case 11:
          monthList = [10];
          break;
        case 12:
          monthList = [10, 11];
          break;
        case 1:
          monthList = [10, 11, 12];
          break;
        case 2:
          monthList = [10, 11, 12, 1];
          break;
        case 3:
          monthList = [10, 11, 12, 1, 2];
          break;
        case 4:
          monthList = [10, 11, 12, 1, 2, 3];
          break;
        case 5:
          monthList = [10, 11, 12, 1, 2, 3];
          break;
      }
      for (let i = 0; i < monthList.length; i++) {
        this.getDate(monthList[i]).then(res => {});
      }
    },
    getDate(month) {
      return new Promise((resolve, reject) => {
        axios.get(`http://localhost:3000/data?date=${month}`).then(res => {
          resolve(res);
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#main {
  width: 600px;
  height: 500px;
}
</style>