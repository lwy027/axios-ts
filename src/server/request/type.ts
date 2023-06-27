import { AxiosRequestConfig, AxiosResponse } from "axios"


interface interceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: any) => any,
  requestFailureFn?: (err: any) => any,
  resposeSuccessFn?: (res: T) => T,
  resposeFailureFn?: (err: any) => any,
}

export interface WyAxiosRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: interceptors<T>
}
