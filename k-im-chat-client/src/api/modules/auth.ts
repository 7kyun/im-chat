import http from '/@/api/http'
import { IResponse } from '/@/types/http'

/**
 * @description 获取当前用户信息
 */
export function getInfo() {
  return http.get('auth/info')
}

/**
 * @description 登录
 * @param {String} username
 * @param {String} password
 * @author kyun
 * @date 2021/4/10
 */
export function login(data: { username: String; password: String }) {
  return http.post<IResponse>('auth/login', data)
}

/**
 * @description 注册
 * @param {String} username
 * @param {String} password
 * @param {String} rePassword
 * @author kyun
 * @date 2021/4/10
 */
export function regist(data: { username: String; password: String; rePassword: String }) {
  return http.post<IResponse>('auth/regist', data)
}