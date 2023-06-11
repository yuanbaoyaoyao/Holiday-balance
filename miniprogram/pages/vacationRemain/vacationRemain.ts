// pages/vacationRemain/vacationRemain.ts
import * as echarts from '../../components/ec-canvas/echarts';

let chart = null;
function countRemainDays() {
    let date = new Date()
    let endTime = new Date(date.getFullYear(), 11, 31, 23, 59, 59)
    let remainingTime = endTime.getTime() - date.getTime()

    let days = Math.floor(remainingTime / (24 * 60 * 60 * 1000))
    return days
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
        //tooltip有黑色阴影bug，暂时不用
        tooltip: {
            show: false,
            axisPointer: {
                type: 'shadow',
                shadowStyle: {
                    color: 'transparent'
                }
            },
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
                radius: '70%',
                type: 'gauge',
                center: ['42%', '60%'],
                startAngle: 200,
                endAngle: -20,
                min: 0,
                max: getDaysInYear(),
                splitNumber: getDaysInYear() == '365' ? 5 : 6,
                itemStyle: {
                    color: "rgba(58, 130, 251, 0.7)"
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
                    fontSize: 18
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
                    fontSize: 20,
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
                radius: '70%',
                type: 'gauge',
                center: ['42%', '60%'],
                startAngle: 200,
                endAngle: -20,
                min: 0,
                max: getDaysInYear(),
                itemStyle: {
                    color: getApp().globalData.globalColor
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
    data: {
        compensatoryLeaveDays: getApp().globalData.compensatoryLeaveDays,
        //holidayArr中假期包含上一年的
        // holidayArr: getApp().globalData.holidayArr,
        holidayArr: getApp().globalData.nowYearHolidayArr,
        remainDays: '',
        pastDays: '',
        totalHolidays: 0,
        remainingHolidays: 0,
        weekendInfo: {
            weekendDays: 0,
            remainWeekendDays: 0,
        },
        holidayDates: [],
        ec: {
            onInit: initChart
        },
        nowHoverIndex: 1
    },
    handleGetChart(e) {
        let that = this
        let index = e.currentTarget.dataset.index
        this.setData({ nowHoverIndex: index })
        switch (index) {
            case "1":
                chart.setOption({
                    tooltip: {
                        show: false,
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
                    max: that.data.totalHolidays,
                    tooltip: {
                        show: false,
                        formatter: function (params) {
                            let str = ""
                            let year = new Date().getFullYear()
                            str += params.marker + year + "年" + "\n"
                            str += "     " + "总假日" + (that.data.totalHolidays) + "天" + "\n"
                            str += "     " + "剩余假日" + (that.data.remainingHolidays) + "天"
                            return str
                        }
                    },
                    series: [
                        {
                            // splitNumber: this.handleCountSplitNumber(that.data.remainingHolidays),
                            splitNumber: 4,
                            max: that.data.totalHolidays,
                            detail: {
                                formatter: '剩余假期{value}天',
                            },
                            data: [
                                {
                                    value: that.data.remainingHolidays
                                }
                            ],
                        },
                        {
                            max: that.data.totalHolidays,
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
                        show: false,
                        formatter: function (params) {
                            let str = ""
                            let year = new Date().getFullYear()
                            str += params.marker + year + "年" + "\n"
                            str += "     " + "总周末" + that.data.weekendInfo.weekendDays + "天" + "\n"
                            str += "     " + "剩余周末" + that.data.weekendInfo.remainWeekendDays + "天" + "\n"
                            str += "     " + "(不包含调休)"
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
        // console.log("value:", value)
        for (let i = 4; i < 10; i++) {
            if (value % i == 0) return i
        }
        return 2
    },
    countPastTime() {
        let date = new Date()
        let startTime = new Date(date.getFullYear(), 0, 1, 0, 0, 0)
        let msPerDay = 24 * 60 * 60 * 1000
        return Math.ceil((date.getTime() - startTime) / msPerDay)
    },

    countWeekends() {
        let date = new Date()
        //在当天的话应该把当天给减去
        for (let i = this.data.pastDays + 1; i <= getDaysInYear(); i++) {
            let nowDate = new Date(date.getFullYear(), 0, i)
            let currentDay = nowDate.getDay();
            let month = nowDate.getMonth() + 1
            let day = nowDate.getDate()
            let monthDay = month + "/" + day
            if (currentDay === 6 || currentDay === 0) {
                if (!this.data.compensatoryLeaveDays.includes(monthDay)) {
                    this.data.weekendInfo.remainWeekendDays++;
                }
            }
        }
        for (let i = 1; i <= getDaysInYear(); i++) {
            let nowDate = new Date(date.getFullYear(), 0, i)
            let currentDay = nowDate.getDay();
            let month = nowDate.getMonth() + 1
            let day = nowDate.getDate()
            let monthDay = month + "/" + day
            if (currentDay === 6 || currentDay === 0) {
                if (!this.data.compensatoryLeaveDays.includes(monthDay)) {
                    this.data.weekendInfo.weekendDays++;
                }
            }
        }
        this.setData({ weekendInfo: this.data.weekendInfo })
    },

    countHolidays() {
        let date = new Date()
        //在当天的话应该把当天给减去
        for (let i = this.data.pastDays + 1; i <= getDaysInYear(); i++) {
            const currentDay = new Date(date.getFullYear(), 0, i).getDay();
            let dateNow = new Date(date.getFullYear(), 0)
            dateNow.setDate(i)
            const month = dateNow.getMonth() + 1
            const day = dateNow.getDate()
            const monthDay = month + "/" + day
            // 12/30
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
        for (let i = 1; i <= getDaysInYear(); i++) {
            const currentDay = new Date(date.getFullYear(), 0, i).getDay();
            let dateNow = new Date(date.getFullYear(), 0)
            dateNow.setDate(i)
            const month = dateNow.getMonth() + 1
            const day = dateNow.getDate()
            const monthDay = month + "/" + day
            // 12/30
            if (currentDay === 6 || currentDay === 0) {
                //判断是否调休
                if (!this.data.compensatoryLeaveDays.includes(monthDay)) {
                    this.data.totalHolidays += 1
                }
            } else {
                //判断是否加班
                if (this.data.holidayArr.includes(monthDay)) {
                    this.data.totalHolidays += 1
                }
            }
        }
        this.setData({
            remainingHolidays: this.data.remainingHolidays,
            totalHolidays: this.data.totalHolidays
        })
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
        this.countHolidays()
        this.countWeekends()
    },
    onReady() {
        // setTimeout(function () {
        //     // 获取 chart 实例的方式

        // }, 2000);
    },
    onShareAppMessage() {
        return {
            title: '我的假日',
            desc: '假期余额一目了然！快来使用吧！',
            path: 'pages/vacationRemain/vacationRemain' // 路径，传递参数到指定页面。
        }
    },
    onShareTimeline() {
        return {
            title: '我的假日',
        }
    }
});