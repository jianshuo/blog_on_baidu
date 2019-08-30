/**
 * @file index.js
 * @author swan
 */
const app = getApp()

Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: swan.canIUse('button.open-type.getUserInfo'),
        entries: [{name: '书和电影', id: 11}]
    },
    onLoad(query) {
        var wp = require('../../lib/wordpress.js');
        wp.get(wp.uri('categories', {'per_page': 40}), this, function(res, page) {
            console.log(res);            
            page.setData({
                'entries' : res.data
            });
        });
        console.log('Pre-caching');
        this.data.entries.forEach(function(item){
            wp.get(wp.uri('posts', {'categories': item.id, 'per_page': 40}), this, function(){});
        });
    },
    getUserInfo(e) {
        swan.login({
            success: () => {
                swan.getUserInfo({
                    success: (res) => {
                        this.setData({
                            userInfo: res.userInfo,
                            hasUserInfo: true
                        });
                    },
                    fail: () => {
                        this.setData({
                            userInfo: e.detail.userInfo,
                            hasUserInfo: true
                        });
                    }
                });
            },
            fail: () => {
                swan.showModal({
                    title: '未登录',
                    showCancel: false
                });
            }
        });
    },
    onShow() {
            swan.setPageInfo({
            title: '王建硕的中文blog',
            keywords: '王建硕, blog, IT',
            description: '王建硕的中文blog',
            articleTitle: '王建硕的中文blog',
            releaseDate: '2019-08-19 12:01:30',
            image: [
                'https://b.bdstatic.com/searchbox/mappconsole/image/20190819/8987bb7c-8e8b-46a4-91fd-47733ed50694.jpg'
            ],
            visit: {
                pv: '1000',
                uv: '100',
                sessionDuration: '130'
            },
            likes: '75',
            comments: '13',
            collects: '23',
            shares: '8',
            followers: '35',
            success: function () {
                console.log('setPageInfo success');
            },
            fail: function (err) {
                console.log('setPageInfo fail', err);
            }
        })
    }
})
