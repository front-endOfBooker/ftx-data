<template>
    <div>
        <div id="main" ref="interestStat"></div>
    </div>
</template>

<script>
    import { originData } from '../../../static/originData';
    export default {
        data() {
            return {
                interestChart: null,
                initDate: 1949,
                
            }
        },
        mounted () {
            this.initData()
          
        },
        methods: {
            initData() {
                this.initChart();
                let i = 0
                let dataClock = setInterval(() => {

                    if (i == originData.length) {
                        clearInterval(dataClock);
                        return
                    };
                    
                    this.interestChart.setOption({
                        title: {
                            text: originData[i].year
                        },
                        xAxis: [
                            { data: originData[i].dateList }
                        ],
                        series: [
                            {
                                data: originData[i].countList
                            }
                        ]
                    })

                    i++
                }, 1000);
            
            },
            initChart() {
                this.interestChart = this.$echarts.init(this.$refs.interestStat)
                var option = {
                    title : {
                        text: 1949,
                        subtext: '单位/人'
                    },
                    tooltip : { trigger: 'axis', formatter: "{b} : {c}人" },
                    legend: { data:['人数'] },
                    xAxis : [{
                        data : ['美国', '英国', '德国', '法国', '日本', '中国', '印度']
                    }],
                    yAxis : [{ type : 'value' }],
                    series : [
                        {
                            name:'人数',
                            type:'bar',
                            data: [30, 16, 15, 14, 12, 2, 2],
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            },
                            itemStyle: {
                                color: function (params){
                                    // var colorList = ['blue', 'pink', 'orange', 'purple', 'green', 'red', 'black'];
                                    let color;
                                    switch(params.name){
                                        case '美国':
                                            color = 'blue'
                                        break
                                        case '英国':
                                            color = 'pink'
                                        break
                                        case '德国':
                                            color = 'orange'
                                        break
                                        case '法国':
                                            color = 'purple'
                                        break
                                        case '日本':
                                            color = 'black'
                                        break
                                        case '中国':
                                            color = 'red'
                                        break
                                        case '印度':
                                            color = 'green'
                                        break
                                    }
                                    return color;
                                }
                            }
                        },
                    ],
                    
                };
                this.interestChart.setOption(option);
            }
        },
    }
</script>

<style lang="scss" scoped>
#main {
    width: 800px;
    height: 400px;
    padding: 10px 50px;
}
</style>