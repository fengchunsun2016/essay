/**
 * Created by lihejia on 2017/7/19.
 * 字符处理集合
 */
const StringUtil = {
  /**//**
   * 检查输入的字符是否具有特殊字符
   * 输入:str  字符串
   * 返回:true 或 flase; true表示包含特殊字符
   * 主要用于注册信息的时候验证
   */
  checkQuote(str){
    var items = new Array('~', '`', '!', '@', '#', '$', '%', '^', '&', '*', '{', '}', '[', ']', '(', ')');
    items.push(':', ';', '|', '\\\\', '<', '>', '?', '/', '<<', '>>', '||', '//');
    //items.push('admin', 'administrators', 'administrator', '管理员', '系统管理员');
    //items.push('select', 'delete', 'update', 'insert', 'create', 'drop', 'alter', 'trancate');
    str = str.toLowerCase();
    for (var i = 0; i < items.length; i++) {
      if (str.indexOf(items[i]) >= 0) {
        return true;
      }
    }
    return false;
  },
  /***校验是否是字符串*/
  checkStr(str){
    if (/[^\\x00-\\xff]/g.test(str)) {
      return false;
    }
    else {
      return true;
    }
  },
  /***校验email*/
  checkEmail(str){
    if (str.match(/[A-Za-z0-9_-]+[@](\\S*)(net|com|cn|org|cc|tv|[0-9]{1,3})(\\S*)/g) == null) {
      return false;
    }
    else {
      return true;
    }
  },
  /***
   * 校验手机号
   * @param str
   * @returns {boolean}
   */
  checkMobilePhone(str){
    var a = /^((\\(\\d{3}\\))|(\\d{3}\\-))?13\\d{9}|14[57]\\d{8}|15\\d{9}|18\\d{9}$/;
    if (str.length != 11 || !str.match(a)) {
      return false;
    }
    else {
      return true;
    }
  },
  /***
   * 校验http url
   * @param str
   * @returns {boolean}
   */
  checkURL(){
    /*if (str.match(/(http[s]?|ftp):\\/\\/[^\\/\\.]+?\\..+\\w$/i) == null) {
     return false
     }
     else {
     return true;
     }*/
    //TODO 暂未实现
    return false;
  },
  /**//**
   * 检查输入的一串字符是否包含汉字
   * 输入:str  字符串
   * 返回:true 或 flase; true表示包含汉字
   */
  IsChinese(str)
  {
    var reg = /^[\\u0391-\\uFFE5]+$/;
    return reg.test(str);
  },
  /**
   * 检查输入的IP地址是否正确
   * 输入:str  字符串
   *  返回:true 或 flase; true表示格式正确
   */
  checkIP(str){
    var arg = /^(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])$/;
    if (str.match(arg) == null) {
      return false;
    }
    else {
      return true;
    }
  }
}


export default  StringUtil;
