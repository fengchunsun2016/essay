import { getFile } from '../utils/request';

// 导出账户明细内容
export async function getAccountFile(data) {
  return await getFile('/merAccount/export',data)
}

//导出交易流水
export async function getDealFile(data) {
  return await getFile('/merPay/export',data)
}

//导出结算流水
export async function getSettlementFile(data) {
  return await getFile('/settlement/export',data)
}

//导出统计查询
export async function getSumFile(data) {
  return await getFile('/merPaySum/export',data)
}


//导出POS交易查询
export async function getPosFile(data) {
  return await getFile('/pos/export',data)
}


//交易查询对账文件导出
export async function getDealBillsFile(data) {
  return await getFile('/merPay/billExport',data)
}


//结算流水对账文件导出
export async function getSettlementBillsFile(data) {
  return await getFile('/settlement/billExport',data)
}
