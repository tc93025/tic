import React, { useEffect, useRef } from 'react'
import echarts from 'echarts'
import 'echarts/theme/eduardo'
import { return50Brand } from '../../common/mock'
import { colorList } from '../../common/const'

const Scatter = () => {

  const scatter = useRef(null)

  const options = {
    title: {
      text: '散点图'
    },
    xAxis: {
      name: '销量'
    },
    yAxis: {
      name: '折扣率'
    },
    tooltip: {
      formatter: (item) => {
        return `商品：${item.data[2]}<br>销量：${item.data[0]},<br/>折扣率：${item.data[1]}`
      }
    },
    animation: true,
    animationEasing: "cubicOut",
    series: [{
      symbolSize: 10,
      data: return50Brand().map((i, index) => [i.sellNum, index, i.goodsName]),
      type: 'scatter',
      itemStyle: {
        normal: {
          color: function (params) {
            return colorList[params.dataIndex]
          }
        }
      }
    }]
  }

  useEffect(() => {
    echarts.init(scatter.current, 'eduardo').setOption(options)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={scatter} style={{ height: '80vh', width: '100%' }}></div>
  )
}

export default Scatter