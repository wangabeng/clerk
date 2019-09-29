import axios from 'src/api/axios';

import {BASEURL, FRONTEURL, APPID} from "src/api/config.js";

// 获取url特定query 参数 
export const GetQueryString = function (name) {
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r!=null)return  unescape(r[2]); return null;
}

// 存储json 到localstorage的 itemName
export const SaveStorage =  function (itemName, json) {
  var local = window.localStorage;
  local.setItem(itemName, JSON.stringify(json));
}

// 获取localstorage中itemName 的值
export const GetStorage =  function (itemName) {
  var local = window.localStorage;
  return JSON.parse(local.getItem(itemName));
}

// 生成签名
export const GetSign =  function () {
  axios({
    method: 'post',
    url: '/get_sign_package',
    // data: Qs.stringify(prarmData),
    headers:{
      'token': GetStorage("userinfo").toekn,
    }
  }).then(function (response) {
    return response.data.data;
  }).catch(function (error) {
    console.log(error);
    return '获取不到签名';
  });
}

// token错误清除本地存储并刷新
export const TokenError =  function (code, pathName) {
  if (code = 1004) {
    localStorage.removeItem("shiguangshudong");
    // window.location.reload(); // 刷新页面
    // 获取当前路由
    console.log("当前路由：", pathName);
    setTimeout(function () {
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID + '&redirect_uri=http%3A%2F%2F' + FRONTEURL + '%2F%23%2F' + pathName + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';      
    }, 100);


    // return;
    // window.location = 'http://www.baidu.com';
  }
}