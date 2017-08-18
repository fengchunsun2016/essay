/**
 * Created by lihejia on 2017/7/18.
 */
import { get ,post} from '../utils/request';


/***
 * 登录请求
 * @returns {Promise.<void>}
 */

export async function doLogin(data){
  return await post('/user/login',data);
}

export async function doLogout(){
  return await get('/login/logout');
}
/**
 * 获取菜单
 * @returns {Promise.<void>}
 */
export async function getOrigin() {
  return await get('/main/origin');
}

