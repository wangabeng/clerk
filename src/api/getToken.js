import axios from 'src/api/axios';
import Qs from 'qs';
import {BASEURL} from "src/api/config.js";

let getToken = function (code) {
  var prarmData = {
    code: code
  }
  axios({
    method: 'post',
    url: '/wechatauth',
    data: Qs.stringify(prarmData),
  }).then(function (response) {
    return response.data;
    // console.log(response.data);
  }).catch(function (error) {
    return {
      code: 1,
      msg: "请求不到用户信息"
    };
  });
}

export default getToken