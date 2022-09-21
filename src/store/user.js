//登录与注册仓库
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from "@/api";
import {setToken, getToken, removeToken} from '@/utils/token'
// 登录与注册
const state = {
  code: '',
  // 如果本地存储的有token则使用本地token
  token: getToken(),
  userInfo: {},
};
const mutations = {
  // 注册验证码
  GETCODE(state, code) {
    state.code = code;
  },
  // 登录
  USERLOGIN(state, token) {
    state.token = token;
  },
  // 用户信息
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  // 退出登录
  CLEAR(state) {
    state.token = '';
    state.userInfo = {};
    // 清空本地存储
    removeToken();
  }
};

const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    let result = await reqGetCode(phone);
    if (result.code == 200) {
      commit('GETCODE', result.data); //需要返回请求结果
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'));
    }
  },
  // 用户注册
  async userRegister({ commit }, user) {
    let result = await reqUserRegister(user);
    if (result.code == 200) {   //只需要注册返回成功或失败的结果, 不需要返回结果,
      return 'ok';
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 用户登录[token]
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data);
    // 拿到token, 用户唯一标识符, 通过token来向服务器获取用户信息
    if (result.code == 200) {
      commit("USERLOGIN", result.data.token);
      // 持久化存储 token
      setToken(result.data.token);
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'));
    }
  },
  // 获取用户信息
  async getUserInfo({commit}) {
    let result = await reqUserInfo();
    if(result.code == 200) {
      commit('GETUSERINFO', result.data);
      return 'ok';
    }else {
      return Promise.reject(new Error('faile'));
    }
  },
    // 退出登录
    async userLogout({commit}) {
      let result = await reqLogout();
      if(result.code == 200) {
        commit("CLEAR");
        return 'ok';
      }else {
        return Promise.reject(new Error('faile'));
      }
    }
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
}