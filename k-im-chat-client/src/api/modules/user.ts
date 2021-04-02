import http from '../http'

/**
 * @description 通过用户名查找
 * @param {string} username
 */
export function getUser(username: string) {
  return http.get(`user?username=${username}`)
}

/**
 * @description 获取当前用户信息
 */
export function getInfo() {
  return http.get('user/info')
}