import React, { useEffect, useRef } from 'react'
import echarts from 'echarts'
import 'echarts/theme/eduardo'
import 'echarts/extension/bmap/bmap'
import { geoCoordMap } from '../../common/const'
import { mapMockData } from '../../common/mock'
import { city2Map } from '../../common/const'

const convertData = (data) => {
  let res = [];
  for (let i = 0; i < data.length; i++) {
    let geoCoord = geoCoordMap[data[i].name];
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      });
    }
  }
  return res;
};

const Map = (props) => {
  const data = props.data.map(i => { return { name: city2Map[i.cityId], value: i.growthSellNum } })
  console.log('map', data)

  const map = useRef(null)

  useEffect(() => {
    if (data.length > 0) {
      echarts.getInstanceByDom(map.current).setOption({
        series: [
          {
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: convertData(data),
            symbolSize: function (val) {
              return val[2];
            },
            encode: {
              value: 2
            },
            label: {
              normal: {
                formatter: (item) => {
                  return `${item.data.name},销量：${item.data.value[2]}`
                },
                position: 'top',
                show: true,
                backgroundColor: '#FFA500',
                fontWeight: 600,
                padding: [0, 10],
                borderRadius: 3,
                lineHeight: 32,
                color: '#f7fafb',
                rich: {
                  fline: {
                    padding: [0, 10, 10, 10],
                    color: '#ffffff'
                  },
                  tline: {
                    padding: [10, 10, 0, 10],
                    color: '#ffffff'
                  }
                }
              }
            },
            itemStyle: {
              color: '#3f51b5'
            },
            emphasis: {
              label: {
                show: true
              }
            }
          }]
      })
    }
  }, [data])

  const options = {
    title: {
      text: '全国主要城市商品区域分布',
      left: 'left'
    },
    tooltip: {
      show: false
    },
    animation: true,
    animationEasing: "cubicOut",
    bmap: {
      center: [105.114129, 33.550339],
      zoom: 6,
      roam: false,
    },
    series: [
      {
        type: 'scatter',
        coordinateSystem: 'bmap',
        data: convertData(mapMockData),
        symbolSize: function (val) {
          return val[2];
        },
        encode: {
          value: 2
        },
        label: {
          normal: {
            formatter: (item) => {
              return `${item.data.name},销量：${item.data.value[2]}`
            },
            position: 'top',
            show: true,
            backgroundColor: '#FFA500',
            fontWeight: 600,
            padding: [0, 10],
            borderRadius: 3,
            lineHeight: 32,
            color: '#f7fafb',
            rich: {
              fline: {
                padding: [0, 10, 10, 10],
                color: '#ffffff'
              },
              tline: {
                padding: [10, 10, 0, 10],
                color: '#ffffff'
              }
            }
          }
        },
        itemStyle: {
          color: '#3f51b5'
        },
        emphasis: {
          label: {
            show: true
          }
        }
      },
      // {
      //   type: 'scatter',
      //   coordinateSystem: 'bmap',
      //   data: convertData(mapMockData).splice(30, 3),
      //   symbolSize: function (val) {
      //     return val[2];
      //   },
      //   encode: {
      //     value: 2
      //   },
      //   label: {
      //     normal: {
      //       formatter: (item) => {
      //         return `${item.data.name},销量：${item.data.value[2]}`
      //       },
      //       position: 'top',
      //       show: true,
      //       backgroundColor: 'rgba(233,63,66,.9)',
      //       fontWeight: 600,
      //       padding: [0, 10],
      //       borderRadius: 3,
      //       lineHeight: 32,
      //       color: '#f7fafb',
      //       rich: {
      //         fline: {
      //           padding: [0, 10, 10, 10],
      //           color: '#ffffff'
      //         },
      //         tline: {
      //           padding: [10, 10, 0, 10],
      //           color: '#ffffff'
      //         }
      //       }
      //     }
      //   },
      //   itemStyle: {
      //     color: 'rgba(233,63,66,.9)'
      //   },
      //   emphasis: {
      //     label: {
      //       show: true
      //     }
      //   }
      // },
      // {
      //   type: 'scatter',
      //   coordinateSystem: 'bmap',
      //   data: convertData(mapMockData).splice(3, 3),
      //   symbolSize: function (val) {
      //     return val[2];
      //   },
      //   encode: {
      //     value: 2
      //   },
      //   label: {
      //     normal: {
      //       formatter: (item) => {
      //         return `${item.data.name},销量：${item.data.value[2]}`
      //       },
      //       position: 'top',
      //       show: true,
      //       backgroundColor: 'rgba(254,174,33,1)',
      //       fontWeight: 600,
      //       padding: [0, 10],
      //       borderRadius: 3,
      //       lineHeight: 32,
      //       color: '#f7fafb',
      //       rich: {
      //         fline: {
      //           padding: [0, 10, 10, 10],
      //           color: '#ffffff'
      //         },
      //         tline: {
      //           padding: [10, 10, 0, 10],
      //           color: '#ffffff'
      //         }
      //       }
      //     }
      //   },
      //   itemStyle: {
      //     color: 'rgba(254,174,33,1)'
      //   },
      //   emphasis: {
      //     label: {
      //       show: true
      //     }
      //   }
      // },
    ]
  };

  useEffect(() => {
    echarts.init(map.current, 'eduardo').setOption(options)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={map} style={{ height: '80vh', width: '100%' }}></div>
  )
}

export default Map