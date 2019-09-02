/*
    Library of WordPress to handle WordPress REST APIs
    Created at August 28, 2019 by Jian Shuo Wang
 */

var app = getApp();

//  Get the resource identified by uri
//  @uri:
//      uri is in form of the last part of the JSON REST API, 
//      without leading / and with all the modifiers like per_page
//      For example: 
//          posts?slug=eadee_ac
//          posts?slud=eadee_ac&per_page=20
//          categories?per_page=40
//      The uri is also used as the key for cache
//  @page
//      The page object to render the result. 
//      page.setData will be called within the callback function
//  @callback
//      The callback function after successful return of data
//
function get(uri, page, callback) {
    var res = swan.getStorageSync(uri); 
    if(res != '' && app.globalData.cacheEnabled) {
        console.log("Cache found for " + uri);
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

function uri(type, params) {
    var temp = "?";
    for(key in params) {
        temp = temp + key + '=' + params[key] + '&';
    }
    return type + temp;
}

module.exports.get = get;
module.exports.cache = cache;
module.exports.uri = uri;