import React, { Component } from 'react';
import BMap from 'BMap'
import styles from './index.less';
import RightPanel from './Panel';

class Map extends Component {

  componentDidMount(){
    //创建地图
    let map = new BMap.Map('container');
    let point = new BMap.Point(106.490327,29.645848);
    /*let styleJson=[
      {
        'featureType': 'building',
        'elementType': 'geometry',
        'stylers': {
          'visibility': 'on',
          // 'color':'#000'
        }
      }
    ]*/

    map.centerAndZoom(point, 18);
    map.enableScrollWheelZoom(true);

    //左上工具栏
    let opts1 = {type: BMAP_NAVIGATION_CONTROL_SMALL}
    map.addControl(new BMap.NavigationControl(opts1));
    //开启滚轮缩放
    map.addControl(new BMap.ScaleControl());
    // map.addControl(new BMap.OverviewMapControl());
    // map.addControl(new BMap.MapTypeControl());
    map.setCurrentCity('康庄');
    // map.setMapStyleV2({styleJson:styleJson});

    function showInfo(x,y,info){
      let opts = {
        width : 200,     // 信息窗口宽度
        height: 50,     // 信息窗口高度
        title : '康庄c区'  // 信息窗口标题
      }
      let infoWindow = new BMap.InfoWindow(`${info}, 暂无信息`, opts);  // 创建信息窗口对象
      map.openInfoWindow(infoWindow, new BMap.Point(x,y));
    }
    function addMark(x, y, info){
      let point1 = new BMap.Point(x, y);
      let marker = new BMap.Marker(point1);        // 创建标注
      marker.addEventListener('click', function(e){
        showInfo(x,y,info)
      });
      map.addOverlay(marker);
    }

    addMark(106.489954,29.644639, '一栋');
    addMark(106.48937,29.644741, '二栋');
    addMark(106.488894,29.645, '三栋');
    addMark(106.488512,29.645373, '四栋');
    addMark(106.488243,29.645918, '五栋');
    addMark(106.488499,29.646338, '六栋');
    addMark(106.489258,29.647025, '八栋');

    var polyline = new BMap.Polyline([
        new BMap.Point(106.490493,29.64367),
        new BMap.Point(106.486334,29.643803),
        new BMap.Point(106.487668,29.6485),
        new BMap.Point(106.489599,29.647888),
        new BMap.Point(106.490057,29.647613),
        new BMap.Point(106.490434,29.647197),
        new BMap.Point(106.490704,29.646766),
        new BMap.Point(106.490848,29.646342),
        new BMap.Point(106.490493,29.64367),
      ],
      {strokeColor:"blue", strokeWeight:6, strokeOpacity:0.5}
    );
    map.addOverlay(polyline);

  }
  render() {
    return (


      <div style={{overflow:'hidden', height:'692px'}}>
        <RightPanel />
        <div style={{width:1450, height:692, display:'block'}}
            id="container"
        > </div>
      </div>
    );
  }
}

export default Map;
