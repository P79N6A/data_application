import React, { Component } from 'react';
import BMap from 'BMap'
import styles from './index.less';
import RightPanel from './Panel';
import house from '@/assets/house.jpg';

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
        height: 150,     // 信息窗口高度
        title : '康庄c区'  // 信息窗口标题
      };
      let sContent = `
<div style="color:blue; position:absolute">
    <p style="color:blue">${info}:  25层</p>
    <p style="color:blue">住户:  895户</p>
    <p style="color:blue">人口:  2855人</p>
    <p style="color:blue">本周治安事件:  3起</p>
</div>

<img style='float:right;margin:4px' class='imgDemo' src=${house} width='100' height='100' title='天安门'/>
`

      return  new BMap.InfoWindow(sContent, opts);  // 创建信息窗口对象
      // map.openInfoWindow(infoWindow, new BMap.Point(x,y));
    }
    function addMark(x, y, info){
      let point1 = new BMap.Point(x, y);
      let marker = new BMap.Marker(point1);        // 创建标注
      let infoWindow=showInfo(x,y,info);
      marker.addEventListener('click', function(e){
        map.openInfoWindow(infoWindow, new BMap.Point(x,y));
        let img=Array.from(document.getElementsByClassName('imgDemo'))[0];
        if (img){
          img.onload=function() {
            infoWindow.redraw()
          }
        }

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

    let polyLine = new BMap.Polyline([
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
    map.addOverlay(polyLine);



        /*.onload = function (){
        ;   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
      }*/

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
