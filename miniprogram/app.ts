// app.ts
App<IAppOption>({
    globalData: {
        //调休日
        compensatoryLeaveDays: ["1/28", "1/29", "4/23", "5/6", "6/25", "10/7", "10/8"],
        holidays: [
            //元旦比较特殊，包含上一年
            { name: "元旦", startYear: 2022, endYear: 2023, date: "12/31-1/2", count: "3天", color: "#FFF6DD", fontSvg: "/assets/fontSvg/yuandan.png" },
            { name: "春节", date: "1/21-1/27", count: "3天", image: "background-image:url('/assets/cat_avatar.png');", fontSvg: "/assets/fontSvg/chunjie.png" },
            { name: "清明节", date: "4/5-4/5", count: "1天", color: "#99DAC2", fontSvg: "/assets/fontSvg/qingmingjie.png" },
            { name: "劳动节", date: "4/29-5/3", count: "5天", color: "#76A7FA", fontSvg: "/assets/fontSvg/laodongjie.png" },
            { name: "端午节", date: "6/22-6/24", count: "3天", color: "#B1C5AC", fontSvg: "/assets/fontSvg/duanwujie.png" },
            { name: "中秋节", date: "9/29-9/29", count: "1天", fontSvg: "/assets/fontSvg/zhongqiejie.png" },
            { name: "国庆节", date: "9/30-10/6", count: "7天", color: "#FB7A5A", fontSvg: "/assets/fontSvg/guoqingjie.png" },
        ],
        holidayArr: [],
        nowYearHolidayArr: [],
        globalColor: "#3A82FB"
    },
    handleCountHolidayArr() {
        let holidays = this.globalData.holidays
        let holidayArr = []
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
                holidayArr.push(date);
                startDate.setDate(startDate.getDate() + 1);
            }
        }
        this.globalData.holidayArr = holidayArr
        this.globalData.nowYearHolidayArr = nowYearHolidayArr
    },
    onLaunch() {
        this.handleCountHolidayArr()
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                console.log(res.code)
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            },
        })
    },
})