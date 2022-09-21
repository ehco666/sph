// 配置路由
import Vue from 'vue';
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'

// 使用插件
Vue.use(VueRouter)
// 把VueRouter 原型对象的push, replace方法, 保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push, replace
// 第一个参数: 告诉原来的push方法, 要往哪里跳(传递那些参数)
// 第二个参数: 成功时的回调
// 第三个参数: 失败时的回调
// call || apply的区别
// 相同点: 都可以调用函数一次, 都可以修改this指向一次
// 不同点: call传递参数用逗号隔开, apply则使用数组
VueRouter.prototype.push = function(location, resolve, reject){
  if(resolve && reject) {
    // originPush()  不能直接调用, 此时this会指向window, 要使用 .call进行调用
    originPush.call(this, location, resolve, reject, );
  }else {
    originPush.call(this, location, ()=>{}, ()=>{})
  }
},
VueRouter.prototype.replace = function(location, resolve, reject){
  if(resolve && reject) {
    originReplace.call(this, location, resolve, reject, );
  }else {
    originReplace.call(this, location, ()=>{}, ()=>{})
  }
}
// 配置路由
let router =  new VueRouter({
  // 配置
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 返回的y:0代表滚动条在最上方(重定向滚动条从最上方开始滚动)
    return { y:0 }
  }
})

// 全局守卫: 前置守卫(路由跳转之前进行判断(守卫))
router.beforeEach(async (to, form, next) => {
  // to: 获取到要跳转到那个路由的信息 console.log(to)
  // from: 获取到你从那个路由跳过来的信息
  // next: (放行,下一步)函数  : next(),  next(path):放行到指定路由的路径 next(false): url路径发生变化, 退回到from点
  // 用户登陆了才会有token
  let token = store.state.user.token;
  // 用户信息(用户名)
  // let userInfo = store.state.user.userInfo;  不能直接判断userInfo, (因为在未登录的状态下, userInfo为空对象, 但是空对象的Boolean值永远为true)
  let name = store.state.user.userInfo.name;
  // 如果用户已经登陆, 则不能跳转login
  if(token) {
    // 如果已经登录则, 把去login的路径, 重定向为 home
    if(to.path == '/login') {
      next('/home')
    }else {
      // 已登录, 但不是跳转login
      // 如果存在用户名
      if(name) {
        next();
      }else {
        // 没有用户信息, 则派发action让仓库存储用户信息在进行跳转
        try {
          await store.dispatch('getUserInfo');
          next();
        } catch (error) {
          // token 过期,  则清空token, 重定向为login再次登录
          // 清空token
          await store.dispatch('userLogout');
          // 重定向路径为login
          next('/login');
        }
      }
    }
  }else {
    // 未登录
    // 未登录不能跳转到, 交易相关, 支付相关, 与个人中心
    let toPath = to.path;
    if(toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
      next('/login?redirect=' + toPath)
    }else { 
      // 未登录但不是去上面的页面
      next();
    }
  }
});

// 统一暴露
export default router;