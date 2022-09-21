import Vue from 'vue'
import App from './App.vue'

// 三级联动组件 --- 全局组件
import TypeNav from '@/components/TypeNav';
// 轮播图组卷
import Carousel from '@/components/Carousel'
// 分页器组件
import Pagination from '@/components/Pagination'
// 按需引入 element-ui
import { Button,MessageBox } from 'element-ui';
// 注册全局组件
// 第一个参数: 全局组件的名字 第二个参数: 哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button);
// 挂载到原型(element-ui)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
//  引入mockServer.js -- mock数据
import '@/mock/mockServer';
// 引入swiper样式
import 'swiper/css/swiper.css';

// 统一接口api文件夹里面的全部请求函数, 统一引入
import * as API from '@/api';


Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  // 注册路由(k,v 省略写法)
  router,
  // 注册仓库: 组件实例身上会多了一个$store 的属性
  store,
  
  // 配置全局总线, 进行组件通信
  beforeCreate() {
    // 把vue实例(vm)赋给, Vue原型对象上的$bus属性
    Vue.prototype.$bus = this
    // 把所有的api请求, 挂载到Vue原型对象上的$API属性, 所有组件都能使用
    Vue.prototype.$API = API;
  }
}).$mount('#app')
