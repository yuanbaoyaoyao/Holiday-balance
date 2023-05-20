// pages/vacationRemain/vacationRemain.ts
import * as echarts from '../../components/ec-canvas/echarts';

//TODO 做下钻动画
let chart = null;

function initChart(canvas, width, height, dpr) {
    chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
    });
    canvas.setChart(chart);

    var option = {
        title: {
            text: '剩余时间',
            left: "center"
        },
        dataGroupId: '',
        animationDurationUpdate: 500,
        universalTransition: {
            enabled: true,
            divideShape: 'clone'
        },
        polar: {
            radius: [100, '80%']
        },
        angleAxis: {
            max: 365,
            startAngle: 75
        },
        radiusAxis: {
            type: 'category',
            data: ['剩余日期', '剩余假日', 'c', 'd'],
        },
        tooltip: {},
        series: {
            type: 'bar',
            data: [
                {
                    value: 5,
                    groupId: 'animals'
                },
                {
                    value: 2,
                    groupId: 'fruits'
                },
                {
                    value: 4,
                    groupId: 'cars'
                },
                {
                    value: 4,
                    groupId: 'cars'
                }
            ],
            coordinateSystem: 'polar',
            label: {
                show: true,
                position: 'middle',
                formatter: '{c}'
            }
        },
        graphic: [
            {
                type: 'text',
                left: 50,
                top: 20,
                style: {
                    text: '',
                    fontSize: 18
                },
                onclick: function () { }
            }
        ]
    };
    const drilldownData = [
        {
            dataGroupId: 'animals',
            data: [
                ['Cats', 4],
                ['Dogs', 2],
                ['Cows', 1],
                ['Sheep', 2],
                ['Pigs', 1]
            ]
        },
        {
            dataGroupId: 'fruits',
            data: [
                ['Apples', 4],
                ['Oranges', 2]
            ]
        },
        {
            dataGroupId: 'cars',
            data: [
                ['Toyota', 4],
                ['Opel', 2],
                ['Volkswagen', 2]
            ]
        }
    ];
    chart.on('click', function (event) {
        console.log("event:", event)
        console.log("event.data:", event.data)
        if (event.data) {
            //找到subData
            var subData = drilldownData.find(function (data) {
                return data.dataGroupId === event.data.groupId;
            });
            if (!subData) {
                return;
            }
            chart.setOption({
                series: {
                    type: 'bar',
                    dataGroupId: subData.dataGroupId,
                    data: subData.data.map(function (item) {
                        return item[1];
                    }),
                    universalTransition: {
                        enabled: true,
                        divideShape: 'clone'
                    }
                },
                graphic: [
                    {
                        type: 'text',
                        left: 50,
                        top: 20,
                        style: {
                            text: '返回',
                            fontSize: 18
                        },
                        onclick: function () {
                            chart.setOption(option);
                        }
                    }
                ]
            });
        }
    });

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
        remainDays: '',
        pastDays: '',
        weekendInfo: {
            weekendDays: 0,
            remainWeekendDays: 0,
        },
        //国家法定节假日
        holidays: 11,
        ec: {
            onInit: initChart
        }
    },

    countRemainDays() {
        let date = new Date()
        let endTime = new Date(date.getFullYear(), 11, 31, 23, 59, 59)
        let msPerDay = 24 * 60 * 60 * 1000
        return Math.round((endTime.getTime() - date.getTime()) / msPerDay)
    },
    countPastTime() {
        let date = new Date()
        let startTime = new Date(date.getFullYear(), 0, 1, 0, 0, 0)
        let msPerDay = 24 * 60 * 60 * 1000
        return Math.round((date.getTime() - startTime) / msPerDay)
    },
    countWeekends() {
        let weekendDays = 0;
        let date = new Date()
        for (let i = this.data.pastDays; i < 365; i++) {
            const currentDay = new Date(date.getFullYear(), 0, i).getDay();
            if (currentDay === 6 || currentDay === 0) {
                this.data.weekendInfo.remainWeekendDays++;
            }
        }
        for (let i = 0; i < 365; i++) {
            const currentDay = new Date(date.getFullYear(), 0, i).getDay();
            if (currentDay === 6 || currentDay === 0) {
                this.data.weekendInfo.weekendDays++;
            }
        }
        this.setData({ weekendInfo: this.data.weekendInfo })
    },

    /**
   * 生命周期函数--监听页面显示
   */
    onShow() {
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 2
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.setData({
            remainDays: this.countRemainDays(),
            pastDays: this.countPastTime()
        })
        console.log("已过时间：", this.data.pastDays)
        this.countWeekends()
    },
    onReady() {
        setTimeout(function () {
            // 获取 chart 实例的方式
            // console.log(chart)
        }, 2000);
    }
});