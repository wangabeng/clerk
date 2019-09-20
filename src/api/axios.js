import {BASEURL} from "src/api/config.js"
import axios from 'axios'
/*axios.defaults.baseURL = BASEURL;
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true; // 携带cookie 记录session
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default axios*/
// 创建 axios 实例
let http = axios.create({
  headers: {'Content-Type': 'application/json'},
  baseURL: BASEURL,
  timeout: 60000,
  withCredentials: true,
})



export default http