
import WYrequest from "../request";


interface IhomeData {
  data: any
}

WYrequest.request<IhomeData>({
  url: "/city/all"
}).then(res => {
  console.log(res)
})