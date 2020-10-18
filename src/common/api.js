import { get, post } from './request'

// 测试用天气接口
export function getWeatherOfYueyang(){
  return get({url:'/stats/bestSellersGoodsList'})
}