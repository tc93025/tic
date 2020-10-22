import React, { useEffect, useRef } from 'react'
import echarts from 'echarts'
import 'echarts/theme/eduardo'
import 'echarts/extension/bmap/bmap'
import { geoCoordMap } from '../../common/const'
import { mapMockData } from '../../common/mock'
import bmapStyle from '../../common/custom_map_config.json'

console.log(bmapStyle);

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

const Map = () => {

  const map = useRef(null)

  const options = {
    title: {
      text: '全国主要城市Top50商品区域分布',
      left: 'left'
    },
    tooltip: {
      trigger: 'item'
    },
    bmap: {
      center: [104.114129, 37.550339],
      zoom: 6,
      roam: 'move',
      mapStyle: {
        styleJson: [{
          "featureType": "water",
          "elementType": "geometry",
          "stylers": {
            "visibility": "on"
          }
        }, {
          "featureType": "water",
          "elementType": "labels",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "green",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "building",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "manmade",
          "elementType": "labels",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "manmade",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "subwaystation",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "education",
          "elementType": "labels",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "education",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "medical",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "medical",
          "elementType": "labels",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "scenicspots",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "scenicspots",
          "elementType": "labels",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "entertainment",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "estate",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "shopping",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "transportation",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "transportation",
          "elementType": "labels",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "playground",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "parkinglot",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "road",
          "elementType": "labels",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "poilabel",
          "elementType": "labels",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "poilabel",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "background",
          "elementType": "geometry",
          "stylers": {
            "visibility": "on",
            "color": "#000000ff"
          }
        }, {
          "featureType": "districtlabel",
          "elementType": "labels",
          "stylers": {
            "visibility": "on"
          }
        }, {
          "featureType": "districtlabel",
          "elementType": "labels.icon",
          "stylers": {
            "visibility": "off"
          }
        }, {
          "featureType": "land",
          "elementType": "geometry",
          "stylers": {
            "visibility": "on"
          }
        }]
      }
    },
    series: [
      {
        name: 'Top50商品区域分布',
        type: 'scatter',
        coordinateSystem: 'bmap',
        data: convertData(mapMockData),
        symbolSize: function (val) {
          return val[2] / 10;
        },
        encode: {
          value: 2
        },
        label: {
          formatter: '{b}',
          position: 'right',
          show: false
        },
        itemStyle: {
          color: 'purple'
        },
        emphasis: {
          label: {
            show: true
          }
        }
      },
    ]
  };

  useEffect(() => {
    echarts.init(map.current, 'eduardo').setOption(options)
  }, [options])

  return (
    <div ref={map} style={{ height: '80vh', width: '100%' }}></div>
  )
}

export default Map