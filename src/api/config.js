// dev
// export const BASEURL = 'http://116.62.23.153:9494/api';
// export const BASEURL = 'http://localhost:8080/consult';
// export const BASEURL = ' http://116.62.23.153:9494/api';
export const BASEURL = 'https://www.sgshudong.com/api';

// export const BASEURL = 'https://www.sgshudong.com';
// pro

export const SUBJECT = {
  // NEWS_TYPE: "新闻",
};

// hostory模式
// export const WEIXINCERTI = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa3c69deeaa1b4948&redirect_uri=http%3a%2f%2fnicedevelop.nat300.top%2fclerklists&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';


// 非history模式
// 跳转回来的url
// http://nicedevelop.nat300.top/?code=001F55k90Uommz1Wuck90i7qk90F55kk&state=STATE#/clerklists
export const WEIXINCERTI = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa3c69deeaa1b4948&redirect_uri=http%3A%2F%2Fnicedevelop.nat300.top%2F%23%2Fclerklists&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';


export const genWeixinDirect = function (pageName) {
	return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa3c69deeaa1b4948&redirect_uri=http%3A%2F%2Fnicedevelop.nat300.top%2F%23%2F' + pageName + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
};