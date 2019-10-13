<template>
  <div id="random-order">
    <!-- 小哥哥或小姐姐 -->
    <div class="each-option-aera">
      <h3 class='form-check'>
        <i class="fa fa-heart-o" aria-hidden="true"></i>
        <span>想和小哥哥还是小姐姐聊天呢？</span>
        <p class="check-txt" v-if='ifSubmit && !sex'>请选择聊天对象</p>
      </h3>
      <label for="male">
        <span>小哥哥</span>
        <input type="radio" name='gender' id='male' value='1' v-model='sex'>
      </label>
      <label for="famale">
        <span>小姐姐</span>
        <input type="radio" name='gender' id='famale' value='2' v-model='sex'>
      </label>
    </div>
    <!-- 选择等级 -->
    <div class="each-option-aera">
      <h3 class='form-check'>
        <i class="fa fa-diamond"></i>
        <span>选择等级</span>
        <p class="check-txt" v-if='ifSubmit && !level'>请选择等级</p>
      </h3>
      <label for="putong">
        <span>普通</span>
        <input type="radio" name='level' id='putong' value='1' v-model='level'>
      </label>
      <label for="jinpai">
        <span>金牌</span>
        <input type="radio" name='level' id='jinpai' value='2' v-model='level'>
      </label>
      <label for="zhendian">
        <span>镇店</span>
        <input type="radio" name='level' id='zhendian' value='3' v-model='level'>
      </label>
    </div>
    <!-- 选择标签 -->
    <div class="each-option-aera">
      <h3>
        <i class="fa fa-tags" aria-hidden="true"></i>
        <span>选择标签（最多选择3个）</span>
      </h3>
      <label for="wenrou">
        <span>温柔的</span>
        <input type="checkbox" name='tag' id='wenrou' value='温柔的' v-model="fantag">
      </label>
      <label for="keai">
        <span>可爱的</span>
        <input type="checkbox" name='tag' id='keai' value='可爱的' v-model="fantag">
      </label>
      <label for="erciyuan">
        <span>二次元</span>
        <input type="checkbox" name='tag' id='erciyuan' value='二次元' v-model="fantag">
      </label>
    </div>

    <!-- 其它要求 -->
    <div class="other-demand">
      <span>其它要求</span>
      <textarea name="" id="" placeholder="如有其它要求，请在此填写" v-model='otherDemand'></textarea>
    </div>

    <!-- 下单 -->
    <div class="fixed-place-now">
      <input class='place-btn' type="button" 
        @click='orderIn' value='下单'>
    </div>


    <!-- 遮罩层 -->
    <div class="mask-info-random"  :class="{'open': maskShow}" @click='closeWin'
      ></div>

    <!-- 购买弹出窗 -->
    <div class="order-window-random" :class="{'open': maskShow}">
      <!-- 主图及选择规格 -->
      <div class="top-info">
        <img class='close-icon' src="~common/image/close-icon.png" 
          @click='closeWin' alt="">
        <div class="pic"><img  src="~common/image/question.png" alt=""></div>
        <div class="sum-txt">
          <p class='amount'>¥<span v-if='curPrice'>{{curPrice}}</span><span v-if='!curPrice'>-</span>元</p>
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

    <!-- 测试区 -->
    <div class="test-api" style='padding-bottom: .6rem;'>
      <input type="button" value='统一下单12api 获取appid等' @click='getWeixinPay'>
      <br>
      <br>
      <input type="button" value='调用微信支付js' @click='weixinPay'>
      <br>
      <br>
      <input type="button" value='testlayer' @click='testlayer'>
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

import {BASEURL} from "src/api/config.js";

import {GetQueryString, TokenError} from "src/api/utils.js";


export default {
  name: 'RandomOrder',
  data () {
    return {
      sex: '', // 性别
      level: '', // 等级
      fantag: [], // 标签
      otherDemand: '',  // 其他要求

      maskShow: false, // 蒙层显示隐藏
      ifSubmit: false, // 提交flag 一旦提交 就执行表单验证

      typeList: [], // 根据level获取的服务类型集合
      CurTypeIndex: 0, // 默认当前type 处于激活状态的索引值 默认是1 接单类型 1文字语音条 2语音通话 3游戏陪玩 4连麦哄睡（多种类型用逗号,连接）（必填）
      // CurTypeValue: '', // 值

      
      timeList: [], // 当前时长列表 动态改变
      curTimeIndex: -1, // 当前type确定后的所有时长

      amountInput: 1, // 默认数量输入框是1
      curPrice: '', // 当前组合价格

      ifPlace: false, // 如果提交正式下单
      weixinnumber: '', // 微信号
    }
  },
  methods: {
    // 弹出窗
    orderIn () {
      var _this = this;
      // 如果有表单为空的 
      if (!this.sex || !this.level) {
        // 如果数据为空 就把警告开关打开
        this.ifSubmit = true;
      } else { // 如果有数据
        // 打开弹窗
        console.log('tacnhuang');
        _this.maskShow = true;

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

      }
    },
    // 关闭弹窗
    closeWin () {
      var _this = this;
      this.maskShow = false;
      // 重置所有
      _this.typeList = [];
      _this.CurTypeIndex = 0; // 恢复默认
      _this.timeList = [];
      _this.curTimeIndex = -1; // 默认
      _this.curPrice = '';
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
    // 加库存
    add () {
      this.amountInput++;
    },
    // 减库存
    plus () {
      this.amountInput == 1? this.amountInput: this.amountInput--;        
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
        url: BASEURL + "/random_order",  // 接口11
        dataType: "json",  
        data: {
          sex: _this.sex,
          level: _this.level,
          label: _this.fantag.join(''),
          other_require: _this.otherDemand,
          type: _this.typeList[_this.CurTypeIndex].id, 
          time: _this.timeList[_this.curTimeIndex].time,
          num: _this.amountInput,
          wechat_num: _this.weixinnumber,
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
                _this.$router.push({ path: `/userorderdetail`}); // 订单号为 orderNumber
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
    // 测试layer 弹出层
    testlayer () {
      var _this = this;
      console.log('layer test');
      // this.$layer.alert("恭喜 下单成功！");
      // this.$layer.open({
      //   content: '通过style设置你想要的样式',
      //   style: 'background-color:#09C1FF; color:#fff; border:none;', // 自定风格
      //   time: 2 //2秒后自动关闭
      // });
      /*this.$layer.alert("订单信息 金额等等", {
        title: '下单成功',
        btn: '确定支付',
        shade: true,//是否显示遮罩
        shadeClose: true,//点击遮罩是否关闭
      }, function (layerid) {
        console.log('确定');
        _this.$layer.close(layerid);
      });*/
      _this.$layer.msg('订单支付成功...',{
        time: 1
      }, function (layerid) {
        _this.$layer.close(layerid);
        console.log('支付成功');
      });

    }
  },
  mounted () {

  },
  created () {
    // this.$layer.alert("找不到对象！");
  },
}
</script>

<style scoped lang="scss">
@import "common/sass/variable.scss";

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

#random-order {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: $color-background-d;
  padding-bottom: 1rem;

  .each-option-aera {
    width: 100%;
    padding: 0 .25rem;
    box-sizing: border-box;
    margin-bottom: .3rem;
    background-color: #fff;

    h3 {
      width: 100%;
      padding: .2rem 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      i {
        display: inline-flex;
        width: .4rem;
        height: .4rem;
        align-items: center;
        justify-content: flex-start;
        padding-bottom: .05rem;
      }
    }
    label {
      width: 100%;
      padding: .15rem 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      border-top: $border-1px;
      color: $color-text-d;

      span {}
      input {

      }
    }
  }

  .other-demand {
    width: 100%;
    padding: .25rem .25rem;
    box-sizing: border-box;
    margin-bottom: .3rem;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    span {
      display: inline-flex;
      padding-top: .06rem;
      padding-right: .4rem;
      box-sizing: border-box;

    }
    textarea {
      display: inline-flex;
      flex: 1;
      border: 0 none;
    }
  }

}




/* 遮罩层 */
.mask-info-random {
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
</style>
