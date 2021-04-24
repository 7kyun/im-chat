import http from '/@/api/http'
import { IResponse } from '/@/types/http'

export interface SearchParams {
  page: number;
  size: number;
  keyword: string;
}

export interface SearchUser {
  id: number;
  username: string;
  avatar: string;
}

export interface UserListRet {
  total: number;
  list: SearchUser[];
}

/**
 * @description 获取用户列表
 */
 export function getUserList(params: SearchParams) {
  return http.get<IResponse<UserListRet>>('user/list', { params })
}