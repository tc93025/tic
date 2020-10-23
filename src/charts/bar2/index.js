import React, { useEffect, useRef } from 'react'
import echarts from 'echarts'
import 'echarts/theme/eduardo'
import { colorList } from '../../common/const'

const Bar2 = (props) => {
  const data = props.data || [];
  const bar2 = useRef(null)
  console.log('bar2',data);

  useEffect(() => {
    if (data.length > 0) {
      echarts.getInstanceByDom(bar2.current).setOption({
        yAxis: {
          type: 'category',
          data: data.map((i)=>i.goodsName)
        },
        series: [{
          name: '销量',
          type: 'bar',
          data: data.map(i=>i.growthSellNum),
          itemStyle: {
            normal: {
              color: function (params) {
                return colorList[params.dataIndex]
              }
            }
          }
        }]
      })
    }
  }, [data])

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
      name: '销量',
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: []
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
        data: [],
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