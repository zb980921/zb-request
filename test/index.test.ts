import { describe, expect, it } from 'vitest'
import ZBRequest from '../src'
import type { RootObject } from './types'

const request = new ZBRequest({
  baseURL: 'http://httpbin.org',
  timeout: 10000,
})

describe('should', () => {
  it('get', async() => {
    const res = await request.get<RootObject>({
      url: '/get',
      headers: {
        'Content-Type': '123',
      },
      interceptors: {
        requestInterceptor: (config) => {
          return config
        },
      },
    })
    expect(res.url).toEqual('http://httpbin.org/get')
    expect(res.headers['Content-Type']).toEqual('123')
  })
})
