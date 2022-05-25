import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import serve from './api'

// import dataV from '@jiaminghi/data-view'
// Vue.use(dataV)
import axios from 'axios'
Vue.prototype.$axios = axios;

import store from './store'

import './styles/common.css'

import moment  from 'moment'
Vue.prototype.$moment = moment;

import Plugin from 'v-fit-columns'
Vue.use(Plugin)
moment.locale('zh-cn');

// Vue.config.productionTip = false

// const appurl=process.env.NODE_ENV=='production'?window.g.serverUrl:'http://101.43.140.150:88';


axios.defaults.baseURL='http://27.122.112.202:81'  //正式环境
// axios.defaults.baseURL='http://101.43.140.150:88'   //测试环境

import '@/assets/icon/iconfont.css'
import '@/assets/icon/iconfont'


let token = '';

axios.defaults.withCredentials = false;
axios.defaults.headers.common['token'] = token;




//添加一个请求拦截器
axios.interceptors.request.use( (config)=> {
  axios.defaults.headers.post['Content-Type'] = 'application/json';//配置请求头
  axios.defaults.headers.common['Authorization'] = store.state.token
  return config
});

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.data && response.data.code) {
    if (parseInt(response.data.code) === 108 || parseInt(response.data.code) === 109 || response.data.msg === 'TOKEN失效，请重新登录' || response.data.msg === 'TOKEN不存在') {
      //未登录
      response.data.msg = "登录信息已失效，请重新登录";
    
      
    }
    if (parseInt(response.data.code) === -1) {
    
    }
  }
  return response;
}, function (error) {
  // Do something with response error
  console.dir(error);
 
  return Promise.reject(error);
})


// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import {
  BarChart
} from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  DatasetComponentOption,
  TransformComponent
} from 'echarts/components';
// 标签自动布局，全局过渡动画等特性
import {
  LabelLayout,
  UniversalTransition
} from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import {
  CanvasRenderer
} from 'echarts/renderers';


router.beforeEach((to, from, next) => {
  // ...
  if (to.name !== 'Chart') {
    localStorage.removeItem('redirect')
  }
  next()
})
// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')