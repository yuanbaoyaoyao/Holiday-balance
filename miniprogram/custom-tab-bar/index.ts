Component({
  data: {
    selected: null,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/legalHolidays/legalHolidays",
      iconPath: "/assets/holidays.svg",
      selectedIconPath: "/assets/holidays_selected.svg",
      text: "我的假日"
    }, {
      pagePath: "/pages/date/date",
      iconPath: "/assets/date.svg",
      selectedIconPath: "/assets/date_selected.svg",
      text: "日期"
    }, {
      pagePath: "/pages/vacationRemain/vacationRemain",
      iconPath: "/assets/remain.svg",
      selectedIconPath: "/assets/remain_selected.svg",
      text: "日期余额"
    }, {
      pagePath: "/pages/about/about",
      iconPath: "/assets/cat.svg",
      selectedIconPath: "/assets/cat_selected.svg",
      text: "关于我"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
    }
  }
})