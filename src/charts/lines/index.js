import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import echarts from 'echarts'
import { getWeatherOfYueyang } from '../../common/api'

const Lines = () => {

  const lines = useRef(null)

  const options = {
    title: { text: 'Line Chart' },
    tooltip: {},
    toolbox: {
      feature: {
        dataView: {},
        saveAsImage: {
          pixelRatio: 2
        },
        restore: {}
      }
    },
    xAxis: {},
    yAxis: {},
    series: [{
      type: 'line',
      smooth: true,
      data: [[12, 5], [24, 20], [36, 36], [48, 10], [60, 10], [72, 20]]
    }]
  }

  useEffect(() => {
    echarts.init(lines.current, 'dark').setOption(options)
    console.log(data);
  })

  let data = getWeatherOfYueyang()

  return (
    <>
      <div ref={lines} style={{ height: '200px', width: '200px' }}></div>
    </>
  )
}

export default Lines