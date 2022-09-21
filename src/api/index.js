// 对api 进行统一管理
// 引入二次封装的axios(请求, 响应拦截器)
import requests from "./request";
// 引入mock模拟数据请求
import mockRequests from "./mockAjax"


// 三级联动接口: /api/product/getBaseCategoryList get请求, 无参数
export const reqCategoryList = ()=> {
  // 发送请求: axios 发请求返回结果是一个Promise对象
  return requests({url: '/product/getBaseCategoryList', method:'get'})
}

// 获取banner(home首页轮播图接口)
export const reqGetBannerList = () => {
  return mockRequests.get('/banner');
}

// 获取floor数据
export const reqGetFloorList = () => {
  return mockRequests.get('/floor');
}

// 获取search数据接口: 地址:/api/list, 请求方式:post, 需要参数
// 这个接口在获取search模块的数据时, 要给服务器传递一个默认参数(至少是一个空对象)
export const reqGetSearchInfo = (params) => {
  return requests({url: '/list', method:'post', data:params});
}

// 获取产品详情信息的接口 URL: /api/item/{skuId} 请求方式: get
export const reqGoodsInfo = (skuId) => {
  return requests({url:`/item/${skuId}`,method:'get'});
}

// 获取购物车的数据接口 URL: api/cart/addToCart/{skuId}/{skuNum} 方式post 携带参数: skuId(商品id) skuNum(商品个数)
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return requests({url:`/cart/addToCart/${skuId}/${skuNum}`, method:'post'})
}

// 获取购物车的结算接口  URL: api/cart/cartList  方式get 
export const reqCartList = () => {
  return requests({url:`/cart/cartList`, method:'get'})
}

// 获取删除购物车商品的接口 URL: api//cart/deleteCart/{skuId} 方式: delete
export const reqDeleteCartById = (skuId) => {
  return requests({url:`/cart/deleteCart/${skuId}`, method:'delete'})
}

// 修改购物车商品选中状态 URL:/api/cart/checkCart/{skuId}/{isChecked} 方式:get
export const reqUpdateCheckedById = (skuId, isChecked) => {
  return requests({url:`/cart/checkCart/${skuId}/${isChecked}`, method: 'get'})
}

// 获取验证码 URL: /api/user/passport/sendCode/{phone}  方式: get
export const reqGetCode = (phone) => {
  return requests({url:`/user/passport/sendCode/${phone}`, method: 'get'})
}

// 获取注册 URL: /api/user/passport/register 方式: post 参数: phone, code, password
export const reqUserRegister = (data) => {
  return requests({url:`/user/passport/register`, data, method:'post'});
}

// 登录 URL: /api/user/passport/login 方式: post 参数: phone password
export const reqUserLogin = (data) => {
  return requests({url:`/user/passport/login`, data, method:'post'});
}

// 获取用户信息 URL:/api/user/passport/auth/getUserInfo  方式:get 参数: 请求头配置
export const reqUserInfo = () => {
  return requests({url:`/user/passport/auth/getUserInfo`, method:`get`});
}

// 退出登录 URL: /api/user/passport/logout 方式get
export const reqLogout = () => {
  return requests({url:`/user/passport/logout`, method:'get'});
}

// 获取用户地址信息 URL: /api/user/userAddress/auth/findUserAddressList 方式: get
export const reqAddressInfo = () => {
  return requests({url:`/user/userAddress/auth/findUserAddressList`, method: 'get'});
}

// 获取订单交易页信息 URL: /api/order/auth/trade 方式:get
export const reqOrderInfo = () => {
  return requests({url:`/order/auth/trade`, method:'get'});
}

// 获取提交订单接口 URL: /api/order/auth/submitOrder?tradeNo={tradeNo}  方式: post
export const reqSubmitOrder = (tradeNo, data) => {
  return requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post'});
}

// 获取支付信息 URL: /api/payment/weixin/createNative/{orderId} 方式: get
export const reqPayInfo = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`, method: 'get'});

// 获取支付订单状态 URL: /api/payment/weixin/queryPayStatus/{orderId} 方式: get
export const reqPayStatus = (orderId) => requests({url:`/payment/weixin/queryPayStatus/${orderId}`, method: 'get'})

// 获取个人中心的数据 URL: /api/order/auth/{page}/{limit} 方式: get
export const reqMyOrderList = (page, limit) => requests({url:`/order/auth/${page}/${limit}`, method: 'get'})