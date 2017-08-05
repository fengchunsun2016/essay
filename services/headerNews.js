import { get } from '../utils/request';

export async function getHeaderNews() {
  return await get('/main/headMenu');
}

export default {
  getHeaderNews
}
