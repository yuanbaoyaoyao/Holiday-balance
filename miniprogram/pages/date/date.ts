// pages/date/date.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekdays: ["一", "二", "三", "四", "五", "六", "日",],
    dateNow: '',
    dates: [],
    today: ''
  },

  GetNowDate() {
    let date: Date = new Date()
    let fullDate = String(date.getFullYear()) + '年' + String(date.getMonth() + 1) + '月' + String(date.getDate()) + '日' + '星期' + String(date.getDay());
    this.setData({
      dateNow: fullDate
    })
  },
  SetDates() {
    let firstWeekDay = this.GetMonthFirstWeekDay()
    let lastDayOfMonth = this.GetMonthLastDay()
    let cycleNumbers = (lastDayOfMonth % 7) != 0 ? parseInt(String(lastDayOfMonth / 7)) + 1 : parseInt(String(lastDayOfMonth / 7));
    let countDays = 0
    let datesArr = []
    console.log("cycleNumbers:", cycleNumbers)
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
    this.setData({
      dates: datesArr
    })
    console.log("this.date.dates:", this.data.dates)
  },

  GetMonthFirstWeekDay() {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const dayOfWeek = firstDayOfMonth.getDay();
    console.log("dayOfWeek:", dayOfWeek)
    return dayOfWeek;
  },
  GetMonthLastDay() {
    const today = new Date();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
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
    this.SetDates()
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