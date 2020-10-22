import React, { useEffect, useRef } from 'react'
import echarts from 'echarts'
import 'echarts/theme/eduardo'
import { colorList } from '../../common/const'

const datas = []
for (let i = 1; i <= 50; i++) {
  datas.push(`${i}`)
}

const Bar2 = () => {

  const bar2 = useRef(null)

  const options = {
    title: {
      text: '商品销量排行',
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
      name:'销量',
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: datas
    },
    animation: true,
    animationEasing: "cubicOut",
    series: [
      {
        name: '2011年',
        type: 'bar',
        data: datas,
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
    echarts.init(bar2.current, 'eduardo').setOption(options)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={bar2} style={{ height: '80vh', width: '100%' }}></div>
  )
}

export default Bar2