/**
 * Created by lihejia on 2017/7/18.
 */
import { get ,post} from '../utils/request';


/***
 * 获取验证码请求
 * @returns {Promise.<void>}
 */
export  async function getVerify() {
  return await get('/verify');
}

export async function doLogin(data){
  return await post('/user/login',data);
}

/**
 * 获取菜单
 * @returns {Promise.<void>}
 */
export async function getMenus() {
  return await get('/main/menu');
}

export async function getUser() {
  return await get('/')
}
