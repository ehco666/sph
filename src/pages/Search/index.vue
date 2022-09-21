<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑: 带x的导航小按钮-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}
              <i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}
              <i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTrademark">×</i>
            </li>
            <!-- 平台售卖属性的面包屑 -->
            <li class="with-x" v-for="(attrValue, index) in searchParams.props" :key="index">{{ attrValue.split(":")[1]
            }}
              <i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo='trademarkInfo' @attrInfo="attrInfo" />

        <!--details 商品详情-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a>综合<span v-show="isOne" class="iconfont"
                      :class="{ 'icon-upload': isAsc, 'icon-download': isDesc }"></span></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a>价格<span v-show="isTwo" class="iconfont"
                      :class="{ 'icon-upload': isAsc, 'icon-download': isDesc }"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(goods, index) in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 在点击商品图片的时候跳往商品详情页 -->
                      <router-link :to="`/detail/${goods.id}`">
                        <img :src="goods.defaultImg" />
                      </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{
                        goods.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <!-- 测试阶段, 以后数据会进行替换 -->
          <Pagination :pageNo="searchParams.pageNo" 
                      :pageSize="searchParams.pageSize" 
                      :total="total" :continues="5" 
                      @getPageNo="getPageNo"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector';
import { mapGetters, mapState } from 'vuex';
export default {
  name: 'search',
  components: {
    SearchSelector
  },
  data() {
    return {
      searchParams: {
        // 1, 2, 3, 级分类的id, 从home跳转到search时传入
        category1Id: "",
        category2Id: "",
        category3Id: "",
        // 分类名字, 关键字
        categoryName: "",
        keyword: "",
        // 排序
        order: "1:desc",
        // 分页器, 代表当前是第几页
        pageNo: 1,
        // 代表每一个展示数据的个数
        pageSize: 3,
        // 平台售卖属性操作带的参数
        props: [],
        // 品牌
        trademark: "",
      }
    }
  },
  beforeMount() {
    // 复杂的写法
    // this.searchParams.category1Id = this.$route.query.category1Id;
    // this.searchParams.category2Id = this.$route.query.category2Id;
    // this.searchParams.category3Id = this.$route.query.category3Id;
    // this.searchParams.categoryName = this.$route.query.categoryName;
    // this.searchParams.keyword = this.$route.query.keyword;
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    // // 派发action
    // this.$store.dispatch('getSearchList', {});
    this.getData()
  },
  computed: {
    // mapGetters里面的写法: 传递的数组, 因为Getters计算是没有划分模块的(没有分home, search模块)
    ...mapGetters(['goodsList']),
    isOne() {
      return this.searchParams.order.indexOf('1') != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf('2') != -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf('asc') != -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf('desc') != -1;
    },
    // 获取search模块展示的产品一共有多少条数据
    ...mapState({
      total: state => state.search.searchList.total
    })
  },
  methods: {
    // 向服务器发送请求获取search模块数据,(根据参数不同,返回不同的数据)
    // 把这次请求封装为一个函数, 当需要调用时,调用即可
    getData() {
      this.$store.dispatch('getSearchList', this.searchParams);
    },
    // 删除面包屑名字
    removeCategoryName() {
      // 把带给服务器的参数(name, id)清空, 还需要再次向服务器发请求
      // 清空时传空字符串, 还会把相应的字段带给服务器,  如果设为undefined则不会把相应的字段带给服务器(节省宽带)
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData();
      // 地址栏也需要修改, 进行路由跳转(当跳转时如果带有params参数则, 则携带params参数跳转到search, 就是只把query参数干掉)
      if (this.$route.params) {
        this.$router.push({ name: 'search', params: this.$route.params });
      }
    },
    // 删除面包屑的关键字
    removeKeyword() {
      // 把带给服务器的参数(keyword)清空, 还需要再次向服务器发请求
      this.searchParams.keyword = undefined;
      this.getData();
      // 发出清除关键字的请求
      this.$bus.$emit('clear');
      // 清除params参数
      if (this.$route.query) {
        // 携带query参数进行路由跳转
        this.$router.push({ name: 'search', query: this.$route.query })
      }
    },
    // 获取子组件发送的参数: trademark
    trademarkInfo(trademark) {
      // 整理品牌字段参数, (id:品牌名称)
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      // 再次发送请求
      this.getData();
      console.log('我是父组件', trademark);
    },
    // 删除品牌面包屑
    removeTrademark() {
      // 把带给服务器的参数(tmId, tmName)清空, 还需要再次向服务器发请求
      this.searchParams.trademark = undefined;
      this.getData();
    },
    //  获取子组件发送的参数: attr, attrValue
    attrInfo(attr, attrValue) {
      console.log(attr, attrValue);
      // 整理参数 属性id: 属性值: 属性名  (注意模板字符串里不能有空格)
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      // 将整理的参数添加到 data 里的props数组
      // 数组去重(当indexOf检测到数组下标为-1时, 即数组里没有数据时, 才进行添加)
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props);
      }
      // 再次发送请求
      this.getData();
    },
    // 删除平台售卖属性面包屑
    removeAttr(index) {
      console.log(index);
      // 整理参数 (从点击获取到的索引值开始删除, 每次删除一个)
      this.searchParams.props.splice(index, 1);
      // 再次发送请求
      this.getData();
    },
    // 排序操作
    // flag形参: 他是一个标记, 代表用户点的是综合(1) 或者是价格(2) [会在用户点击时传入]
    changeOrder(flag) {
      // 把order的出初始值(data里的order)赋给originOrder
      let originOrder = this.searchParams.order;
      // 获取第一次点击状态 (点击的是综合(1)或者是价格(2))
      // let originFlag = originOrder.split(':')[0];
      let originFlag = flag; // 这里可以用flag 代替originOrder.split(':')[0] 
      // 获取第一次点击状态 (点击的是desc 或者是 asc)
      let originSort = originOrder.split(':')[1];
      // 准备一个空数组 用于存放点击的数据(容器)
      let newOrder = '';
      // 判断点击的是同一个按钮 (要么是综合1(第一次默认值), 要么是价格2)
      if(flag == originFlag) {
        // 如果点击的同一个按钮, 则判断他的originSort 
        newOrder = `${originFlag}:${originSort == 'desc'? 'asc': 'desc'}`
      }else {
        newOrder = `${flag}:${'desc'}`
      }
      this.searchParams.order = newOrder;
      this.getData();
    },
    // 自定义事件回调函数, 获取当前第几页
    getPageNo(pageNo) {
      // console.log(pageNo);
      this.searchParams.pageNo = pageNo;
      this.getData();
    }
  },
  // 数据监听: 监听组件实例身上的属性的属性值变化 
  watch: {
    // 监听路由的信息是否发生变化, 如果发生变化, 则再次发起请求
    $route(newValue, oldValue) {
      // 再次发请求之前整理带给服务器参数
      // 第一次请求完毕, 把相应的1, 2, 3级分类的id清空, 让他接受下一次的三级分类
      this.searchParams.category1Id = '';
      this.searchParams.category2Id = '';
      this.searchParams.category3Id = '';
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      // 在次发送 ajax请求
      this.getData()
      console.log(this.searchParams, this.$route.query, this.$route.params);
    },
  },
} 
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: 5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>