/**
 * Created by lihejia on 2017/7/17.
 */

/********************common.start**********************/

/***请求中*/
export const PENDING='PENDING';

/***请求完成*/
export const FULFILLED='FULFILLED';

/***请求拒绝(失败)*/
export const REJECTED='REJECTED';

//加载common item
export const COMMON_ITEM_LOAD='COMMON_ITEM_LOAD';

//加载common item 成功
export const COMMON_ITEM_LOAD_SUCCESS='COMMON_ITEM_LOAD_SUCCESS';

/********************common.end**********************/



/********************login.start**********************/
//使用token请求数据，无论成功与否都要更新一下token
export const TOKEN_AUTH='TOKEN_AUTH';
//登陆成功
export const LOGIN_SUCCESS='LOGIN_SUCCESS';
//登陆失败
export const LOGIN_ERROR='LOGIN_ERROR';
//清除token
export const RESET_TOKEN='RESET_TOKEN';
/***
 * 登录
 * @type {string}
 */
export const LOGIN='LOGIN';
/***获取验证码*/
export const LOAD_VERIFY='LOAD_VERIFY';

export const SIGN_OUT = 'SIGN_OUT';

/********************login.end**********************/
//菜单加载成功
export const ORIGIN_SUCCESS='ORIGIN_SUCCESS';
export const LOAD_ORIGIN='LOAD_ORIGIN';



//加载可视化数据
export const LOAD_MAINV='LOAD_MAINV';

//加载可视化数据数据
export const LOAD_MAINV_SUCCESS='LOAD_MAINV_SUCCESS';


/********************header.start**********************/
//加载头部信息
 export const HEADER_LOAD_NEWS = 'HEADER_LOAD_NEWS';
//头部信息加载成功
export const HEADER_NEWS_SUCCESS = 'HEADER_NEWS_SUCCESS';
/********************header.end**********************/


/********************basic.start**********************/
//加载基本信息
export const BASIC_LOAD = 'BASIC_LOAD';

//基本信息加载成功
export const BASIC_SUCCESS = 'BASIC_SUCCESS';
/********************basic.end**********************/


/********************系统公告.start**********************/
//加载系统公告详情
export const MESSAGE_LOAD_DETAIL='MESSAGE_LOAD_DETAIL';

//加载系统公告详情
export const MESSAGE_LOAD_DETAIL_SUCCESS='MESSAGE_LOAD_DETAIL_SUCCESS';
//系统公告搜索
export  const MESSAGE_SEARCH='MESSAGE_SEARCH';

//消息已读
export const MESSAGE_READ='MESSAGE_READ';
//页数更改
export const MESSAGE_CHANGE_PAGE='MESSAGE_CHANGE_PAGE';
//保存查询条件
export const MESSAGE_SAVE_SEARCH='MESSAGE_SAVE_SEARCH';

/********************系统公告.end**********************/



/********************修改密码.start**********************/
//发送修改密码请求
export const CHANGE_POST = 'CHANGE_POST';

//修改密码成功
export const CHANGE_SUCCESS = 'CHANGE_SUCCESS';
/********************修改密码.end**********************/



/********************工单.start**********************/
//请求数据中
export const WORK_ORDER_PENDING = 'WORK_ORDER_PENDING';
//请求数据完成
export const WORK_ORDER_FULFILLED = 'WORK_ORDER_FULFILLED';

//工单请求数据开始
export const WORK_ORDER_LOAD = 'WORK_ORDER_LOAD';
//请求数据成功
export const WORK_ORDER_SUCCESS = 'WORK_ORDER_SUCCESS';

//加载更多开始
export const LOAD_MORE = 'LOAD_MORE';
//加载更多成功
export const LOAD_MORE_SUCCESS = 'LOAD_MORE_SUCCESS';

//发送已读消息
export const POST_HAVE_READ = 'POST_HAVE_READ';
//已读消息发送成功
export const POST_HAVE_READ_SUCCESS = 'POST_HAVE_READ_SUCCESS';

//提交工单
export const POST_WORK_ORDER = 'POST_WORK_ORDER';
//提交工单成功
export const POST_WORK_ORDER_SUCCESS = 'POST_WORK_ORDER_SUCCESS';
/********************工单.end**********************/


/********************统计.start**********************/
//加载数据ing
export const SUM_PENDING = 'SUM_PENDING';
//加载数据
export const SUM_LOAD = 'SUM_LOAD';
//请求数据成功
export const SUM_LOAD_SUCCESS = 'SUM_LOAD_SUCCESS';
//保存查询条件
export const SUM_SAVA_QUERY='SUM_SAVA_QUERY';
//页数更改
export const SUM_CHANGE_ROWS='SUM_CHANGE_ROWS';
/********************统计.end**********************/


/********************商户管理.start**********************/
//加载数据ing
export const MER_PENDING = 'MER_PENDING';

//加载数据完成
export const MER_FULFILLED = 'MER_FULFILLED';
//加载数据
export const MER_LOAD = 'MER_LOAD';
//请求数据成功
export const MER_LOAD_SUCCESS = 'MER_LOAD_SUCCESS';
//保存查询条件
export const MER_SAVA_QUERY='MER_SAVA_QUERY';
//页数更改
export const MER_CHANGE_ROWS='MER_CHANGE_ROWS';


/********************商户管理.end**********************/



/********************交易流水.start**********************/
//加载数据中ing
export const DEAL_PENGDING = 'DEAL_PENGDING';
//加载数据完成
export const DEAL_FULLFILLED = 'DEAL_FULLFILLED';
//请求数据
export const DEAL_LOAD = 'DEAL_LOAD';
//请求数据成功
export const DEAL_LOAD_SUCCESS = 'DEAL_LOAD_SUCCESS';
//保存请求参数
export const SAVE_DEAL_SEARCH = 'SAVE_DEAL_SEARCH';
//页数或条数改变
export const DEAL_CHANGE_ROWS = 'DEAL_CHANGE_ROWS';
//加载交易流水详情
export const LOAD_DEAL_DETAIL = 'LOAD_DEAL_DETAIL';
//加载交易流水详情成功
export const LOAD_DEAL_DETAIL_SUCCESS = 'LOAD_DEAL_DETAIL_SUCCESS';


/********************交易流水.end**********************/




/********************结算流水.start**********************/
//加载数据中ing
export const SETTLEMENT_PENGDING = 'SETTLEMENT_PENGDING';
//加载数据完成
export const SETTLEMENT_FULLFILLED = 'SETTLEMENT_FULLFILLED';
//请求数据
export const SETTLEMENT_LOAD = 'SETTLEMENT_LOAD';
//请求数据成功
export const SETTLEMENT_LOAD_SUCCESS = 'SETTLEMENT_LOAD_SUCCESS';
//保存请求参数
export const SAVE_SETTLEMENT_SEARCH = 'SAVE_SETTLEMENT_SEARCH';
//页数或条数改变
export const SETTLEMENT_CHANGE_ROWS = 'SETTLEMENT_CHANGE_ROWS';

/********************结算流水.end**********************/

/*********************账户明细.start**********************/
export const ACCOUNT_LOAD         = 'ACCOUNT_LOAD';
export const ACCOUNT_FULFILLED    = 'ACCOUNT_FULFILLED';
export const ACCOUNT_LOADED       = 'ACCOUNT_LOADED';
export const ACCOUNT_ROWS_CHANGE  = 'ACCOUNT_ROWS_CHANGE';
export const ACCOUNT_QUERY_CHANGE = 'ACCOUNT_QUERY_CHANGE';
/*********************账户明细.end************************/



/*********************终端管理.start************************/
//请求数据
export const TERMINAL_LOAD = 'TERMINAL_LOAD';
//请求成功
export const TERMINAL_LOAD_SUCCESS = 'TERMINAL_LOAD_SUCCESS';
//请求结束
export const TERMINAL_LOADED = 'TERMINAL_LOADED';
//页数或行数改变时
export const TERMINAL_ROWS_CHANGE = 'TERMINAL_ROWS_CHANGE';
//保存查询条件
export const SAVE_TERMINAL_SEARCH = 'TERMINAL_ROWS_CHANGE';

//请求详情数据
export const TERMINAL_DETAIL_LOAD = 'TERMINAL_DETAIL_LOAD';
//请求详情数据成功
export const TERMINAL_DETAIL_SUCCESS = 'TERMINAL_DETAIL_SUCCESS';

/*********************终端管理.end************************/



/*********************POS交易查询.end************************/
//请求数据
export const POS_LOAD = 'POS_LOAD';
//请求成功
export const POS_LOAD_SUCCESS = 'POS_LOAD_SUCCESS';
//请求结束
export const POS_LOADED = 'POS_LOADED';
//页数或行数改变时
export const POS_ROWS_CHANGE = 'POS_ROWS_CHANGE';
//保存搜索条件
export const SAVE_POS_SEARCH = 'SAVE_POS_SEARCH';

//请求详情数据
export const POS_DETAIL_LOAD = 'POS_DETAIL_LOAD';
//请求详情数据成功
export const POS_DETAIL_SUCCESS = 'POS_DETAIL_SUCCESS';

/*********************POS交易查询.end************************/



/*********************点击重置时清空store的search************************/
//统计查询
export const RESET_SUM_SEARCH = 'RESET_SUM_SEARCH';
//商户管理
export const RESET_MER_SEARCH = 'RESET_MER_SEARCH';
//终端查询
export const RESET_TERMINAL_SEARCH = 'RESET_TERMINAL_SEARCH';
//交易查询
export const RESET_DEAL_SEARCH = 'RESET_DEAL_SEARCH';
//POS交易查询
export const RESET_POS_SEARCH = 'RESET_POS_SEARCH';
//账户明细
export const RESET_ACCOUNT_SEARCH = 'RESET_ACCOUNT_SEARCH';
//结算流水
export const RESET_SETTLEMENT_SEARCH = 'RESET_SETTLEMENT_SEARCH';

/*********************POS交易查询.end************************/

