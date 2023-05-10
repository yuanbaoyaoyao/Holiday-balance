// pages/date/date.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekdays: ["一", "二", "三", "四", "五", "六", "日",],
    dateNow: '',
    year: '',
    month: '',
    nowYear: '',
    nowMonth: '',
    threeMonthDates: [],
    today: '',
    swiperCurrent: 1
  },
  handleSetDates(e) {
    console.log("e.detail.current:", e.detail.current)
    let current = e.detail.current
    if (current == 2) {
      this.setData({
        month: this.data.month + 1,
        swiperCurrent: 1
      })
    } else if (current == 0) {
      this.setData({
        month: this.data.month - 1,
        swiperCurrent: 1
      })
    }
    this.GetThreeMonthesDates()
    console.log("month:", this.data.month)
  },
  GetNowDate() {
    let date: Date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()
    let weekDay = date.getDay()
    let fullDate = String(year) + '年' + String(month + 1) + '月' + '星期' + String(weekDay);
    this.setData({
      dateNow: fullDate,
      year: year,
      month: month
    })
  },
  GetThreeMonthesDates() {
    this.setData({
      threeMonthDates: []
    })
    const today = new Date();
    let year = this.data.year
    let month = this.data.month - 1
    for (let count = 0; count < 3; count++) {
      let dates = this.SetDates(year, month)
      this.data.threeMonthDates.push(dates)
      month++
    }
    this.setData({
      threeMonthDates: this.data.threeMonthDates
    })
    console.log("threeMonthDates:", this.data.threeMonthDates)
  },
  SetDates(year: number, month: number) {
    // 获取三个月的数据，前一个月、本月、后一个月
    let firstWeekDay = this.GetMonthFirstWeekDay(year, month)
    let lastDayOfMonth = this.GetMonthLastDay(year, month)
    let cycleNumbers = (lastDayOfMonth % 7) != 0 ? parseInt(String(lastDayOfMonth / 7)) + 1 : parseInt(String(lastDayOfMonth / 7));
    let countDays = 0
    let datesArr = []
    for (let i = 0; i < cycleNumbers; i++) {
      let tempArr = []
      for (let j = 1; j <= 7; j++) {
        if (i == 0) {
          if (firstWeekDay <= j) {
            countDays++
            tempArr.push(countDays)
          } else {
            tempArr.push("")
          }
        } else if (countDays < lastDayOfMonth) {
          countDays++
          tempArr.push(countDays)
        } else if (countDays >= lastDayOfMonth) {
          countDays++
          tempArr.push("")
        }
      }
      datesArr.push(tempArr)
    }
    return datesArr
  },

  //特殊点12月、1月
  GetMonthFirstWeekDay(year: number, month: number) {
    const firstDayOfMonth = new Date(year, month, 1);
    const dayOfWeek = firstDayOfMonth.getDay();
    console.log("dayOfWeek:", dayOfWeek)
    return dayOfWeek;
  },
  GetMonthLastDay(year: number, month: number) {
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    console.log("lastDayOfMonth:", lastDayOfMonth)
    return lastDayOfMonth
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.GetNowDate()
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
      today: new Date().getDate()
    })
    this.GetThreeMonthesDates()
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