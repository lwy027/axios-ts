import axios from "axios";
import { AxiosInstance } from "axios"
import { BASE_URL, TIME_OUT } from "../config";
import { WyAxiosRequestConfig } from "./type";





class WyRequest {
  instance: AxiosInstance

  constructor(config: WyAxiosRequestConfig) {
    this.instance = axios.create(config)
    //全局拦截器
    this.instance.interceptors.request.use(config => {
      console.log("全局的请求拦截器")
      return config
    }, err => {
      return err
    })
    this.instance.interceptors.response.use(res => {
      console.log("全局的响应拦截器")
      return res.data
    }, err => {
      return err
    })

    //针对不同的请求实例的拦截器
    if (config.interceptors) {
      this.instance.interceptors.request.use(
        config.interceptors.requestSuccessFn,
        config.interceptors.requestFailureFn
      )
      this.instance.interceptors.response.use(
        config.interceptors.resposeSuccessFn,
        config.interceptors.resposeFailureFn
      )
    }


  }

  request<T = any>(config: WyAxiosRequestConfig<T>) {

    //针对单个请求设置特有的拦截器
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }

    //单个请求设置响应拦截器，因为我们直接把响应给返回出去了，所以正常时不能回调单个响应拦截器
    //所以在promise中进行操作
    return new Promise<T>((resolve, reject) => {

      this.instance.request<any, T>(config).then(res => {
        if (config.interceptors?.resposeSuccessFn) {
          res = config.interceptors.resposeSuccessFn(res)
        }
        resolve(res)
      }).catch(err => {
        reject(err)
      })


    })
  }


  get<T = any>(config: WyAxiosRequestConfig<T>) {
   return this.request({ ...config, method: "get" })
  }
  post<T = any>(config: WyAxiosRequestConfig<T>) {
   return this.request({ ...config, method: "post" })
  }
  delete<T = any>(config: WyAxiosRequestConfig<T>) {
   return this.request({ ...config, method: "DELETE" })
  }
  patch<T = any>(config: WyAxiosRequestConfig<T>) {
   return this.request({ ...config, method: "PATCH" })
  }

}

const WYrequest = new WyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT

})
export const WYrequest2 = new WyRequest({
  baseURL: "http://codercba.com:1888/airbnb/api",
  timeout: 8000,
  interceptors: {
    requestSuccessFn: (config) => {
      console.log("爱彼迎请求成功的回调")
      return config
    },
    requestFailureFn: (err) => {
      console.log("爱彼迎请求失败的回调")
      return err
    },
    resposeSuccessFn: (res) => {
      console.log("爱彼迎响应成功的回调")
      return res

    },
    resposeFailureFn: (err) => {
      console.log("爱彼迎响应失败的回调")
      return err

    },
  }
})

export default WYrequest