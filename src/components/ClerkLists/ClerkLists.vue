<template>
  <div class="clerk-lists">
    <!-- 随机下单 -->
    <div class="random-link">
      <a href="javascript:;" @click='linkRandom'>随机下单</a>
    </div>

    <!-- 搜索栏 -->
    <div class="search-wrapper">
      <div class="input-wrapper">
        <i class="fa fa-search" aria-hidden="true"></i>
        <input type="text" placeholder="搜索店员"  v-model='searchTxt'>
      </div>
      <a href="javascript:;" @click='searchInput'>搜索</a>
    </div>
    <!-- 排序及分类 -->
    <div class="sort-wrapper">
      <a href="javascript:;">智能排序</a>
      <a href="javascript:;" @click="selectGender('sex', genderArr)">性别：{{sexNoToTxt}}</a>
      <a href="javascript:;" @click="selectGender('level', typeArr)">等级：{{typeNoToTxt}}</a>
    </div>
    <!-- 店员列表 -->
    <ul class="all-lists">
      <li v-for='(item, index) in allList'>
        <a href="javascript:;" @click='getClerkDetail(item.id)'>
          <!-- 头像 -->
          <div class="potrait">
            <img :src="item.avatar_url" alt="">
            <p class='main-tag'>{{item.level}}</p>
          </div>
          <div class="mid-infos">
            <!-- 名字及状态 -->
            <div class="name-line">
              <div class="name-wrapper">
                <span>{{item.nick_name}}</span>
                <!-- 1 男 2 女 -->
                <i class="fa fa-mars male" aria-hidden="true" v-if="item.sex == '1'"></i>
                <i class="fa fa-venus" aria-hidden="true" v-if="item.sex == '2'"></i>                
              </div>
              <div class="online-status">
                <!-- online  offline -->
                <i class="fa fa-circle online" aria-hidden="true"></i>
                <span>在线</span>
              </div>

            </div>
            <!-- 说明 -->
            <p class="desc">{{item.sign}}</p>
            <!-- 播放及价格 -->
            <div class="play-price">
              <!-- <div class='paly-icon playing' @click.stop='doPlay' :data-url="item.audio_url"></div> -->
              <!-- :class='{"playing": isPlaying}' -->
              <div class='paly-icon'  @click.stop='playAudio($event)'>
                <audio :src="item.audio_url" data-isplaying="false" controls="controls" 
                  @ended='audioEnd($event)' hidden="true"/> 
              </div>
              <p>{{item.price}}</p>
            </div>
          </div>
          <div class='right-detail'><i class="fa fa-angle-right" aria-hidden="true"></i></div>
        </a>
      </li>
    </ul>

    <p class="no-record" v-if='allList.length==0'><i class="fa fa-exclamation-circle" aria-hidden="true"></i><span>暂无记录</span></p>
    
    <!-- SVG动画加载更多 -->
    <p style="display: none;width: 100%;text-align: center;" ref='loadingTxt' id='loading-txt'><img style='width:2rem;height:.5rem;display: inline-block;' src="./loading.svg" alt=""></p>
    
    <!-- 遮罩层 -->
    <div class="mask-fixed" :class="{'open': maskShow}" 
      @click='cancelPicker'></div>
    <!-- 选择器 -->
    <ul class="picker-container" :class="{'open': pickerShow}">
      <li class='option' v-for='item in pickerArr' 
        @click='resetSum(item.num)'>{{item.text}}</li>
      <li class='cancel' @click='cancelPicker'>取消</li>
    </ul>

    <!-- 测试 -->

      <!-- <p @click='weixinOpen'>微信认证 已经修改</p>
      
      <br>
      <p @click='sendCode'>测试发送code</p>
      <br>
      <br>
      <p @click="getList('0', '0')">测试携带token获取用户列表</p>
      
      <br>
      <p @click="getUserinfo()">测试携带token get_userinfo</p>
      
      <br>
      <p @click="testSign()">测试签名</p> -->
      <!-- 测试 -->

  </div>
</template>

<script>
// import HelloWorld from 'components/HelloWorld/HelloWorld.vue'
// import Index from 'components/Index/Index.vue'
// import SideBar from 'base/SideBar/SideBar.vue'
// import MHeader from 'base/MHeader/MHeader.vue'
// import MFooter from 'base/MFooter/MFooter.vue'

import {mapGetters, mapActions} from 'vuex'
import $ from 'jquery'

import wx from 'weixin-js-sdk'

// import axios from 'axios'
// 用封装好的axios
import axios from 'src/api/axios';
import Qs from 'qs';
import {BASEURL} from "src/api/config.js";

import getToken from 'src/api/getToken.js';

// import {allList} from 'src/api/mockdata.js';
import {GetQueryString, TokenError} from "src/api/utils.js";


// import InfiniteLoading from 'vue-infinite-loading';
// const api = '//hn.algolia.com/api/v1/search_by_date?tags=story';

export default {
  name: 'ClerkLists',
  components: {
    // InfiniteLoading,
  },
  data () {
    return {
      token: '',

      genderArr: [{text: '所有', num: 0}, {text: '只看男生', num: 1}, {text: '只看女生', num: 2}], // 性别  1男 2女
      typeArr: [{text: '全部', num: 0}, {text: '普通', num: 1}, {text: '金牌', num: 2}, {text: '镇店', num: 3}], // 等级 1普通 2金牌 3镇店
      pickerArr: [], // 默认不显示 下拉选择器要呈现的内容
      defaultCheck: {
        'nickName': '', //默认为空字符串
        'sex': '0', //  1男 2 女
        'level': '0', // 等级 1普通 2金牌 3镇店
        'curPage': 1, // 当前页
      },


      /*page: 1,
      list: [],*/

      maskShow: false, // 遮罩层默认不显示
      pickerShow: false, // 选择器默认不显示
      sexOrLevel: '', // 当前要切换选择性别 还是等级 


      allList: [], // 所有店员列表
      searchTxt: '', // 搜索框用户

      // 个人的token及其他个人信息
      /*userinfo: {"code":0,"msg":"\u767b\u5f55\u6210\u529f","count":{"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMTEifQ.B6P8Sz_PC_Lz1Y30Ud7TfmHeBdcLJKbtoWPDEZZqbM8","nick_name":"\u963f\u8ff8","avatar_url":"http:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/Q0j4TwGTfTJkcRIy499jfgavF3YbbQeH1SCXKcRV4z7jruXWK7E6t4lFoVH0UPu0LMhM7guAKnNngnTYhibmMGA\/132"},"data":[]}*/

    };
  },
  computed: {
    sexNoToTxt () {
      var sum = this.genderArr.find(item => item.num == this.defaultCheck.sex);
      return sum.text;
    },
    typeNoToTxt () {
      var sum = this.typeArr.find(item => item.num == this.defaultCheck.level);
      return sum.text;
    },
  },

  methods: {
    // 选择性别 或等级 参数 'sex', genderArr[]
    selectGender (sexOrLevel, arr) {
      // sexOrLevel 是重新选择性别 还是等级
      this.sexOrLevel = sexOrLevel;
      // 1 选项数据填充
      this.pickerArr = arr;
      console.log(this.pickerArr);
      // 2 遮罩层显示 选择器显示
      this.maskShow = true;
      this.pickerShow = true;
      /*genderArr: ['全部', '只看男生', '只看女生'], // 性别选项
      typeArr: ['全部', '镇店', '金牌', '普通'], // 登记选项
      pickerArr: [], // 默认不显示*/
    },
    // 重新选择 重新设置查询条件
    resetSum (num) {
      // 1 重新选择性别or登记 this.sexOrLevel  如果是等级 获取登记编号num
      console.log('选择: ', this.sexOrLevel + "  " + num, );
      this.defaultCheck[this.sexOrLevel] = num;
      // 2 发送请求 getList (defaultCheck.sex, defaultCheck.level, 1) 从第1页开始查  
      this.defaultCheck.curPage = 1;
      this.allList = []; // 清空列表 重置查询条件从第一页开始查
      // console.log(this.defaultCheck);
      this.getList(this.defaultCheck);

      // 3 隐藏遮罩层和选择器
      this.pickerArr = [];
      this.maskShow = false;
      this.pickerShow = false;
    },
    // 取消选择
    cancelPicker () {
      this.pickerArr = [];
      this.maskShow = false;
      this.pickerShow = false;
    },
    // 获取店员详情
    getClerkDetail (id) {
      // 路由跳转
      // {name: '/order/page1',params:{ id:'1'}}
      // this.$router.push({ path: `/clerkinfo/${id}`});
      this.$router.push({ name: 'ClerkInfo', params:{ id: id}});
    },
    // 播放
    doPlay () {
      return false;
    },
    // 随机下单
    linkRandom () {
      this.$router.push({name: 'RandomOrder'});
    },
    // 1 跳转到微信验证页 微信页
    weixinOpen () {
      // 测试打开微信验证
      
    },
    // 2 测试发送code获取token
    sendCode () {
      // wechatauth
      // 请求成功
      /*$.ajax({
         type: "POST",  
         url: BASEURL + "/wechatauth",  
         // url: "http://116.62.23.153:9494/api/get_feedback_types",  
         contentType: 'application/x-www-form-urlencoded;charset=utf-8',  
         data: {code: '0617IqfN1FxXF61SLIgN15H9fN17Iqft'},  
         dataType: "json",  
         success: function(data){  
                    console.log("成功");  
                    console.log(data);  
                  },  
         error: function(e){  
                     console.log(e);  
         }  
      });*/

      // 请求成功
      /*var prarmData = {
        code: '001RQu2K0c0xT82FuN2K02pO2K0RQu2e'
      }
      axios({
        method: 'post',
        url: '/wechatauth',
        data: Qs.stringify(prarmData),
      }).then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log(error);
      });*/

      // 封装起来 调用 /wechatauth 接口 传code 获取token及用户信息
      getToken('001RQu2K0c0xT82FuN2K02pO2K0RQu2e'); //code -> token

        /*'/wechatauth', Qs.stringify(prarmData))
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          // console.log(error);
        });*/

      /*axios.post('/get_feedback_types', {
          params: {
            // code: '132332332'
          },
          config: {
            headers: { "Content-Type": "application/x-www-form-urlencoded",'Authorization': 'test'},
          },
          withCredentials: true // 携带cookie
        })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          // console.log(error);
        });*/


    },
    // 获取店员列表
    getList (defaultCheck) {
      var _this = this;

      $.ajax({
        type: "POST",  
        url: BASEURL + "/get_index",  
        // contentType: 'application/x-www-form-urlencoded;charset=utf-8',  
        data: {
          nick_name: defaultCheck.nickName, //"\u963f\u8ff8", // 个人的信息  this.userinfo.nick_name
          sex: defaultCheck.sex,
          level: defaultCheck.level,
          page: defaultCheck.curPage
        },  
        headers: {'token': localStorage.getItem("shiguangshudong")},
        dataType: "json",  
        success: function(res){  
                    console.log(res.data);
                    // console.log("当前路由：", this.$route.name);
                    TokenError(res.code, _this.$route.name); // token错误
                    _this.allList = res.data;
                    console.log('最新列表为', _this.allList);
                  },  
        error: function(e){  
                     console.log(e);  
        }  
      });
    },
    // 测试
    getUserinfo () {
      var prarmData = {
        // token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMTEifQ.B6P8Sz_PC_Lz1Y30Ud7TfmHeBdcLJKbtoWPDEZZqbM8'
      }
      axios({
        method: 'post',
        url: '/get_user_info',
        // data: Qs.stringify(prarmData),
        headers:{
          'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMTEifQ.B6P8Sz_PC_Lz1Y30Ud7TfmHeBdcLJKbtoWPDEZZqbM8',
        }
      }).then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log(error);
      });
    },
    // 测试签名
    testSign () {
      var curUrl = window.location.href.split('#')[0];

      $.ajax({
         type: "POST",  
         url: "https://www.sgshudong.com/api/get_sign_package",  
         contentType: 'application/x-www-form-urlencoded;charset=utf-8',  
         data: {url: curUrl},  
         headers: {'token': localStorage.getItem("shiguangshudong")},
         dataType: "json",  
         success: function(data){  
                    console.log("成功");  
                    console.log(data);  
                  },  
         error: function(e){  
                     console.log(e);  
         }  
      });

      // 传入url location.href.split('#')[0]获取,而且需要encodeURIComponent）
      /*var curUrl = window.location.href.split('#')[0];

      // console.log(encodeURIComponent(curUrl));
      console.log(curUrl);
      // console.log(Qs.stringify(encodeURIComponent(curUrl)));

      var prarmData = {
        url: encodeURIComponent(curUrl)
      }
      axios({
        method: 'post',
        url: '/get_sign_package',
        // data: Qs.stringify(prarmData),
        data: curUrl,
        headers:{
          'token': GetStorage("userinfo").token,
        }
      }).then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log(error);
      });*/
    },
    // 搜索用户
    searchInput () {
      /*if (!this.searchTxt) {
        return;
      }*/
      console.log('开始搜索');
      this.defaultCheck.nickName = this.searchTxt;
      this.allList = [];
      this.getList(this.defaultCheck);

    },
    // 播放录音
    // 播放录音
    playAudio (e) {
      /*this.$nextTick(() => {
        var ele = e.target.firstElementChild;
        console.log('你点击我了',ele.getAttribute("data-isplaying"));
      })*/

      var ele = e.target.firstElementChild;
      console.log('你点击我了', ele.getAttribute("data-isplaying"));
      console.log('你点击我了',ele.getAttribute("data-isplaying"));

      if ( (ele.getAttribute("data-isplaying")) == 'false' ) { // 如果未处在播放状态 则播放
        console.log('开始播放');
        $(e.target).addClass('playing');
        ele.setAttribute("data-isplaying", 'true');
        ele.play();
      } else { // 如果处在播放状态 则停止播放
        console.log('人工结束');
        ele.setAttribute("data-isplaying", 'false');
        $(e.target).removeClass('playing');
        ele.pause();
        ele.load();
      }
    },
    // 监听播放结束
    audioEnd (e) {
      var ele = e.target;
      console.log('结束');
      ele.setAttribute("data-isplaying", 'false');
      $(ele.parentNode).removeClass('playing');
    }
  },
  created () {
    // 默认请求所有店员数据 发送请求 {URL}/api/get_index
    // 先查看本地localstorage是否保存有token及用户信息，如果有 就正常执行 如果没有 就请求登录

    // 默认读取所有20个数据 ajax请求 this.getList (sex, level, page)
    this.getList(this.defaultCheck);
    // 获取当前路由的


  },
  /*mounted () {
    // 读取页面参数  this.$route.query.code,
    console.log('code: ', this.$route.query.code);
    console.log('abc: ',this.$route.query.abc); 
  },*/
  mounted () {
    var _this = this;

    // 上拉刷新
    var loadingEle = document.getElementById("loading-txt");
    console.log(loadingEle);
    console.log(_this.$nextTick);
    // var ulContent = document.querySelector('.content_wrapper');
    var isLoading = false; // 只有为false 才可以执行刷新
    window.addEventListener('touchmove', function () {
        _this.$nextTick(function () {
          var curScrollTop = getScrollTop();
          var clientHeight = getClientHeight();
          var totalHeight = getScrollHeight();
          console.log(curScrollTop, clientHeight, totalHeight);
          if (curScrollTop + clientHeight + getPxByRem(.5) >= totalHeight && isLoading == false) {
              console.log("提前加载");
              // isLoading = true; // 开关打开
              if (isLoading == false) {
                isLoading = true;
              } else {
                return;
              }
              loadingEle.style.display = 'block';

              // ajax 成功后追加dom 然后执行isLoading = false loadingEle.style.display = 'none'
              /*clearTimeout(timerAjax);
              var timerAjax = setTimeout(function () {
                    loadingEle.style.display = 'none';
                    _this.allList = _this.allList.concat(_this.allList);
                    isLoading = false;
              }, 3000);*/

              $.ajax({
                type: "POST",  
                url: BASEURL + "/get_index",  
                // contentType: 'application/x-www-form-urlencoded;charset=utf-8',  
                data: {
                  nick_name:  _this.defaultCheck.nickName, //"\u963f\u8ff8", // 个人的信息  this.userinfo.nick_name
                  sex: _this.defaultCheck.sex,
                  level: _this.defaultCheck.level,
                  page: ++_this.defaultCheck.curPage
                },  
                // headers: {'token': localStorage.getItem("shiguangshudong")},
                headers: {'token': localStorage.getItem("shiguangshudong")},
                dataType: "json",  
                success: function(res){  
                            console.log(res.data);
                            TokenError(res.code);

                            _this.allList = _this.allList.concat(res.data);
                            // console.log('最新列表为', _this.allList);

                            loadingEle.style.display = 'none';
                            // isLoading = false;
                            setTimeout(function () {
                                isLoading = false; // 当第一次上拉 值变为true 再次快速上拉 isLoading因为是true 不执行if内语句 起到节流作用
                            }, 2000);
                          },  
                error: function(e){  
                             console.log(e);  
                }  
              });


              // 节流
              clearTimeout(timer);
              var timer = setTimeout(function () {
                  isLoading = false; // 当第一次上拉 值变为true 再次快速上拉 isLoading因为是true 不执行if内语句 起到节流作用
              }, 2000);
          }          
        });

    });

    // 获取元素滚动高度
    function getScrollTop() { 
        var scrollTop = 0; 
        if (document.documentElement && document.documentElement.scrollTop) { 
            scrollTop = document.documentElement.scrollTop; 
        } else if (document.body) { 
            scrollTop = document.body.scrollTop; 
        } 
        return scrollTop; 
    }

    // 获取当前可视范围的高度
    function getClientHeight() { 
        var clientHeight = 0; 
        if (document.body.clientHeight && document.documentElement.clientHeight) { 
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight); 
        } 
        else { 
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight); 
        } 
        return clientHeight; 
    }

    // 获取文档完整的高度
    function getScrollHeight() { 
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight); 
    }

    // 实时获取1rem单位的px值 rem转像素$.(6.4) 输入出375
    function getPxByRem (remSize){  
        var deviceWidth = document.body && document.body.clientWidth || document.getElementsByTagName("html")[0].offsetWidth;
        return remSize * (deviceWidth * 200 / 1280);
    }

    // 监听页面滚动
    /*$(document).scroll(function() {
        var scroH = $(document).scrollTop();  //滚动高度
        var viewH = $(window).height();  //可见高度 
        var contentH = $(document).height();  //内容高度
 
        if(scroH >100){  //距离顶部大于100px时
 
        }
        if (contentH - (scroH + viewH) <= 100){  //距离底部高度小于100px
             
        }  
        if (contentH = (scroH + viewH)){  //滚动条滑到底部啦
             console.log("滚动条滑到底部啦");
        }  
 
    });*/
  },
}
</script>

<style scoped lang="scss">
@import "common/sass/variable.scss";
@import "common/sass/mixin.scss";
.random-link {
  position: fixed;
  right: .2rem;
  bottom: .4rem;
  z-index: 100;
  a {
    background-color: #f02b32;
    color: #fff;
    font-size: .24rem;
    padding: .1rem .15rem;
    border-radius: .05rem;
  }
}

.clerk-lists {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  /*搜索框*/
  .search-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: .25rem .2rem .07rem;
    box-sizing: border-box;
    .input-wrapper {
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: #f7f7f7;
      padding: .12rem .1rem;
      border-radius: .05rem;

      i {
        margin-right: .1rem;
        color: #727272;
      }
      input {
        background-color: transparent;
        flex: 1;
        font-size: .22rem;
      }
    }
    a {
      margin-left: .2rem;
    }

  }
  
  /*排序及分类*/
  .sort-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: $border-1px;
    padding: .15rem 0 .05rem;
    a {
      flex: 1;
      padding: .1rem 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: $border-1px;
      box-sizing: border-box;
      color: $color-text-d;
      &:last-child {
        border-right: 0 none;
      }

    }
  }

  
  /*店员列表*/
  .all-lists {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    li {
      width: 100%;
      padding: 0 .2rem;
      box-sizing: border-box;
      &:last-child {
        >a {
          border-bottom: 0 none;
        }
      }
      >a {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: .2rem .1rem;
        box-sizing: border-box;
        border-bottom: $border-1px;

        
        .potrait {
          width: 1.25rem;
          height: 1.25rem;
          position: relative;
          img {
            width: 100%;
            height: 100%;
            border-radius: .03rem;
          }
          .main-tag {
            position: absolute;
            font-size: .18rem;
            bottom: 0;
            left: 0;
            background-color: #f94120;
            padding: .06rem;
            padding-right: .1rem;
            color: #fff;
            border-top-right-radius: .3rem;
            border-bottom-right-radius: .3rem;
            border-bottom-left-radius: .03rem;
          }

        }

        .mid-infos {
          flex: 1;
          flex-direction: row;
          align-items: flex-start;
          padding: 0 .15rem;
          box-sizing: border-box;
          .name-line {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            .name-wrapper {
              display: inline-flex;
              align-items: center;
              span {
                display: inline-flex;
                margin-right: .1rem;
                font-size: .22rem;
                font-weight: 600;
              }
              i {
                &.male {
                  color: #0181d2;
                }
                &.famale {
                  color: #bb527b;
                }
              }
            }
            .online-status {
              span {
                display: inline-flex;
                font-size: .22rem;
                font-weight: 600;
              }
              i {
                margin-right: .07rem;
                &.online {
                  color: #46bf29;
                }
                &.offline {
                  color: $color-text-d
                }
              }
            }
          }
          .desc {
            font-size: .2rem;
            line-height: .25rem;
            margin: .06rem 0 .03rem;
            height: .55rem;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            color: $color-text-d;
          }
          .play-price {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            .paly-icon {
              width: .75rem;
              height: .32rem;
              display: inline-flex;
              box-shadow: $box-shadow;
              border-radius: .04rem;
              @include background_fill('~common/image/audio.png');
              &.playing {
                @include background_fill('~common/image/audioplay.gif');
              }
            }
            /* .play-icon {
              width: .77rem;
              height: .34rem;
              display: inline-flex;
              background-color: red;
              @include background_fill('~common/image/audio.png');
            } */
            p {
              color: $color-text-d;
            }
          }
        }

        .right-detail {
          i {
            font-size: .3rem;
            color: $color-text-d;
          }
        }
      }
    }
  }

  /* 暂无记录 */
  .no-record {
    padding: 1.2rem 0 ;
    font-size: .25rem;
    color: $color-text-d;
    i {
      display: inline-flex;
      padding-right: .15rem;
    }
  }

}

/* 遮罩层 */
.mask-fixed {
  position: fixed;
  display: none;
  z-index: 101;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: .6;
  &.open {
    display: block;
  }
}
/* 选择器 */
.picker-container {
  position: fixed;
  z-index: 102;
  width: 100%;
  left: 0;
  bottom: 0;
  background-color: #fff;

  transform: translateY(100%);
  transition: all 500ms ease-in-out;

  &.open {
    transform: translateY(0);
  }

  li {
    width: 100%;
    line-height: 1.5;
    text-align: center;
    padding: .2rem 0;
    &.option {
      border-bottom: $border-1px;
    }
    &.cancel {
      border-top: .2rem solid rgba(0, 0, 0, .05);
    }
  }
}
</style>



<!--     /*var weixinConfig ={
  debug: true,
  "appId": "wx0da4e67530296351",
  "nonceStr": "HO4lIaBfubT3x5dl",
  "timestamp": 1568877171,
  "signature": "bcffe31a0f643f8f370b001c8761c375809ec822",
  jsApiList: ['startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice']
}
const wx = window['wx']
wx.config(weixinConfig);

wx.ready(function(){
  // console.log("准备好了");
});*/ -->




<!--       // ajax测试成功
/*$.ajax({
   type: "POST",  
   // url: BASEURL + "/api/get_user_info",  
   url: "http://116.62.23.153:9494/api/get_feedback_types",  
   contentType: 'application/x-www-form-urlencoded;charset=utf-8',  
   // data: {username:$("#username").val(), password:$("#password").val()},  
   dataType: "json",  
   success: function(data){  
              console.log("成功");  
              console.log(data);  
            },  
   error: function(e){  
               console.log(e);  
   }  
});*/ -->



<!--     // 每次进来 看是否有token 如果有 每次请求服务器端数据 都携带上这个token
if (!!this.token) {
  // 有token
  console.log('有token');

} else {
  // 获取token
  console.log('没有token');
  // 发送请求 登录验证 以获取token
} -->




<!--     feedback () {


  axios.post('/get_feedback_types', {
      params: {
        // openid: '132332332'
      },
      config: {
        headers: { "Content-Type": "application/x-www-form-urlencoded",'Authorization': 'test'},
      },
      withCredentials: true // 携带cookie
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      // console.log(error);
    });
}, -->
<!--     login () {
  axios.post('/admin/login', {
      params: {
        userName: 'abeng',
        password: '123'
      },
      // withCredentials: true // 可以拿到cookie
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}, -->





<!--   methods: {
  randomLink () {
    this.$router.push('/randomorder');
  },

  getInfoA () {
    axios.post(BASEURL + '/api/get_user_info', {
        params: {
        },
        config: {
          headers: { "Content-Type": "multipart/form-data",'Authorization': 'test' },
        },
      })
      .then(function (response) {
        // console.log(response);
      })
      .catch(function (error) {
        // console.log(error);
      });
  },
  getInfoC () {
    axios.get('http://localhost:8080/getuser/test?=23231', {
        params: {
          openid: '132332332'
        },
        // config: {
        //   headers: { "Content-Type": "multipart/form-data",'Authorization': 'test' },
        // },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        // console.log(error);
      });
  },
  feedback () {


    axios.post('/get_feedback_types', {
        params: {
          // openid: '132332332'
        },
        config: {
          headers: { "Content-Type": "application/x-www-form-urlencoded",'Authorization': 'test'},
        },
        withCredentials: true // 携带cookie
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        // console.log(error);
      });
  },
  // 测试获取token
  getToken () {
    // 测试ajax
    $.ajax({
       type: "POST",  
       url: "http://116.62.23.153:9494/api/get_user_info",  
       contentType: 'application/x-www-form-urlencoded;charset=utf-8',  
       // data: {username:$("#username").val(), password:$("#password").val()},  
       // headers: {'Authorization': 'test'},
       dataType: "json",  
       success: function(data){  
                  console.log("成功");  
                  console.log(data);  
                },  
       error: function(e){  
                   console.log(e);  
       }  
    });
  }
}, -->