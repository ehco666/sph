<template>
  <div class="fr page">
    <div class="sui-pagination clearfix">
      <ul>
        <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">«上一页</button>
        <!-- 注意下面配置的都是起始页与结合页码, 我们动态绑定的时当前页码 -->
        <!-- 起始页码大于1时显示 -->
        <li><a v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo', 1)">1</a></li>
        <!-- 起始页码大于2时显示 -->
        <li><span v-if="startNumAndEndNum.start > 2">...</span></li>

        <!-- 中间部分 从1开始遍历到结束页码-->
        <li><a v-for="(page, index) in startNumAndEndNum.end" :key="index" v-if="page >= startNumAndEndNum.start"
            @click="$emit('getPageNo', page)" :class='{ active: pageNo == page }'>
            {{ page }}</a></li>
        <!-- 结束页页码小于总页数减1时显示 -->
        <li class="dotted"><span v-if="startNumAndEndNum.end < totalPage - 1">...</span></li>
        <!-- 结束页页码小于总页数时显示 -->
        <li><a v-if="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo', totalPage)">{{ totalPage }}</a></li>
        <button :disabled="pageNo == totalPage" @click="$emit('getPageNo', pageNo + 1)">下一页»</button>
        <div class="end"><span>共{{ total }}页</span></div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    // 总共多少页
    totalPage() {
      // Math.ceil: 向上取整(总数据 / 分的页数)
      return Math.ceil(this.total / this.pageSize);
    },
    //计算出连续的页码的起始页码与结束页码(连续的页码为5页)
    startNumAndEndNum() {
      // 结构赋值, 不用使用this.continues this.xxx 
      const { continues, pageNo, totalPage } = this;
      // 定义变量用于保存起始页码与结束页码
      let start = 0, end = 0;
      // 如果总页数没有连续的页码多
      if (continues > totalPage) {
        start = 1;  //起始页码则为1
        end = totalPage;  //结束页码就是总页数
      } else {
        // 总页数比连续的页码多(连续页数分为5页的标准: 当前页码前有两个连续页码, 当前页码后有两个连续页码)
        start = pageNo - parseInt(continues / 2);  //起始页码 = 当前页码 - 连续页数 / 2的取整
        end = pageNo + parseInt(continues / 2);  //结束页码 = 当前页码 + 连续页码 / 2 的取整
        //因为当前页为1的时候star为负数, 因此要判断start(起始页)的最小初始值  -- 最小不能小于1(如果小于则强制使其等于1)
        if (start < 1) {
          start = 1,  //start 必须是1 不能为0 | 负数
          end = continues;  // 结束页码就等于 连续页码
        }
        //当结束页码大于总页数时超过了页码的长度, 因此要判断end(结束页码)的最大初始值 -- 最大不能大于总页数(如果大于则强制使其等于总页数)
        if (end > totalPage) {
          end = totalPage, //结束页码超过最大页数时, 强制等于最大页数
          start = totalPage - continues + 1; //结束页码超过最大页数时,强制等于最大页数后,在最大结束页码前有四个连续页码, 第一个即为开始页码, 
        }
      }
      return { start, end }
    }
  }
}
</script>

<style scoped lang="less">
.page {
  width: 1000px;
  height: 55px;
  margin: 0 auto;
  overflow: hidden;

  button {
    width: 60px;
    height: 38px;
    text-align: center;
    margin-top: -11px;
    // margin-right: 10px;
    border: 1px solid #e0e9ee;
    background-color: #fafafa;
  }

  .sui-pagination {
    width: 100%;
    margin: 18px 0;
    margin-left: 250px;
  }

  ul {
    display: flex;
    vertical-align: middle;
    width: 100%;
    text-align: center;

    li {
      margin: 0 10px;
    }

    .end {
      border: 1px solid #e0e9ee;
      margin-top: -11px;
      color: #333;
      width: 60px;
      height: 38px;
      font-size: 14px;
      line-height: 38px;
      margin-left: 10px;
    }
  }

  a {
    line-height: 18px;
    text-decoration: none;
    background-color: #fff;
    border: 1px solid #e0e9ee;
    margin: 0 5px;
    font-size: 14px;
    padding: 9px 18px;
    color: #333;
  }

  .active {
    background-color: #fff;
    color: #e1251b;
    border-color: rgb(236, 11, 11);
  }
}
</style>