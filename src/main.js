import Vue from 'vue'
import App from './App.vue'
import router from './permission'
import store from './store'
import ElementUI from 'element-ui' // 引入element-ui组件
import Component from './components/index' // 引入自定义组件
import 'element-ui/lib/theme-chalk/index.css' // 引入element-ui样式
import './style/index.less' // 引入初始化样式
import axios from './utils/axios.config' // 引入axios

axios.defaults.baseURL = 'https://tihu.canpoint.net/wechat/admin'
Vue.prototype.$axios = axios // 给Vue原型赋值axios属性，让所有Vue实例拥有axios
Vue.config.productionTip = false
Vue.use(ElementUI) // 全局注册ElementUI组件
Vue.use(Component) // 全局注册自定义组件
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
