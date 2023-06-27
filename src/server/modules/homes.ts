
import WYrequest from "../request";


WYrequest.request({
  url: "/city/all"
}).then(res => {
  console.log(res.data)
})