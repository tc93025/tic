import React, { useEffect, useRef } from 'react'
import echarts from 'echarts'
import 'echarts/theme/eduardo'
import { return50Brand } from '../../common/mock'
import { colorList } from '../../common/const'

const Bar = () => {

  const bar = useRef(null)

  const options = {
    title: {
      text: '品牌销量排行',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      name: '销量',
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: return50Brand().map(i => i.goodsName)
    },
    animation: true,
    animationEasing: "cubicOut",
    series: [
      {
        name: '2011年',
        type: 'bar',
        data: return50Brand().map(i => i.id),
        itemStyle: {
          normal: {
            color: function (params) {
              return colorList[params.dataIndex]
            }
          }
        }
      },
    ]
  }

  useEffect(() => {
    echarts.init(bar.current, 'eduardo').setOption(options)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={bar} style={{ height: '80vh', width: '100%' }}></div>
  )
}

export default Bar