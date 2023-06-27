import axios from "axios";
import { AxiosInstance, AxiosRequestConfig } from "axios"
import { BASE_URL, TIME_OUT } from "../config";

class WyRequest {
  instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
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
  }

  request(config: AxiosRequestConfig) {
    return this.instance.request(config)
  }

}

const WYrequest = new WyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT

})

export default WYrequest