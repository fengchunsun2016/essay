/**
 * Created by lihejia on 2017/7/20.
 */
import {get} from '../utils/request';

describe('With util->request', () => {
  it('get方法参数组合"', () => {

    let data=get("/channel/login",{username:"lihejia",password:"123455"})
    console.log(data);
    //expect(app.find('p').text()).toEqual('Hello World!')
  })
})