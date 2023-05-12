import { getLunar } from "chinese-lunar-calendar";
// pages/date/date.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekdays: ["一", "二", "三", "四", "五", "六", "日",],
    yearMonths: [],
    datesOfYear: [],
    today: '',
    monthNow: '',
    isAllShow: false
  },
  GetYearMonths(year, month) {
    let fullDate = String(year) + '年' + String(month) + '月';
    this.data.yearMonths.push(fullDate)
  },
  setDatesOfYear() {
    this.data.datesOfYear = []
    const year = new Date().getFullYear()
    let datesOfYear = []
    for (let i = 1; i <= 12; i++) {
      let dates = this.SetDates(year, i)
      datesOfYear.push(dates)
    }
    this.setData({
      datesOfYear: datesOfYear,
      yearMonths: this.data.yearMonths
    })
    console.log("this.data.datesOfYear:", this.data.datesOfYear)
  },
  SetDates(year, month) {
    this.GetYearMonths(year, month)
    let firstWeekDay = this.GetMonthFirstWeekDay(year, month)
    let lastDayOfMonth = this.GetMonthLastDay(year, month)
    let cycleNumbers = (lastDayOfMonth % 7) != 0 ? parseInt(String(lastDayOfMonth / 7)) + 1 : parseInt(String(lastDayOfMonth / 7));
    let countDays = 0
    let datesArr = []
    console.log("cycleNumbers:", cycleNumbers)
    for (let i = 0; i <= cycleNumbers; i++) {
      let tempArr = []
      for (let j = 0; j < 7; j++) {
        let tempArrItem = {
          gregorian: '',
          lunar: ''
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
          countDays++
          tempArr.push("")
        }
      }
      datesArr.push(tempArr)
    }
    return datesArr
  },
  handleSetDatesItem(tempArrItem, year, month, countDays) {
    let lunar = getLunar(year, month, countDays);
    tempArrItem.gregorian = countDays
    tempArrItem.lunar = lunar.dateStr.substr(-2, 2)
    return tempArrItem
  },

  GetMonthFirstWeekDay(year, month) {
    const today = new Date();
    const firstDayOfMonth = new Date(year, month - 1, 1);
    console.log("firstDayOfMonth:", firstDayOfMonth)
    const dayOfWeek = firstDayOfMonth.getDay();
    console.log("dayOfWeek:", dayOfWeek)
    return dayOfWeek;
  },
  GetMonthLastDay(year, month) {
    const today = new Date();
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    console.log("lastDayOfMonth:", lastDayOfMonth)
    return lastDayOfMonth
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
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
    this.setData({
      today: new Date().getDate(),
      monthNow: new Date().getMonth() + 1
    })
    this.setDatesOfYear()
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