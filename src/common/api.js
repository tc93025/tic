import { get, post } from './request'

// 测试用天气接口
export function getWeatherOfYueyang(){
  return get({url:'http://www.tianqiapi.com/api',data:{
    appid:'76157113',
    appsecret:'scvjgen1'
  }})
}