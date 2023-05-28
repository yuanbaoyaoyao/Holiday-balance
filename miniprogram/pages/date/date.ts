import calendar from "../../utils/calendar/index";
// pages/date/date.ts
//TODO 自定义假期，可能需要globalData

Page({
    /**
     * 页面的初始数据
     */
    data: {
        weekdays: ["一", "二", "三", "四", "五", "六", "日",],
        compensatoryLeaveDays: getApp().globalData.compensatoryLeaveDays,
        //holidayArr中假期包含上一年的
        // holidayArr: getApp().globalData.holidayArr,
        holidayArr: getApp().globalData.nowYearHolidayArr,
        monthRestDayArr: {
            allRestDays: 0,
            remainingRestDays: 0
        },
        yearMonths: [],
        datesOfYear: [],
        today: '',
        monthNow: '',
        yearNow: '',
        nowClickMonth: '',
        isAllShow: false,
        loading: false,
        array: 1
    },
    handleCountHolidayArr() {
        let holidays = getApp().globalData.holidays
        let nowYearHolidayArr = []
        for (let holiday of holidays) {
            let startYear = new Date().getFullYear()
            let endYear = new Date().getFullYear()
            let holidayDateArr = holiday.date.split("-")
            if (holiday.startYear != null) {
                startYear = holiday.startYear
                endYear = holiday.endYear
            }
            let startDate = new Date(startYear + "/" + holidayDateArr[0]);
            let endDate = new Date(endYear + "/" + holidayDateArr[1]);
            while (startDate <= endDate) {
                let date = startDate.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
                if (startDate.getFullYear() == new Date().getFullYear()) {
                    nowYearHolidayArr.push(date)
                }
                startDate.setDate(startDate.getDate() + 1);
            }
        }
        this.setData({
            holidayArr: nowYearHolidayArr
        })
    },
    GetYearMonths(year, month) {
        let fullDate = String(year) + '年' + String(month) + '月';
        this.data.yearMonths.push(fullDate)
    },
    setNowDatesOfMonth(month) {
        this.setData({
            loading: true
        })
        setTimeout(() => {
            this.setData({
                loading: false
            })
        }, 500);
        this.data.yearMonths = []
        this.data.datesOfYear = []
        const year = new Date().getFullYear()
        let datesOfYear = []
        this.setData({ isAllShow: true })
        let index = month
        let dates = this.SetDates(year, index)
        datesOfYear.push(dates)
        this.setData({ monthRestDayArr: this.data.monthRestDayArr })
        this.setData({
            datesOfYear: datesOfYear,
            yearMonths: this.data.yearMonths,
            nowClickMonth: index,
        })
    },
    setDatesOfYear(e) {
        this.setData({
            loading: true
        })
        setTimeout(() => {
            this.setData({
                loading: false
            })
        }, 500);
        this.data.yearMonths = []
        this.data.datesOfYear = []
        const year = new Date().getFullYear()
        let datesOfYear = []
        if (e != undefined && this.data.isAllShow == false) {
            this.setData({ isAllShow: true })
            let index = e.currentTarget.dataset.index + 1
            let dates = this.SetDates(year, index)
            datesOfYear.push(dates)
            this.setData({
                monthRestDayArr: this.data.monthRestDayArr,
                nowClickMonth: index,
            })
        } else {
            this.setData({ isAllShow: false })
            for (let i = 1; i <= 12; i++) {
                let dates = this.SetDates(year, i)
                datesOfYear.push(dates)
            }
        }
        this.setData({
            datesOfYear: datesOfYear,
            yearMonths: this.data.yearMonths,
        })
    },
    SetDates(year, month) {
        this.data.monthRestDayArr = {
            allRestDays: 0,
            remainingRestDays: 0
        }
        this.GetYearMonths(year, month)
        let firstWeekDay = this.GetMonthFirstWeekDay(year, month)
        let lastDayOfMonth = this.GetMonthLastDay(year, month)
        let cycleNumbers = (lastDayOfMonth % 7) != 0 ? parseInt(String(lastDayOfMonth / 7)) + 1 : parseInt(String(lastDayOfMonth / 7));
        //一个月多少天
        let countDays = 0
        let datesArr = []
        for (let i = 0; i <= cycleNumbers; i++) {
            let tempArr = []
            for (let j = 0; j < 7; j++) {
                let tempArrItem = {
                    gregorian: '',
                    lunar: '',
                    monthDay: ''
                }
                if (i == 0) {
                    //firstWeekDay为0 需要特殊处理
                    if (firstWeekDay == 0) {
                        if (j < 6) {
                            tempArr.push("")
                        } else {
                            countDays++
                            tempArrItem = this.handleSetDatesItem(tempArrItem, year, month, countDays)
                            tempArr.push(tempArrItem)
                        }
                    } else {
                        if (firstWeekDay <= j + 1) {
                            countDays++
                            tempArrItem = this.handleSetDatesItem(tempArrItem, year, month, countDays)
                            tempArr.push(tempArrItem)
                        } else {
                            tempArr.push("")
                        }
                    }
                }
                else if (countDays < lastDayOfMonth) {
                    countDays++
                    tempArrItem = this.handleSetDatesItem(tempArrItem, year, month, countDays)
                    tempArr.push(tempArrItem)
                } else if (countDays >= lastDayOfMonth) {
                    tempArr.push("")
                }
                //判断是否为休息日同时是否在compensatoryLeaveDays以及holidayArr中
            }
            datesArr.push(tempArr)
        }
        for (let i = 1; i <= countDays; i++) {
            this.judgeIsRestDay(year, month, i)
        }
        return datesArr
    },
    judgeIsRestDay(year, month, day) {
        let judgeDate = year + "/" + month + "/" + day
        let monthDay = month + "/" + day
        // console.log(`year:${year} month: ${month} day: ${day}`);
        const date = new Date(judgeDate);
        const nowDate = new Date();
        const dayOfWeek = date.getDay();
        // 判断是否为周末
        if (dayOfWeek === 6 || dayOfWeek === 0) {
            //判断是否调休
            if (!this.data.compensatoryLeaveDays.includes(monthDay)) {
                // console.log("调休", monthDay)
                this.data.monthRestDayArr.allRestDays += 1
                if (nowDate < date) {
                    this.data.monthRestDayArr.remainingRestDays += 1
                }
            }
        } else {
            //判断是否放假，如果放假
            if (this.data.holidayArr.includes(monthDay)) {
                // console.log("放假：", monthDay)
                this.data.monthRestDayArr.allRestDays += 1
                if (nowDate < date) {
                    this.data.monthRestDayArr.remainingRestDays += 1
                }
            }
        }
    },
    handleSetDatesItem(tempArrItem, year, month, countDays) {
        let nowCalender = calendar.solar2lunar(year, month, countDays)
        tempArrItem.gregorian = countDays
        tempArrItem.monthDay = month + "/" + countDays
        if (nowCalender.festival != null) {
            if (nowCalender.festival == '元旦节') {
                tempArrItem.lunar = '元旦'
            } else {
                tempArrItem.lunar = nowCalender.festival
            }
        } else if (nowCalender.lunarFestival != null) {
            tempArrItem.lunar = nowCalender.lunarFestival
        }
        else if (nowCalender.Term != null) {
            tempArrItem.lunar = nowCalender.Term
        } else {
            tempArrItem.lunar = nowCalender.IDayCn
        }
        return tempArrItem
    },
    GetMonthFirstWeekDay(year, month) {
        const firstDayOfMonth = new Date(year, month - 1, 1);
        const dayOfWeek = firstDayOfMonth.getDay();
        return dayOfWeek;
    },
    GetMonthLastDay(year, month) {
        const lastDayOfMonth = new Date(year, month, 0).getDate();
        return lastDayOfMonth
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.setData({
            today: new Date().getDate(),
            monthNow: new Date().getMonth() + 1,
            yearNow: new Date().getFullYear()
        })
        //直接定位到当前月份
        this.setNowDatesOfMonth(this.data.monthNow)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 1
            })
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})