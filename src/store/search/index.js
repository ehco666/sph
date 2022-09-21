// search模块小仓库
import { reqGetSearchInfo } from "@/api";
// state: 仓库存储数据的地方
const state = {
  // 初始值为一个对象
  searchList: {},
};
// mutations: 修改state的唯一手段
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  }
};
// actions:  处理cation, 可以书写自己的业务逻辑, 也可以处理异步
const actions = {
  // 获取search模块数据
  async getSearchList({commit}, params={}) {  
    // 当前这个reqSearchInfo这个函数在调用获取服务器数据的时候, 至少要传递一个参数(至少是空对象)
    // params形参是在: 用户派发action的时候, 作为第二个参数传进来的, 至少是一个空对象
    let result = await reqGetSearchInfo(params);
    if(result.code == 200) {
      commit('GETSEARCHLIST', result.data);
    }
  }
};
// getters: 类似于计算属性, 用于简化仓库数据, 让组件获取仓库的数据更加方便
const getters = {
  // 当前的state是当前仓库中的state, 并非大仓库(包含了home,search)中的state
  goodsList(state) {
    return state.searchList.goodsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList;
  },
  attrsList(state) {
    return state.searchList.attrsList
  }
};
export default {
  state,
  mutations,
  actions,
  getters,
}