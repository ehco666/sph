// 对于 axios 进行二次封装
import axios from 'axios'
// 引入进度条
// start: 进度条开始  done: 进度条结束
import nprogress from 'nprogress';
// 引入进度条样式
import "nprogress/nprogress.css";

// 利用axios对象的方法 create, 去创建一个axios实例
const mockRequests = axios.create({
  // 配置对象
  // 基础路径, 发送请求的时候, 路径中会出现api
  // baseURL: '/api',
  baseURL:'/mock',
  // 设置响应超时 时间
  timeout: 5000,
});
// 请求拦截器: 在发送请求之前. 请求拦截器可以检测到, 在请求发出去之前做一些事情
mockRequests.interceptors.request.use((config) => {
  // config: 配置对象, 对象里面有 headers 请求头 这个重要属性
  // 进度条开始
  nprogress.start();
  return config;
});

// 响应拦截器
mockRequests.interceptors.response.use((res) => {
  // 成功的回调函数: 服务器响应数据回来以后, 响应拦截器可以检测到, 可以做一些事情
  // 进度条结束
  nprogress.done();
  return res.data;
}
,(error) => {
  // 响应失败的回调函数
  return Promise.reject(new error('faile'));
});

// 对外暴露
export default mockRequests;