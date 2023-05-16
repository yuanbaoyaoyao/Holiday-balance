// pages/legalHolidays/legalHolidays.ts
//TODO 把图片变成动态图片，劳动节那个手变成点赞
Page({
    /**
     * 页面的初始数据
     */
    data: {
        holidays: [
            { name: "元旦节", date: "12月31日至1月2日", count: "3天", color: "#FFF6DD", },
            { name: "春节", date: "1月21日至1月27日", count: "3天", color: "", },
            { name: "清明节", date: "4月5日", count: "3天", color: "#99DAC2" },
            {
                name: "劳动节", date: "4月29日至5月3日", count: "5天", color: "#76A7FA",
                image: "background-image: url('/assets/laborDay.svg');background-size: 80px;80px;background-position: right;"
            },
            {
                name: "端午节", date: "6月22日至6月24日", count: "3天", color: "#B1C5AC",
                image: "background-image: url('/assets/zongzi.svg');background-size: 80px 80px;background-position: right;"
            },
            {
                name: "中秋节", date: "6月22日至6月24日", count: "8天", color: "black",
            },
            {
                name: "国庆节", date: "6月22日至6月24日", count: "8天", color: "#FB7A5A",

            },
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
    },
    chooseImage: function () {
        wx.chooseMedia({
            success: this.saveImage
        })
    },
    saveImage: function (res) {
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