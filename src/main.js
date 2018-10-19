
import Vue from 'vue'

// A modern alternative to CSS resets
import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/element-variables.scss'

import '@/styles/index.scss' // global css

Vue.use(ElementUI)

import App from './App'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios';
import md5 from 'js-md5';


Vue.prototype.axios = axios

Vue.use(VueAxios, axios);

axios.defaults.baseURL = 'http://192.168.1.100:8081/'; //指定全局访问url

Vue.config.productionTip = false

  // const setHeaders = function (route) {
  //   let timestamp = Date.parse(new Date());
  //   let RndNum = function (t) {
  //     let rnd = "";
  //     for (let i = 0; i < t; i++)
  //       rnd += Math.floor(Math.random() * 10);
  //     return rnd;
  //   }
  //   let echostr = RndNum(20);
  //   let signature = md5("vRCouDfRNin1tgr14lyU4djkKj2eKtCU" + echostr + timestamp + route + "web");

  //   var header = {
  //     "api-access-key": "dSuJBDYUebrW0yyKhLN0MRO2m4iPaFde",
  //     "api-echostr": echostr,
  //     "api-signature": signature,
  //     "api-timestamp": timestamp,
  //     "Accept": "application/vnd.Peripheralclassroom.v1+json"
  //   };
  //   return header;
  // }
Vue.router = router

// Vue.use(require('@websanova/vue-auth'), {
//   __token: require('@websanova/vue-auth/src/lib/token.js'),
//   __cookie: require('@websanova/vue-auth/src/lib/cookie.js'),
//   auth: require('./authToken.js'),
//   http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
//   router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
//   md5: md5,
//   axios: axios,
//   setHeaders: setHeaders, //设置请求头
//   loginData: { url: 'login', method: 'POST', redirect: '/', fetchUser: true },
//   registerData: { url: 'register', method: 'POST', redirect: '/login' },
//   logoutData: { url: 'logout', method: 'POST', redirect: '/', makeRequest: false },
//   refreshData: { url: 'refresh', method: 'POST', enabled: true, interval: 30 },
//   fetchData: { url: 'getUsersInfo', method: 'POST', enabled: true },
//   oauth1Data: { url: 'login', method: 'POST' },
//   authRedirect: { path: '/login' },
//   tokenDefaultName: 'token', //配置默认的token名
//   token: [{ request: 'Authorization', response: 'Authorization', authType: 'authToken', foundIn: 'header' }],
// });
// 设置头Authorization
axios.defaults.headers.common['Authorization'] = store.state.token;

// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  //判断是否存在token，如果存在将每个页面header都添加token
  if (store.state.token) {
    config.headers.common['Authorization'] = store.state.token;
  }
  return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          this.$store.commit('del_token');
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }//登录成功后跳入浏览的当前页面
          })
      }
    }
    return Promise.reject(error.response)
  });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
