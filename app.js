/**
 * @file app.js
 * @author swan
 */

/* globals swan */

App({
    onLaunch(options) {
        // do something when launch
        // 添加到我的小程序引导，参见文档： http://smartprogram.baidu.com/docs/design/component/guide_add/
        if (swan.canIUse('showFavoriteGuide')) {
            swan.showFavoriteGuide({
                type: 'bar',
                content: '一键添加到我的小程序',
                success(res) {
                    console.log('添加成功：', res);
                },
                fail(err) {
                    console.log('添加失败：', err);
                }
            });
        }
        console.log("App onLaunch called")
    },
    onShow(options) {
        // do something when show
        console.log("App onShow called")
    },
    onHide() {
        // do something when hide
        console.log("App onHide called")
    },
    globalData : {
        proxy: 'https://wangjianshuo.com/proxy.php?csurl=',
        siteEndPoint: 'http://home.wangjianshuo.com/cn/wp-json/wp/v2/'
    }
});
