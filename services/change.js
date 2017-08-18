import {post} from '../utils/request';

/*
* 修改密码
* */
export async function postChangePassword(data){
  return await post('/login/modify',data)
}


export default {
  postChangePassword
}
