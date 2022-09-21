// 引入一级路由组价
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 引入二级路由组件
import MyOrder from '@/pages/Center/myOrder';
import GroupOrder from '@/pages/Center/groupOrder'
export default [
  // 一级路由配置
    {
      path: "/home",
      component: Home,
      meta: { show: true }
    },
    {
      name: 'search',
      path: '/search/:keyword?', //params 参数需要进行占位, 占位符后面加上一个问号 ? 表示params参数 可传可不传 
      component: Search,
      meta: { show: true },
    },
    {
      path: "/register",
      component: Register,
      meta: { show: false }
    },
    {
      path: "/login",
      component: Login,
      meta: { show: false }
    },
    {
      path: '/detail/:skuid?',
      component: Detail,
      meta: { show: true }
    },
    {
      name: 'addcartsuccess', 
      path: '/addcartsuccess',
      component: AddCartSuccess,
      meta: {show: true}
    },
    {
      path: '/shopcart',
      component: ShopCart,
      meta: {show: true}
    },
    {
      path: '/trade',
      component: Trade,
      meta: {show: true},
      // 路由独享守卫
      beforeEnter: (to, from, next) => {
        //去交易页面, 必须要从购物车进行跳转
        if(from.path == '/shopcart') {
          next();
        }else {
          // 其他页面进行跳转, 则停留在当前
          next(false);
        }
      }
    },
    {
      path: '/pay',
      component: Pay,
      meta: {show: true},
      // 路由独享守卫
      beforeEnter: (to, from, next) => {
        //去交易页面, 必须要从购物车进行跳转
        if(from.path == '/trade') {
          next();
        }else {
          // 其他页面进行跳转, 则停留在当前
          next(false);
        }
      }
    },
    {
      path: '/paysuccess',
      component: PaySuccess,
      meta: {show: true}
    },
    {
      path: '/center',
      component: Center,
      meta: {show: true},
      // 二级路由
      children: [
        {
          path: 'myorder',
          component: MyOrder,
        },
        {
          path: 'grouporder',
          component: GroupOrder,
        },
        {
          path: '/center',
          redirect: '/center/myorder'
        }
      ]
    },
    // 重定向,使项目一上来就打开 home 首页
    {
      path: '*', //全部路径
      redirect: "/home"
    }
]