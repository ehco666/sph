<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel, index) in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入 swiper
import Swiper from 'swiper';
export default {
  name: 'Carousel',
  props: ['list'],
  watch: {
    list: {
      immediate: true,
      // 在new swiper实例之前, 页面中结构必须已经存在
      handler() {
        this.$nextTick(() => {
          // 当执行这个回调的时候: 保证服务器的数据一定回来了(这时候v-for已经执行完毕了)
          var mySwiper = new Swiper(this.$refs.mySwiper, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })
        })
      }
    }
  }
}
</script>

<style scoped>
</style>