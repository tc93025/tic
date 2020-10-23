import { get, post } from './request'

// 测试用天气接口
export function getWeatherOfYueyang() {
  return get({ url: '/stats/bestSellersGoodsList' })
}

// 商品数据接口
export async function getTableData() {
  return await post({ url: '/stats/queryBestSellerGoodsList', data: { growthSellNum: 1 }})
}

