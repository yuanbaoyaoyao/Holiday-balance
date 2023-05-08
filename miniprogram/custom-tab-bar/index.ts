Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        tabbars: [
            { "text": '我的假日', "iconPath": "/assets/holidays.svg", "selectedIconPath": "/assets/holidays.svg" },
            { "text": '剩余假期', "iconPath": "/assets/remain.svg", "selectedIconPath": "/assets/remain.svg" },
            { "text": '关于我', "iconPath": "/assets/cat.svg", "selectedIconPath": "/assets/cat.svg" }
        ]
    },
    onLoad() {
        const page: any = getCurrentPages().pop();
        console.log(page);

        this.setData({
            // active: this.data.list.findIndex(item => item.url === `/${page.route}`)
        });
    },
    /**
       * tab点击事件
       * @param event 
       */
    tabOnChange(event: any) {
        // this.setData({ active: event.detail });  // 官方示例的这一行不要加上
        wx.switchTab({
            url: this.data.list[event.detail].url
        })
    },
})
