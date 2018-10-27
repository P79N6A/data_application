import React, { Component } from 'react';
import BMap from 'BMap'

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

    map.centerAndZoom(point, 20);
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

    function addMark(x, y){
      let point1 = new BMap.Point(x, y);
      let marker = new BMap.Marker(point1);        // 创建标注
      map.addOverlay(marker);
    }
    addMark(106.489954,29.644639);
    addMark(106.48937,29.644741)
    addMark(106.488894,29.645)

    let opts = {
      width : 200,     // 信息窗口宽度
      height: 50,     // 信息窗口高度
      title : '1栋'  // 信息窗口标题
    }
    let infoWindow = new BMap.InfoWindow('暂无信息', opts);  // 创建信息窗口对象
    map.openInfoWindow(infoWindow, new BMap.Point(106.489954, 29.644639));




    function addMarker(point, index){  // 创建图标对象
      var myIcon = new BMap.Icon('markers.png', new BMap.Size(23, 25), {
        // 指定定位位置。
        // 当标注显示在地图上时，其所指向的地理位置距离图标左上
        // 角各偏移10像素和25像素。您可以看到在本例中该位置即是
        // 图标中央下端的尖角位置。
        anchor: new BMap.Size(10, 25),
        // 设置图片偏移。
        // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您
        // 需要指定大图的偏移位置，此做法与css sprites技术类似。
        imageOffset: new BMap.Size(0, 0 - index * 25)   // 设置图片偏移
      });
      // 创建标注对象并添加到地图
      var marker = new BMap.Marker(point, {icon: myIcon});
      map.addOverlay(marker);
    }

    var bounds = map.getBounds();
    var lngSpan = bounds.maxX - bounds.minX;
    var latSpan = bounds.maxY - bounds.minY;
    for (let i = 0; i < 10; i ++) {
      let point = new BMap.Point(bounds.minX + lngSpan * (Math.random() * 0.7 + 0.15),
        bounds.minY + latSpan * (Math.random() * 0.7 + 0.15));
      addMarker(point, i);
    }

  }
  render() {
    return (


      <div style={{overflow:'hidden', height:'692px'}}>
        <div style={{width:1450, height:692, display:'block'}}
            id="container"
        > </div>
      </div>
    );
  }
}

export default Map;
