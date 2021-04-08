import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import cookie from 'js-cookie'
import store from '/@/store/index'
import { message } from 'ant-design-vue';
import { IResponse } from '/@/types/http';

const BASE_URL: string = 'api'

const http = axios.create({
  baseURL: BASE_URL,
  timeout: 10000
})

http.interceptors.request.use(
  (req: AxiosRequestConfig) => {
    const token: string | undefined = cookie.get('token') || store.state.token
    req.headers.Authorization = token || ''

    return req
  },
  (err: AxiosError) => {
    return Promise.reject(err)
  }
)

http.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.data.code == 200) {
      return Promise.resolve(res.data)
    }
    
    message.error(res.data.msg)
    return Promise.reject(res.data)
  },
  (err: AxiosError) => {
    if (err.response) {
      if (err.response.status === 401) {
        // 清除token信息并重定向到登录页
        cookie.remove('token')
        // router.replace({ path: 'login' }).then()
      }
    }
    message.error('网络错误')
  }
)

export default http