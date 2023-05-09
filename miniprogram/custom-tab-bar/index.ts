Component({
  data: {
    selected: null,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/legalHolidays/legalHolidays",
      iconPath: "/assets/holidays.svg",
      selectedIconPath: "/assets/holidays.svg",
      text: "我的假日"
    }, {
      pagePath: "/pages/date/date",
      iconPath: "/assets/date.svg",
      selectedIconPath: "/assets/date.svg",
      text: "日期"
    }, {
      pagePath: "/pages/vacationRemain/vacationRemain",
      iconPath: "/assets/remain.svg",
      selectedIconPath: "/assets/remain.svg",
      text: "假期余额"
    }, {
      pagePath: "/pages/about/about",
      iconPath: "/assets/cat.svg",
      selectedIconPath: "/assets/cat.svg",
      text: "关于我"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      console.log("e:",e.currentTarget.dataset)
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
    }
  }
})