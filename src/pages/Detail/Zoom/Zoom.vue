<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <!-- 正常图框 -->
    <div class="event" @mousemove="handler"></div>
    <!-- 大图框 -->
    <div class="big" >
      <img :src="imgObj.imgUrl" ref='big'/>
    </div>
    <!-- 遮罩层 -->
    <div ref="mask" class="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom", 
    props: ['skuImageList'],
    data() {
      return {
        currentIndex: 0,
      }
    },  
    computed: {
      // 接受到返回数据时没有对象数据, 至少返回一个空对象
      imgObj() {
        // return this.skuImageList[0] || {}
        return this.skuImageList[this.currentIndex] || {}
      }
    },
    mounted() {
      // 全局事件总线, 获取兄弟组件传递的索引值
      this.$bus.$on('getIndex', (index) => {
        // 修改当前组件的索引值, 完成响应式
        this.currentIndex = index
      })
    },
    methods: {
      // 鼠标移动事件(获取鼠标坐标)
      handler(event) {
        // 获取遮罩层
        let mask = this.$refs.mask;
        let big  = this.$refs.big;
        // 正常框中心到边框的宽度 减去 遮罩层宽度的一半(中心到边框的宽度) (得到遮罩层边框到正常框边框的距离)
        let left = event.offsetX - mask.offsetWidth/2;
        let top = event.offsetY - mask.offsetHeight/2;
        // 约束范围
        if(left <=0) left = 0;
        if(left >= mask.offsetWidth) left = mask.offsetWidth
        if( top<= 0) top = 0;
        if(top >= mask.offsetHeight) top= mask.offsetHeight
        // 修改遮罩层元素的left|top属性值 (把减去后的边距 赋给遮罩层)
        mask.style.left = left + 'px';
        mask.style.top = top + 'px';
        // 修改大图框元素的left|top属性值 
        // 乘以-2 : 大图等于两倍的遮罩框, 且大图的移动方向应该与遮罩框的移动方向相反
        big.style.left = -2 *left + 'px';
        big.style.top= -2 *top + 'px';
      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>