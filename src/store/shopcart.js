import { reqCartList, reqDeleteCartById, reqUpdateCheckedById} from "@/api";

const state = {
  // 初始值
  cartList: [],
};
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
};
const actions = {
  // 获取购物车结算列表数据
  async getCartList({commit}) {
    let result = await reqCartList();
    if(result.code = 200) {
      commit('GETCARTLIST', result.data)
    }
  },
  // 删除购物车商品
  async deleteCartListBySkuId({commit},skuId) {
    let result = await reqDeleteCartById(skuId);
    if(result.code == 200) {
      return 'ok';
    }else {
      return Promise.reject(new Error('faile'));
    }
  },
  // 修改购物车选中状态
  async updateCheckedById({commit},{skuId, isChecked}) {
    let result = await reqUpdateCheckedById(skuId, isChecked);
    if(result.code == 200) {
      return 'ok';
    }else {
      return Promise.reject(new Error('faile'));
    }
  },
  // 删除选中的全部商品
  deleteAllCheckedCart({dispatch, getters}) {
    // context: 小仓库, commit(提交mutations修改state) getters(计算属性) dispatch(派发action) state(当前仓库的数据)
    // 获取购物车里的全部数据
    let PromiseAll = [];
    getters.cartList.cartInfoList.forEach(item => {
    let promise = item.isChecked == 1?  dispatch('deleteCartListBySkuId', item.skuId) : '';
    // 将每一次的返回的promise添加到数组中
    PromiseAll.push(promise);
    });
    // 只要全部返回成功, 则都成功,   只要有一个失败,则都失败
    return Promise.all(PromiseAll);
  },
  // 修改全选的状态
  updateAllCartIsChecked({dispatch, state}, isChecked) {
    // 初始数组状态
    let promiseAll = [];
    // 遍历购物车商品列表
    state.cartList[0].cartInfoList.forEach((item) => {
      // 派发updateCheckedById 的 action 携带skuId, isChecked
      let promise = dispatch('updateCheckedById', {skuId: item.skuId, isChecked: isChecked,});
      promiseAll.push(promise);
    });
    // 返回最终结果, 只要全部返回成功, 则都成功,   只要有一个失败,则都失败
    return Promise.all(promiseAll);
  }
};
const getters = {
  // 购物车数据的外层对象
  cartList(state) {
    return state.cartList[0] || {}
  },  
};

export default {
  state,
  mutations,
  actions,
  getters,
}
