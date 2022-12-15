import Cookies from "js-cookie";

// 获取token
export function getCookie(key:string) {
  return Cookies.get(key);
}

// 设置token
export function setCookie(key:string, value:string, expire:number = 7) {
  return Cookies.set(key, value);
}

// 删除token
export function removeCookie(key:string) {
  return Cookies.remove(key);
}

// 设置过期时间
export function setCookieExpire(key:string, value:string, expire:number = 7) {
  return Cookies.set(key, token, { expires: expire });
}

// 设置 cookie 内所有的过期时间 如果不传入 expire 则默认为 1年
export function setAllCookieExpire(expire:number = 365) {
  const keys = Object.keys(Cookies.get());
  keys.forEach((key: string) => {
    Cookies.set(key, Cookies.get(key), { expires: expire });
  });
}

// 判断是否登录
export function isLogin() {
  return Cookies.get("TOKEN") ? true : false;
}

// 清除所有 cookie
export function clearAllCookie() {
  const keys = Object.keys(Cookies.get());
  keys.forEach((key) => {
    Cookies.remove(key);
  });
}

