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

    //针对单个请求的拦截器
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

  request(config: WyAxiosRequestConfig) {
    return this.instance.request(config)
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