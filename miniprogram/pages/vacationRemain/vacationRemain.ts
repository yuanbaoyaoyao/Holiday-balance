// pages/vacationRemain/vacationRemain.ts
// ▒：
Page({

    /**
     * 页面的初始数据
     */
    data: {
        remainDays: '',
        pastDays: '',
        weekendInfo: {
            weekendDays: 0,
            remainWeekendDays: 0,
        },
        //国家法定节假日
        holidays:11
    },
    countRemainDays() {
        let date = new Date()
        let endTime = new Date(date.getFullYear(), 11, 31, 23, 59, 59)
        let msPerDay = 24 * 60 * 60 * 1000
        return Math.round((endTime.getTime() - date.getTime()) / msPerDay)
    },
    countPastTime() {
        let date = new Date()
        let startTime = new Date(date.getFullYear(), 0, 1, 0, 0, 0)
        let msPerDay = 24 * 60 * 60 * 1000
        return Math.round((date.getTime() - startTime) / msPerDay)
    },
    countWeekends() {
        let weekendDays = 0;
        let date = new Date()
        for (let i = this.data.pastDays; i < 365; i++) {
            const currentDay = new Date(date.getFullYear(), 0, i).getDay();
            if (currentDay === 6 || currentDay === 0) {
                this.data.weekendInfo.remainWeekendDays++;
            }
        }
        for (let i = 0; i < 365; i++) {
            const currentDay = new Date(date.getFullYear(), 0, i).getDay();
            if (currentDay === 6 || currentDay === 0) {
                this.data.weekendInfo.weekendDays++;
            }
        }
        this.setData({ weekendInfo: this.data.weekendInfo })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.setData({
            remainDays: this.countRemainDays(),
            pastDays: this.countPastTime()
        })
        console.log("已过时间：", this.data.pastDays)
        this.countWeekends()
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
                selected: 2
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