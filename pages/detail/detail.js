Page({
    data: {
        entries: [{title:{rendered:'标题'}, content: {rendered: "内容"}}] 
    },
    onLoad(query) {
        var wp = require('../../lib/wordpress.js');
        wp.get('posts?per_page=50&slug=' + query.id, this, function(res, page) {
            console.log(res);            
            page.setData({
                'entries' : res.data
            });
        }); 
    },
    onError() {
        console.log("Error");
    }
})