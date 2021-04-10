import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import cookie from 'js-cookie'
import store from '/@/store/index'
import { message } from 'ant-design-vue';

const BASE_URL: string = 'api'

const http = axios.create({
  baseURL: BASE_URL,
  timeout: 10000
})

http.interceptors.request.use(
  (req: AxiosRequestConfig) => {
    store.commit('app/set_loading', true)
    const token: string | undefined = store.state.app.token || cookie.get('token')
    req.headers.Authorization = token || ''

    return req
  },
  (err: AxiosError) => {
    store.commit('app/set_loading', false)
    return Promise.reject(err)
  }
)

http.interceptors.response.use(
  (res: AxiosResponse) => {
    store.commit('app/set_loading', false)

    if (res.data.code == 200) {
      return Promise.resolve(res.data)
    }
    
    message.error(res.data.msg)
    return Promise.reject(res.data)
  },
  (err: AxiosError) => {
    store.commit('app/set_loading', false)
    if (err.response) {
      if (err.response.status === 401) {
        // 清除token信息并重定向到登录页
        cookie.remove('token')
        store.commit('app/set_token', '')
        // router.replace({ path: 'login' }).then()
      }
    }
    message.error('网络错误')
  }
)

export default http