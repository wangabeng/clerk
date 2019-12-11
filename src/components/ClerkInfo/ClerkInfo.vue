<template>
  <div id="clerk-info" v-if='clertDetail'>
    <!-- 轮播图 -->
    <swiper :options="swiperOption">
    　　<swiper-slide>
          <div class='slider-each-wrapper' v-for='item in clertDetail.salesman.image_urls'>
            <img :src="item" alt="">   
            <div class="info-txt">
              <div class="name-wrapper">
                <span class='name'>{{clertDetail.salesman.nick_name}}</span>
                <span class='star'>{{clertDetail.salesman.sex=='1'? '男': '女'}}</span>
              </div>
              <div class="online-status">
                <!-- online  offline -->
                <i class="fa fa-circle online" 
                  :class="{'online': clertDetail.salesman.is_online == '1', 'offline': clertDetail.salesman.is_online == '2'}" aria-hidden="true"></i>
                <span>{{clertDetail.salesman.is_online == '1'? "在线": "离线"}}</span>
                <!-- <span>{{clertDetail.salesman.is_online}}</span> -->
              </div>
            </div>    
          </div>
        </swiper-slide>
    　　<div class="swiper-pagination" slot="pagination"></div>
    　　<!-- <div class="swiper-button-prev" slot="button-prev"></div>
    　　<div class="swiper-button-next" slot="button-next"></div> -->
    </swiper>
    
    <!-- 详情信息 -->
    <div class="detail-info-wrapper">
      <!-- 等级及价格 描述 -->
      <div class="level-price-desc">
        <!-- 等级及价格 -->
        <div class="level-price">
          <div class="level-wrapper">
            <i class="fa fa-diamond" aria-hidden="true"></i>
            <span>{{clertDetail.salesman.level_name}}</span>
          </div>
          <p class="price-form">{{clertDetail.salesman.price}}</p>
        </div>
        <!-- 个人描述 -->
        <p class="per-desc">{{clertDetail.salesman.sign}}</p>
      </div>
      
      <!-- 录音 播放 -->
      <div class="play-record">
        <div class="record">
          <i class="fa fa-volume-up" aria-hidden="true"></i>
          <span>录音</span>
        </div>
        <div class='paly-icon' @click='playAudio()' :class='{"playing": isPlaying}'>
          <audio :src="clertDetail.salesman.audio_url" ref='audioEle' controls="controls" hidden="true" @ended='audioEnd'/>
        </div>
      </div>
      
      <!-- 性格标签 -->
      <div class="nature-wrapper">
        <p><i class="fa fa-tags" aria-hidden="true"></i><span>性格标签</span></p>
        <ul>
          <li v-if='!clertDetail.salesman.character' v-for='item in clertDetail.salesman.character'>{{item}}</li>
        </ul>
      </div>

      <!-- 服务内容和价格 -->
      <div class="service-price">
        <p><i class="fa fa-credit-card" aria-hidden="true"></i><span>服务内容及价格</span></p>
        <ul>
          <li v-for='(item, index) in clertDetail.service_price'>
            <span v-for='(innerItem, innnerIndex) in item'>{{innerItem}}</span>
          </li>
        </ul>
      </div>

    </div>
    

    <!-- 下单 -->
    <div class="fixed-place-now">
      <input class='place-btn' type="button" 
        @click='orderIn' value='下单'>
    </div>

    <!-- 遮罩层 -->
    <div class="mask-info" :class="{'open': maskShow}" 
      @click='closeWin'></div>

    <!-- 购买弹出窗 -->
    <div class="order-window-random" :class="{'open': maskShow}">
      <!-- 主图及选择规格 -->
      <div class="top-info">
        <img class='close-icon' src="~common/image/close-icon.png" 
          @click='closeWin' alt="">
        <div class="pic"><img :src="clertDetail.salesman.image_urls[0]" alt=""></div>
        <div class="sum-txt">
          <p class='amount'  v-if='!curPrice'><span>{{clertDetail.salesman.price}}</span></p>
          <p class='amount'  v-if='curPrice'>¥<span>{{curPrice}}</span><span v-if='!curPrice'>-</span>元</p>
          <p class='size'>选择&nbsp;&nbsp;服务类型&nbsp;
            <span v-if='typeList[CurTypeIndex]'>{{typeList[CurTypeIndex].service_name}}</span>;&nbsp;&nbsp;时长&nbsp;
            <span v-if='timeList[curTimeIndex]'>{{timeList[curTimeIndex]&&timeList[curTimeIndex].time}}</span>
            <span v-if='!timeList[curTimeIndex]'>请选择</span>
          </p>
          <p class="check-note" v-if='curTimeIndex==-1&&ifPlace'>请选择服务时长</p>
        </div>
      </div>
      <!-- 选择规格区 -->
      <div class="select-wrapper">
        <!-- 滚动区 -->
        <div class="select-inner">
          <!-- 类型区 -->
          <div class="type-area type-time">
            <ul v-if = 'typeList'>
              <li v-for='(item, index) in typeList' 
                :class="{'active': CurTypeIndex ==index}" @click='tabType(item, index)'>{{item.service_name}}</li>
            </ul>            
          </div>


          <!-- 时长区 -->
          <div class="long-area type-time">
            <h4>时长</h4>
            <ul>
              <li v-if='timeList && item.time' v-for='(item, index) in timeList'  
                :class="{'active': curTimeIndex ==index}" @click='tabTime(item, index)'>{{item.time}}</li>
            </ul>
          </div>
          <!-- 购买数量 -->
          <div class="amount-area">
            <h4>购买数量</h4>
            <div class="amount-wrapper" >
              <a href="javascript:;"><img src="~common/image/minus-icon.png" alt="" @click='plus'></a>
              <input type="number" v-model='amountInput'>
              <a href="javascript:;" ><img src="~common/image/add-icon.png" alt="" @click='add'></a>
            </div>
          </div>
          <!-- 微信号 -->
          <div class="weixin-area form-check">
            <h4>微信号</h4>
            <input type="text" placeholder="请输入微信号" v-model='weixinnumber'>
            <p class='check-txt' v-if='ifPlace&&!weixinnumber'>请填写您的微信号</p>
          </div>

        </div>

      </div>
      <!-- 提交按钮区 -->
      <div class="bot-sub">
        <p class="total">
          总价：<span v-if='curPrice'>¥{{curPrice * amountInput}}元</span><span v-if='!curPrice'>-</span>
        </p>
        <input type="button" value='立即下单' @click='placeOrder'>
      </div>
    </div>

  </div>
</template>

<script>
// import HelloWorld from 'components/HelloWorld/HelloWorld.vue'
// import Index from 'components/Index/Index.vue'
// import SideBar from 'base/SideBar/SideBar.vue'
// import MHeader from 'base/MHeader/MHeader.vue'
// import MFooter from 'base/MFooter/MFooter.vue'

// import {mapGetters, mapActions} from 'vuex'
import $ from 'jquery'

// require styles
import 'swiper/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

// 用封装好的axios
import axios from 'src/api/axios';
import Qs from 'qs';
import {BASEURL} from "src/api/config.js";

import getToken from 'src/api/getToken.js';
// import {allList} from 'src/api/mockdata.js';
import {GetQueryString, TokenError} from "src/api/utils.js";

export default {
  name: 'ClerkInfo',
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
      　　pagination: {
      　　　　el: '.swiper-pagination',
      　　　　clickable: true // 允许点击小圆点跳转
      　　},
      　　/*autoplay: {
      　　　　delay: 3000,
      　　　　disableOnInteraction: false // 手动切换之后继续自动轮播
      　　},*/
      　　loop: true,
      　　navigation: {
      　　　　nextEl: '.swiper-button-next',
      　　　　prevEl: '.swiper-button-prev'
      　　},
          observer: true,
          observeParents: true,
      },

      maskShow: false,


      clertDetail: null, // 店员信息详情,

      
      xFlag: false, // x轴是否选中
      xIndex: '', // 1 文字语音 2 语音通话
      yFlag: false, // x轴是否选中
      yIndex: '', // 1 2 3 4 5

      isPlaying: false, // 音频是否处于播放状态

      // amountInput: 1, // 默认数量输入框是1
      PriceInfoArr: [], // 详情价格数据 二维数组
      picker: {  // 当前选择器 
        y: 0,  // 0代表未选择 y代表往下方向 选择时长 语音 or其他 -1代表 已经选择X情况下对应的Y库存为空
        x: 0, // 0代表未选择 x代表往下方向 选择类型 语音 or其他
      },

      typeArr: [ // 类型方向集合 二位数组二维方向 向右边方向
        {                    // 集合中的第一个只是占位符号
          type: null,
          x: null,
          txt: null,
          temp: null, // 临时属性 用完就清除 true 为可选正常样式 
        },
        {
          type: 1,
          x: 1,
          txt: "文字语音条",
          temp: true, // 临时属性 用完就清除 true 为可选正常样式 
        },
        {
          type: 2,
          x: 2,
          txt: "语音通话",
          temp: true,
        }
      ],
      timeArr: [ // 时长方向集合 二位数组一维方向 向下边方向
        {               // 集合中的第一个只是占位符号
          type: null,
          y: null,
          txt: null,
          temp: null,
        },
        {
          type: 1,
          y: 1,
          txt: "半小时",
          temp: true,
        },
        {
          type: 2,
          y: 2,
          txt: "一小时",
          temp: true,
        },
        {
          type: 3,
          y: 3,
          txt: "一天",
          temp: true,
        },
        {
          type: 4,
          y: 4,
          txt: "一周",
          temp: true,
        },
        {
          type: 5,
          y: 5,
          txt: "一个月",
          temp: true,
        }
      ],

      wechatNum: '', // 微信号

      formCheckFlag: false, // 表单提示默认关闭



      // 1013日调整
      level: '', // 等级

      typeList: [], // 根据level获取的服务类型集合
      CurTypeIndex: 0, // 默认当前type 处于激活状态的索引值 默认是1 接单类型 1文字语音条 2语音通话 3游戏陪玩 

      timeList: [], // 当前时长列表 动态改变
      curTimeIndex: -1, // 当前type确定后的所有时长

      amountInput: 1, // 默认数量输入框是1
      curPrice: '', // 当前组合价格

      ifPlace: false, // 如果提交正式下单
      weixinnumber: '', // 微信号

    };
  },
  computed: {
    /*total () {
      var sum;
      if (this.xFlag && this.yFlag) {
        sum = parseInt(this.PriceInfoArr[parseInt(this.yIndex)][parseInt(this.xIndex)]) * this.amountInput;
      } else {
        sum = '-';
      }
      return sum;
    }*/
    total () {
      return this.curPickYX * this.amountInput;
    },
    curPickYX () { // 根据picker的值生成 返回单价
      var _this = this;
      if (this.picker.x > 0 && this.picker.y > 0) {
        return `${this.PriceInfoArr[this.picker.y][this.picker.x]}`;
      } else {
        return "";
      }
      
      // return `选择 服务类型${_this.typeArr[_this.picker.x-1].txt}；服务时长${_this.timeArr[_this.picker.y-1].txt}`;
    },
    curPickX () {
      var _this = this;
      if (this.picker.x == 0) {
        return '-';
      } else {
        return _this.typeArr[_this.picker.x].txt;
      }
    },
    curPickY () {
      var _this = this;
      if (this.picker.y == 0) {
        return '-';
      } else {
        return _this.timeArr[_this.picker.y].txt;
      }
    },

  },
  watch: {
    picker: {
        // 表格数据刷新后需清空之前查看的订单详情内容
        handler: function (newVal, oldVal) {
          var _this = this;
          // console.log(this);
          if (!newVal.x && !newVal.y) {
            console.log('都未选中');
            _this.picker.x = 0;
            _this.picker.y = 0;
            _this.timeArr.forEach(function (item, index, arr) {
              console.log(item);
              item.temp = true; 
            });
            _this.typeArr.forEach(function (item, index, arr) {
              console.log(item);
              item.temp = true; 
            });
          }
       },
       deep: true
    },
  },
  created () {
    var _this = this;
    // console.log("canshu:" + this.$route.params.id);
    // ajx通过id获取详情this.clertDetail = clertDetail;
    /*this.clertDetail = clertDetail.data;
    console.log(this.clertDetail);
    this.PriceInfoArr = this.clertDetail.service_price;
    console.log(this.PriceInfoArr);*/

    // 获取店员详情
    $.ajax({
      type: "POST",  
      url: BASEURL + "/get_salesman",  
      // contentType: 'application/x-www-form-urlencoded;charset=utf-8',  
      data: {
        salesman_id: _this.$route.params.id, //"\u963f\u8ff8", // 个人的信息  _this.userinfo.nick_name
      },  
      headers: {'token': localStorage.getItem("shiguangshudong")},
      dataType: "json",  
      success: function(res){
                  TokenError(res.code, _this); // token错误
                  if (res.code == 0) {
                    console.log('详情为：', res.data);
                    _this.clertDetail = res.data;
                    _this.PriceInfoArr = _this.clertDetail.service_price;
                    // 获取等级
                    _this.level = _this.clertDetail.salesman.level; 
                  }

                },  
      error: function(e){  
                   console.log(e);
      }  
    });


  },
  methods: {
    // 下单弹出弹窗
    orderIn () {
      this.maskShow = true;
      var _this = this;

      // 查询根据level获取type 然后根据type获取时长
      $.ajax({
        type: "POST",  
        url: BASEURL + "/get_types",  // 接口15 根据level 获取服务等级  "文字语音条"  "语音通话"
        // contentType: 'application/x-www-form-urlencoded;charset=utf-8',  
        data: {
          level: _this.level,
        },  
        headers: {'token': localStorage.getItem("shiguangshudong")},
        dataType: "json",  
        success: function(res){  
          TokenError(res.code, _this); // token错误

          if (res.code == 0) {
            console.log('type为：', res.data); // 0: "文字语音条" 1: "语音通话"  改为：data: [{id: "1", service_name: "文字语音条"}, {id: "2", service_name: "语音通话"}]
            _this.typeList = res.data;

            // 默认激活状态的type 索引值
            console.log("默认激活状态的type", _this.CurTypeIndex);
            _this.findTimeByType(_this.typeList[0].id); // 默认查询第一个
            // 遍历0: "文字语音条" 1: "语音通话" 查询对应的 时长 存起来
            // _this.typeList -> [{'文字语音条'：[{time: "半小时"}, {time: ""}] }]
          }

        },  
        error: function(e){  
         console.log(e);  
        }  
      });


    },


    // 根据type查询 时长 typeIndex -> timeList
    findTimeByType (typeIndex) {
        var _this = this;
        $.ajax({
          type: "POST",  
          url: BASEURL + "/get_time",  // 接口13 根据服务类型  "文字语音条"  "语音通话" -> 获取时长
          dataType: "json",  
          data: {
            /*level: _this.level, 
            type: i+1, */
            level: _this.level, 
            // type: typeIndex, 
            type: typeIndex, 
          },  
          headers: {'token': localStorage.getItem("shiguangshudong")},
          dataType: "json",   
          success: function(res){  
                      TokenError(res.code, _this); // token错误
                      // console.log('根据服务类型  "文字语音条"  "语音通话" -> 获取时长:' + typeArr[i] , res.data); 
                      if (res.code == 0) {
                        console.log('根据服务类型  "文字语音条"  "语音通话" -> 获取时长:', res.data); 
                        // 设置typeTimeArr的值 暂时先定死
                        _this.timeList = res.data; // data: [{id: "1", time: "半小时"}, {id: "2", time: "一小时"}, {id: "3", time: "一天"}, {id: "4", time: "一个月"},…]
                      }
                    },  
          error: function(e){  
                       console.log(e);  
          }  
        }); 
    },
    // 切换服务类型 type
    tabType (item, index) {
      var _this = this;
      // 1 切换样式 当前type的激活状态 如果当前点击的index和CurTypeIndex一致 就什么也不做
      if (index == this.CurTypeIndex) {
        console.log("没变化");
        return;
      } else {
        this.CurTypeIndex = index;
        // 2 重新查询 当前type对应的time
        _this.findTimeByType(item.id);
        // 3 重新设置时长 未空
        _this.curTimeIndex = -1;
        // 4 重新设置价格未空
        _this.curPrice = '';
      }
    },
    // 切换时长
    tabTime(item, index) {
      var _this = this;
      // 如果index未改变 
      if (index == this.curTimeIndex) {
        console.log("没变化");
        return;
      } else {
        this.curTimeIndex = index;
        // 查询价格
        _this.findPrice();
      }
    },
        // 查询价格
    findPrice () {
        var _this = this;
        // console.log('这是什么:', _this.timeList[_this.curTimeIndex - 1]);
        $.ajax({
          type: "POST",  
          url: BASEURL + "/get_price",  // 接口10
          dataType: "json",  
          data: {
            level: _this.level, 
            type: _this.typeList[_this.CurTypeIndex].id, 
            time: _this.timeList[_this.curTimeIndex].time,
            /*type: '文字语音条', 
            time: '半小时',*/
            num: _this.amountInput,
          },  
          headers: {'token': localStorage.getItem("shiguangshudong")},
          dataType: "json",   
          success: function(res){  
                      TokenError(res.code, _this); // token错误
                      console.log('查询到的价格为:', res.data);
                      _this.curPrice = res.data.price;
                    },  
          error: function(e){  
                       console.log(e);
          }  
        }); 
    },
    // 正式下单
    placeOrder () {
      var _this = this;

      this.ifPlace = true; // 开关打开 开始验证 并提交

      // 如果微信号和类型为空 无法提交
      if (!this.weixinnumber || !this.curPrice) {
        return;
      }
      console.log("执行ajax");
      $.ajax({
        type: "POST",  
        url: BASEURL + "/order",  // 接口11
        dataType: "json",  
        data: {
          salesman_id: _this.$route.params.id, //"\u963f\u8ff8", // 个人的信息  _this.userinfo.nick_name
          type: _this.typeList[_this.CurTypeIndex].id, 
          time: _this.timeList[_this.curTimeIndex].time,
          num: _this.amountInput,
          wechat_num: _this.weixinnumber,

          /*sex: _this.sex,
          level: _this.level,
          label: _this.fantag.join(''),
          other_require: _this.otherDemand,
          type: _this.typeList[_this.CurTypeIndex].id, 
          time: _this.timeList[_this.curTimeIndex].time,
          num: _this.amountInput,
          wechat_num: _this.weixinnumber,*/
        },  
        headers: {'token': localStorage.getItem("shiguangshudong")},
        dataType: "json",   
        success: function(res){  
                    TokenError(res.code, _this); // token错误
                    if (res.code == 0) {
                      console.log('下单结果:', res.data);
                      // 弹出下单成功 请求12接口 服务端调用统一下单api
                      // 弹出层 提示支付
                      _this.$layer.alert(`
                          <p>总金额：¥${_this.curPrice * _this.amountInput}元</p>
                          <p>订单号：${res.data}</p>
                        `, {
                        title: '下单成功',
                        btn: '确定支付',
                        shade: true,//是否显示遮罩
                        shadeClose: true,//点击遮罩是否关闭
                      }, function (layerid) {
                        // 调用统一支付下单接口 12接口

                        _this.getWeixinPay (res.data); // orderNumber订单号传入
                        _this.$layer.close(layerid);

                      });                  
                    }

                  },  
        error: function(e){  
                     console.log(e);  
        }  
      }); 

    },
    // 接口12 获取支付参数签名等
    getWeixinPay (orderNumber) {
      var _this = this;
      // 测试接口12
      $.ajax({
        type: "POST",  
        url: BASEURL + "/unifiedorder",  // 接口12
        dataType: "json",  
        data: {
          order_no: orderNumber,
        },  
        headers: {'token': localStorage.getItem("shiguangshudong")},
        dataType: "json",   
        success: function(res){  
                    TokenError(res.code, _this); // token错误
                    if (res.code == 0) {
                      console.log('接口12下单结果:', res.data.parameters);
                      // 利用生成的签名参数调用微信支付  _this.weixinPay() 把签名传入
                      _this.weixinPay(res.data.parameters, orderNumber);
                      // 弹出层 提示支付
                      /*_this.$layer.alert("订单信息 金额等等", {
                        title: '下单成功',
                        shade: true,//是否显示遮罩
                        shadeClose: true,//点击遮罩是否关闭
                      }, function (layerid) {
                        console.log('确定');
                        _this.$layer.close(layerid);
                      });*/
                    }

                  },  
        error: function(e){  
                     console.log(e);  
        }  
      }); 
    },
    // 测试微信支付
    weixinPay (signJson, orderNumber) {
      var _this = this;
      // {"code":0,"msg":"\u6210\u529f","count":0,"data":{"parameters":{"appId":"wxa3c69deeaa1b4948","timeStamp":"1570781810","nonceStr":"zFyFs5Ls9mSaZqRBr4HfiggpGB5tmnNm","package":"prepay_id=wx1116165084859627e71a842f1773051300","signType":"MD5","paySign":"48298FDD372B96D0DF056E8E5BB87B09"}}}
      function onBridgeReady(){
         WeixinJSBridge.invoke(
            'getBrandWCPayRequest', signJson/*{
               "appId":"wxa3c69deeaa1b4948",     //公众号名称，由商户传入     
               "timeStamp":"1570781810",         //时间戳，自1970年以来的秒数     
               "nonceStr":"zFyFs5Ls9mSaZqRBr4HfiggpGB5tmnNm", //随机串     
               "package":"prepay_id=wx1116165084859627e71a842f1773051300",     
               "signType":"MD5",         //微信签名方式：     
               "paySign":"48298FDD372B96D0DF056E8E5BB87B09" //微信签名 
            }*/,
            function(res){
            if(res.err_msg == "get_brand_wcpay_request:ok" ){
              // alert('成功啦');
              // 页面跳转到客户端订单详情
              _this.$layer.msg('订单支付成功...',{
                time: 1
              }, function (layerid) {
                // this.$router.push({ path: `/clerkinfo/${id}`});
                _this.$router.push({ path: `/userorderdetail/${orderNumber}`}); // 订单号为 orderNumber
                _this.$layer.close(layerid);
                console.log('支付成功');
              });
            // 使用以上方式判断前端返回,微信团队郑重提示：
                  //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            } 
         }); 
      }
      if (typeof WeixinJSBridge == "undefined"){
         if( document.addEventListener ){
             document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
         }else if (document.attachEvent){
             document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
             document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
         }
      }else{
         onBridgeReady();
      }
    },




    // 关闭弹窗
    closeWin () {
      this.maskShow = false;
    },
    // 选择 X轴
    /*selectType (xIndex) {
      this.xFlag = true;
      console.log("选中" + xIndex);
      this.xIndex = xIndex;

      console.log(parseInt(this.xIndex));
    },*/
    // 选择时长 Y轴
    /*selectTime (daysTime) {
      this.yFlag = true;
      console.log("选中" + daysTime);
      this.yIndex = daysTime;

      console.log(parseInt(this.yIndex));
    },*/
    // 加库存
    add () {
      this.amountInput++;
    },
    // 减库存
    plus () {
      this.amountInput == 1? this.amountInput: this.amountInput--;        
    },
    // 播放录音
    playAudio () {
      console.log('你点击我了');
      var ele = this.$refs.audioEle;
      if (this.isPlaying == false) { // 如果未处在播放状态 则播放
        console.log('开始播放');
        this.isPlaying = true;
        this.$refs.audioEle.play();
      } else { // 如果处在播放状态 则停止播放
        console.log('人工结束');
        this.isPlaying = false;
        this.$refs.audioEle.pause();
        this.$refs.audioEle.load();
      }
    },
    // 监听播放结束
    audioEnd () {
      // 
      console.log('结束');
      this.isPlaying = false;
    },

    // 选择库存
    // x轴
    doPickType (item) {
      // 先判断当前是否可选 比如已经选择了y 而yx对应的库存数为0 则不可选 return
      if (!item.temp) { // 已经选择y情况下对应的x库存为空 为true 表示有 空 表示无货 默认为true
        return;
      }

      // console.log(item);
      // 1 改变当前picker中X的值
      if (this.picker.x == item.x) { // 已经被选中 再次点击 则取消选中
        this.picker.x = 0; 
        return;
      }
      // 如果不是重复选择 给当前选择器赋新值
      this.picker.x = item.x; // 如果picker.x == item.x  就处于active状态
      console.log('当前选择x轴：', this.picker.x);
      // 2 this x-> y1    y2 y3 遍历 查看库存情况 如果有库存 当前y数据就是可选择状态，如果没有库存，当前y就是禁用状态
      //  如果y没有被选中
      for (var  i = 1; i < this.timeArr.length; i++ ) {
        console.log(this.PriceInfoArr[i][this.picker.x]); // 打印this x -> y1 y2 y3的库存   233 4555 null
        var XaYx = this.PriceInfoArr[i][this.picker.x]; // 当前价格
        !!XaYx? this.timeArr[i].temp = true: this.timeArr[i].temp = false; // timeArr[i].temp == false 则为disable状态
        console.log('分隔符：', this.timeArr[i].temp); 
      }
      // 3 添加一个计算属性 计算 选择器中 x y是否都被选中 如果被选中了 input就处于激活状态 可以填写数量
      // 4 添加一个计算属性 计算库存数 * 数量的值 O了
    },
    // y轴
    doPickTime (item) {
      if (!item.temp) { 
        return;
      }
      if (this.picker.y == item.y) { // 已经被选中 再次点击 则取消选中
        this.picker.y = 0; 
        return;
      }
      // 如果不是重复选择 给当前选择器赋新值
      this.picker.y = item.y; // 如果picker.x == item.x  就处于active状态
      for (var  i = 1; i < this.typeArr.length; i++ ) {
        console.log(this.PriceInfoArr[this.picker.y][i]); // 打印this x -> y1 y2 y3的库存   233 4555 null
        var XxYa = this.PriceInfoArr[this.picker.y][i]; // 当前价格
        !!XxYa? this.typeArr[i].temp = true: this.typeArr[i].temp = false; 
        console.log('分隔符：', this.typeArr[i].temp); 
      }

    },


  },
  mounted () {

  }
}
</script>

<style  lang="scss">/* scoped */
@import "common/sass/variable.scss";
@import "common/sass/mixin.scss";

/* 下单按钮 */
.fixed-place-now {
  width: 100%;
  position: fixed;
  z-index: 100;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: .2rem 0;
  border-top: $border-1px;
  .place-btn {
    font-size: .28rem;
    background-color: #ee0d2d;
    color: #fff;
    width: 5.8rem;
    padding: .15rem 0;
    border-radius: .06rem;
  }
}
/* 遮罩层 */
.mask-info {
  position: fixed;
  display: none;
  z-index: 101;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: black;
  opacity: .6;

  &.open {
    display: flex;
  }

}
/* 弹出窗 */
.order-window-random {
  width: 100%;
  position: fixed;
  z-index: 102;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  // height: 85VH;
  color: $color-text-dd;
  border-top-left-radius: .1rem;
  border-top-right-radius: .1rem;
  // display: none;

  transform: translateY(100%);
  transition: all 500ms ease-in-out;

  &.open {
    transform: translateY(0);
  }

  .top-info {
    height: 2.5rem;
    width: 6.4rem;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: .3rem .3rem 0;
    box-sizing: border-box;
    position: relative;

    .close-icon {
      position: absolute;
      top: .2rem;
      right: .2rem;
      width: .4rem;
      height: .4rem;
    }

    .pic {
      width: 2rem;
      height: 2rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .sum-txt {
      box-sizing: border-box;
      width: 3.5rem;
      padding-left: .2rem;
      line-height: 1.5;
      color: $color-text-d;
      .amount {
        color: #f12d2f;
        font-size: .28rem;
        margin-top: .1rem;
      }
      .size {
        font-size: .23rem;
      }
    }
  }

  .select-wrapper {
    // height: calc(85VH-3.3rem);
    // height: e("calc(85VH-3.3rem)");
    overflow-y: auto;
    border-top: $border-1px;
    border-bottom: $border-1px;
    .select-inner {
      width: 100%;
      padding: 0 .2rem;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items:center;
      
      .type-time {
        width: 100%;
        padding: .2rem;
        width: 100%;
        box-sizing: border-box;
        border-bottom: $border-1px;
        h4 {
          font-size: .25rem;
          padding: .1rem .1rem;

        }
        >ul {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          li {
            margin: .1rem;
            &:first-child {
              margin-left: 0;
            }
            padding: .1rem .12rem;
            border-radius: .05rem;
            background-color: $color-background-d;
            font-size: .22rem;
            &.active {
              background-color: #fdeaec;
              color: #f12d2f;
            }
            &.disable {
              background-color: $color-background-d;
              opacity: .4;
            }
          }
        }        
      }

      /* 购买数量 */
      .amount-area {
        width: 6.4rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: .2rem .1rem;
        box-sizing: border-box;
        border-bottom: $border-1px;
        h4 {
          font-size: .25rem;
          padding: .1rem .1rem;
          box-sizing: border-box;
        }
        .amount-wrapper {
          display: inline-flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: center;
          &.disable {
            opacity: .5;
          }
          a {
            img {
              width: .8rem;
              height: .6rem;
            }
          }
          input {
            width: 1rem;
            height: .6rem;
            box-sizing: border-box;
            padding: 0 .1rem;
            margin: 0 .06rem;
            font-size: 0.24rem;
            background-color: #f5f5f5;
            text-align: center;

          }
        }
      }

      /* 微信号 */
      .weixin-area {
        width: 6.4rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: .2rem .1rem;
        box-sizing: border-box;
        h4 {
          font-size: .25rem;
          padding: .1rem .1rem;
        }
        input {
          flex: 1;
          padding: .1rem .05rem;
          box-sizing: border-box;
          margin-left: .2rem;
          font-size: .22rem;
        }
      }
    }
  }

  .bot-sub {
    height: .8rem;
    width: 6.4rem;
    padding: 0 .2rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .total {
      span {
        color: #f12d2f;
      }
    }
    input {
      display: inline-flex;
      padding: .1rem .3rem;
      font-size: .26rem;
      border-radius: .05rem;
      background-color: #f12d2f;
      color: #fff;
    }
  }
}


#clerk-info {
  width: 6.4rem;
  .masked {

  }

  /* 详情信息 */
  .detail-info-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f6f6f6;
    color: $color-text-dd;
    padding-bottom: 1rem;
    
    .level-price-desc {
      width: 100%;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      padding: 0 .2rem;
      box-sizing: border-box;

      .level-price {
        width: 100%;
        display: flex;
        flex-direction: row;
        background-color: #fff;
        align-items: center;
        justify-content: space-between;
        padding: .2rem 0 .2rem;
        border-bottom: $border-1px;

        .level-wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
          i {
            padding-right: .05rem;
          }
        }
        .price-form {
          color: #ed0f28;
        }
      }

      .per-desc {
        padding: .2rem 0 .2rem;
        font-size: .2rem;
      }
    }
    
    .play-record {
      width: 100%;
      display: flex;
      flex-direction: row;
      background-color: #fff;
      padding: .2rem .2rem;
      box-sizing: border-box;
      align-items: center;
      justify-content: space-between;
      margin-top: .2rem;
      .record {
        i {
          padding-right: .05rem;
          font-size: .23rem;
        }
      }
      .paly-icon {
        width: .75rem;
        height: .32rem;
        display: inline-flex;
        box-shadow: $box-shadow;
        border-radius: .04rem;
        @include background_fill('~common/image/audio2.png');
        &.playing {
          @include background_fill('~common/image/audioplay.gif');
        }
      }
    }

    .nature-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      padding: 0 .2rem;
      box-sizing: border-box;
      margin-top: .2rem;
      p {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: .2rem 0 .2rem;
        border-bottom: $border-1px;
        i {
          padding-right: .05rem;
          font-size: .23rem;
        }
      }
      ul {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding: .1rem 0 .2rem;
        li {
          margin: .1rem;
          padding: .05rem .12rem;
          border-radius: .05rem;
          border: $border-1px-d;
          color: $color-text-d;
          font-size: .2rem;
        }
      }
    }

    .service-price {
      width: 100%;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      padding: 0 .2rem;
      box-sizing: border-box;
      margin-top: .2rem;
      p {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: .2rem 0 .2rem;
        border-bottom: $border-1px;
        i {
          padding-right: .05rem;
          font-size: .23rem;
        }
      }
      ul {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: .2rem 0 .2rem;

        li {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: .12rem 0;
          &:first-child {
            font-weight: bold;
            color: $color-text-basic;
          }
          span {
            flex: 1;
            text-align: center;
          }
        }
      }
    }

  }

}

/* slider */
.swiper-container {
    width: 6.4rem;
    height: 6.4rem;
}
.swiper-pagination-bullet-active {
  background: #fff!important;
}
.slider-each-wrapper {
  width: 6.4rem!important;
  height: 6.4rem!important;
  position: relative;

  >img {
    width: 6.4rem!important;
    height: 6.4rem!important;
    background-color: #9f9f9f;
  }

  .info-txt {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    padding: .2rem .3rem .4rem;
    box-sizing: border-box;
    color: rgba(200,200,200, .8);
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;

    .name-wrapper {
      display: flex;
      flex-direction: column;
      .name {
        font-size: .26rem;
        font-weight: 400;
        margin-bottom: .1rem;
      }
      .star {
        font-size: .2rem;
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
          color: #03afe1;
        }
        &.offline {
          color: $color-text-d
        }
      }
    }

  }

}

/* 表单提示 */
.form-check {
  position: relative;
  .check-txt {
    position: absolute;
    display: inline-flex;
    left: 0;
    bottom: 0;
    font-size: .2rem;
    color: #f0ad4e;
    box-sizing: border-box;
    padding-left: .1rem;
    transform: scale(.9);
  }
}
.check-note {
  color: #f0ad4e;
}
</style>
<!-- @click.stop='doPlay' -->

