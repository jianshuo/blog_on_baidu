Page({
    data: {
        entries: [{title:{rendered:'标题'}, content: {rendered: "内容加载中。。。"}}],
        comments: []
    },
    onLoad(query) {
        var wp = require('../../lib/wordpress.js');
        wp.get('posts?per_page=50&slug=' + query.id, this, function(res, page) {
            console.log(res);            
            page.setData({
                'entries' : res.data
            });
            console.log(res.data[0]._links.replies[0].href.split('/')[7]);
            wp.get(res.data[0]._links.replies[0].href.split('/')[7], page, function(res, page) {
                console.log(res);            
                page.setData({
                    'comments' : res.data
                });
            });
            
        }); 
    },
    onError() {
        console.log("Error");
    },
    onShow() {
        item = this.data.entries[0];
        swan.setPageInfo({
            title: item.title,
            keywords: item.title,
            description: item.title,
            articleTitle: item.title,
            releaseDate: item.date,
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