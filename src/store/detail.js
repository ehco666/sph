import { reqGoodsInfo , reqAddOrUpdateShopCart} from "@/api"
// 封装游客身份模块uuid--> 生成一个随机字符串作为id(永久存储,不能更改)
import {getUUID} from '@/utils/uuid_token';

const state = {
  goodInfo: {},
  // 临时游客身份
  uuid_token: getUUID()
}
const mutations = {
  GETGOODSINFO(state, goodInfo) {
      state.goodInfo = goodInfo;
  }
}
const actions = {
  // 获取产品信息的action
  async getGoodsInfo({commit}, skuId) {
    let result = await reqGoodsInfo(skuId)
    if(result.code == 200) {
      commit('GETGOODSINFO', result.data)
    }
  },
  // 获取购物车的action
  async addOrUpdateShopCart({commit}, {skuId,skuNum}) {
    let result = await reqAddOrUpdateShopCart(skuId, skuNum)
    // 服务器加入购物车成功
    if(result.code == 200 ) {
      return 'ok'
    }else {
      //加入购物车失败
      return Promise.reject(new Error('faile'));
    }
  }
}
// detail 仓库中的数据, goodInfo下的数据
const getters = {
  // 路径导航简化数据
  categoryView(state) {
    return state.goodInfo.categoryView || {};
  },
  // 简化产品信息
  skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  },
  // 简化售卖属性
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || [];
  }
}
export default{
  state,
  actions,
  mutations,
  getters,
}