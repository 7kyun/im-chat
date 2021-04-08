import http from '/@/api/http'
import { IResponse } from '/@/types/http'

/**
 * @description 通过用户名查找
 * @param {String} username
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

/**
 * @description 登录
 * @param {String} username
 * @param {String} password
 */
export function login(data: { username: String; password: String }) {
  return http.post<IResponse>('user/login', data)
}

/**
 * @description 注册
 * @param {String} username
 * @param {String} password
 * @param {String} rePassword
 */
export function regist(data: { username: String; password: String; rePassword: String }) {
  return http.post<IResponse>('user/regist', data)
}