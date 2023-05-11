// pages/legalHolidays/legalHolidays.ts
Page({
    /**
     * 页面的初始数据
     */
    data: {
        holidays: [
            { name: "元旦", date: "12月31日至1月2日", count: "3天", color: "#FFF6DD" },
            { name: "春节", date: "1月21日至1月27日", count: "3天", color: "#9ED55E" },
            { name: "清明节", date: "4月5日", count: "3天", color: "#99DAC2" },
            { name: "劳动节", date: "4月29日至5月3日", count: "5天", color: "#76A7FA" },
            { name: "端午节", date: "6月22日至6月24日", count: "3天", color: "#B1C5AC" },
            { name: "中秋节", date: "6月22日至6月24日", count: "8天", color: "#FFFD0A" },
            { name: "国庆节", date: "6月22日至6月24日", count: "8天", color: "#FE0000" },
        ]
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