import type { AxiosRequestConfig } from 'axios'

export interface ZBRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any

  responseInterceptor?: <T>(res: T) => T
  responseInterceptorCatch?: (err: any) => any
}

export interface ZBRequestConfig extends AxiosRequestConfig {
  interceptors?: ZBRequestInterceptors
}
