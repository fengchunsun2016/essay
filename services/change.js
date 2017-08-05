import {post} from '../utils/request';

/*
* 修改密码
* */
export function postChangePassword(data){
  return post('/login/modify',data)
}


export default {
  postChangePassword
}
