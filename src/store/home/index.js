// 引入首页三级联动列表接口, 引入首页轮播图的接口(模拟)
import { reqCategoryList, reqGetBannerList, reqGetFloorList } from "@/api";

// home模块小仓库
// state: 仓库存储数据的地方
const state = {
  // 服务器返回数组, 对象   (是根据接口返回值初始化的)
  categoryList: [],
  //轮播图数据
  bannerList: [],
  // floor数据
  floorList: []
};
// mutations: 修改state的唯一手段
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList //把请求到的bannerList里的数据存到state里的bannerList,
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  }
};
// actions:  处理cation, 可以书写自己的业务逻辑, 也可以处理异步
const actions = {
  // 通过api里面的接口函数调用, 向服务器发请求, 获取数据
  // 获取首页的三级联动列表数据
  async categoryList({commit}) {
    let result = await reqCategoryList();
    // console.log(result);
    if(result.code == 200) {
      commit('CATEGORYLIST', result.data)
    }
  },
  // 获取首页轮播图的数据(模拟)
  async getBannerList({commit}) {
    let result = await reqGetBannerList();  //await 等待异步(async)请求响应结果
    // console.log(result);
    if(result.code == 200) {
      //commit: 把GETBANNERLIST提交到 result.data, 但actions里不能修改数据, 所以要到mutation里进行修改
      commit('GETBANNERLIST', result.data);  
    }
  },
  // 获取Floor数据
  async getFloorList({commit}) {
    let result = await reqGetFloorList();
    if(result.code == 200) {
      commit('GETFLOORLIST', result.data)
    }
  }
};
// getters: 类似于计算属性, 用于简化仓库数据, 让组件获取仓库的数据更加方便
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
}