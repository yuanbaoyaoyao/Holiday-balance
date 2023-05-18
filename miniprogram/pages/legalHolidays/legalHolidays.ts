// pages/legalHolidays/legalHolidays.ts
Page({
    /**
     * 页面的初始数据
     */
    data: {
        holidays: [
            //元旦比较特殊，包含上一年
            { name: "元旦", startYear: 2022, endYear: 2023, date: "12/31-1/2", count: "3天", color: "#FFF6DD", },
            { name: "春节", date: "1/21-1/27", count: "3天", },
            { name: "清明节", date: "4/5-4/5", count: "1天", color: "#99DAC2" },
            { name: "劳动节", date: "4/29-5/3", count: "5天", color: "#76A7FA", },
            { name: "端午节", date: "6/22-6/24", count: "3天", color: "#B1C5AC", },
            { name: "中秋节", date: "9/29-9/29", count: "1天", },
            { name: "国庆节", date: "9/30-10/6", count: "7天", color: "#FB7A5A", },
        ],
        show: false,
        buttons: [
            {
                type: 'default',
                className: '',
                text: '辅助操作',
                value: 0
            },
            {
                type: 'primary',
                className: '',
                text: '主操作',
                value: 1
            }
        ],
        savedFilePath: '',
        animationLaborDayGood: "animation:showLaborDay 0.5s forwards;",
        animationLaborDayHold: "animation:hideLaborDay 0.5s forwards;",
        laborDayThumbsUpClass: "",
        isAnimationLaborDay: true,
        laborTimer: 0,
        zongziResultAnimationClass: "",
        zongziItemAnimationClass: "",
        zongziAssetsAnimationClass: "",
        nextHolidayIndex: 0,
        currentHolidayIndex: null,
        countDownDays: 0,
        countDownDaysClass: "",
        nextFestivalClass: "",
    },
    handleShowCountDown() {
        console.log("点击了")
    },
    handleCountNextFestival() {
        this.setData({
            nextHolidayIndex: 0,
            currentHolidayIndex: null
        })
        const currentDate = new Date();
        for (let i = 0; i < this.data.holidays.length; i++) {
            let year = new Date().getFullYear();
            let temData = this.data.holidays[i].date
            let tempArr = temData.split("-")
            let strDate = tempArr[0];
            let [strMonth, strDay] = strDate.split("/");
            let strFullDate
            if (i == 0) { strFullDate = new Date(this.data.holidays[0].startYear, strMonth - 1, strDay) }
            else { strFullDate = new Date(year, strMonth - 1, strDay); }
            //如果当前时间大于这个时间
            if (strFullDate.getTime() < currentDate.getTime()) {
                //判断是否还在当前假期中
                let endDate = tempArr[1];
                let [endMonth, endDay] = endDate.split("/");
                let endFullDate
                if (i == 0) { endFullDate = new Date(this.data.holidays[0].endYear, endMonth - 1, endDay) }
                else { endFullDate = new Date(year, endMonth - 1, endDay); }
                if (endFullDate.getTime() > currentDate.getTime()) {
                    //当前假期
                    this.setData({ currentHolidayIndex: i })
                }
            } else {
                //计算还有多少天到达
                let countDown = (strFullDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24)
                if (countDown.toString().includes(".")) {
                    countDown = Number(countDown.toString().split(".")[0]) + 1
                }
                this.setData({
                    countDownDays: countDown,
                    nextHolidayIndex: i
                })
                break;
            }
        }
        console.log("currentHolidayIndex:", this.data.currentHolidayIndex)
        console.log("nextHolidayIndex:", this.data.nextHolidayIndex)
    },
    handleMixZongZi() {
        this.setData({
            zongziResultAnimationClass: "loading-result-animation",
            zongziItemAnimationClass: "loading-item-animation",
            zongziAssetsAnimationClass: "loading-assets-animation"
        })
    },
    handleAnimationLaborDay() {
        if (this.data.isAnimationLaborDay) {
            this.setData({
                animationLaborDayGood: 'animation:hideLaborDay 0.5s forwards;',
                animationLaborDayHold: "animation:showLaborDay 0.5s forwards;",
                laborDayThumbsUpClass: "g-wrap-item-animation"
            })
            this.data.isAnimationLaborDay = false
        } else {
            this.setData({
                animationLaborDayGood: 'opacity:1',
                animationLaborDayHold: "opacity:0",
                laborDayThumbsUpClass: "g-wrap-item-animation"
            })
        }
        clearTimeout(this.data.laborTimer);
        this.data.laborTimer = setTimeout(() => {
            this.setData({
                animationLaborDayGood: 'animation:showLaborDay 0.5s forwards;',
                animationLaborDayHold: "animation:hideLaborDay 0.5s forwards;",
                laborDayThumbsUpClass: "",
            })
            this.data.isAnimationLaborDay = true
        }, 1200);
    },
    chooseImage() {
        wx.chooseMedia({
            success: this.saveImage
        })
    },
    saveImage(res) {
        let that = this
        const tempFilePaths = res.tempFiles[0].tempFilePath
        wx.getFileSystemManager().saveFile({
            tempFilePath: tempFilePaths,
            success: function (res) {
                that.setData({ savedFilePath: res.savedFilePath })
            }
        })
    },
    buttontap(e) {
        console.log(e.detail)
    },
    handleTapView() {
        console.log("点击了画面")
        this.setData({
            show: true
        })
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
        this.handleCountNextFestival()
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 0
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