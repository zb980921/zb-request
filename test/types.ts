export interface Args {}

export interface Headers {
  Accept: string
  'Accept-Encoding': string
  'Accept-Language': string
  Host: string
  Referer: string
  'User-Agent': string
  'X-Amzn-Trace-Id': string
  'Content-Type': string
}

export interface RootObject {
  args: Args
  headers: Headers
  origin: string
  url: string
}
