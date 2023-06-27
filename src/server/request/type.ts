import { AxiosRequestConfig, AxiosResponse } from "axios"


interface interceptors {
  requestSuccessFn: (config: any) => any,
  requestFailureFn: (err: any) => any,
  resposeSuccessFn: (res: AxiosResponse) => AxiosResponse,
  resposeFailureFn: (err: any) => any,
}

export interface WyAxiosRequestConfig extends AxiosRequestConfig {
  interceptors?: interceptors
}
