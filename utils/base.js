import { Config } from 'config.js'
import { Util } from 'util.js'
// const util = require('util.js');

class Base {
    constructor() {
        this.baseRequestUrl = Config.serverUrl;
    }

    // 封装请求
    request (params) {
        let timestamp = Math.round(new Date() / 1000);
        console.log(timestamp)
        let key = '7e0ae0f85f4a';
        console.log(key)
        console.log(timestamp)
        let that = this;
        let url = this.baseRequestUrl + params.url;
        let header = null;
        if (!params.type) {
            params.type = 'GET';
            header = {
                'content-type': 'application/json',
                'requestCheck': timestamp + key
            }
        } else {
            header = {
                'content-type': 'application/x-www-form-urlencoded',
                'requestCheck': md5(timestamp + key)
            }
        }
        wx.request({
            url: url,
            data: params.data,
            method: params.type,
            header: header,
            success: function (res) {
                let code = res.statusCode.toString();
                let startChar = code.charAt(0);
                if (startChar == '2') {
                    params.sCallback && params.sCallback(res.data);
                } else {
                    console.log(res)
                }
            }
        })
    }

}

export { Base }