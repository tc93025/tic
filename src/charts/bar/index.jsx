import React, { useEffect, useRef } from 'react'
import echarts from 'echarts'
import 'echarts/theme/eduardo'
import { return50Brand } from '../../common/mock'
import { colorList } from '../../common/const'

const Bar = (props) => {
  const data = props.data
  console.log('bar', data)
  const bar = useRef(null)

  useEffect(() => {
    if (data.length > 0) {
      echarts.getInstanceByDom(bar.current).setOption({
        yAxis: {
          type: 'category',
          min: 1,
          nameTextStyle: {
            fontSize: 5
          },
          data: data.map(i => i.brandId)
        },
        series: [
          {
            name: '销量',
            type: 'bar',
            data: data.map(i => i.growthSellNum),
            itemStyle: {
              normal: {
                color: function (params) {
                  return colorList[params.dataIndex]
                }
              }
            }
          },
        ]
      })
    }
  }, [data])

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
      min: 1,
      nameTextStyle: {
        fontSize: 5
      },
      data: return50Brand().map(i => i.goodsName)
    },
    visualMap: {
      min: 0,
      max: 50,
      left: 'left',
      text: ['高', '低'],           // 文本，默认为数值文本
      calculable: true,
      type: 'continuous',
      inRange: {
        color: ['#FFFFFF', '#3f51b5']
      }
    },

    animation: true,
    animationEasing: "cubicOut",
    series: [
      {
        name: '销量',
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