/**
 * Created by lihejia on 2017/7/18.
 */
import router from 'next/router';
// import https from 'https';
import isomorphicFetch from 'isomorphic-fetch'
import {notification} from  'antd';
import es6promise from 'es6-promise'
import qs from 'qs';
import config from '../config/config.json';
import { getToken, removeTokenCookie} from '../utils/cookies';



es6promise.polyfill();

const defaultOptions = {
  // agent: new https.Agent({ rejectUnauthorized: false }),
  mode: 'cors',
};

function getHeaders() {
  const token = getToken();
  const headers =  {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': token,
  }
  return headers
}

/***
 * 删除空参数
 * @param {*}
 * @returns {*}
 */
function removeEmptyObject(obj){
  if (typeof(obj) == 'undefined') {
    return null;
  }
  let resultObj = {};
  for (let i in obj) {
    //如果不是undefind
    if (typeof(obj[i]) != 'undefined' && obj[i] != '' &&obj[i]!=null &&obj[i]!='all') {
      resultObj[i] = obj[i];
    }
    if(i=='type' && obj[i]==0){
      resultObj[i]=0
    }
  }
  return resultObj;
}
/***
 * 检查status
 * @param response
 * @returns {*}
 */
function checkStatus(response){
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  //如果是浏览器，则进行提示
  if (process.browser) {
    notification.error({
      message: '网络异常',
      description: '网络请求异常，请检查网络环境',
    })
  }
  // const error = new Error(response.statusText);
  // error.response = response;
  // throw error;
}

/***
 * 业务校验
 * @param response
 */
async function checkCode(result){
  if (result && result.code === 200) {
    return result;
  }
  if (process.browser) {
    notification.warning({
      message: '出错啦 (*>﹏<*)',
      description: result && result.msg || '请求错误，未知异常',
    })
  }
  if (result.code === 411) {
    removeTokenCookie();
    if ( typeof window !== 'undefined'  ) {
      router.push('/');
      return result;
    }
  }
  if (result.code === 406) {
    removeTokenCookie();
    if ( typeof window !== 'undefined'  ) {
      router.push('/');
      return result;
    }
  }
  if (result.code === 407) {
    removeTokenCookie();
    if ( typeof window !== 'undefined'  ) {
      router.push('/');
      return result;
    }
  }

  // const error = new Error(result && result.msg);
  // throw error;
}




/**
 *  Requests a URL, returning a promise.  method:get
 * @param url
 * @returns {Promise.<void>}
 */
export async function get(url, data){
  const options = {
    ...defaultOptions,
    headers: getHeaders(),
    method: 'GET',
  }
  //去除空值
  let newData = removeEmptyObject(data);
  if (newData) {
    url = url + '?' + qs.stringify(newData);
  }
  return request(url, options);
}
/***
 * POST 提交
 * @param url
 * @param data
 * @returns {Promise.<Object>}
 */
export async function post(url, data){
  const options = {
    ...defaultOptions,
    headers: getHeaders(),
    method: 'POST',
    body: JSON.stringify(data),
  }
  // 钩子，如果是登录，带一个loginRequest的标签，可以免token通过request
  if (data.loginRequest) {
    options.loginRequest = true;
  }
  return request(url, options);
}
/**
 * Requests a URL, returning a promise.
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to ‘fetch‘
 * @return {object}           An object containing either 'data' or 'err'
 */
export async function request(url, options = {}){
  if (!options.headers.Authorization && !options.loginRequest) {
    return {data: null};
  }
  const baseUrl = process.env.NODE_ENV === 'production' ? config.baseUrl : config.devUrl;
  const fetchUrl = baseUrl + url;
  const response = await isomorphicFetch(fetchUrl, options);
  checkStatus(response);
  const data = await response.json();
  const result = await checkCode(data);
  return {
    data: result,
  };
}


// 获取下载内容
export async function getFile(url, data = {}){
  if (url[0] !== '/') {
    url = '/' + url;
  }
  const token = getToken();
  const options = {
    ...defaultOptions,
    headers: {
      'Authorization': token,
    },
    method: 'GET',
  }
  const baseUrl = process.env.NODE_ENV === 'production' ? config.baseUrl : config.devUrl;
  const newData = removeEmptyObject(data);
  const queryStr = qs.stringify(newData);
  if (!!queryStr) {
    url = url + '?' + qs.stringify(newData);
  }
  const fetchUrl = baseUrl + url;
  const response = await isomorphicFetch(fetchUrl, options);
  const contentType = response.headers.get('Content-Type')
  if ( contentType.indexOf('json') > 0) {
    const json = await response.json();
    await checkCode(json);
  }
  return response;
}
