function shareTieba() { // 自定义名字即可
    let data = {
        third_app_id: 'fqVCUOYVHfU7AXhdkynl2gpB22EYRhTj', // 历史原因，这里传入的是小程序的key，非小程序id
        third_app_name: '王建硕小程序', // 小程序名字
        third_app_avatar: 'https://b.bdstatic.com/searchbox/mappconsole/image/20190815/8bca7ec0-d744-4ca1-8b54-18919c44e6af.jpg', // 小程序logo
        third_app_pic: 'https://api.steam.pyjyz.com/x-tuiguang.jpg', // 发帖时展示的预览图片，可根据分享的不同页面定制
        third_app_link: '/pages/index/index' // 点击小程序分享帖后具体要跳入的小程序页面。
    }
    let dataStr = encodeURIComponent(JSON.stringify(data)); // 序列化一下
    swan.navigateToSmartProgram({ // 调用小程序的api
        appKey: 'flFqXclepWs7RdugAszy9eERL7G5dS0I', // 固定的，不要修改
        path: `/pages/frshistory/frshistory?extradata=${dataStr}`, // 固定的，不要修改
        extraData: {
            from: 'cnblog' // 小程序标识，统计用的，请尽量使用英文数字，不对中文兼容
        },
        success(res) {
            // 打开成功你的回调
            console.log("Share succeeded");
        }
    })
}