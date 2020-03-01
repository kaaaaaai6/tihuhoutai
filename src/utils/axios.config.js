// 处理axios拦截器  请求拦截器  响应拦截器
import axios from 'axios'
import router from '../permission'
import { Message } from 'element-ui'
// 请求拦截器
axios.interceptors.request.use(function (config) {
  // config 是axios的默认请求配置，必须return
  const token = window.localStorage.getItem('token')
  config.headers.token = token // 统一注入token
  return config
}, function () {})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // debugger
  const code = response.data.code
  let message = ''
  switch (code) {
    case 200:
      return response.data ? response.data : {}
    case 10002:
      message = '账户不存在' // token过期时返回
      window.localStorage.clear() // 清除过期token
      router.push('/login') // 跳转到登录页
      break
    case 10003:
      message = '密码错误'
      break
    case 10004:
      message = '账户已被删除'
      break
    case 10005:
      message = '无权限访问' // token传空时返回
      window.localStorage.clear() // 清除过期token
      router.push('/login') // 跳转到登录页
      break
    default:
      message = '未知错误'
      break
  }
  Message({ type: 'warning', message })
  return new Promise(function () {})
}, function () {})
export default axios
