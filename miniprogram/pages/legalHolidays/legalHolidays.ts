// pages/legalHolidays/legalHolidays.ts
Page({
    /**
     * 页面的初始数据
     */
    data: {
        holidays: getApp().globalData.holidays,
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
        canIShowCountDown: false,
        currentHolidayIndex: null,
        countDownDays: 0,
        countDownDaysStyle: "opacity: 0;",
        nextFestivalStyle: "",
        isShowCountDownDays: false
    },
    handleShowCountDown() {
        if (!this.data.isShowCountDownDays) {
            this.data.isShowCountDownDays = true
            this.setData({
                countDownDaysStyle: "animation:showRibbon 0.5s cubic-bezier(.8, -0.5, .25, 1.5) forwards",
                nextFestivalStyle: "animation:hideRibbon 0.5s cubic-bezier(.8, -0.5, .25, 1.5) forwards",
            })
        } else {
            this.data.isShowCountDownDays = false
            this.setData({
                countDownDaysStyle: "animation:hideRibbon 0.5s cubic-bezier(.8, -0.5, .25, 1.5) forwards",
                nextFestivalStyle: "animation:showRibbon 0.5s cubic-bezier(.8, -0.5, .25, 1.5) forwards",
            })
        }
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
                    nextHolidayIndex: i,
                    canIShowCountDown: true
                })
                break;
            }
        }
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
        this.handleCountNextFestival()
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