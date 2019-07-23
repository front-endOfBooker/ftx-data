import axios from 'axios'

// 创建axios实例
const service = axios.create({
  // baseURL: 'http://47.111.9.22:8082/deploy/', // api的base_url
  baseURL: '/static/',
  timeout: 15000, // 请求超时时间
  headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
})

// request拦截器
service.interceptors.request.use(config => {
  // if (store.getters.token) {
  //   config.headers['Authorization'] = 'JWT ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  // console.log(config)
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

export const Api = function (url, successFn, failFn) {
  service.get(url).then(res => {
    if (res.data.code == 200) {
      successFn(res.data.data)
    }
  }).catch(err => {
    console.log(err)
    failFn(err)
  })
}
