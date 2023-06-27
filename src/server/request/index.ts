import axios from "axios";
import { AxiosInstance, AxiosRequestConfig } from "axios"
import { BASE_URL, TIME_OUT } from "../config";

class WyRequest {
  instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
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