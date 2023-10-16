// pages/about/about.ts
Page({

    /**
     * 页面的初始数据
     */
    data: {
        appList: [{
            appIcon: "/assets/moreAppXiaojiang.png",
            appName: "小匠工具箱",
            appDesc: '它就是你的专属多功能工具箱,让你随时随地拥有丰富的小工具资源。'
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {

    },

    handleToFollow() {

    },
    handleToMiniProgram() {
        wx.navigateToMiniProgram({
            appId: 'wxc20bacbaa3d592f5',
            path: 'pages/index/index', // 不填默认首页
            extraData: {},
            success() {}
        })
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
                selected: 3
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
        return {
            title: '我的假日',
            desc: '',
            path: 'pages/about/about' // 路径，传递参数到指定页面。
        }
    },
    onShareTimeline() {
        return {
            title: '我的假日',
        }
    }
})