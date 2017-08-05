import { get } from '../utils/request';

export async function getBasic() {
  return await get('/merchant/detail');
}


export default {
  getBasic
}



