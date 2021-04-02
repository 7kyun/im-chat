import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import cookie from 'js-cookie'
import store from '../store/index'

const BASE_URL: string = 'http://localhost:3001'

interface IResponse {
  code: number;
  msg: string;
  data?: any;
}

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
    const response: IResponse = res.data
    if (response.code !== 200) {
      // console.warn(response.msg)
      return Promise.reject(response.msg)
    }

    return res.data
  },
  (err: AxiosError) => {
    if (err.response) {
      if (err.response.status === 401) {
        // 清除token信息并重定向到登录页
        cookie.remove('token')
        // router.replace({ path: 'login' }).then()
      }
    }
  }
)

export default http