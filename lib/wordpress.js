var app = getApp();

function get(uri, page, callback) {

    var cacheEnabled = true;
    var res = swan.getStorageSync(uri);
    
    if(res != '' && cacheEnabled) {
        console.log("Cache found for [" + uri + ']');
        callback(res, page);
    } else {
        console.log('Requesting ' + uri);  
        swan.request({
            url: endpoint(uri),
            method: 'GET',
            dataType: 'json',
            success: function(res) {
                swan.setStorageSync(uri, res); 
                callback(res, page);
            },
            fail: function(err) {
                console.log(err);
                callback({data: [{name: err.errMsg}]}, page);
            }
        });
    }
}

function cache(uri) {
    get(uri, this, function(i,j){});
}

function endpoint(uri) {
    return app.globalData.proxy + app.globalData.siteEndPoint + encodeURIComponent(uri);
}

function uriPost(slug)      { return 'posts?slug=' + slug; }
function uriCategories(id)  { return 'categories?id=' + id; }

module.exports.get = get;
module.exports.cache = cache;
