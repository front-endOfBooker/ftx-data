import echarts from 'echarts';

let AppVue = {}

AppVue.install = function (Vue, options) {

    Vue.prototype.$echarts = echarts;

    Vue.prototype.demo = 'hello world'
}

export default AppVue;
