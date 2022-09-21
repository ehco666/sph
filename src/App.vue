<template>
  <div id="app">
    <Header></Header>
    <!-- 配置路由组件出口 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/index.vue';
import Footer from './components/Footer/index.vue';

export default {
  name: "App",
  components: {
    Header,
    Footer
  },
  mounted() {
    // 发送一个action || 获取商品分类的三级列表数据(因为App组件最先执行, 在其他组件请求数据时, App里早已准备就绪, 所以请求只会发送一次)
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>
</style>
