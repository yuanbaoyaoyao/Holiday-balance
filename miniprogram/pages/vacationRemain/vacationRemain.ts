// pages/vacationRemain/vacationRemain.ts
// ▒：
// Page({

//     /**
//      * 页面的初始数据
//      */
//     data: {
//         remainDays: '',
//         pastDays: '',
//         weekendInfo: {
//             weekendDays: 0,
//             remainWeekendDays: 0,
//         },
//         //国家法定节假日
//         holidays:11
//     },
//     countRemainDays() {
//         let date = new Date()
//         let endTime = new Date(date.getFullYear(), 11, 31, 23, 59, 59)
//         let msPerDay = 24 * 60 * 60 * 1000
//         return Math.round((endTime.getTime() - date.getTime()) / msPerDay)
//     },
//     countPastTime() {
//         let date = new Date()
//         let startTime = new Date(date.getFullYear(), 0, 1, 0, 0, 0)
//         let msPerDay = 24 * 60 * 60 * 1000
//         return Math.round((date.getTime() - startTime) / msPerDay)
//     },
//     countWeekends() {
//         let weekendDays = 0;
//         let date = new Date()
//         for (let i = this.data.pastDays; i < 365; i++) {
//             const currentDay = new Date(date.getFullYear(), 0, i).getDay();
//             if (currentDay === 6 || currentDay === 0) {
//                 this.data.weekendInfo.remainWeekendDays++;
//             }
//         }
//         for (let i = 0; i < 365; i++) {
//             const currentDay = new Date(date.getFullYear(), 0, i).getDay();
//             if (currentDay === 6 || currentDay === 0) {
//                 this.data.weekendInfo.weekendDays++;
//             }
//         }
//         this.setData({ weekendInfo: this.data.weekendInfo })
//     },

//     /**
//      * 生命周期函数--监听页面加载
//      */
//     onLoad() {
//         this.setData({
//             remainDays: this.countRemainDays(),
//             pastDays: this.countPastTime()
//         })
//         console.log("已过时间：", this.data.pastDays)
//         this.countWeekends()
//     },

//     /**
//      * 生命周期函数--监听页面初次渲染完成
//      */
//     onReady() {

//     },

//     /**
//      * 生命周期函数--监听页面显示
//      */
//     onShow() {
//         if (typeof this.getTabBar === 'function' && this.getTabBar()) {
//             this.getTabBar().setData({
//                 selected: 2
//             })
//         }
//     },

//     /**
//      * 生命周期函数--监听页面隐藏
//      */
//     onHide() {

//     },

//     /**
//      * 生命周期函数--监听页面卸载
//      */
//     onUnload() {

//     },

//     /**
//      * 页面相关事件处理函数--监听用户下拉动作
//      */
//     onPullDownRefresh() {

//     },

//     /**
//      * 页面上拉触底事件的处理函数
//      */
//     onReachBottom() {

//     },

//     /**
//      * 用户点击右上角分享
//      */
//     onShareAppMessage() {

//     }
// })

import * as echarts from '../../ec-canvas/echarts';

let chart = null;

function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      },
      confine: true
    },
    legend: {
      data: ['热度', '正面', '负面']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        name: '热度',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: [300, 270, 340, 344, 300, 320, 310],
        itemStyle: {
          // emphasis: {
          //   color: '#37a2da'
          // }
        }
      },
      {
        name: '正面',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true
          }
        },
        data: [120, 102, 141, 174, 190, 250, 220],
        itemStyle: {
          // emphasis: {
          //   color: '#32c5e9'
          // }
        }
      },
      {
        name: '负面',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'left'
          }
        },
        data: [-20, -32, -21, -34, -90, -130, -110],
        itemStyle: {
          // emphasis: {
          //   color: '#67e0e3'
          // }
        }
      }
    ]
  };

  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {
    setTimeout(function () {
      // 获取 chart 实例的方式
      // console.log(chart)
    }, 2000);
  }
});