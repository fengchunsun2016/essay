/**
 * Created by lihejia on 2017/7/18.
 */
import fetch from 'isomorphic-fetch'
import {notification} from  'antd';
import es6promise from 'es6-promise'
import qs from 'qs';
import config from '../config/config.json';
import { getToken } from '../utils/cookies';

es6promise.polyfill();

//基本地址
const baseUrl = process.env.NODE_ENV === 'production' ? config.baseUrl : config.devUrl;

/***
 * 获取公用headers
 * @returns headers
 */
function getHeaders(){
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': getToken()
  };
  return headers;
}
/**
 *  Requests a URL, returning a promise.  method:get
 * @param url
 * @returns {Promise.<void>}
 */
export async function get(url, data){
  const headers = getHeaders();
  const options = {
    headers,
    mode: 'cors',
    method: 'GET',
  }
  //去除空值
  let newData = removeEmptyObject(data);
  if (newData) {
    url = url + '?' + qs.stringify(newData);
  }
  return request(url, options);
}

/**
 * 去除object值为空的数据
 * @param obj
 */
function removeEmptyObject(obj){
  if (typeof(obj) == 'undefined') {
    return null;
  }
  let resultObj = {};
  for (let i in obj) {
    //如果不是undefind
    if (typeof(obj[i]) != 'undefined' && obj[i] != '') {
      resultObj[i] = obj[i];
    }
  }
  return resultObj;
}

/***
 * POST 提交
 * @param url
 * @param data
 * @returns {Promise.<Object>}
 */
export async function post(url, data){
  const headers =getHeaders();
  const options = {
    headers,
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify(data),
    // body: qs.stringify(data)
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
  let fetchUrl = baseUrl + url;
  const response = await fetch(fetchUrl, options);
  checkStatus(response);
  const data = await response.json();
  const result = await checkCode(data);
  return {
    data: result,
  };
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
    result.tokenValid = true;
    return result;
  }
  if (data.code === 516) {
    return { tokenValid: false };
  }
  if (process.browser) {
    notification.warning({
      message: '出错啦 (*>﹏<*)',
      description: result && result.msg || '请求错误，未知异常',
    })
  }
  // const error = new Error(result && result.msg);
  // throw error;
}
