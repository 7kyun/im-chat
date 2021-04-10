import http from '/@/api/http'
import { IResponse } from '/@/types/http'

export interface Join {
  user: User;
  token: string;
}

/**
 * @description 获取当前用户信息
 */
export function getInfo() {
  return http.get<IResponse<User>>('auth/info')
}

/**
 * @description 登录
 * @param {String} username
 * @param {String} password
 * @author kyun
 * @date 2021/4/10
 */
export function login(data: { username: String; password: String }) {
  return http.post<IResponse<Join>>('auth/login', data)
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
  return http.post<IResponse<Join>>('auth/regist', data)
}