import {BASEURL} from "src/api/config.js"
import axios from 'axios'
/*axios.defaults.baseURL = BASEURL;
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true; // 携带cookie 记录session
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default axios*/
// 创建 axios 实例
let http = axios.create({
  // headers: {'Content-Type': 'application/json'},
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}, // 改成这样的 就可以了
  baseURL: BASEURL,
  timeout: 60000,
  // withCredentials: true, // 这里设置会报错
})



// 创建第二个实例


export default http