// pages/vacationRemain/vacationRemain.ts
import * as echarts from '../../components/ec-canvas/echarts';

let chart = null;
function countRemainDays() {
    let date = new Date()
    let endTime = new Date(date.getFullYear(), 11, 31, 23, 59, 59)
    let msPerDay = 24 * 60 * 60 * 1000
    return Math.round((endTime.getTime() - date.getTime()) / msPerDay)
}

function isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
function getDaysInYear() {
    return isLeapYear(new Date().getFullYear()) ? 366 : 365;
}

function initChart(canvas, width, height, dpr) {
    chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
    });
    canvas.setChart(chart);

    var option = {
        tooltip: {
            formatter: function (params) {
                let str = ""
                let year = new Date().getFullYear()
                str += params.marker + year + "年" + "\n"
                str += "     " + "总天数" + getDaysInYear() + "天" + "\n"
                str += "     " + "剩余天数" + countRemainDays() + "天"
                return str
            }
        },
        series: [
            {
                type: 'gauge',
                center: ['42%', '60%'],
                startAngle: 200,
                endAngle: -20,
                min: 0,
                max: getDaysInYear(),
                splitNumber: getDaysInYear() == '365' ? 5 : 6,
                itemStyle: {
                    color: '#FFAB91'
                },
                progress: {
                    show: true,
                    width: 30
                },
                pointer: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        width: 30
                    }
                },
                axisTick: {
                    distance: -45,
                    splitNumber: 6,
                    lineStyle: {
                        width: 2,
                        color: '#999'
                    }
                },
                splitLine: {
                    distance: -52,
                    length: 14,
                    lineStyle: {
                        width: 3,
                        color: '#999'
                    }
                },
                axisLabel: {
                    distance: -20,
                    color: '#999',
                    fontSize: 20
                },
                anchor: {
                    show: false
                },
                title: {
                    show: false
                },
                detail: {
                    valueAnimation: true,
                    width: '60%',
                    lineHeight: 40,
                    borderRadius: 8,
                    offsetCenter: [0, '-15%'],
                    fontSize: 25,
                    fontWeight: 'bolder',
                    formatter: '剩余天数{value}天',
                    color: 'inherit'
                },
                data: [
                    {
                        value: countRemainDays()
                    }
                ],
            },
            {
                type: 'gauge',
                center: ['42%', '60%'],
                startAngle: 200,
                endAngle: -20,
                min: 0,
                max: getDaysInYear(),
                itemStyle: {
                    color: '#FD7347'
                },
                progress: {
                    show: true,
                    width: 8
                },
                pointer: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                detail: {
                    show: false
                },
                data: [
                    {
                        value: countRemainDays()
                    }
                ]
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
        compensatoryLeaveDays: getApp().globalData.compensatoryLeaveDays,
        holidayArr: getApp().globalData.holidayArr,
        remainDays: '',
        pastDays: '',
        remainingHolidays: 0,
        weekendInfo: {
            weekendDays: 0,
            remainWeekendDays: 0,
        },
        //国家法定节假日
        holidays: 11,
        holidayDates: [],
        ec: {
            onInit: initChart
        }
    },
    handleGetChart(e) {
        let that = this
        let index = e.currentTarget.dataset.index
        switch (index) {
            case "1":
                chart.setOption({
                    tooltip: {
                        formatter: function (params) {
                            let str = ""
                            let year = new Date().getFullYear()
                            str += params.marker + year + "年" + "\n"
                            str += "     " + "总天数" + getDaysInYear() + "天" + "\n"
                            str += "     " + "剩余天数" + countRemainDays() + "天"
                            return str
                        }
                    },
                    series: [
                        {
                            splitNumber: getDaysInYear() == '365' ? 5 : 6,
                            max: getDaysInYear(),
                            detail: {
                                formatter: '剩余天数{value}天',
                            },
                            data: [
                                {
                                    value: countRemainDays()
                                }
                            ],
                        },
                        {
                            max: getDaysInYear(),
                            data: [
                                {
                                    value: countRemainDays()
                                }
                            ],
                        }
                    ]
                })
                break;
            case "2":
                chart.setOption({
                    max: that.data.weekendInfo.weekendDays + that.data.holidays,
                    tooltip: {
                        formatter: function (params) {
                            let str = ""
                            let year = new Date().getFullYear()
                            str += params.marker + year + "年" + "\n"
                            str += "     " + "总假日" + (that.data.weekendInfo.weekendDays + that.data.holidays) + "天" + "\n"
                            str += "     " + "剩余假日" + (that.data.remainingHolidays) + "天"
                            return str
                        }
                    },
                    series: [
                        {
                            splitNumber: this.handleCountSplitNumber(that.data.remainingHolidays),
                            max: that.data.weekendInfo.weekendDays + that.data.holidays,
                            detail: {
                                formatter: '剩余假日{value}天',
                            },
                            data: [
                                {
                                    value: that.data.remainingHolidays
                                }
                            ],
                        },
                        {
                            max: that.data.weekendInfo.weekendDays + that.data.holidays,
                            data: [
                                {
                                    value: that.data.remainingHolidays
                                }
                            ],
                        }
                    ]
                })
                break;
            case "3":
                chart.setOption({
                    max: that.data.weekendInfo.weekendDays,
                    tooltip: {
                        formatter: function (params) {
                            let str = ""
                            let year = new Date().getFullYear()
                            str += params.marker + year + "年" + "\n"
                            str += "     " + "总周末" + that.data.weekendInfo.weekendDays + "天" + "\n"
                            str += "     " + "剩余周末" + that.data.weekendInfo.remainWeekendDays + "天"
                            return str
                        }
                    },
                    series: [
                        {
                            splitNumber: this.handleCountSplitNumber(that.data.weekendInfo.weekendDays),
                            max: that.data.weekendInfo.weekendDays,
                            detail: {
                                formatter: '剩余周末{value}天',
                            },
                            data: [
                                {
                                    value: that.data.weekendInfo.remainWeekendDays
                                }
                            ],
                        },
                        {
                            max: that.data.weekendInfo.weekendDays,
                            data: [
                                {
                                    value: that.data.weekendInfo.remainWeekendDays
                                }
                            ],
                        }
                    ]

                })
                break;
            default:
                break;
        }
    },
    handleCountSplitNumber(value) {
        for (let i = 4; i < 10; i++) {
            if (value % i == 0) return i
        }
        return 2
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
        for (let i = this.data.pastDays; i < getDaysInYear(); i++) {
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

    countRemainingHolidays() {
        let weekendDays = 0
        let date = new Date()
        for (let i = this.data.pastDays; i < getDaysInYear(); i++) {
            const currentDay = new Date(date.getFullYear(), 0, i).getDay();
            let dateNow = new Date(date.getFullYear(), 0)
            dateNow.setDate(i)
            const month = dateNow.getMonth() + 1
            const day = dateNow.getDate()
            const monthDay = month + "/" + day
            if (currentDay === 6 || currentDay === 0) {
                //判断是否调休
                if (!this.data.compensatoryLeaveDays.includes(monthDay)) {
                    this.data.remainingHolidays += 1
                }
            } else {
                //判断是否加班
                if (this.data.holidayArr.includes(monthDay)) {
                    this.data.remainingHolidays += 1
                }
            }

        }
        this.setData({ remainingHolidays: this.data.remainingHolidays })
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
            remainDays: countRemainDays(),
            pastDays: this.countPastTime()
        })
        this.countRemainingHolidays()
        this.countWeekends()
    },
    onReady() {
        // setTimeout(function () {
        //     // 获取 chart 实例的方式

        // }, 2000);
    }
});