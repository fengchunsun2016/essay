/**
 * @file channel/services/account.js
 * @author Mantak <mantak.cn@gmail.com>
 * Date: 2017-08-08
 * Last Modified Date: 2017-08-08
 * Last Modified By: Mantak <mantak.cn@gmail.com>
 */

import { get } from '../utils/request';

export async function getAccountData( data ){
  return await get('/merAccount/list', data)
}

export default {
  getAccountData,
}
