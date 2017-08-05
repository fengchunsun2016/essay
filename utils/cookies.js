/**
 * @file channel/utils/cookies.js
 * @author Mantak <mantak.cn@gmail.com>
 * Date: 2017-08-02
 * Last Modified Date: 2017-08-03
 * Last Modified By: Mantak <mantak.cn@gmail.com>
 */

import jsHttpCookie from 'cookie';
import jsCookie from 'js-cookie';
import config from '../config/config.json';

const cookies = {};

export function getToken() {
  return cookies.token;
}

export function setTokenCookie(value) {
  jsCookie.set(config.tokenCookieName, value);
}
export function removeTokenCookie() {
  jsCookie.remove(config.tokenCookieName);
}
export function getTokenCookieAtClient() {
  const value = jsCookie.get(config.tokenCookieName);
  cookies.token = value;
  return !!value;
}
export function getTokenCookieAtServer(cookiesFromServer) {
  if (typeof cookiesFromServer !== 'string') return;
  const cookiesJSON = jsHttpCookie.parse(cookiesFromServer);
  const value = cookiesJSON[config.tokenCookieName];
  cookies.token = value;
  return !!value;
}
