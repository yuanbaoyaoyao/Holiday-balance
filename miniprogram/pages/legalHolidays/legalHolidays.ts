// pages/legalHolidays/legalHolidays.ts
Page({
    /**
     * 页面的初始数据
     */
    data: {
        holidays: [
            { name: "元旦", date: "12/31-1/2", count: "3天", color: "#FFF6DD", },
            { name: "春节", date: "1/21-1/27", count: "3天", color: "", },
            { name: "清明节", date: "4/5-4/5", count: "1天", color: "#99DAC2" },
            { name: "劳动节", date: "4/29-5/3", count: "5天", color: "#76A7FA", },
            { name: "端午节", date: "6/22-6/24", count: "3天", color: "#B1C5AC", },
            { name: "中秋节", date: "9/29-9-29", count: "1天", color: "black", },
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
        zongziAssetsAnimationClass: ""
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