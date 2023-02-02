import type { AxiosInstance } from 'axios'
import axios from 'axios'
import type { ZBRequestConfig, ZBRequestInterceptors } from './types'

class ZBRequest {
  private instance: AxiosInstance
  private interceptorMap?: ZBRequestInterceptors

  constructor(config: ZBRequestConfig) {
    this.instance = axios.create(config)
    this.interceptorMap = config.interceptors

    // Use the interceptor on the instance
    this.instance.interceptors.request.use(
      this.interceptorMap?.requestInterceptor as any,
      this.interceptorMap?.requestInterceptorCatch,
    )
    this.instance.interceptors.response.use(
      this.interceptorMap?.responseInterceptor,
      this.interceptorMap?.responseInterceptorCatch,
    )

    // Use global interceptor
    this.instance.interceptors.response.use(res => res.data)
  }

  request<T>(config: ZBRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        // Use the interceptor on the request
        config = config.interceptors.requestInterceptor(config)
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor<T>(res)
          }
          resolve(res)
        })
        .catch(err => reject(err))
    })
  }

  get<T>(config: ZBRequestConfig) {
    return this.request<T>({ ...config, method: 'get' })
  }

  post<T>(config: ZBRequestConfig) {
    return this.request<T>({ ...config, method: 'post' })
  }

  put<T>(config: ZBRequestConfig) {
    return this.request<T>({ ...config, method: 'put' })
  }

  delete<T>(config: ZBRequestConfig) {
    return this.request<T>({ ...config, method: 'delete' })
  }
}

export default ZBRequest
