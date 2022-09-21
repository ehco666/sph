// 引入mockjs模块
import Mock from "mockjs";
// 把json数据格式引入进来, (json数据格式默认对外暴露, 直接可以引入)
// webpack中默认对外暴露的有: 图片, json数据格式, 
import banner from './banner.json';
import floor from './floor.json';

// mock数据: 第一个参数:  请求地址    第二个参数: 请求数据
// 模拟首页轮播图数据
Mock.mock("/mock/banner", {code: 200, data: banner})
// 模拟底部数据
Mock.mock("/mock/floor", {code: 200, data: floor})