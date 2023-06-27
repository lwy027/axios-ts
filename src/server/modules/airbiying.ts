
import { WYrequest2 } from "../request";

WYrequest2.request({
  url: "/entire/list",
  params: {
    offset: 0,
    size: 20
  }
}).then(res => {
  console.log(res)
})


WYrequest2.request({
  url: "/home/highscore",
  //单个请求添加拦截器
  interceptors: {
    requestSuccessFn(config) {
      console.log("home/highscore的请求拦截器")
      return config
    },
    resposeSuccessFn(res) {
      console.log("home/highscore的响应拦截器")
      return res
    }
  }
})