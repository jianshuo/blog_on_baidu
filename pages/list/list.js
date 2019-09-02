/**
 * @file index.js
 * @author swan
 */
const app = getApp()

var wp = require('../../lib/wordpress.js');

Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: swan.canIUse('button.open-type.getUserInfo'),
        entries: [{title:{rendered: '加载中。。。'}, 'id': 1}]
    },

    onLoad(query) {
        // 监听页面加载的生命周期函数
        console.log("Getting " + query.category);

        wp.get(wp.uri('posts', {'categories': query.category, 'per_page': 40}), this, function(res, page) {
            console.log(res);            
            page.setData({
                'entries' : res.data
            });
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
        var cacheTimes = 0;
        console.log(this.data.entries);
        for(var i=0; i < this.data.entries.length; i ++) {
            console.log("Checking " + i);
            if(this.data.entries[i].cached != true) {
                wp.cache('posts?slug=' + this.data.entries[i].slug);
                this.data.entries[i].cached = true;
                cacheTimes ++;
                if(cacheTimes > 2) 
                    break;
            }
        }
        


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