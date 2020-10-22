import React, { useEffect, useRef } from 'react'
import echarts from 'echarts'
import 'echarts/theme/eduardo'

const Bar = () => {

  const bar = useRef(null)

  const options = {
    title: {
      text: '世界人口总量',
      subtext: '数据来自网络'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['2011年', '2012年']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
    },
    series: [
      {
        name: '2011年',
        type: 'bar',
        data: [18203, 23489, 29034, 104970, 131744, 630230]
      },
      {
        name: '2012年',
        type: 'bar',
        data: [19325, 23438, 31000, 121594, 134141, 681807]
      }
    ]
  }

  useEffect(() => {
    echarts.init(bar.current, 'eduardo').setOption(options)
  }, [options])

  return (
    <div ref={bar} style={{ height: '80vh', width: '100%' }}></div>
  )
}

export default Bar